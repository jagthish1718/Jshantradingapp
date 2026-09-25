import { Modal, View, Pressable, Text, StyleSheet, Linking } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, fonts } from '../theme/spacing';
import type { CheckoutOrder, RazorpaySuccessPayload } from '../services/paymentApi';

interface Props {
  visible: boolean;
  order: CheckoutOrder | null;
  userName?: string;
  userEmail?: string;
  onSuccess: (payload: RazorpaySuccessPayload) => void;
  onDismiss: () => void;
  onDebug?: (message: string) => void;
}

// Razorpay's own hosted Checkout, loaded via checkout.js inside a WebView.
// This avoids the native razorpay-react-native SDK, which needs a custom
// dev client and doesn't run inside Expo Go — this approach works in
// Expo Go with zero native code.
//
// This build is instrumented with an on-screen status line + a postMessage
// 'log'/'error' channel, so if something silently fails we can see exactly
// which step it died at instead of guessing blind.
function buildCheckoutHtml(order: CheckoutOrder, userName?: string, userEmail?: string) {
  const options = {
    key: order.keyId,
    amount: order.amount,
    currency: order.currency,
    name: 'Niveshaa',
    description: order.label,
    order_id: order.orderId,
    prefill: { name: userName ?? '', email: userEmail ?? '' },
    theme: { color: '#2E4BDE' },
  };

  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    html,body{margin:0;padding:0;background:#fff;height:100%;font-family:-apple-system,Roboto,sans-serif;}
    #status{position:fixed;top:0;left:0;right:0;padding:8px 12px;font-size:11px;color:#666;background:#f4f4f8;border-bottom:1px solid #ddd;z-index:9999;}
  </style>
</head>
<body>
  <div id="status">loading checkout.js…</div>
  <script>
    function post(msg) {
      try {
        window.ReactNativeWebView.postMessage(JSON.stringify(msg));
      } catch (e) {}
    }
    function setStatus(text) {
      var el = document.getElementById('status');
      if (el) el.textContent = text;
      post({ type: 'log', message: text });
    }
    window.onerror = function (message, source, lineno, colno, error) {
      setStatus('JS error: ' + message + ' @' + lineno);
      post({ type: 'error', message: String(message) + ' @' + lineno });
    };
  </script>
  <script src="https://checkout.razorpay.com/v1/checkout.js" onerror="setStatus('checkout.js FAILED to load — check internet')"></script>
  <script>
    try {
      setStatus('checkout.js loaded, opening…');
      var options = ${JSON.stringify(options)};
      options.handler = function (response) {
        setStatus('payment success, verifying…');
        post({ type: 'success', payload: response });
      };
      options.modal = {
        ondismiss: function () {
          setStatus('checkout dismissed');
          post({ type: 'dismiss' });
        },
      };
      if (typeof Razorpay === 'undefined') {
        setStatus('Razorpay global not found — script blocked?');
        post({ type: 'error', message: 'Razorpay global undefined after script load' });
      } else {
        var rzp = new Razorpay(options);
        rzp.on('payment.failed', function (response) {
          var desc = (response.error && response.error.description) || 'unknown';
          setStatus('payment FAILED: ' + desc);
          post({ type: 'failed', error: desc });
        });
        rzp.open();
        setStatus('checkout opened');
      }
    } catch (e) {
      setStatus('init error: ' + e.message);
      post({ type: 'error', message: 'init error: ' + e.message });
    }
  </script>
</body>
</html>`;
}

// A generic React Native WebView doesn't identify itself as a normal
// mobile Chrome browser, so Razorpay's checkout.js can't tell it's safe to
// offer the full UPI method set (QR code, "pay via app" intent buttons) --
// it falls back to the one flow that works everywhere: type in a UPI ID.
// Spoofing a real Android Chrome user agent is what unlocks the rest.
const MOBILE_CHROME_USER_AGENT =
  'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36';

export default function RazorpayCheckoutModal({
  visible,
  order,
  userName,
  userEmail,
  onSuccess,
  onDismiss,
  onDebug,
}: Props) {
  const colors = useThemeColors();
  const styles = makeStyles(colors);

  if (!order) return null;

  // The UPI "pay via app" buttons work by redirecting to a deep link like
  // upi://pay?... (or gpay://, phonepe://, tez://, paytmmp://) -- a WebView
  // has no idea what to do with a non-http(s) URL and just fails silently.
  // Hand those off to the OS instead, which opens the actual app; let
  // everything else (Razorpay's own pages, bank OTP redirects) load
  // normally inside the WebView.
  const handleShouldStartLoad = (request: { url: string }) => {
    const url = request.url;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('about:')) {
      return true;
    }
    Linking.openURL(url).catch(() => {
      onDebug?.(`[upi-app] could not open ${url} -- app probably not installed`);
    });
    return false;
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onDismiss}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{order.label}</Text>
        <Pressable style={styles.closeButton} onPress={onDismiss}>
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>
      </View>
      <WebView
        source={{ html: buildCheckoutHtml(order, userName, userEmail) }}
        userAgent={MOBILE_CHROME_USER_AGENT}
        onShouldStartLoadWithRequest={handleShouldStartLoad}
        javaScriptEnabled
        domStorageEnabled
        thirdPartyCookiesEnabled
        mixedContentMode="always"
        setSupportMultipleWindows={false}
        onMessage={(event: WebViewMessageEvent) => {
          let data: any;
          try {
            data = JSON.parse(event.nativeEvent.data);
          } catch {
            return;
          }
          if (data.type === 'log' || data.type === 'error') {
            onDebug?.(`[${data.type}] ${data.message}`);
            return;
          }
          if (data.type === 'success') {
            onSuccess(data.payload as RazorpaySuccessPayload);
          } else if (data.type === 'dismiss' || data.type === 'failed') {
            if (data.type === 'failed') onDebug?.(`[failed] ${data.error}`);
            onDismiss();
          }
        }}
        onError={(e) => onDebug?.(`[webview error] ${JSON.stringify(e.nativeEvent)}`)}
        onHttpError={(e) => onDebug?.(`[http error] ${JSON.stringify(e.nativeEvent)}`)}
        originWhitelist={['*']}
        style={{ flex: 1 }}
      />
    </Modal>
  );
}

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 54,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.text },
    closeButton: { padding: 4 },
  });
