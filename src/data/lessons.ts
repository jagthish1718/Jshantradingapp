import type { LangCode } from './languages';

export type Tier = 'Beginner' | 'Intermediate' | 'Advanced';

export interface LessonQuizQuestion {
  question: Partial<Record<LangCode, string>>;
  options: Partial<Record<LangCode, string[]>>;
  correctIndex: number;
  explanation: Partial<Record<LangCode, string>>;
}

export interface Lesson {
  id: number;
  tier: Tier;
  title: Partial<Record<LangCode, string>>;
  // Narrative opener that sets up the lesson (Meera & Paati's story arc).
  opener: Partial<Record<LangCode, string>>;
  // A boxed real-world story/example — most lessons have one, a few don't.
  realStorySubtitle?: Partial<Record<LangCode, string>>;
  realStoryBody?: Partial<Record<LangCode, string>>;
  // The core teaching content — multiple sub-topics as flowing paragraphs.
  body: Partial<Record<LangCode, string>>;
  keyTakeaway?: Partial<Record<LangCode, string>>;
  quote?: Partial<Record<LangCode, string>>;
  quoteAuthor?: string;
  coachNote?: Partial<Record<LangCode, string>>;
  // Per-lesson quiz — 5 questions for a normal lesson, more for the two
  // tier-review lessons (15 and 50).
  quiz: LessonQuizQuestion[];
}

// Real 50-lesson TradeWise course content (English, Hindi & Tamil editions),
// converted from the source PDFs the user supplied. Each lesson keeps its
// original story-driven teaching style, boxed real-world example, key
// takeaway and quiz exactly as written in the source books.
export const lessons: Lesson[] = [
  {
    "id": 1,
    "tier": "Beginner",
    "title": {
      "en": "What is the Stock Market?",
      "hi": "स्टॉक मार्केट क्या है?",
      "ta": "பங்குச் சந்தை என்றால் என்ன?"
    },
    "opener": {
      "en": "Meera was clearing out her grandfather's old steel trunk when she found it — a yellowed certificate, bordered in faded blue ink, sealed with a small circular stamp: “100 Equity Shares of Bombay Dyeing & Manufacturing Company Limited.” Dated 1987.\n\n“Paati, what is this?” she asked, running her thumb over the brittle paper.\n\nHer grandmother smiled, settling into her chair. “That, kanna, is how we used to prove we owned a piece of a company. No apps, no phones — just paper, and a lot of patience.”\n\nMeera had heard the word “stocks” a hundred times — on the news, in college lectures, from friends who talked about “the market” like some far-off casino. But holding this fragile paper, something clicked differently: someone, decades ago, had handed money to a real company — and in exchange, actually owned a small piece of it.\n\n“Tell me everything,” Meera said, sitting down cross-legged on the floor.",
      "hi": "मीरा अपने दादाजी के पुराने स्टील ट्रंक को साफ कर रही थी, तभी उसे वो मिला — एक पीला पड़ चुका certificate, फीकी नीली स्याही से बॉर्डर किया हुआ, एक छोटी गोल मुहर से सील किया हुआ: “Bombay Dyeing & Manufacturing Company Limited के 100 Equity Shares.” तारीख थी 1987।\n\n“पाटी, ये क्या है?” उसने पूछा, अपने अंगूठे को उस भंगुर कागज़ पर फिराते हुए।\n\nउसकी दादी मुस्कु राईं, अपनी कु र्सी पर बैठते हुए। “वो, कन्ना, ये बताता है कि हम कै से साबित करते थे कि हमारा किसी कं पनी में हिस्सा है। न कोई apps, न phone — बस कागज़, और बहुत सारा patience.”\n\nमीरा ने “stocks” शब्द सौ बार सुना था — news में, college lectures में, उन दोस्तों से जो “the market” की बात किसी दूर के casino की तरह करते थे। लेकिन इस नाज़ुक कागज़ को हाथ में लेकर कुछ अलग ही click हुआ: दशकों पहले किसी ने एक असली कं पनी को पैसे दिए थे — और बदले में, उसका एक छोटा हिस्सा सच में अपना बना लिया था।\n\n“मुझे सब कुछ बताओ,” मीरा ने ज़ मीन पर पालथी मारकर बैठते हुए कहा।",
      "ta": "மீரா தன் தாத்தாவின் பழைய இரும்புப் பெட்டியைச் சுத்தம் செய்துகொண்டிருந்தபோது அதைக் கண்டுபிடித்தாள் — மங்கிப்போன நீல மையால் விளிம்பு வரையப்பட்ட, ஒரு சிறிய வட்ட முத்திரையுடன் மூடப்பட்ட மஞ்சள் நிற சான்றிதழ்: “Bombay Dyeing & Manufacturing Company Limited-இன் 100 Equity Shares.” 1987- ஆம் ஆண்டு தேதியிட்டது.\n\n“பாட்டி, இது என்ன?” என்று கேட்டாள், பொடிந்துபோன அந்தத் தாளை விரலால் தடவிக்கொண்டே.\n\nஅவளுடைய பாட்டி புன்னகைத்தபடி நாற்காலியில் அமர்ந்தார். “அது, கண்ணா, நாம ஒரு நிறுவனத்துல ஒரு பங்கு வச்சிருக்கோம்னு நிரூபிக்க பயன்படுத்தின வழி. Apps இல்லை, phone இல்லை — வெறும் காகிதம், நிறைய பொறுமையும் தான்.”\n\nமீரா “stocks” என்ற வார்த்தையை நூறு தடவை கேட்டிருந்தாள் — செய்திகளில், கல்லூரி விரிவுரைகளில், “the market”-ஐ ஏதோ தொலைதூர casino மாதிரி பேசற நண்பர்களிடமிருந்து. ஆனால் இந்தப் பலவீனமான தாளைப் பிடித்திருந்தபோது, ஏதோ ஒன்று வித்தியாசமாக click ஆனது: பல வருடங்களுக்கு முன் யாரோ ஒருவர் ஒரு உண்மையான நிறுவனத்திடம் பணத்தைக் கொடுத்திருக்கிறார் — அதற்குப் பதிலாக அந்த நிறுவனத்தில் ஒரு சிறு பங்கை உண்மையிலேயே சொந்தமாக்கிக்கொண்டிருக்கிறார்.\n\n“எல்லாத்தையும் சொல்லு,” என்று மீரா தரையில் பாதி மடக்கி உட்கார்ந்தபடி சொன்னாள்."
    },
    "realStorySubtitle": {
      "en": "The Idli Shop That Grew Into a Company",
      "hi": "इडली की दुकान जो एक कं पनी बन गई",
      "ta": "இட்லிக் கடை ஒரு நிறுவனமாக வளர்ந்த கதை"
    },
    "realStoryBody": {
      "en": "“Think of it like this,” Paati began. “Suppose Kannan, who runs the idli shop near our old house, wants to open four more branches. He doesn't have the money, so he tells a hundred regular customers: give me ₹1,000 each, and each of you will own a tiny slice of my shop and its future profits. That's exactly what a company does when it lists on the stock market — just with thousands of strangers instead of a hundred neighbours, and a company like Reliance or Infosys instead of an idli shop.”\n\n“And here's a real one, not made up,” she continued. “In the early 2000s, a young investor named Rakesh Jhunjhunwala started buying shares of a company called Titan — back when it was trading for just a few rupees and most people barely noticed it. He held on through crashes, recoveries, and years of very little excitement. By the time of his passing in 2022, that single decision had become one of the most celebrated long-term stories in Indian stock market history — not because of a clever trick, but because he understood the company and simply stayed patient for decades.”\n\n“That's the real lesson hiding inside this old paper of ours,” Paati said, tapping the certificate. “Owning a share was never about a quick win. It was — and still is — about believing in a business enough to wait.”",
      "hi": "“ऐसे सोचो,” पाटी ने शुरू किया। “मान लो कन्नन, जो हमारे पुराने घर के पास इडली की दुकान चलाता है, चार और branches खोलना चाहता है। उसके पास पैसे नहीं हैं, तो वो अपने सौ regular customers से कहता है: मुझे हर एक ₹1,000 दो, और तुम सबका मेरी दुकान और उसके future profits में एक छोटा हिस्सा होगा। ठीक यही एक कं पनी तब करती है जब वो stock market में list होती है — बस हज़ारों अजनबियों के साथ, सौ पड़ोसियों की बजाय, और Reliance या Infosys जैसी कं पनी के साथ, इडली की दुकान की बजाय।”\n\n“और ये एक असली किस्सा है, बनाया हुआ नहीं,” उन्होंने आगे कहा। “2000 के दशक की शुरुआत में, Rakesh Jhunjhunwala नाम के एक युवा investor ने Titan नाम की कं पनी के shares खरीदने शुरू किए — जब वो सिर्फ कुछ रुपयों में trade हो रहा था और ज़्यादातर लोगों का ध्यान भी नहीं था। वो crashes, recoveries, और बिना किसी उत्साह वाले सालों तक टिके रहे। 2022 में उनके निधन तक, वो एक फै सला भारतीय stock market के इतिहास की सबसे मशहूर long-term कहानियों में से एक बन चुका था — किसी चालाक trick की वजह से नहीं, बल्कि इसलिए क्योंकि उन्होंने कं पनी को समझा और बस दशकों तक patient बने रहे।”\n\n“यही असली सीख इस पुराने कागज़ के अंदर छु पी है,” पाटी ने certificate थपथपाते हुए कहा। “Share रखना कभी quick win के बारे में नहीं था। ये था — और अब भी है — किसी business पर इतना भरोसा करने के बारे में कि आप इंतज़ार कर सकें।”",
      "ta": "“இப்படி நினைச்சுப் பாரு,” பாட்டி ஆரம்பித்தார். “நம்ம பழைய வீட்டுக்கு அருகில் இருக்கிற இட்லிக் கடை வச்சிருக்கிற கண்ணன், இன்னும் நாலு branch திறக்கணும்னு நினைக்கிறான்னு வச்சுக்கோ. அவனுக்குப் பணம் இல்லை, அதனால் அவன் நூறு regular customer-களிடம் சொல்றான்: எனக்கு தலா Rs.1,000 கொடுங்க, உங்க ஒவ்வொருவருக்கும் என்னோட கடையிலும் அதன் future profit-லும் ஒரு சின்ன பங்கு இருக்கும். ஒரு நிறுவனம் stock market-ல list ஆகும்போது சரியாக இதைத்தான் செய்யுது — வெறும் நூறு நண்பர்களுக்குப் பதிலா ஆயிரக்கணக்கான அறிமுகமில்லாதவங்க, ஒரு இட்லிக் கடைக்குப் பதிலா Reliance அல்லது Infosys மாதிரி ஒரு நிறுவனம்.” “இது கற்பனை இல்ல, ஒரு நிஜமான கதை,” என்று அவர் தொடர்ந்தார். “2000-களின் தொடக்கத்தில், Rakesh Jhunjhunwala என்ற இளம் investor, Titan என்ற நிறுவனத்தின் பங்குகளை வாங்க ஆரம்பித்தார் — அப்போது அது ஒரு சில ரூபாய்க்கு trade ஆகிக்கொண்டிருந்தது, பெரும்பாலானோர் அதை கவனிக்கக் கூட இல்லை. Crash-கள், recovery-கள், வெகு சாதாரணமான வருடங்கள் என எல்லாவற்றையும் தாண்டியும் அவர் அதைப் பிடித்து வைத்திருந்தார். 2022-ல் அவர் காலமான நேரத்திற்குள், அந்த ஒரே ஒரு முடிவு, Indian stock market வரலாற்றிலேயே மிகவும் கொண்டாடப்படும் long-term வெற்றிக் கதைகளில் ஒன்றாக மாறியிருந்தது — ஏதோ ஒரு புத்திசாலித்தனமான trick-னால அல்ல, அவர் அந்த நிறுவனத்தைப் புரிந்துகொண்டு, decades-கணக்கில் வெறுமனே பொறுமையாக காத்திருந்ததால்.”\n\n“நம்ம இந்தப் பழைய சான்றிதழுக்குள் ஒளிஞ்சிருக்கிற நிஜமான பாடம் இதுதான்,” என்று பாட்டி அந்தச் சான்றிதழைத் தட்டிக்கொண்டே சொன்னார். “ஒரு பங்கை வைத்திருப்பது ஒருபோதும் ஒரு quick win பத்தி இல்ல. அது, இப்பவும் அப்படித்தான், ஒரு business-ஐ நம்பி, காத்திருக்கத் தெரிஞ்சிருப்பது பத்தியதுதான்.”"
    },
    "body": {
      "en": "So What Exactly Is the Stock Market? Strip away the drama you see on TV, and the stock market is simply a marketplace — a place where shares of publicly listed companies change hands between buyers and sellers. When you buy a share, you're buying a small piece of real ownership, not just a number on a screen. If the company grows and becomes more valuable, your slice can become more valuable too. If it struggles, that value can fall.\n\nCompanies go through this trouble mainly to raise money for growth — new factories, more hiring, clearing old debt — without taking on a loan. In return, they let the public own a part of the business, the same way Kannan's idli shop customers did.\n\nIndia's Two Stock Exchanges\n\n• NSE (National Stock Exchange) — India's largest exchange by trading volume, home to the Nifty 50 index. • BSE (Bombay Stock Exchange) — Asia's oldest exchange, running since 1875, home to the Sensex. Both are overseen by SEBI (Securities and Exchange Board of India), the regulator whose job is to keep the market fair and protect people exactly like Meera.\n\nPrimary Market vs Secondary Market When a company sells shares to the public for the very first time — an IPO, or Initial Public Offering — that's the primary market. After listing, when investors buy and sell those same shares among themselves every single day, that ongoing trading is the secondary market. When the news says “the market went up today,” it's almost always talking about the secondary market.\n\nWhy Do Prices Keep Moving? The same reason mango prices climb every summer: more buyers wanting something than sellers willing to let go pushes the price up, and vice versa. For stocks, what drives that wanting is a mix of a company's results, the broader economy, and simply how optimistic or fearful people are feeling that day. No single reason ever fully explains a price move — and nobody, however confident they sound on TV, can predict it with certainty.",
      "hi": "तो असल में स्टॉक मार्केट है क्या? TV पर दिखने वाला drama हटा दो, तो stock market बस एक marketplace है — एक जगह जहाँ publicly listed कं पनियों के shares खरीदने और बेचने वालों के बीच हाथ बदलते हैं। जब आप एक share खरीदते हैं, आप असली ownership का एक छोटा हिस्सा खरीद रहे होते हैं, सिर्फ screen पर एक number नहीं। अगर कं पनी बढ़ ती है और उसकी value ज़्यादा होती है, तो आपका हिस्सा भी ज़्यादा valuable हो सकता है। अगर वो struggle करती है, तो वो value गिर भी सकती है।\n\nकं पनियाँ ये सब ज़्यादातर growth के लिए पैसे जुटाने के वास्ते करती हैं — नई factories, ज़्यादा hiring, पुराना कर्ज़ चुकाना — बिना कोई loan लिए। बदले में, वो जनता को business का हिस्सा बनने देती हैं, बिल्कुल वैसे जैसे कन्नन की इडली दुकान के customers बने थे।\n\nभारत के दो Stock Exchanges • NSE (National Stock Exchange) — trading volume के हिसाब से भारत का सबसे बड़ा exchange, Nifty 50 index यहीं है।\n\n• BSE (Bombay Stock Exchange) — Asia का सबसे पुराना exchange, 1875 से चल रहा है, Sensex यहीं है।\n\nदोनों की निगरानी SEBI (Securities and Exchange Board of India) करता है, वो regulator जिसका काम है market को fair रखना और मीरा जैसे लोगों को सुरक्षित रखना।\n\nPrimary Market vs Secondary Market जब कोई कं पनी पहली बार जनता को shares बेचती है — एक IPO, यानी Initial Public Offering — तो वो primary market है। Listing के बाद, जब investors रोज़ आपस में वही shares खरीदते-बेचते हैं, वो चलता हुआ trading secondary market है। जब news कहती है “आज market ऊपर गया,” तो वो लगभग हमेशा secondary market की बात कर रही होती है।\n\nदाम बदलते ही क्यों रहते हैं? वही वजह जो हर गर्मी में आम के दाम बढ़ाती है: बेचने वालों से ज़्यादा लोग कुछ खरीदना चाहें तो दाम ऊपर जाता है, और उल्टा भी सही है। Stocks के लिए, इस चाहत को चलाने वाली चीज़ें हैं कं पनी के results, बड़ी economy, और बस उस दिन लोग कितने optimistic या डरे हुए महसूस कर रहे हैं। कोई एक वजह कभी पूरी तरह price move को explain नहीं करती — और कोई नहीं, चाहे TV पर कितना भी confident दिखे, उसे पक्के तौर पर predict कर सकता है।",
      "ta": "சரி, பங்குச் சந்தை என்றால் சரியாக என்ன? TV-ல பார்க்கிற drama-வை ஒதுக்கி வச்சுப் பார்த்தா, பங்குச் சந்தை என்பது வெறும் ஒரு சந்தை தான் — பொதுவில் பட்டியலிடப்பட்ட நிறுவனங்களின் பங்குகள் வாங்குபவர்களுக்கும் விற்பவர்களுக்கும் இடையே கைமாறும் இடம். நீங்க ஒரு பங்கை வாங்கும்போது, screen-ல இருக்கிற ஒரு எண்ணை மட்டும் வாங்கல,\n\nஉண்மையான ஓனர்ஷிப்பின் ஒரு சிறு பகுதியை வாங்குறீங்க. நிறுவனம் வளர்ந்து மதிப்பு கூடினா, உங்க பங்கும் மதிப்பு கூடும். அது சிரமப்பட்டா, அந்த மதிப்பு குறையவும் செய்யும்.\n\nநிறுவனங்கள் இந்த வேலையை பெரும்பாலும் loan வாங்காம வளர்ச்சிக்காக பணம் திரட்டவே செய்யுது — புது factory, அதிக hiring, பழைய கடனை அடைக்கிறது. இதுக்கு பதிலா, கண்ணனோட இட்லிக் கடை customer-கள் மாதிரியே, பொதுமக்களும் business-ல ஒரு பங்கு வைக்க அனுமதிக்கிறாங்க.\n\nஇந்தியாவின் இரண்டு பங்குச் சந்தைகள் • NSE (National Stock Exchange): Trading volume-ல இந்தியாவின் மிகப்பெரிய exchange, Nifty 50 index இங்கே தான் இருக்கு.\n\n• BSE (Bombay Stock Exchange): ஆசியாவின் மிகப் பழமையான exchange, 1875 முதல் இயங்குது, Sensex இங்கே தான் இருக்கு.\n\nஇரண்டையும் கண்காணிக்கிறது SEBI (Securities and Exchange Board of India) — சந்தையை நேர்மையா வச்சிருக்கவும், மீரா மாதிரி மக்களைப் பாதுகாக்கவும் இருக்கிற regulator.\n\nPrimary Market vs Secondary Market ஒரு நிறுவனம் முதன்முறையா பொதுமக்களுக்குப் பங்குகளை விக்கும்போது — ஒரு IPO (Initial Public Offering) — அது primary market. Listing ஆன பிறகு, investors அதே பங்குகளை தினமும் வாங்கி விற்பது secondary market. News-ல “market today up ஆயிடுச்சு” என்று சொன்னா, பெரும்பாலும் secondary market-ஐத் தான் குறிக்கும்.\n\nவிலை ஏன் தொடர்ந்து மாறிக்கிட்டே இருக்கு? கோடைகாலத்துல மாம்பழ விலை ஏறுறது மாதிரியே காரணம்: விற்பவங்களை விட வாங்கறவங்க அதிகமா இருந்தா விலை ஏறும், நேர்மாறா இருந்தா குறையும். பங்குகளுக்கு, இந்த “வேணும்” என்ற உணர்வுக்கு காரணம் நிறுவனத்தின் results, பொருளாதாரம், அன்றைய தினம் மக்கள் எவ்வளவு நம்பிக்கையா அல்லது பயமா இருக்காங்க என்பதோட கலவை. ஒரே ஒரு காரணம் ஒரு விலை மாற்றத்தை முழுசா விளக்காது — TV-ல எவ்ளோ நம்பிக்கையா பேசினாலும், யாராலும் அதை உறுதியா கணிக்க முடியாது."
    },
    "keyTakeaway": {
      "en": "Like Jhunjhunwala's Titan story, the stock market rewards patience and understanding far",
      "hi": "Jhunjhunwala की Titan कहानी की तरह, stock market patience और समझ को guessing से कहीं ज़्यादा reward करता है। ये सालों में धीरे-धीरे wealth बनाने की जगह है — कोई machine नहीं जो profit की guarantee दे। आपका हर रुपया असली risk उठाता है।",
      "ta": "Jhunjhunwala-வோட Titan கதை மாதிரியே, பங்குச் சந்தை யூகிக்கிறதை விட பொறுமையையும் புரிதலையும் தான் அதிகம் reward பண்ணுது. இது வருடங்கள் மேல மெதுவா செல்வம் சேர்க்கிற இடம் — லாபத்தை guarantee பண்ற machine இல்ல. நீங்க போடுற ஒவ்வொரு ரூபாய்க்கும் உண்மையான risk இருக்கு."
    },
    "quote": {
      "en": "The stock market is a device for transferring money from the impatient to the patient.",
      "hi": "The stock market is a device for transferring money from the impatient to the patient.",
      "ta": "பங்குச் சந்தை என்பது பொறுமையில்லாதவர்களிடமிருந்து பணத்தைப் பொறுமையானவர்களிடம் மாற்றும் ஒரு கருவி."
    },
    "quoteAuthor": "Warren Buffett, Investor & Chairman, Berkshire Hathaway",
    "coachNote": {
      "en": "Before you place your first real trade, spend a week just watching how 3–4 companies you already understand behave on the exchange. Familiarity beats excitement.",
      "hi": "अपना पहला असली trade करने से पहले, एक हफ़्ता बस ये देखने में लगाओ कि 3–4 कं पनियाँ जिन्हें आप पहले से समझते हैं, exchange पर कै से behave करती हैं। Familiarity, excitement से बेहतर है।",
      "ta": "உங்க முதல் real trade போடுறதுக்கு முன், ஏற்கனவே நீங்க புரிஞ்சுவச்சிருக்கிற 3-4 நிறுவனங்கள் exchange-ல எப்படி நடந்துக்குறாங்கனு ஒரு வாரம் வெறுமனே பாருங்க. Excitement-ஐ விட familiarity தான் ஜெயிக்கும்."
    },
    "quiz": [
      {
        "question": {
          "en": "What does owning a share of a company represent?",
          "hi": "किसी कं पनी का share रखने का मतलब क्या है?",
          "ta": "ஒரு நிறுவனத்தின் பங்கை வைத்திருப்பது எதைக் குறிக்கிறது?"
        },
        "options": {
          "en": [
            "A loan you gave the company",
            "Partial ownership in the company",
            "A guaranteed dividend",
            "A government bond"
          ],
          "hi": [
            "आपने कं पनी को दिया एक loan",
            "कं पनी में आंशिक ownership",
            "एक guaranteed dividend",
            "एक government bond"
          ],
          "ta": [
            "நீங்கள் நிறுவனத்திற்குக் கொடுத்த ஒரு loan",
            "நிறுவனத்தில் பகுதி ஓனர்ஷிப்",
            "உறுதியான dividend ஒன்று",
            "ஒரு government bond"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Like Kannan's idli-shop customers, a shareholder owns a small real slice of the company and its future profits.",
          "hi": "कन्नन की इडली दुकान के customers की तरह, एक shareholder कं पनी और उसके future profits का एक छोटा असली हिस्सा रखता है।",
          "ta": "கண்ணனோட இட்லிக் கடை customer-கள் மாதிரியே, ஒரு shareholder நிறுவனத்தின் ஒரு சிறு உண்மையான பங்கையும் அதன் எதிர்கால லாபத்தையும் சொந்தமாக்குகிறார்."
        }
      },
      {
        "question": {
          "en": "Which two exchanges are India's main stock exchanges?",
          "hi": "भारत के दो मुख्य stock exchanges कौन से हैं?",
          "ta": "இந்தியாவின் முக்கிய இரண்டு stock exchange-கள் எவை?"
        },
        "options": {
          "en": [
            "NSE and BSE",
            "NYSE and NASDAQ",
            "SEBI and RBI",
            "Nifty and Sensex"
          ],
          "hi": [
            "NSE और BSE",
            "NYSE और NASDAQ",
            "SEBI और RBI",
            "Nifty और Sensex"
          ],
          "ta": [
            "NSE மற்றும் BSE",
            "NYSE மற்றும் NASDAQ",
            "SEBI மற்றும் RBI",
            "Nifty மற்றும் Sensex"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "NSE (home of Nifty 50) and BSE (home of Sensex, running since 1875) are India's two principal exchanges.",
          "hi": "NSE (Nifty 50 का घर) और BSE (Sensex का घर, 1875 से चल रहा) भारत के दो मुख्य exchanges हैं।",
          "ta": "NSE (Nifty 50-க்கு இடம்) மற்றும் BSE (1875 முதல் இயங்கும் Sensex-க்கு இடம்) தான் இந்தியாவின் இரு முக்கிய exchange-கள்."
        }
      },
      {
        "question": {
          "en": "Meera's grandmother's 1987 certificate was bought directly from the company when it first sold shares to the public. Which market did that purchase happen in?",
          "hi": "मीरा की दादी का 1987 का certificate सीधे कं पनी से तब खरीदा गया था जब उसने पहली बार जनता को shares बेचे। वो खरीद किस market में हुई?",
          "ta": "மீராவின் பாட்டியின் 1987 சான்றிதழ், நிறுவனம் முதன்முறையாக பங்குகளை பொதுமக்களுக்கு விற்றபோதே நேரடியாக வாங்கப்பட்டது. அந்த வாங்குதல் எந்த market-ல நடந்தது?"
        },
        "options": {
          "en": [
            "Primary market",
            "Secondary market",
            "Debt market",
            "Currency market"
          ],
          "hi": [
            "Primary market",
            "Secondary market",
            "Debt market",
            "Currency market"
          ],
          "ta": [
            "Primary market",
            "Secondary market",
            "Debt market",
            "Currency market"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "A company's very first sale of shares to the public is the primary market (an IPO). Trading after that is the secondary market.",
          "hi": "कं पनी की जनता को पहली बार shares बेचना primary market है (एक IPO)। उसके बाद का trading secondary market है।",
          "ta": "ஒரு நிறுவனத்தின் முதல் பங்கு விற்பனை primary market தான் (ஒரு IPO). அதற்குப் பிறகு நடக்கிற trading secondary market."
        }
      },
      {
        "question": {
          "en": "What made Rakesh Jhunjhunwala's Titan investment famous, according to the story?",
          "hi": "कहानी के अनुसार, Rakesh Jhunjhunwala का Titan investment किस वजह से मशहूर हुआ?",
          "ta": "கதையின்படி, Rakesh Jhunjhunwala-வின் Titan முதலீட்டை பிரபலமாக்கியது என்ன?"
        },
        "options": {
          "en": [
            "A lucky one-day trade",
            "Decades of patience through ups and downs, not a clever trick",
            "Insider information",
            "Borrowing heavily to buy more shares"
          ],
          "hi": [
            "एक lucky one-day trade",
            "उतार-चढ़ाव के बीच दशकों का patience, कोई चालाक trick नहीं",
            "Insider information",
            "ज़्यादा shares खरीदने के लिए भारी उधार"
          ],
          "ta": [
            "ஒரு அதிர்ஷ்ட one-day trade",
            "Ups and downs வழியாக decades பொறுமை, ஒரு புத்திசாலித்தன trick இல்ல",
            "Insider information",
            "அதிக பணம் கடன் வாங்கி பங்குகள் வாங்குனது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The story specifically credits long-term patience and understanding the business, not a shortcut or guaranteed formula.",
          "hi": "कहानी साफ तौर पर long-term patience और business को समझने का श्रेय देती है, किसी shortcut या guaranteed formula को नहीं।",
          "ta": "இந்தக் கதை நீண்டகால பொறுமையையும் business-ஐ புரிந்துகொண்டதையும் தான் காரணமா சொல்குது, ஒரு shortcut அல்ல."
        }
      },
      {
        "question": {
          "en": "True or False: Stock prices are affected only by a company's own performance.",
          "hi": "सही या गलत: Stock prices सिर्फ कं पनी के अपने performance से प्रभावित होते हैं।",
          "ta": "சரியா தப்பா: பங்கு விலைகள் நிறுவனத்தின் சொந்த performance-ஆல மட்டும் தான் பாதிக்கப்படும்."
        },
        "options": {
          "en": [
            "True",
            "False",
            "Only true for large companies",
            "Only true during an IPO"
          ],
          "hi": [
            "सही",
            "गलत",
            "सिर्फ बड़ी कं पनियों के लिए सही",
            "सिर्फ IPO के दौरान सही"
          ],
          "ta": [
            "சரி",
            "தப்பு",
            "பெரிய நிறுவனங்களுக்கு மட்டும் சரி",
            "IPO காலத்தில் மட்டும் சரி"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Like mango prices in summer, broader economic conditions and overall investor mood move prices too — not just one company's results.",
          "hi": "गर्मी में आम के दाम की तरह, बड़ी economic conditions और overall investor mood भी prices को हिलाते हैं — सिर्फ एक कं पनी के results नहीं।",
          "ta": "கோடைகால மாம்பழ விலை மாதிரியே, பரந்த பொருளாதார நிலைமையும் investor mood-உம் விலையை மாற்றும் — ஒரே ஒரு நிறுவனத்தின் results மட்டும் இல்ல."
        }
      }
    ]
  },
  {
    "id": 2,
    "tier": "Beginner",
    "title": {
      "en": "How Companies Raise Money",
      "hi": "कं पनियाँ पैसे कै से जुटाती हैं",
      "ta": "நிறுவனங்கள் எப்படி பணம் திரட்டுகின்றன"
    },
    "opener": {
      "en": "A week later, Meera's cousin Divya called, sounding stressed. Her home bakery had taken off — enough that she was ready to open an actual shop — but she needed ₹8 lakh she didn't have. “Should I take a loan, or find someone to invest in the bakery?” Divya asked. “Aren't they the same thing?”\n\nMeera, still thinking about Paati's stories, realised she actually knew this one. “They're really not,” she said. “Let me tell you what I just learned.”",
      "hi": "एक हफ़्ते बाद, मीरा की cousin दिव्या ने फोन किया, आवाज़ में stress साफ था। उसकी home bakery चल पड़ी थी — इतनी कि वो एक असली shop खोलने के लिए तैयार थी — लेकिन उसे ₹8 लाख चाहिए थे जो उसके पास नहीं थे। “मुझे loan लेना चाहिए, या bakery में invest करने के लिए कोई ढूँढना चाहिए?” दिव्या ने पूछा। “क्या ये दोनों एक ही चीज़ नहीं हैं?”\n\nमीरा, जो अब भी पाटी की कहानियों के बारे में सोच रही थी, समझ गई कि उसे ये पता है। “ये सच में एक जैसे नहीं हैं,” उसने कहा। “मैं तुम्हें बताती हूँ जो मैंने अभी सीखा।”",
      "ta": "ஒரு வாரம் கழித்து, மீராவின் cousin திவ்யா phone பண்ணினாள், கொஞ்சம் stress ஆக. அவளோட home bakery நல்லா ஓடுச்சு — ஒரு actual shop திறக்கிறளவுக்கு — ஆனா அவளுக்கு ₹8 லட்சம் தேவைப்பட்டுச்சு, அது அவளிடம் இல்ல. “நான் loan வாங்கணுமா, இல்ல bakery-ல invest பண்ண யாராவது வேணுமா?” என்று திவ்யா கேட்டாள். “இரண்டும் ஒண்ணு தானே?”\n\nமீரா, பாட்டியோட கதைகளைப் பத்தி இன்னும் யோசிச்சுக்கிட்டே, இது தனக்குத் தெரியும்னு புரிஞ்சுக்கிட்டாள். “இல்லவே இல்ல,” என்று சொன்னாள். “நான் இப்போதான் கத்துக்கிட்டதை சொல்றேன்.”"
    },
    "realStorySubtitle": {
      "en": "The IPO Nobody Wanted — Until Everyone Did",
      "hi": "वो IPO जो किसी को नहीं चाहिए था — जब तक सबको नहीं चाहिए हो गया",
      "ta": "யாருக்கும் வேண்டாத IPO — பிறகு எல்லோருக்கும் வேணும் ஆனது"
    },
    "realStoryBody": {
      "en": "“Here's a real one that still amazes people,” Meera said. “In February 1993, a company called Infosys — not the giant it is today, just a young software firm — came out with its IPO. And it flopped. Investors barely showed interest, and the issue was undersubscribed. An American investment bank, Morgan Stanley, had to step in and buy the unsold shares just to bail it out.”\n\n“But the people who did buy in, and simply held on for decades through every crash and correction, ended up part of one of the most famous wealth-creation stories in Indian stock market history — all because Infosys grew into a global company over the following thirty years. Nobody could have promised that outcome in 1993. It only makes sense looking backward.”",
      "hi": "“ये एक असली किस्सा है जो अब भी लोगों को हैरान करता है,” मीरा ने कहा। “February 1993 में, Infosys नाम की एक कं पनी — जो आज जैसी giant नहीं थी, बस एक युवा software firm थी — अपना IPO लेकर आई। और वो flop हो गया। Investors ने मुश्किल से interest दिखाया, और issue undersubscribed रहा। एक American investment bank, Morgan Stanley, को बचे हुए shares खरीदने के लिए आगे आना पड़ा, बस इसे बचाने के लिए।”\n\n“लेकिन जिन लोगों ने खरीदा, और बस दशकों तक हर crash और correction के बावजूद पकड़े रहे, वो आखिर में भारतीय stock market के इतिहास की सबसे मशहूर wealth-creation कहानियों में से एक का हिस्सा बन गए — सिर्फ इसलिए क्योंकि Infosys अगले तीस सालों में एक global कं पनी बन गई। 1993 में कोई इस नतीजे का वादा नहीं कर सकता था। ये सिर्फ पीछे मुड़ कर देखने पर समझ आता है।”",
      "ta": "“இன்னும் ஆச்சர்யப்படுத்துற ஒரு நிஜக் கதை இது,” என்று மீரா சொன்னாள். “February 1993-ல, Infosys என்ற நிறுவனம் — இன்று இருக்கிற மாதிரி giant இல்ல, ஒரு இளம் software firm — தன்னோட IPO- வை கொண்டு வந்தது. அது flop ஆயிடுச்சு. Investors கிட்டத்தட்ட interest காட்டல, issue undersubscribed ஆயிடுச்சு. Morgan Stanley என்ற American investment bank தான் விக்காம இருந்த shares-ஐ வாங்கி அதை காப்பாத்தணும்.”\n\n“ஆனா அப்போ வாங்கி, ஒவ்வொரு crash-ஐயும் correction-ஐயும் தாண்டி decades-கணக்கில் பிடிச்சு வச்சிருந்தவங்க, Indian stock market வரலாற்றிலேயே மிகவும் பிரபலமான wealth-creation கதைகளில் ஒன்றின் ஒரு பகுதியா மாறினாங்க — அடுத்த முப்பது வருடங்களுல Infosys ஒரு global நிறுவனமாக வளர்ந்ததால மட்டும். 1993-ல அந்த முடிவை யாராலும் உறுதியா சொல்லி இருக்க முடியாது. இப்போ திரும்பிப் பார்த்தால் தான் அது logical-ஆ தெரியுது.”"
    },
    "body": {
      "en": "Debt vs Equity — Divya's Real Choice • Debt (a loan): Divya borrows money and must repay it with interest, on schedule, no matter how sales go that month. Ownership of her bakery stays entirely hers. • Equity (a partner): Divya sells, say, a 20% stake for ₹8 lakh. No fixed repayment — but she now permanently shares 20% of future profits and decisions with that partner. A public company choosing an IPO is doing the equity version of Divya's dilemma — just with thousands of strangers as partners instead of one.\n\nHow an IPO Actually Works • The company files detailed paperwork with SEBI about its business and finances. • A price band is set, and interested investors bid within that range. • Shares are allotted based on demand. • The stock then lists on the exchange and trading begins in the secondary market.\n\nBeyond the First IPO An already-listed company can raise more money later through an FPO (Follow-on Public Offer) — issuing fresh new shares. There's also a Rights Issue, where new shares are offered first to existing shareholders, often at a discount, almost like saying “you're already family, first right of refusal is yours.”",
      "hi": "Debt vs Equity — दिव्या का असली चुनाव • Debt (एक loan): दिव्या पैसे उधार लेती है और उसे interest के साथ, schedule के हिसाब से चुकाना होगा, चाहे उस महीने sales कै सी भी हों। उसकी bakery की ownership पूरी तरह उसी की रहती है। • Equity (एक partner): दिव्या मान लो 20% stake ₹8 लाख में बेचती है। कोई fixed repayment नहीं — लेकिन अब वो हमेशा के लिए future profits और decisions का 20% उस partner के साथ share करती है।\n\nजब कोई public company IPO चुनती है, वो दिव्या की दुविधा का equity version कर रही होती है — बस हज़ारों अजनबी partners के साथ, एक की बजाय।\n\nIPO असल में काम कै से करता है • कं पनी अपने business और finances के बारे में detailed paperwork SEBI के पास file करती है।\n\n• एक price band तय होता है, और interested investors उस range के अंदर bid करते हैं।\n\n• Demand के हिसाब से shares allot होते हैं।\n\n• फिर stock exchange पर list होता है और secondary market में trading शुरू होती है।\n\nपहले IPO के आगे कोई पहले से listed कं पनी बाद में और पैसे FPO (Follow-on Public Offer) के ज़ रिए जुटा सकती है — नए fresh shares issue करके। एक Rights Issue भी होता है, जहाँ नए shares पहले मौजूदा shareholders को offer होते हैं, अक्सर discount पर, लगभग ये कहते हुए “तुम पहले से family हो, पहला हक़ तुम्हारा है।”",
      "ta": "Debt vs Equity — திவ்யாவின் உண்மையான தேர்வு • Debt (ஒரு loan): திவ்யா பணம் கடன் வாங்குறா, அதை interest-உடன் திருப்பிக் கொடுக்கணும், schedule படி, அந்த மாசம் sales எப்படி இருந்தாலும். Bakery-யோட ownership முழுசா அவளுக்கே இருக்கும்.\n\n• Equity (ஒரு partner): திவ்யா, சொல்லப்போனா 20% stake-ஐ ₹8 லட்சத்திற்கு விக்குறா. Fixed repayment கிடையாது — ஆனா இனி அவள் நிரந்தரமா 20% future profit-ஐயும் முடிவுகளையும் அந்த partner-உடன் பகிர்ந்துக்கணும்.\n\nஒரு public நிறுவனம் IPO தேர்ந்தெடுக்கிறது, திவ்யாவின் dilemma-வோட equity version தான் — வெறும் ஆயிரக்கணக்கான அறிமுகமில்லாதவங்க partner-ஆ இருக்குறது தவிர.\n\nIPO உண்மையில் எப்படி வேலை செய்யுது • நிறுவனம் தன் business-ஐயும் finances-ஐயும் பத்தி detailed paperwork-ஐ SEBI-ல file செய்யுது.\n\n• ஒரு price band set பண்ணப்படுது, interested investors அந்த range-க்குள் bid பண்றாங்க.\n\n• Demand-ஐ பொறுத்து shares allot ஆகுது.\n\n• அப்புறம் stock exchange-ல list ஆகி, secondary market-ல trading ஆரம்பிக்குது.\n\nமுதல் IPO-வுக்கு அப்புறமும்\n\nஏற்கனவே list ஆன ஒரு நிறுவனம் பின்னாடி FPO (Follow-on Public Offer) மூலமா இன்னும் பணம் திரட்டலாம் — புது shares issue பண்ணி. Rights Issue-உம் இருக்கு, அதுல புது shares முதலில் இருக்கிற shareholders-க்கு, பெரும்பாலும் discount-ல offer பண்ணப்படும் — “நீங்க already குடும்பம், முதல் உரிமை உங்களுக்கு தான்” என்று சொல்றது மாதிரி."
    },
    "keyTakeaway": {
      "en": "Whether it's Divya's bakery or a company on the exchange, understanding debt vs equity",
      "hi": "चाहे वो दिव्या की bakery हो या exchange पर कोई कं पनी, debt vs equity समझना आपको risk के बारे में बताता है। भारी debt वाले business में बुरे महीने में भी fixed repayments देने होते हैं; Infosys की कहानी दिखाती है कि equity investors risk और कभी-कभी एक बहुत बड़ा multi-decade reward, दोनों share करते हैं।",
      "ta": "திவ்யாவோட bakery ஆனாலும் சரி, exchange-ல இருக்கிற நிறுவனம் ஆனாலும் சரி, debt vs equity புரிஞ்சுக்குறது உங்களுக்கு risk-ஐ பத்தி சொல்லும். Debt அதிகமா இருக்கிற ஒரு business-க்கு, ஒரு bad month-லகூட fixed repayment பாக்கி இருக்கும்; Infosys கதை equity investors risk-ஐயும், சில நேரம் ஒரு பெரிய multi-decade reward-ஐயும் பகிர்ந்துக்குறாங்கனு காட்டுது."
    },
    "quote": {
      "en": "Know what you own, and know why you own it.",
      "hi": "Know what you own, and know why you own it.",
      "ta": "நீங்க எதை சொந்தமாக்கியிருக்கீங்கனு தெரிஞ்சுக்குங்க, ஏன் சொந்தமாக்கியிருக்கீங்கனும் தெரிஞ்சுக்குங்க."
    },
    "quoteAuthor": "Peter Lynch, Investor & Fund Manager, Fidelity Magellan Fund",
    "coachNote": {
      "en": "When you see an IPO trending on news apps, pause. Read the company's own filed documents before its story from strangers on social media.",
      "hi": "जब आप news apps पर कोई IPO trend करता देखें, रुक जाओ। Social media पर अजनबियों की कहानी से पहले कं पनी के खुद file किए documents पढ़ो।",
      "ta": "News apps-ல ஒரு IPO trend ஆகிறதைப் பார்க்கும்போது, ஒரு நிமிடம் நில்லுங்க. Social media-ல அறிமுகமில்லாதவங்க சொல்ற கதைக்கு முன், நிறுவனம் தானே file பண்ணிருக்கிற documents-ஐ படிங்க."
    },
    "quiz": [
      {
        "question": {
          "en": "What are the two main ways a company raises capital?",
          "hi": "कोई कं पनी capital जुटाने के दो मुख्य तरीके क्या हैं?",
          "ta": "ஒரு நிறுவனம் capital திரட்ட இருக்கிற இரண்டு முக்கிய வழிகள் என்ன?"
        },
        "options": {
          "en": [
            "Debt and Equity",
            "Salary and Bonus",
            "Tax and Subsidy",
            "Import and Export"
          ],
          "hi": [
            "Debt और Equity",
            "Salary और Bonus",
            "Tax और Subsidy",
            "Import और Export"
          ],
          "ta": [
            "Debt மற்றும் Equity",
            "Salary மற்றும் Bonus",
            "Tax மற்றும் Subsidy",
            "Import மற்றும் Export"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "Like Divya's bakery, a company either borrows (debt, repaid with interest) or sells ownership stakes (equity).",
          "hi": "दिव्या की bakery की तरह, कोई कं पनी या तो उधार लेती है (debt, interest के साथ चुकाया जाता है) या ownership stakes बेचती है (equity)।",
          "ta": "திவ்யாவின் bakery மாதிரியே, ஒரு நிறுவனம் கடன் வாங்கும் (debt, interest-உடன் திருப்பி கொடுக்கணும்) அல்லது ownership stake விக்கும் (equity)."
        }
      },
      {
        "question": {
          "en": "In equity financing, what does the company give up in return for capital?",
          "hi": "Equity financing में, कं पनी capital के बदले क्या देती है?",
          "ta": "Equity financing-ல, capital-க்குப் பதிலா நிறுவனம் எதை விட்டுக்கொடுக்குது?"
        },
        "options": {
          "en": [
            "Nothing",
            "A part of ownership and future profits",
            "Its SEBI registration",
            "Its brand name"
          ],
          "hi": [
            "कुछ नहीं",
            "Ownership और future profits का एक हिस्सा",
            "अपनी SEBI registration",
            "अपना brand name"
          ],
          "ta": [
            "ஒன்றுமில்லை",
            "ஓனர்ஷிப்பின் ஒரு பகுதியும் எதிர்கால லாபமும்",
            "அதன் SEBI registration",
            "அதன் brand name"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Just like Divya's 20%-stake partner, new shareholders permanently share in future profits and decisions.",
          "hi": "बिल्कुल दिव्या के 20%-stake वाले partner की तरह, नए shareholders हमेशा के लिए future profits और decisions में हिस्सेदार बनते हैं।",
          "ta": "திவ்யாவின் 20%-stake partner மாதிரியே, புது shareholders நிரந்தரமா எதிர்கால லாபத்திலும் முடிவுகளிலும் பங்கு பெறுவாங்க."
        }
      },
      {
        "question": {
          "en": "Infosys's 1993 IPO was undersubscribed and had to be bailed out by an underwriter. What does this show about equity investing?",
          "hi": "Infosys का 1993 का IPO undersubscribed था और एक underwriter को उसे bail out करना पड़ा। ये equity investing के बारे में क्या दिखाता है?",
          "ta": "Infosys-ன் 1993 IPO undersubscribed ஆகி, ஒரு underwriter-ஆல் காப்பாற்றப்பட்டது. இது equity investing பற்றி என்ன காட்டுது?"
        },
        "options": {
          "en": [
            "IPOs always fail",
            "Even a company that later became hugely successful looked uncertain and risky at the time",
            "Only foreign banks can invest in IPOs",
            "Undersubscribed IPOs never list"
          ],
          "hi": [
            "IPOs हमेशा fail होते हैं",
            "जो कं पनी बाद में बेहद successful बनी, वो भी उस वक़्त uncertain और risky लगी थी",
            "सिर्फ foreign banks IPOs में invest कर सकते हैं",
            "Undersubscribed IPOs कभी list नहीं होते"
          ],
          "ta": [
            "IPO-கள் எப்போதும் fail ஆகும்",
            "பின்னால் மிகப் பெரிய வெற்றியாக மாறிய நிறுவனம் கூட, அந்த நேரத்தில் uncertain-ஆவும் risky-ஆவும் தெரிந்தது",
            "Foreign banks மட்டும் தான் IPO-ல invest பண்ண முடியும்",
            "Undersubscribed IPO-கள் ஒருபோதும் list ஆகாது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Nobody could have guaranteed Infosys's future in 1993 — the outcome only looks obvious in hindsight, which is a lesson in itself.",
          "hi": "1993 में कोई Infosys का भविष्य guarantee नहीं कर सकता था — नतीजा सिर्फ पीछे मुड़ कर देखने पर obvious लगता है, जो खुद एक सीख है।",
          "ta": "1993-ல Infosys-ன் எதிர்காலத்தை யாராலும் guarantee பண்ண முடியாது — இப்போ திரும்பிப் பார்த்தால் தான் அது obvious-ஆ தெரியுது, அதுவே ஒரு பாடம்."
        }
      },
      {
        "question": {
          "en": "A company chooses a large bank loan instead of issuing new shares. What's a key risk of this compared to equity?",
          "hi": "एक कं पनी नए shares issue करने की बजाय एक बड़ा bank loan चुनती है। Equity के मुकाबले इसका एक बड़ा risk क्या है?",
          "ta": "ஒரு நிறுவனம் புது shares issue பண்றதுக்கு பதிலா பெரிய bank loan-ஐ தேர்ந்தெடுக்குது. Equity-உடன் compare பண்ணும்போது இதோட key risk என்ன?"
        },
        "options": {
          "en": [
            "It must repay the loan with interest regardless of business performance",
            "It becomes immune to market risk",
            "It can never issue shares again",
            "Its share price is guaranteed to rise"
          ],
          "hi": [
            "Business performance चाहे जैसी भी हो, उसे interest के साथ loan चुकाना ही होगा",
            "वो market risk से immune हो जाती है",
            "वो फिर कभी shares issue नहीं कर सकती",
            "उसके share price का बढ़ ना guaranteed हो जाता है"
          ],
          "ta": [
            "Business எப்படி இருந்தாலும் interest-உடன் loan-ஐ திருப்பி கொடுக்கணும்",
            "அது market risk-க்கு immune ஆகிடும்",
            "அது இனி shares இறக்க முடியாது",
            "அதன் share price rise ஆகும்னு guarantee"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "Debt carries a fixed repayment obligation — due even in a bad month, unlike equity.",
          "hi": "Debt पर एक fixed repayment obligation होता है — बुरे महीने में भी due रहता है, equity के उलट।",
          "ta": "Equity-ஐ விட வித்தியாசமா, debt-க்கு ஒரு fixed repayment obligation இருக்கு — bad month-ல கூட பாக்கி இருக்கும்."
        }
      },
      {
        "question": {
          "en": "What is a Follow-on Public Offer (FPO)?",
          "hi": "Follow-on Public Offer (FPO) क्या है?",
          "ta": "Follow-on Public Offer (FPO) என்றால் என்ன?"
        },
        "options": {
          "en": [
            "A company's very first share sale",
            "Additional new shares issued by an already-listed company",
            "A type of bond",
            "A dividend payment"
          ],
          "hi": [
            "कं पनी की पहली ही share sale",
            "पहले से listed कं पनी द्वारा issue किए गए अतिरिक्त नए shares",
            "एक तरह का bond",
            "एक dividend payment"
          ],
          "ta": [
            "ஒரு நிறுவனத்தின் முதல் share விற்பனை",
            "ஏற்கனவே list ஆன நிறுவனம் issue பண்ற கூடுதல் புது shares",
            "ஒரு வகை bond",
            "ஒரு dividend payment"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Unlike an IPO (the first-ever sale), an FPO is an already-listed company raising more money by issuing more shares.",
          "hi": "IPO (पहली बार बिक्री) के उलट, FPO एक पहले से listed कं पनी का और shares issue करके ज़्यादा पैसे जुटाना है।",
          "ta": "IPO-வுக்கு (முதல் விற்பனை) மாறாக, FPO என்பது ஏற்கனவே list ஆன நிறுவனம் இன்னும் shares issue பண்ணி பணம் திரட்டுவது."
        }
      }
    ]
  },
  {
    "id": 3,
    "tier": "Beginner",
    "title": {
      "en": "Opening a Demat & Trading Account",
      "hi": "Demat & Trading Account खोलना",
      "ta": "Demat & Trading Account திறப்பது"
    },
    "opener": {
      "en": "Two lessons in, Meera was ready to actually start. She messaged Arjun, a senior colleague who'd been investing for years. “Okay, I'm convinced. What do I actually need to open?”\n\nArjun replied almost instantly. “Two accounts, and it'll take you fifteen minutes on your phone. Fifteen minutes! Let me tell you why that used to be impossible.”",
      "hi": "दो lessons के बाद, मीरा असल में शुरू करने के लिए तैयार थी। उसने अर्जुन को message किया, एक senior colleague जो सालों से invest कर रहे थे। “ठीक है, मैं मान गई। मुझे असल में खोलने के लिए क्या चाहिए?”\n\nअर्जुन ने लगभग तुरंत जवाब दिया। “दो accounts, और ये आपके phone पर पंद्रह मिनट लेगा। पंद्रह मिनट! मैं बताता हूँ ये पहले नामुमकिन क्यों हुआ करता था।”",
      "ta": "இரண்டு lessons முடிச்சு, மீரா உண்மையிலேயே ஆரம்பிக்க தயாரானாள். வருடக்கணக்கா invest பண்ணிக்கிட்டிருந்த senior colleague அர்ஜுனுக்கு message பண்ணினாள். “சரி, நான் convince ஆயிட்டேன். என்ன திறக்கணும் எனக்கு?”\n\nஅர்ஜுன் உடனடியாகவே reply பண்ணினான். “இரண்டு accounts, phone-ல பதினைந்து நிமிடத்துல ஆயிடும். பதினைந்து நிமிஷம்! அது ஏன் ஒரு காலத்துல impossible-ஆ இருந்துச்சுனு சொல்றேன்.”"
    },
    "realStorySubtitle": {
      "en": "When Shares Were Just Paper — and Could Simply Vanish",
      "hi": "जब Shares बस कागज़ थे — और गायब भी हो सकते थे",
      "ta": "பங்குகள் வெறும் காகிதமா இருந்த காலம் — எந்த நேரமும் காணாம"
    },
    "realStoryBody": {
      "en": "“Your Paati's 1987 certificate is a perfect example,” Arjun wrote. “Back then, every share was a physical paper document. People lost them in floods, they got eaten by silverfish, they were forged, or stolen in transit between buyer and seller — brokers called this the ‘bad delivery’ problem, and it was a massive headache for the whole market.”\n\n“In 1996, India set up NSDL — the National Securities Depository Limited — the country's first depository, built specifically to hold shares electronically instead of on paper. That single change, called dematerialization, is the entire reason you can now open an account and hold shares safely on your phone, instead of guarding a folder of certificates for forty years like your grandmother did.”",
      "hi": "“आपकी पाटी का 1987 वाला certificate एक perfect example है,” अर्जुन ने लिखा। “उस वक़् त, हर share एक physical paper document होता था। लोग उन्हें बाढ़ में खो देते थे, वो silverfish खा जाते थे, वो forge हो जाते थे, या खरीदने-बेचने वाले के बीच transit में चोरी हो जाते थे — brokers इसे ‘bad delivery’ problem कहते थे, और ये पूरे market के लिए एक बड़ा सिरदर्द था।” “1996 में, भारत ने NSDL बनाया — National Securities Depository Limited — देश का पहला depository, खासतौर पर shares को paper की बजाय electronically रखने के लिए बनाया गया। यही एक बदलाव, जिसे dematerialization कहते हैं, वजह है कि अब आप एक account खोलकर phone पर shares सुरक्षित रख सकते हैं, बजाय आपकी दादी की तरह चालीस सालों तक certificates की एक file संभालने के।”",
      "ta": "போகும் “உங்க பாட்டியோட 1987 சான்றிதழே ஒரு perfect example,” என்று அர்ஜுன் எழுதினான். “அந்த காலத்துல, ஒவ்வொரு share-உம் physical paper document தான். மக்கள் அதை வெள்ளத்துல தொலைச்சாங்க, அதை silverfish சாப்பிட்டுடுச்சு, forge பண்ணப்பட்டுச்சு, அல்லது வாங்குபவர்-விற்பவர் இடையே transit-ல திருடு போச்சு — brokers இதை ‘bad delivery’ problem-னு சொல்வாங்க, அது முழு market-க்கும் ஒரு பெரிய தலைவலி.” “1996-ல, இந்தியா NSDL-ஐ — National Securities Depository Limited — நாட்டின் முதல் depository, பங்குகளை காகிதத்துக்கு பதிலா electronic-ஆ வைச்சிருக்கவே specific-ஆ கட்டப்பட்டது. அந்த ஒரே ஒரு மாற்றம், dematerialization-னு சொல்றாங்க, அதுதான் இன்று நீங்க phone-ல ஒரு account திறந்து பங்குகளை பத்திரமா வைச்சிருக்க முடியுறதுக்கான முழு காரணம் — உங்க பாட்டி மாதிரி நாற்பது வருடம் ஒரு folder-ஐ காவல் காக்கிறதுக்கு பதிலா.”"
    },
    "body": {
      "en": "Demat Account vs Trading Account • Demat account — holds your shares electronically, like a locker. Run through a depository: NSDL or CDSL. • Trading account — where you place buy and sell orders. Linked to both your Demat account and your bank account. You place the order through your Trading account; once it goes through, the shares actually sit in your Demat account. Different jobs, working together.\n\nWhat You'll Need • PAN card (mandatory for all securities transactions in India) • Aadhaar card, for e-KYC verification • A bank account for linking payments • Basic address proof — most of it is paperless today\n\nChoosing a Broker A full-service broker offers research and a relationship manager at higher fees; a discount broker is a low-cost, self-directed app — popular with people just starting out. Neither is universally “better” — it depends whether you want guidance or prefer deciding independently. Watch for the account opening fee (often waived), the Annual Maintenance Charge, and brokerage per trade.\n\nDon't Skip: Nomination\n\n“One more thing everyone forgets,” Arjun added. “Add a nominee to your Demat account. My uncle didn't, and after he passed away, my aunt spent months on paperwork just to access what was rightfully hers. It takes two minutes and saves your family a lot of pain later.”\n\nQUICK QUIZ · TEST YOURSELF (5 QUESTIONS)\n\n1. What does a Demat account store? A) Your bank balance B) Your shares/securities in electronic form C) Your PAN card details only D) Your broker's profits Correct: B) Your shares/securities in electronic form Why: Like a bank locker, but for securities — it just holds what you own.\n\n2. Which depository was set up in 1996 as India's first, ending the era of purely paper share certificates? A) NSDL B) SEBI C) RBI D) NSE Correct: A) NSDL Why: NSDL launched in 1996, allowing shares to be held electronically (dematerialized) instead of only as paper certificates.\n\n3. Meera has a Demat account and wants to actually place a buy order. What else does she need? A) A Trading account B) A second PAN card C) An FPO application D) Nothing else Correct: A) A Trading account Why: The Trading account is where you place orders; the Demat account only holds the shares once bought.\n\n4. What was the ‘bad delivery’ problem Arjun described from the paper-share era? A) Slow postal service B) Certificates being lost, forged, or damaged during transfer between buyer and seller C) Companies delivering products late D) Brokers charging high fees Correct: B) Certificates being lost, forged, or damaged during transfer between buyer and seller Why: Physical certificates created real risks of loss, forgery and damage — a major reason dematerialization was introduced.\n\n5. Why is nominating someone for your Demat account important? A) It reduces brokerage fees B) It ensures smoother transfer of your holdings to a family member if something happens to you C) It's required to buy IPO shares D) It increases your credit score Correct: B) It ensures smoother transfer of your holdings to a family member if something happens to you Why: As Arjun's uncle's story shows, skipping this can cost a grieving family months of extra paperwork.\n\n“Time is your friend; impulse is your enemy.” — John C. Bogle, Founder, The Vanguard Group\n\nCOACH’S NOTE The five minutes you spend adding a nominee today can save your family months of paperwork tomorrow. Do it right after you finish this lesson.\n\n4. Reading Bid, Ask & LTP",
      "hi": "Demat Account vs Trading Account • Demat account — आपके shares electronically रखता है, एक locker की तरह। एक depository के ज़ रिए चलता है: NSDL या CDSL।\n\n• Trading account — जहाँ आप buy और sell orders लगाते हैं। ये आपके Demat account और bank account, दोनों से जुड़ा होता है।\n\nआप order अपने Trading account से लगाते हैं; एक बार वो पूरा हो जाए, तो shares असल में आपके Demat account में आ जाते हैं। अलग-अलग काम, साथ में चलते हुए।\n\nआपको क्या चाहिए होगा • PAN card (भारत में सभी securities transactions के लिए ज़ रूरी)\n\n• Aadhaar card, e-KYC verification के लिए\n\n• Payments link करने के लिए एक bank account • Basic address proof — आजकल ज़्यादातर paperless है\n\nBroker चुनना एक full-service broker ज़्यादा fees पर research और एक relationship manager देता है; एक discount broker एक low- cost, self-directed app है — शुरुआत करने वालों में popular। कोई भी universally “बेहतर” नहीं है — ये इस पर depend करता है कि आपको guidance चाहिए या आप खुद decide करना पसंद करते हैं। Account opening fee (अक्सर माफ़ कर दी जाती है), Annual Maintenance Charge, और हर trade पर brokerage पर ध्यान दें।\n\nमत भूलें: Nomination\n\n“एक और चीज़ जो सब भूल जाते हैं,” अर्जुन ने जोड़ा। “अपने Demat account में एक nominee जोड़ें। मेरे uncle ने नहीं जोड़ा था, और उनके गुज़ रने के बाद, मेरी aunt को सिर्फ वो पाने के लिए जो सही मायने में उनका था, महीनों तक paperwork करनी पड़ी। इसमें दो मिनट लगते हैं और बाद में आपके family को बहुत दर्द से बचा लेता है।”\n\nक्विक क्विज़ · खुद को टेस्ट करें (5 सवाल)\n\n1. एक Demat account क्या store करता है? A) आपका bank balance B) आपके shares/securities electronic रूप में C) सिर्फ आपके PAN card की details D) आपके broker का profit सही जवाब: B) आपके shares/securities electronic रूप में क्यों: एक bank locker की तरह, लेकिन securities के लिए — ये बस वही रखता है जो आपका है।\n\n2. 1996 में भारत का पहला depository कौन सा बना, जिसने सिर्फ paper share certificates के दौर को खत्म किया? A) NSDL B) SEBI C) RBI D) NSE सही जवाब: A) NSDL क्यों: NSDL 1996 में launch हुआ, जिससे shares electronically (dematerialized) रखे जा सकते थे, सिर्फ paper certificates की जगह।\n\n3. मीरा के पास एक Demat account है और वो असल में एक buy order लगाना चाहती है। उसे और क्या चाहिए? A) एक Trading account B) एक दूसरा PAN card C) एक FPO application D) कुछ नहीं सही जवाब: A) एक Trading account क्यों: Trading account वो जगह है जहाँ आप orders लगाते हैं; Demat account खरीदने के बाद सिर्फ shares रखता है।\n\n4. Paper-share के दौर की वो ‘bad delivery’ problem क्या थी जिसका अर्जुन ने ज़ि क्र किया? A) धीमी postal service B) खरीदने वाले और बेचने वाले के बीच transfer में certificates का खो जाना, forge होना, या damage होना C) कं पनियों का products देर से देना D) Brokers का ज़्यादा fees लेना सही जवाब: B) खरीदने वाले और बेचने वाले के बीच transfer में certificates का खो जाना, forge होना, या damage होना क्यों: Physical certificates खोने, forgery और damage का असली risk रखते थे — dematerialization लाने की एक बड़ी वजह।\n\n5. अपने Demat account के लिए किसी को nominate करना क्यों ज़ रूरी है? A) इससे brokerage fees कम होती है B) इससे कुछ हो जाने पर आपकी holdings किसी family member को आसानी से transfer हो जाती हैं C) IPO shares खरीदने के लिए ये ज़ रूरी है D) इससे आपका credit score बढ़ ता है सही जवाब: B) इससे कुछ हो जाने पर आपकी holdings किसी family member को आसानी से transfer हो जाती हैं क्यों: जैसा अर्जुन के uncle की कहानी दिखाती है, इसे छोड़ ने से एक शोकाकुल family को महीनों की अतिरिक्त paperwork करनी पड़ सकती है।\n\n“Time is your friend; impulse is your enemy.” — John C. Bogle, Founder, The Vanguard Group\n\nकोच का नोट आज एक nominee जोड़ ने में लगे पाँच मिनट, कल आपके family को महीनों की paperwork से बचा सकते हैं। ये lesson खत्म करते ही कर लें।",
      "ta": "Demat Account vs Trading Account • Demat account: ஒரு locker மாதிரி, உங்க shares-ஐ electronic-ஆ வச்சிருக்கும். NSDL அல்லது CDSL என்ற depository மூலமா இயங்கும்.\n\n• Trading account: நீங்க buy மற்றும் sell orders போடுற இடம். உங்க Demat account-உடனும் bank account-உடனும் link ஆகியிருக்கும்.\n\nOrder-ஐ நீங்க Trading account மூலமா போடுறீங்க; அது go through ஆனதும், shares actual-ஆ உங்க Demat account-ல வந்து இருக்கும். வெவ்வேறு வேலைகள், சேர்ந்து செயல்படுறாங்க.\n\nஉங்களுக்கு என்ன வேணும் • PAN card (இந்தியாவில் அனைத்து securities transactions-க்கும் கட்டாயம்) • Aadhaar card, e-KYC verification-க்காக\n\n• Payments link பண்ண ஒரு bank account\n\n• Basic address proof — இன்றைக்கு பெரும்பாலானது paperless\n\nஒரு Broker தேர்ந்தெடுப்பது Full-service broker அதிக fee-க்கு research-உம் ஒரு relationship manager-உம் தருவாங்க; discount broker என்பது low-cost, self-directed app — புதுசா ஆரம்பிக்கிறவங்களுக்கு popular. இரண்டுல எதுவும் universally “better” இல்ல — guidance வேணுமா, தனியா முடிவு பண்ண பிடிக்குமா என்பதைப் பொறுத்தது.\n\nAccount opening fee (பெரும்பாலும் waive ஆகும்), Annual Maintenance Charge, ஒவ்வொரு trade-க்கும் brokerage ஆகியவற்றை கவனிக்கணும்.\n\nSkip பண்ணாதீங்க: Nomination “எல்லோரும் மறந்துடுற இன்னொரு விஷயம்,” என்று அர்ஜுன் சேர்த்தான். “உங்க Demat account-க்கு ஒரு nominee-ஐ add பண்ணுங்க. என் uncle அதை பண்ணல, அவர் இறந்த பிறகு, என் aunt சரியா அவங்களுக்கே சொந்தமான அதை access பண்ண மாசக்கணக்கா paperwork-ல செலவழிச்சாங்க. இரண்டே நிமிடம் தான் ஆகும், உங்க குடும்பத்தை பிறகு நிறைய வேதனையிலிருந்து காப்பாத்தும்.”\n\nவினாடி வினா · சுயபரிசோதனை (5 கேள்விகள்)\n\n1. ஒரு Demat account எதை store பண்ணும்? A) உங்க bank balance B) உங்க shares/securities electronic form-ல C) உங்க PAN card details மட்டும் D) உங்க broker-ஓட profits சரியான பதில்:B) உங்க shares/securities electronic form-ல ஏன்:ஒரு bank locker மாதிரி, ஆனா securities-க்காக — நீங்க சொந்தமாக்கியிருக்கிறதை வெறுமனே வச்சிருக்கும்.\n\n2. 1996-ல இந்தியாவின் முதல் depository-யா set ஆகி, வெறும் காகித share certificates-ன் காலத்தை முடிவுக்கு கொண்டு வந்தது எது? A) NSDL B) SEBI C) RBI D) NSE சரியான பதில்:A) NSDL ஏன்:NSDL 1996-ல launch ஆனது, shares-ஐ காகிதத்துக்கு பதிலா electronic-ஆ (dematerialized) வைக்க அனுமதிச்சது.\n\n3. மீராகிட்ட ஒரு Demat account இருக்கு, ஒரு buy order actual-ஆ போட வேணும். இன்னும் என்ன வேணும்? A) ஒரு Trading account B) இரண்டாவது PAN card C) ஒரு FPO application D) வேற எதுவும் வேண்டாம் சரியான பதில்:A) ஒரு Trading account ஏன்:Trading account தான் orders போடுற இடம்; Demat account வாங்கின shares-ஐ மட்டும் தான் வச்சிருக்கும்.\n\n4. காகித-share காலத்துல அர்ஜுன் சொன்ன ‘bad delivery’ problem என்ன? A) மெதுவான postal service B) வாங்குபவர்-விற்பவர் இடையே transfer-ல certificates தொலைஞ்சது, forge ஆனது, அல்லது damage ஆனது C) நிறுவனங்கள் products-ஐ தாமதமா deliver பண்ணுவது D) Brokers அதிக fees வாங்குவது சரியான பதில்:B) வாங்குபவர்-விற்பவர் இடையே transfer-ல certificates தொலைஞ்சது, forge ஆனது, அல்லது damage ஆனது ஏன்:Physical certificates loss, forgery, damage போன்ற உண்மையான risks-ஐ உருவாக்கின — dematerialization அறிமுகப்படுத்தப்பட்ட முக்கிய காரணங்களில் ஒன்று.\n\n5. உங்க Demat account-க்கு ஒருவரை nominate பண்றது ஏன் முக்கியம்? A) அது brokerage fees-ஐ குறைக்கும் B) உங்களுக்கு ஏதாவது நடந்தா, உங்க holdings குடும்ப உறுப்பினருக்கு smoother-ஆ transfer ஆவதை உறுதி செய்யும் C) IPO shares வாங்க அது தேவை D) அது உங்க credit score-ஐ அதிகரிக்கும் சரியான பதில்:B) உங்களுக்கு ஏதாவது நடந்தா, உங்க holdings குடும்ப உறுப்பினருக்கு smoother- ஆ transfer ஆவதை உறுதி செய்யும் ஏன்:அர்ஜுனோட uncle கதை காட்டுற மாதிரி, இதை skip பண்றது துக்கத்தில் இருக்கிற ஒரு குடும்பத்திற்கு மாசக்கணக்கான கூடுதல் paperwork-ஐ கொடுக்கும்.\n\n“நேரம் தான் உங்க friend; impulse தான் உங்க எதிரி.”\n\n— John C. Bogle, Founder, The Vanguard Group\n\nபயிற்சியாளர் குறிப்பு இன்னிக்கு ஒரு nominee add பண்ண நீங்க செலவழிக்கிற ஐந்து நிமிடம், நாளைக்கு உங்க குடும்பத்திற்கு மாசக்கணக்கான paperwork-ஐ காப்பாத்தும். இந்த lesson முடிச்ச உடனே அதை பண்ணுங்க."
    },
    "quote": {
      "en": "Time is your friend; impulse is your enemy.",
      "hi": "Time is your friend; impulse is your enemy.",
      "ta": "நேரம் தான் உங்க friend; impulse தான் உங்க எதிரி."
    },
    "quoteAuthor": "John C. Bogle, Founder, The Vanguard Group",
    "coachNote": {
      "en": "The five minutes you spend adding a nominee today can save your family months of paperwork tomorrow. Do it right after you finish this lesson.",
      "hi": "आज एक nominee जोड़ ने में लगे पाँच मिनट, कल आपके family को महीनों की paperwork से बचा सकते हैं। ये lesson खत्म करते ही कर लें।",
      "ta": "இன்னிக்கு ஒரு nominee add பண்ண நீங்க செலவழிக்கிற ஐந்து நிமிடம், நாளைக்கு உங்க குடும்பத்திற்கு மாசக்கணக்கான paperwork-ஐ காப்பாத்தும். இந்த lesson முடிச்ச உடனே அதை பண்ணுங்க."
    },
    "quiz": [
      {
        "question": {
          "en": "What does a Demat account store?",
          "hi": "एक Demat account क्या store करता है?",
          "ta": "ஒரு Demat account எதை store பண்ணும்?"
        },
        "options": {
          "en": [
            "Your bank balance",
            "Your shares/securities in electronic form",
            "Your PAN card details only",
            "Your broker's profits"
          ],
          "hi": [
            "आपका bank balance",
            "आपके shares/securities electronic रूप में",
            "सिर्फ आपके PAN card की details",
            "आपके broker का profit"
          ],
          "ta": [
            "உங்க bank balance",
            "உங்க shares/securities electronic form-ல",
            "உங்க PAN card details மட்டும்",
            "உங்க broker-ஓட profits"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Like a bank locker, but for securities — it just holds what you own.",
          "hi": "एक bank locker की तरह, लेकिन securities के लिए — ये बस वही रखता है जो आपका है।",
          "ta": "ஒரு bank locker மாதிரி, ஆனா securities-க்காக — நீங்க சொந்தமாக்கியிருக்கிறதை வெறுமனே வச்சிருக்கும்."
        }
      },
      {
        "question": {
          "en": "Which depository was set up in 1996 as India's first, ending the era of purely paper share certificates?",
          "hi": "1996 में भारत का पहला depository कौन सा बना, जिसने सिर्फ paper share certificates के दौर को खत्म किया?",
          "ta": "1996-ல இந்தியாவின் முதல் depository-யா set ஆகி, வெறும் காகித share certificates-ன் காலத்தை முடிவுக்கு கொண்டு வந்தது எது?"
        },
        "options": {
          "en": [
            "NSDL",
            "SEBI",
            "RBI",
            "NSE"
          ],
          "hi": [
            "NSDL",
            "SEBI",
            "RBI",
            "NSE"
          ],
          "ta": [
            "NSDL",
            "SEBI",
            "RBI",
            "NSE"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "NSDL launched in 1996, allowing shares to be held electronically (dematerialized) instead of only as paper certificates.",
          "hi": "NSDL 1996 में launch हुआ, जिससे shares electronically (dematerialized) रखे जा सकते थे, सिर्फ paper certificates की जगह।",
          "ta": "NSDL 1996-ல launch ஆனது, shares-ஐ காகிதத்துக்கு பதிலா electronic-ஆ (dematerialized) வைக்க அனுமதிச்சது."
        }
      },
      {
        "question": {
          "en": "Meera has a Demat account and wants to actually place a buy order. What else does she need?",
          "hi": "मीरा के पास एक Demat account है और वो असल में एक buy order लगाना चाहती है। उसे और क्या चाहिए?",
          "ta": "மீராகிட்ட ஒரு Demat account இருக்கு, ஒரு buy order actual-ஆ போட வேணும். இன்னும் என்ன வேணும்?"
        },
        "options": {
          "en": [
            "A Trading account",
            "A second PAN card",
            "An FPO application",
            "Nothing else"
          ],
          "hi": [
            "एक Trading account",
            "एक दूसरा PAN card",
            "एक FPO application",
            "कुछ नहीं"
          ],
          "ta": [
            "ஒரு Trading account",
            "இரண்டாவது PAN card",
            "ஒரு FPO application",
            "வேற எதுவும் வேண்டாம்"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "The Trading account is where you place orders; the Demat account only holds the shares once bought.",
          "hi": "Trading account वो जगह है जहाँ आप orders लगाते हैं; Demat account खरीदने के बाद सिर्फ shares रखता है।",
          "ta": "Trading account தான் orders போடுற இடம்; Demat account வாங்கின shares-ஐ மட்டும் தான் வச்சிருக்கும்."
        }
      },
      {
        "question": {
          "en": "What was the ‘bad delivery’ problem Arjun described from the paper-share era?",
          "hi": "Paper-share के दौर की वो ‘bad delivery’ problem क्या थी जिसका अर्जुन ने ज़ि क्र किया?",
          "ta": "காகித-share காலத்துல அர்ஜுன் சொன்ன ‘bad delivery’ problem என்ன?"
        },
        "options": {
          "en": [
            "Slow postal service",
            "Certificates being lost, forged, or damaged during transfer between buyer and seller",
            "Companies delivering products late",
            "Brokers charging high fees"
          ],
          "hi": [
            "धीमी postal service",
            "खरीदने वाले और बेचने वाले के बीच transfer में certificates का खो जाना, forge होना, या damage होना",
            "कं पनियों का products देर से देना",
            "Brokers का ज़्यादा fees लेना"
          ],
          "ta": [
            "மெதுவான postal service",
            "வாங்குபவர்-விற்பவர் இடையே transfer-ல certificates தொலைஞ்சது, forge ஆனது, அல்லது damage ஆனது",
            "நிறுவனங்கள் products-ஐ தாமதமா deliver பண்ணுவது",
            "Brokers அதிக fees வாங்குவது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Physical certificates created real risks of loss, forgery and damage — a major reason dematerialization was introduced.",
          "hi": "Physical certificates खोने, forgery और damage का असली risk रखते थे — dematerialization लाने की एक बड़ी वजह।",
          "ta": "Physical certificates loss, forgery, damage போன்ற உண்மையான risks-ஐ உருவாக்கின — dematerialization அறிமுகப்படுத்தப்பட்ட முக்கிய காரணங்களில் ஒன்று."
        }
      },
      {
        "question": {
          "en": "Why is nominating someone for your Demat account important?",
          "hi": "अपने Demat account के लिए किसी को nominate करना क्यों ज़ रूरी है?",
          "ta": "உங்க Demat account-க்கு ஒருவரை nominate பண்றது ஏன் முக்கியம்?"
        },
        "options": {
          "en": [
            "It reduces brokerage fees",
            "It ensures smoother transfer of your holdings to a family member if something happens to you",
            "It's required to buy IPO shares",
            "It increases your credit score"
          ],
          "hi": [
            "इससे brokerage fees कम होती है",
            "इससे कुछ हो जाने पर आपकी holdings किसी family member को आसानी से transfer हो जाती हैं",
            "IPO shares खरीदने के लिए ये ज़ रूरी है",
            "इससे आपका credit score बढ़ ता है"
          ],
          "ta": [
            "அது brokerage fees-ஐ குறைக்கும்",
            "உங்களுக்கு ஏதாவது நடந்தா, உங்க holdings குடும்ப உறுப்பினருக்கு smoother-ஆ transfer ஆவதை உறுதி செய்யும்",
            "IPO shares வாங்க அது தேவை",
            "அது உங்க credit score-ஐ அதிகரிக்கும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "As Arjun's uncle's story shows, skipping this can cost a grieving family months of extra paperwork.",
          "hi": "जैसा अर्जुन के uncle की कहानी दिखाती है, इसे छोड़ ने से एक शोकाकुल family को महीनों की अतिरिक्त paperwork करनी पड़ सकती है।",
          "ta": "அர்ஜுனோட uncle கதை காட்டுற மாதிரி, இதை skip பண்றது துக்கத்தில் இருக்கிற ஒரு குடும்பத்திற்கு மாசக்கணக்கான கூடுதல் paperwork-ஐ கொடுக்கும்."
        }
      }
    ]
  },
  {
    "id": 4,
    "tier": "Beginner",
    "title": {
      "en": "Reading Bid, Ask & LTP",
      "hi": "Bid, Ask & LTP पढ़ ना",
      "ta": "Bid, Ask & LTP படிப்பது"
    },
    "opener": {
      "en": "Account open at last, Meera opened the app for the first time — and froze. A single stock page had six different numbers crowding the screen. She sent Arjun a screenshot: “What am I even looking at?”",
      "hi": "आखिरकार account खुल गया, मीरा ने पहली बार app खोला — और ठिठक गई। एक ही stock page पर छह अलग-अलग numbers भरे हुए थे। उसने अर्जुन को एक screenshot भेजा: “मैं ये देख क्या रही हूँ?”",
      "ta": "கடைசியா account திறந்தாச்சு, மீரா முதன்முறையா app-ஐ open பண்ணினாள் — உறைஞ்சு போனாள். ஒரே ஒரு stock page-ல ஆறு வெவ்வேறு எண்கள் screen-ஐ நெருக்கிக்கிட்டிருந்துச்சு. அர்ஜுனுக்கு ஒரு screenshot அனுப்பினாள்: “நான் என்னதான் பார்க்கிறேன்?”"
    },
    "realStorySubtitle": {
      "en": "The Trading Floor That Used to Shout",
      "hi": "Trading Floor जो कभी चिल्लाता था",
      "ta": "கத்தி பேசிக்கிட்டிருந்த Trading Floor"
    },
    "realStoryBody": {
      "en": "“Believe it or not, those calm little numbers used to be complete chaos,” Arjun replied. “Until 1994, BSE traded through ‘open outcry’ — hundreds of brokers packed onto a physical trading floor, shouting prices and using hand signals to strike deals in real time. It was loud, physical, and honestly a bit terrifying to watch.”\n\n“Then NSE launched India's first fully electronic, screen-based trading system in 1994. Suddenly, the same bid, ask, and last-traded price that brokers used to yell across a crowded room could just... appear quietly on a screen. Within a few years, the shouting floors closed for good. What you're staring at right now is the calm, modern version of that old chaos.”",
      "hi": "“यकीन नहीं होगा, लेकिन ये शांत छोटे numbers कभी पूरी अफ़ रातफ़ री हुआ करते थे,” अर्जुन ने जवाब दिया। “1994 तक, BSE ‘open outcry’ से trade करता था — सैकड़ों brokers एक physical trading floor पर इकट्ठा होकर, prices चिल्लाते और हाथ के इशारों से real time में deals करते थे। ये loud था, physical था, और सच कहूँ तो देखने में थोड़ा डरावना भी था।” “फिर NSE ने 1994 में भारत का पहला पूरी तरह electronic, screen-based trading system launch किया। अचानक, वही bid, ask, और last-traded price जो brokers भरे हुए कमरे में चिल्लाकर बताते थे, बस... चुपचाप एक screen पर दिखने लगे। कुछ ही सालों में, चिल्लाते हुए floors हमेशा के लिए बंद हो गए। आप अभी जो देख रही हैं वो उस पुरानी अफ़ रातफ़ री का शांत, modern version है।”",
      "ta": "“நம்பினாலும் நம்பாட்டியும், அந்த அமைதியான சின்ன எண்கள் ஒரு காலத்துல complete chaos தான்,” என்று அர்ஜுன் reply பண்ணினான். “1994 வரைக்கும், BSE ‘open outcry’ வழியா trade ஆகும் — நூறுக்கணக்கான brokers ஒரு physical trading floor-ல கூடி, real time-ல deals strike பண்ண விலைகளை கத்தி hand signals காட்டுவாங்க. அது சத்தமா, physical-ஆ, பார்க்கவே கொஞ்சம் பயமாகவும் இருக்கும்.” “அப்புறம் NSE 1994-ல இந்தியாவின் முதல் fully electronic, screen-based trading system-ஐ launch பண்ணுச்சு. திடீர்னு, brokers நிறைஞ்ச room-ல கத்தி சொல்லிக்கிட்டிருந்த அதே bid, ask, last-traded price, screen-ல அமைதியா... தோன்றத் தொடங்கிச்சு. சில வருடங்களுக்குள்ள, கத்தின floors நிரந்தரமா closed ஆயிடுச்சு. இப்போ நீங்க பார்த்துக்கிட்டிருக்கிறது, அந்தப் பழைய chaos-ன் அமைதியான, நவீன version தான்.”"
    },
    "body": {
      "en": "Bid and Ask Picture the vegetable market on Sunday morning. You offer ₹30/kg for tomatoes — that's your bid. The seller wants ₹32/kg — that's the ask. The gap between them is the bid-ask spread. A busy stall settles that gap fast — narrow spread. A quiet one has a bigger gap — wide spread.\n\nLTP — Last Traded Price Last Traded Price is simply the price at which the most recent actual sale happened, moments ago. It's a fact about the past, not a promise — by the time you buy, the price may have already shifted slightly.\n\nThe Rest of the Screen • Open — the price when trading started today. • Previous Close — yesterday's final LTP. • Day's High/Low — the highest and lowest prices seen so far today. • Volume — how many shares have changed hands today, a rough gauge of interest.",
      "hi": "Bid और Ask रविवार सुबह की सब्ज़ी market सोचो। आप टमाटर के लिए ₹30/kg offer करते हो — वो आपकी bid है। Seller ₹32/kg चाहता है — वो ask है। दोनों के बीच का gap bid-ask spread है। एक busy stall ये gap जल्दी settle कर देता है — narrow spread। एक सुनसान stall में gap बड़ा होता है — wide spread।\n\nLTP — Last Traded Price Last Traded Price बस वो price है जिस पर सबसे हाल की actual sale हुई, कुछ पल पहले। ये past के बारे में एक fact है, कोई वादा नहीं — जब तक आप खरीदते हैं, price थोड़ा shift हो चुका हो सकता है।\n\nबाकी की Screen • Open — जब आज trading शुरू हुई तब का price।\n\n• Previous Close — कल का final LTP।\n\n• Day's High/Low — आज तक देखे गए सबसे ऊँ चे और सबसे नीचे prices।\n\n• Volume — आज कितने shares का हाथ बदला, interest का एक मोटा अंदाज़ा।",
      "ta": "Bid மற்றும் Ask Sunday காலை vegetable market-ஐ நினைச்சுப் பாருங்க. நீங்க தக்காளிக்கு ₹30/kg offer பண்றீங்க — அது உங்க bid. விற்பவர் ₹32/kg வேணும்னு சொல்றார் — அது ask. இரண்டுக்கும் இடையிலான gap தான் bid- ask spread. Busy ஆன ஒரு stall அந்த gap-ஐ வேகமா settle பண்ணும் — narrow spread. அமைதியான ஒன்றுக்கு பெரிய gap இருக்கும் — wide spread.\n\nLTP — Last Traded Price Last Traded Price என்பது, சில நிமிடங்களுக்கு முன் நடந்த மிகச் சமீபத்திய actual sale நடந்த விலை தான். இது கடந்த காலத்தைப் பத்தின ஒரு fact, ஒரு promise இல்ல — நீங்க வாங்குற நேரத்துக்குள்ள, விலை ஏற்கனவே கொஞ்சம் shift ஆயிருக்கலாம்.\n\nமீதி Screen • Open: இன்றைக்கு trading ஆரம்பிச்சப்போ இருந்த விலை.\n\n• Previous Close: நேத்தைக்கு கடைசி LTP.\n\n• Day's High/Low: இன்றைக்கு இப்போ வரைக்கும் பார்த்த மிக அதிக, மிகக் குறைந்த விலைகள்.\n\n• Volume: இன்றைக்கு எத்தனை shares கைமாறுச்சு, interest-ஐ பத்தின ஒரு rough அளவுகோல்."
    },
    "keyTakeaway": {
      "en": "Every number on that once-intimidating screen is just the electronic descendant of a shouting trading floor. Bid, ask and LTP together tell you what buyers and sellers are doing right now — not what will happen next.",
      "hi": "उस कभी डरावनी लगने वाली screen का हर number बस एक चिल्लाते हुए trading floor का electronic वंशज है। Bid, ask और LTP मिलकर बताते हैं कि buyers और sellers अभी क्या कर रहे हैं — ये नहीं कि आगे क्या होगा।",
      "ta": "ஒரு காலத்துல பயமுறுத்தின அந்த screen-ல இருக்கிற ஒவ்வொரு எண்ணும், கத்தின ஒரு trading floor-ன் electronic வழித்தோன்றல் தான். Bid, ask, LTP சேர்ந்து, இப்போ வாங்குறவங்களும் விற்கிறவங்களும் என்ன பண்றாங்கனு சொல்லுது — அடுத்து என்ன நடக்கும்னு இல்ல."
    },
    "quiz": [
      {
        "question": {
          "en": "What is the ‘Ask’ price?",
          "hi": "‘Ask’ price क्या है?",
          "ta": "‘Ask’ price என்றால் என்ன?"
        },
        "options": {
          "en": [
            "The highest price a buyer will pay",
            "The lowest price a seller will accept",
            "The price from yesterday's close",
            "The average price for the year"
          ],
          "hi": [
            "सबसे ज़्यादा price जो एक buyer देगा",
            "सबसे कम price जो एक seller accept करेगा",
            "कल के close का price",
            "साल का average price"
          ],
          "ta": [
            "ஒரு வாங்குபவர் கொடுக்க தயாரா இருக்கும் அதிகபட்ச விலை",
            "ஒரு விற்பவர் accept பண்ண தயாரா இருக்கும் குறைந்தபட்ச விலை",
            "நேத்தைக்கு close ஆன விலை",
            "வருடத்தின் average விலை"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Like the vegetable seller's asking price — what sellers currently want, while bid is what buyers are offering.",
          "hi": "सब्ज़ी वाले के asking price की तरह — sellers अभी क्या चाहते हैं, जबकि bid वो है जो buyers offer कर रहे हैं।",
          "ta": "Vegetable விற்பவரின் asking price மாதிரி — விற்பவங்க இப்போ வேணும்னு நினைக்கிறது, bid என்றால் வாங்குபவங்க offer பண்றது."
        }
      },
      {
        "question": {
          "en": "Before 1994, how did the BSE mainly execute trades?",
          "hi": "1994 से पहले, BSE मुख्यतः trades कै से execute करता था?",
          "ta": "1994-க்கு முன், BSE பெரும்பாலும் trades-ஐ எப்படி execute பண்ணுச்சு?"
        },
        "options": {
          "en": [
            "Fully electronic screens",
            "Open outcry — brokers shouting and signalling on a physical trading floor",
            "Mobile apps",
            "Postal orders"
          ],
          "hi": [
            "पूरी तरह electronic screens",
            "Open outcry — brokers physical trading floor पर चिल्लाते और इशारे करते थे",
            "Mobile apps",
            "Postal orders"
          ],
          "ta": [
            "Fully electronic screens",
            "Open outcry — brokers physical trading floor-ல கத்தி signal பண்றது",
            "Mobile apps",
            "Postal orders"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Screen-based electronic trading only arrived with NSE's 1994 launch; before that, BSE relied on a shouting trading floor.",
          "hi": "Screen-based electronic trading सिर्फ NSE के 1994 launch के साथ आया; उससे पहले, BSE एक चिल्लाते trading floor पर depend करता था।",
          "ta": "Screen-based electronic trading NSE-ன் 1994 launch-உடன் தான் வந்துச்சு; அதற்கு முன் BSE ஒரு கத்தின trading floor-ஐ சார்ந்திருந்துச்சு."
        }
      },
      {
        "question": {
          "en": "What does LTP stand for?",
          "hi": "LTP का मतलब क्या है?",
          "ta": "LTP என்றால் என்ன?"
        },
        "options": {
          "en": [
            "Long Term Price",
            "Last Traded Price",
            "Live Trading Portal",
            "Lowest Trading Point"
          ],
          "hi": [
            "Long Term Price",
            "Last Traded Price",
            "Live Trading Portal",
            "Lowest Trading Point"
          ],
          "ta": [
            "Long Term Price",
            "Last Traded Price",
            "Live Trading Portal",
            "Lowest Trading Point"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The price of the most recent completed trade — like the last tomato sale you actually witnessed.",
          "hi": "सबसे हाल के complete हुए trade का price — जैसे आपने खुद देखा हो आखिरी टमाटर की sale।",
          "ta": "மிக சமீபத்திய complete ஆன trade-ன் விலை — நீங்க நேரடியா பார்த்த கடைசி தக்காளி விற்பனை மாதிரி. ₹                 ₹"
        }
      },
      {
        "question": {
          "en": "A stock shows a bid of ₹99.50 and an ask of ₹99.55. What does this narrow spread suggest?",
          "hi": "एक stock ₹99.50 की bid और ₹99.55 की ask दिखाता है। ये narrow spread क्या बताता है?",
          "ta": "ஒரு stock 99.50 bid-உம் 99.55 ask-உம் காட்டுது. இந்த narrow spread என்ன சொல்லுது?"
        },
        "options": {
          "en": [
            "The stock is illiquid",
            "The stock is likely highly liquid, with active buyers and sellers",
            "The stock is about to be delisted",
            "The stock has no volume"
          ],
          "hi": [
            "Stock illiquid है",
            "Stock शायद highly liquid है, active buyers और sellers के साथ",
            "Stock delist होने वाला है",
            "Stock में कोई volume नहीं है"
          ],
          "ta": [
            "அந்த stock illiquid",
            "அந்த stock likely highly liquid, active buyers, sellers உடன்",
            "அந்த stock delist ஆகப்போகுது",
            "அந்த stock-க்கு volume இல்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Just like a busy vegetable stall, a tight spread means deals are happening easily and often.",
          "hi": "एक busy सब्ज़ी stall की तरह, एक tight spread मतलब deals आसानी से और अक्सर हो रहे हैं।",
          "ta": "Busy vegetable stall மாதிரியே, ஒரு tight spread deals frequently-ஆவும் easy-ஆவும் நடக்குதுனு காட்டுது."
        }
      },
      {
        "question": {
          "en": "What does trading Volume tell you about a stock?",
          "hi": "Trading Volume किसी stock के बारे में क्या बताता है?",
          "ta": "Trading Volume ஒரு stock-ஐ பத்தி என்ன சொல்லும்?"
        },
        "options": {
          "en": [
            "Its dividend yield",
            "The level of trading activity/interest in it over a period",
            "Its P/E ratio",
            "Its exact future price"
          ],
          "hi": [
            "उसका dividend yield",
            "एक period में उसमें trading activity/interest का level",
            "उसका P/E ratio",
            "उसका बिल्कुल सही future price"
          ],
          "ta": [
            "அதன் dividend yield",
            "ஒரு period-ல அதன் trading activity/interest அளவு",
            "அதன் P/E ratio",
            "அதன் exact future price"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "It simply counts how many shares changed hands — how busy that stock's ‘stall’ was.",
          "hi": "ये बस गिनता है कि कितने shares का हाथ बदला — वो stock का ‘stall’ कितना busy था।",
          "ta": "எத்தனை shares கைமாறுச்சுனு மட்டும் தான் அது count பண்ணும் — அந்த stock-ன் ‘stall’ எவ்வளவு busy- ஆ இருந்துச்சுனு."
        }
      }
    ]
  },
  {
    "id": 5,
    "tier": "Beginner",
    "title": {
      "en": "What Nifty & Sensex Really Mean",
      "hi": "Nifty & Sensex का असली मतलब",
      "ta": "Nifty & Sensex உண்மையில் என்ன அர்த்தம்"
    },
    "opener": {
      "en": "A few weeks into her new habit of checking the app daily, Meera noticed something odd. The news said “Sensex down 570 points” — but the one stock she'd been watching had actually gone up that day. She called Paati, confused.\n\n“Ah,” Paati said, “that's one of the most important things to understand early. Let me tell you the wildest example of it I know.”",
      "hi": "रोज़ app check करने की अपनी नई आदत के कुछ हफ़्तों बाद, मीरा को कुछ अजीब दिखा। News कह रही थी “Sensex 570 points नीचे” — लेकिन जो एक stock वो देख रही थी वो उस दिन असल में ऊपर गया था। उसने confuse होकर पाटी को फोन किया।\n\n“आह,” पाटी ने कहा, “ये उन सबसे ज़ रूरी चीज़ों में से एक है जो शुरुआत में समझनी चाहिए। मैं तुम्हें इसका सबसे बड़ा example बताती हूँ जो मुझे पता है।”",
      "ta": "தினமும் app-ஐ check பண்ற புது habit ஆரம்பிச்சு சில வாரங்கள் ஆச்சு, மீரா ஒரு விசித்திரமான விஷயத்தை கவனிச்சாள். News-ல “Sensex down 570 points” என்று சொல்லிச்சு — ஆனா அவள் watch பண்ணிக்கிட்டிருந்த ஒரு stock அன்றைக்கு up ஆகியிருந்துச்சு. Confuse ஆகி பாட்டிக்கு call பண்ணினாள்.\n\n“ஆஹா,” பாட்டி சொன்னார், “ஆரம்பத்திலேயே புரிஞ்சுக்கணும்னு இருக்கிற மிக முக்கியமான விஷயங்களில் இதுவும் ஒண்ணு. எனக்குத் தெரிஞ்ச மிக wild-ஆன example-ஐ சொல்றேன்.”"
    },
    "realStorySubtitle": {
      "en": "The Scam That Nearly Broke the Sensex",
      "hi": "वो Scam जिसने लगभग Sensex तोड़ दिया था",
      "ta": "Sensex-ஐ கிட்டத்தட்ட உடைச்ச Scam"
    },
    "realStoryBody": {
      "en": "“In early 1992, a stockbroker named Harshad Mehta used fraudulent means to divert huge sums of bank money into the stock market, driving prices up at an astonishing pace — the Sensex shot to levels nobody had seen before,” Paati said. “But once the scam was exposed in April 1992, the truth came out fast, and the Sensex fell sharply over the following months as the artificial buying disappeared.”\n\n“It remains one of the most dramatic chapters in Indian stock market history — and it's also the reason SEBI, which was until then a fairly toothless body, was given real legal powers shortly after to regulate the market properly. The very protection you rely on today exists partly because of that crash.”",
      "hi": "“1992 की शुरुआत में, Harshad Mehta नाम के एक stockbroker ने fraudulent तरीकों से bank के भारी पैसे को stock market में मोड़ दिया, जिससे prices हैरान करने वाली रफ़्तार से बढ़े — Sensex ऐसे levels पर पहुँच गया जो पहले किसी ने नहीं देखे थे,” पाटी ने कहा। “लेकिन April 1992 में जब scam बेनकाब हुआ, सच जल्दी बाहर आया, और अगले महीनों में Sensex तेज़ी से गिरा क्योंकि वो artificial खरीदारी गायब हो गई।” “ये भारतीय stock market के इतिहास के सबसे dramatic अध्यायों में से एक है — और यही वजह भी है कि SEBI को, जो तब तक एक काफ़ी कमज़ोर body थी, market को सही तरीके से regulate करने के लिए असली legal powers कुछ ही समय बाद दी गईं। आज जो protection आप भरोसे से लेती हो, वो आंशिक रूप से उसी crash की वजह से है।”",
      "ta": "“1992-ன் தொடக்கத்துல, Harshad Mehta என்ற ஒரு stockbroker fraudulent வழிகள் மூலமா பெரிய அளவு bank பணத்தை stock market-க்கு திருப்பி விட்டு, விலைகளை ஆச்சர்யப்படும் வேகத்தில் ஏற்றினார் — Sensex யாரும் பார்த்திராத levels-க்கு ஏறுச்சு,” என்றார் பாட்டி. “ஆனா April 1992-ல அந்த scam expose ஆனதும், உண்மை வேகமா வந்துச்சு, artificial buying மறைஞ்சதால் அடுத்த சில மாசங்களுல Sensex பெரிய அளவு கீழே விழுந்துச்சு.”\n\n“இது இந்திய stock market வரலாற்றிலேயே மிக dramatic chapters-ல ஒண்ணா இருக்கு — அதோட, அப்போவரைக்கும் கிட்டத்தட்ட toothless-ஆ இருந்த SEBI-க்கு, மார்க்கெட்-ஐ சரியா regulate பண்ண real legal powers கொடுக்கப்பட்டதுக்கும் இதுவே காரணம். இன்னிக்கு நீங்க நம்பிக்கை வச்சிருக்கிற அந்த பாதுகாப்பே, ஒரு பகுதி, அந்த crash-ல இருந்து வந்தது தான்.”"
    },
    "body": {
      "en": "What Is an Index? A stock market index tracks the combined performance of a selected basket of stocks — like a class average in a school test. One or two students can score lower while the overall average still rises, because others scored much higher.\n\nIndia's Two Headline Indices • Sensex — BSE's index of 30 large, actively traded companies, calculated since 1978–79. • Nifty 50 — NSE's index of 50 large companies spanning major sectors. Both give a quick snapshot of overall market mood, and are widely used as a benchmark to judge whether your own stock or fund is doing better or worse than “the class average.”\n\nNot Every ‘Student’ Counts Equally Most Indian indices are free-float market cap weighted — bigger companies pull the average more than smaller ones, similar to how a topper's marks can shift a class average more than one quietly average student's marks. There are also sectoral indices, like Bank Nifty or Nifty IT, for zooming into just one part of the economy.",
      "hi": "Index क्या है? एक stock market index चुने हुए stocks की एक basket के मिले-जुले performance को track करता है — एक school test में class के average की तरह। एक-दो students कम score कर सकते हैं जबकि overall average फिर भी ऊपर जाता है, क्योंकि बाकी ने बहुत ज़्यादा score किया।\n\nभारत के दो मुख्य Indices • Sensex — BSE का 30 बड़ी, actively traded कं पनियों का index, 1978–79 से calculate हो रहा है।\n\n• Nifty 50 — NSE का 50 बड़ी कं पनियों का index, जो प्रमुख sectors में फै ला है।\n\nदोनों overall market mood का एक जल्दी snapshot देते हैं, और widely एक benchmark की तरह इस्तेमाल होते हैं ये जानने के लिए कि आपका अपना stock या fund “class average” से बेहतर कर रहा है या बुरा।\n\nहर ‘Student’ बराबर count नहीं होता ज़्यादातर भारतीय indices free-float market cap weighted होते हैं — बड़ी कं पनियाँ average को छोटी कं पनियों से ज़्यादा खींचती हैं, ठीक वैसे जैसे एक topper के marks किसी चुपचाप average student के marks से class average को ज़्यादा हिला सकते हैं। कुछ sectoral indices भी हैं, जैसे Bank Nifty या Nifty IT, सिर्फ economy के एक हिस्से पर zoom करने के लिए।",
      "ta": "ஒரு Index என்றால் என்ன? ஒரு stock market index, தேர்ந்தெடுக்கப்பட்ட stocks-ன் ஒரு basket-ன் combined performance-ஐ track பண்ணும் — ஒரு school test-ல class average மாதிரி. ஒண்ணு இரண்டு students குறைவா score பண்ணினாலும் overall average இன்னும் ஏறலாம், ஏனென்னா மத்தவங்க அதிகமா score பண்ணிருப்பாங்க.\n\nஇந்தியாவின் இரண்டு Headline Indices • Sensex: BSE-ன் 30 பெரிய, actively trade ஆகும் நிறுவனங்களின் index, 1978–79 முதல் calculate பண்ணப்படுது.\n\n• Nifty 50: NSE-ன் major sectors-ஐ span பண்ற 50 பெரிய நிறுவனங்களின் index.\n\nஇரண்டும் overall market mood-ஐ ஒரு quick snapshot-ஆ தருது, மேலும் உங்க stock அல்லது fund “class average”-ஐ விட நல்லா இருக்கா மோசமா இருக்கானு judge பண்ண ஒரு benchmark-ஆ widely பயன்படுத்தப்படுது.\n\nஎல்லா ‘Student’-உம் சமமா count ஆகாது பெரும்பாலான Indian indices free-float market cap weighted — பெரிய நிறுவனங்கள் average-ஐ சின்ன நிறுவனங்களை விட அதிகமா இழுக்கும், ஒரு topper-ன் marks ஒரு class average-ஐ மாத்துறது, ஒரு average student-ன் marks-ஐ விட அதிகமா மாத்துறது மாதிரி. Bank Nifty அல்லது Nifty IT மாதிரி sectoral indices-உம் இருக்கு, economy-ன் ஒரு பகுதிக்குள் மட்டும் zoom பண்ண."
    },
    "keyTakeaway": {
      "en": "When Nifty moves 1%, it's a weighted average, not a rule that every stock moved 1%. As the 1992 story shows, index-level swings can also come from forces well beyond any single company — separating “the market” from “my specific stock” is one of the most useful shifts a new investor can make.",
      "hi": "जब Nifty 1% move करता है, ये एक weighted average है, कोई rule नहीं कि हर stock 1% move हुआ। जैसा 1992 की कहानी दिखाती है, index-level swings किसी एक कं पनी से कहीं आगे की ताकतों से भी आ सकते हैं — “market” को “मेरे specific stock” से अलग करना एक नए investor के लिए सबसे useful बदलावों में से एक है।",
      "ta": "Nifty 1% move ஆகும்போது, அது ஒரு weighted average, ஒவ்வொரு stock-உம் 1% move ஆச்சுனு ஒரு rule இல்ல. 1992 கதை காட்டுற மாதிரி, index-level swings ஒரு single நிறுவனத்தை தாண்டிய forces-ஆலும் வரலாம் — “the market”-ஐயும் “my specific stock”-ஐயும் பிரிச்சு பார்க்குறது ஒரு புதிய investor பண்ணக்கூடிய மிகப் பயனுள்ள shifts-ல ஒண்ணு."
    },
    "quote": {
      "en": "In the short run, the market is a voting machine, but in the long run, it is a weighing machine.",
      "hi": "In the short run, the market is a voting machine, but in the long run, it is a weighing machine.",
      "ta": "குறுகிய காலத்தில், market ஒரு voting machine, ஆனா நீண்ட காலத்தில், அது ஒரு weighing machine."
    },
    "quoteAuthor": "Benjamin Graham, Economist & Author, The Intelligent Investor",
    "quiz": [
      {
        "question": {
          "en": "What does a stock market index represent?",
          "hi": "एक stock market index क्या represent करता है?",
          "ta": "ஒரு stock market index எதை represent பண்ணும்?"
        },
        "options": {
          "en": [
            "The price of one single stock",
            "The combined performance of a selected basket of stocks",
            "A company's annual report",
            "A type of bank account"
          ],
          "hi": [
            "एक अके ले stock का price",
            "चुने हुए stocks की एक basket का मिला-जुला performance",
            "एक कं पनी की annual report",
            "एक तरह का bank account"
          ],
          "ta": [
            "ஒரே ஒரு stock-ன் விலை",
            "தேர்ந்தெடுக்கப்பட்ட stocks-ன் ஒரு basket-ன் combined performance",
            "ஒரு நிறுவனத்தின் annual report",
            "ஒரு வகை bank account"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Like a class average, an index bundles many stocks together into one overall reading.",
          "hi": "एक class average की तरह, एक index कई stocks को एक overall reading में bundle करता है।",
          "ta": "ஒரு class average மாதிரி, ஒரு index பல stocks-ஐ ஒரே overall reading-ஆ bundle பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What triggered one of the most dramatic Sensex crashes in Indian history in 1992?",
          "hi": "1992 में भारतीय इतिहास के सबसे dramatic Sensex crashes में से एक किसकी वजह से हुआ?",
          "ta": "1992-ல இந்திய வரலாற்றின் மிக dramatic Sensex crashes-ல ஒண்ணுக்கு trigger பண்ணது என்ன?"
        },
        "options": {
          "en": [
            "A new IPO",
            "The exposure of Harshad Mehta's stock market scam",
            "A change in SEBI's logo",
            "An increase in mango prices"
          ],
          "hi": [
            "एक नया IPO",
            "Harshad Mehta के stock market scam का बेनकाब होना",
            "SEBI के logo में बदलाव",
            "आम के दाम में बढ़ोतरी"
          ],
          "ta": [
            "ஒரு புது IPO",
            "Harshad Mehta-ன் stock market scam expose ஆனது",
            "SEBI-ன் logo-வில் ஒரு மாற்றம்",
            "மாம்பழ விலை அதிகரிப்பு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Fraudulently inflated buying pushed the Sensex up sharply, then it fell hard once the scam was exposed in April 1992.",
          "hi": "Fraudulently बढ़ाई गई खरीदारी ने Sensex को तेज़ी से ऊपर धके ला, फिर April 1992 में scam बेनकाब होने पर वो बुरी तरह गिरा।",
          "ta": "Fraudulent-ஆ inflate பண்ணப்பட்ட buying Sensex-ஐ கடுமையா ஏத்துச்சு, April 1992-ல scam expose ஆனதும் அது கடுமையா விழுந்துச்சு."
        }
      },
      {
        "question": {
          "en": "Which exchange does the Sensex belong to?",
          "hi": "Sensex किस exchange का है?",
          "ta": "Sensex எந்த exchange-க்கு சொந்தமானது?"
        },
        "options": {
          "en": [
            "NSE",
            "BSE",
            "SEBI",
            "RBI"
          ],
          "hi": [
            "NSE",
            "BSE",
            "SEBI",
            "RBI"
          ],
          "ta": [
            "NSE",
            "BSE",
            "SEBI",
            "RBI"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Sensex is the flagship index of the Bombay Stock Exchange (BSE).",
          "hi": "Sensex, Bombay Stock Exchange (BSE) का flagship index है।",
          "ta": "Sensex, Bombay Stock Exchange (BSE)-ன் flagship index."
        }
      },
      {
        "question": {
          "en": "A beginner assumes that if Nifty is up 1%, every stock in it is also up exactly 1%. Why is this wrong?",
          "hi": "एक beginner मान लेता है कि अगर Nifty 1% ऊपर है, तो उसमें हर stock भी बिल्कुल 1% ऊपर है। ये गलत क्यों है?",
          "ta": "Nifty 1% up ஆனா, அதுல இருக்கிற ஒவ்வொரு stock-உம் exactly 1% up ஆகணும்னு ஒரு beginner நினைக்கிறாங்க. இது ஏன் தப்பு?"
        },
        "options": {
          "en": [
            "It's actually correct",
            "The index is a weighted average — individual stocks can rise more, less, or even fall while the index rises overall",
            "Only Sensex works this way",
            "Index stocks always move identically"
          ],
          "hi": [
            "ये असल में सही है",
            "Index एक weighted average है — individual stocks ज़्यादा, कम, या गिर भी सकते हैं जबकि index overall ऊपर जाता है",
            "सिर्फ Sensex ऐसे काम करता है",
            "Index के stocks हमेशा एक जैसे move करते हैं"
          ],
          "ta": [
            "அது உண்மையிலேயே சரி",
            "Index ஒரு weighted average — individual stocks அதிகமா, குறைவா, அல்லது index overall rise ஆகும்போது கூட fall ஆகலாம்",
            "Sensex மட்டும் தான் இப்படி வேலை செய்யுது",
            "Index stocks எப்போதும் identical-ஆ move ஆகும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Just like a class average, bigger 'students' (companies) can pull the number up even while one stock falls.",
          "hi": "बिल्कुल class average की तरह, बड़े ‘students’ (companies) number को ऊपर खींच सकते हैं जबकि एक stock गिर भी जाए।",
          "ta": "Class average மாதிரியே, பெரிய ‘students’ (நிறுவனங்கள்) ஒரு stock விழுந்தாலும் கூட number-ஐ மேலே இழுக்கலாம்."
        }
      },
      {
        "question": {
          "en": "What long-term regulatory change came out of the 1992 scam, according to the story?",
          "hi": "कहानी के अनुसार, 1992 के scam से कौन सा long-term regulatory बदलाव आया?",
          "ta": "கதையின்படி, 1992 scam-ல இருந்து வந்த long-term regulatory change என்ன?"
        },
        "options": {
          "en": [
            "Stock trading was banned for a year",
            "SEBI was given real legal powers to regulate the market",
            "The Sensex was renamed",
            "Physical share certificates were reintroduced"
          ],
          "hi": [
            "Stock trading एक साल के लिए बैन हो गया",
            "SEBI को market को regulate करने की असली legal powers दी गईं",
            "Sensex का नाम बदल दिया गया",
            "Physical share certificates फिर से लाए गए"
          ],
          "ta": [
            "Stock trading ஒரு வருடத்திற்கு ban ஆனது",
            "Market-ஐ regulate பண்ண SEBI-க்கு real legal powers கொடுக்கப்பட்டது",
            "Sensex பெயர் மாற்றப்பட்டது",
            "Physical share certificates திரும்ப introduce ஆனது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The scandal exposed serious regulatory gaps, leading to SEBI being strengthened into the empowered regulator it is today.",
          "hi": "इस scandal ने गंभीर regulatory कमियाँ उजागर कीं, जिससे SEBI को आज जैसा empowered regulator बनाया गया।",
          "ta": "அந்த scandal serious regulatory gaps-ஐ expose பண்ணுச்சு, அதனால SEBI இன்று இருக்கிற empowered regulator-ஆ strengthen ஆனது."
        }
      }
    ]
  },
  {
    "id": 6,
    "tier": "Beginner",
    "title": {
      "en": "Market, Limit & Stop-Loss Orders",
      "hi": "Market, Limit & Stop-Loss Orders",
      "ta": "Market, Limit & Stop-Loss Orders"
    },
    "opener": {
      "en": "Meera opened the app to buy her very first share for real — a small IT company Paati approved of. A screen popped up asking her to choose an order type: Market, Limit, or Stop-Loss. She stared at it for a full minute before calling Paati.\n\n“Paati, I just want to buy the share. Why is it asking me all this?”\n\n“Because ‘buy the share’ isn’t one instruction, kanna, it’s three different ones,” Paati laughed. “And getting this wrong has actually crashed the market before — let me tell you about it.”",
      "hi": "मीरा ने app खोला अपना पहला share असल में खरीदने के लिए — एक छोटी IT कं पनी जिसे पाटी ने approve किया था। एक screen popup हुई जो उससे order type चुनने को कह रही थी: Market, Limit, या Stop-Loss। वो एक पूरे मिनट तक उसे देखती रही, फिर पाटी को फोन किया।\n\n“पाटी, मुझे बस share खरीदना है। ये मुझसे इतना सब क्यों पूछ रहा है?”\n\n“क्योंकि ‘share खरीदना’ एक instruction नहीं है, कन्ना, ये तीन अलग-अलग instructions हैं,” पाटी हँसीं। “और इसे गलत करने से पहले असल में market crash हो चुका है — मैं तुम्हें उसके बारे में बताती हूँ।”",
      "ta": "மீரா தன் முதல் share-ஐ real-ஆ வாங்க app-ஐ open பண்ணினாள் — பாட்டி approve பண்ண ஒரு சின்ன IT நிறுவனம். Order type தேர்ந்தெடுக்க ஒரு screen வந்துச்சு: Market, Limit, அல்லது Stop-Loss. முழு ஒரு நிமிடம் அதை பார்த்துக்கிட்டு பாட்டிக்கு call பண்ணினாள்.\n\n“பாட்டி, நான் வெறுமனே share-ஐ வாங்கணும். ஏன் இது என்னை இதையெல்லாம் கேக்குது?”\n\n“ஏனென்னா ‘share வாங்கு’ என்பது ஒரு instruction இல்ல கண்ணா, அது மூணு வேற வேற instructions,” பாட்டி சிரிச்சார். “இதை தப்பா பண்ணது ஒரு தடவை market-ஐயே crash பண்ணிருச்சு — அதைப் பத்தி சொல்றேன்.”"
    },
    "realStorySubtitle": {
      "en": "The Day One Typo Nearly Crashed the Nifty",
      "hi": "वो दिन जब एक typo ने लगभग Nifty crash कर दिया था",
      "ta": "ஒரே ஒரு Typo Nifty-யை கிட்டத்தட்ட Crash பண்ணின நாள்"
    },
    "realStoryBody": {
      "en": "In October 2012, a dealer at a brokerage firm meant to sell a small basket of stocks but instead placed one giant, mistaken order across dozens of large-cap stocks at once — a classic “fat-finger” error. Within seconds, the Nifty crashed nearly 900 points, a move so sudden and violent that the exchange had to freeze trading and cancel the erroneous trades to restore order.\n\nThe incident pushed exchanges to tighten their circuit-breaker and order-checking systems significantly. But it also taught retail investors a quieter lesson: in a market that can move that fast, simply clicking “buy” without understanding what kind of order you’re placing is its own kind of risk.",
      "hi": "October 2012 में, एक brokerage firm के एक dealer को stocks की एक छोटी basket बेचनी थी लेकिन उसने गलती से दर्जनों large-cap stocks में एक साथ एक बहुत बड़ा, गलत order डाल दिया — एक classic “fat-finger” error। कुछ ही seconds में, Nifty लगभग 900 points crash हो गया, इतना अचानक और तेज़ move कि exchange को trading freeze करके गलत trades cancel करने पड़े ताकि order बहाल हो सके।\n\nइस घटना ने exchanges को अपने circuit-breaker और order-checking systems काफ़ी सख़्त करने पर मजबूर किया। लेकिन इसने retail investors को एक शांत सीख भी दी: एक ऐसे market में जो इतनी तेज़ी से move कर सकता है, बिना ये समझे कि आप किस तरह का order लगा रहे हैं, बस “buy” click कर देना खुद एक तरह का risk है।",
      "ta": "October 2012-ல, ஒரு brokerage firm-ல dealer ஒருவர் ஒரு சின்ன stocks basket-ஐ விக்கணும்னு நினைச்சார், ஆனா தப்பா ஒரே நேரத்தில் பல large-cap stocks-க்கு ஒரு பெரிய, தவறான order போட்டுட்டார் — ஒரு classic “fat-finger” error. சில நொடிகளுக்குள், Nifty கிட்டத்தட்ட 900 points crash ஆயிடுச்சு, அது அவ்வளவு திடீர்-ஆவும் கடுமையாவும் இருந்துச்சு, order-ஐ சரி பண்ண exchange trading-ஐ freeze பண்ணி தவறான trades-ஐ cancel பண்ணணும்.\n\nஇந்த சம்பவம், exchanges-ஐ தங்களோட circuit-breaker மற்றும் order-checking systems-ஐ கடுமையா tighten பண்ண push பண்ணுச்சு. ஆனா அது retail investors-க்கு ஒரு அமைதியான பாடமும் கத்துகொடுத்துச்சு: இவ்வளவு வேகமா move ஆகக்கூடிய ஒரு market-ல, என்ன வகையான order போடுறோம்னு புரிஞ்சுக்காம வெறுமனே “buy” click பண்றது, அதுவே ஒரு வகை risk."
    },
    "body": {
      "en": "Market Order — Speed Over Price A Market Order buys or sells immediately at whatever price is currently available. You get speed and certainty of execution, but not certainty of price — in a fast-moving stock, the price you actually pay can differ slightly from the price you saw a second earlier.\n\nLimit Order — Price Over Speed A Limit Order lets you name your price. “Buy this share, but only at ₹450 or lower.” The order simply won’t execute at a worse price — but if the stock never reaches your price, it may never execute at all.\n\nStop-Loss Order — Your Safety Net A Stop-Loss (SL) Order is an instruction that activates only if the price moves against you, automatically selling to cap your loss. If you buy at ₹450 and set a stop-loss at ₹420, the app sells automatically if the price falls to ₹420 — even if you’re not watching the screen at that moment.",
      "hi": "Market Order — Price से पहले Speed एक Market Order जो भी price अभी available है, उस पर तुरंत खरीदता या बेचता है। आपको speed और execution की certainty मिलती है, लेकिन price की certainty नहीं — किसी तेज़ी से move करते stock में, जो price आप असल में देते हैं वो उस price से थोड़ा अलग हो सकता है जो आपने एक second पहले देखा था।\n\nLimit Order — Speed से पहले Price एक Limit Order आपको अपना price नाम करने देता है। “ये share खरीदो, लेकिन सिर्फ ₹450 या उससे कम पर।” Order बस इससे बुरे price पर execute नहीं होगा — लेकिन अगर stock कभी आपके price तक नहीं पहुँचता, तो वो शायद कभी execute ही न हो।\n\nStop-Loss Order — आपका Safety Net एक Stop-Loss (SL) Order एक ऐसा instruction है जो सिर्फ तभी activate होता है जब price आपके खिलाफ़ move करे, आपके loss को cap करने के लिए automatically बेच देता है। अगर आप ₹450 पर खरीदते हैं और ₹420 पर stop-loss लगाते हैं, तो अगर price ₹420 तक गिरता है तो app automatically बेच देता है — चाहे उस वक़्त आप screen देख भी न रहे हों।",
      "ta": "Market Order — விலையை விட Speed ஒரு Market Order, இப்போ available இருக்கிற எந்த விலைக்கும் உடனே வாங்கும் அல்லது விக்கும். உங்களுக்கு speed-உம் execution உறுதியும் கிடைக்கும், ஆனா விலை உறுதி கிடையாது — வேகமா move ஆகும் stock-ல, நீங்க actual-ஆ கொடுக்கிற விலை, ஒரு நொடி முன் பார்த்த விலையிலிருந்து கொஞ்சம் மாறலாம்.\n\nLimit Order — Speed-ஐ விட விலை ஒரு Limit Order உங்க விலையை நீங்களே name பண்ண அனுமதிக்கும். “இந்த share-ஐ வாங்கு, ஆனா ₹450 அல்லது அதுக்கு கீழே தான்.” Order மோசமான விலைக்கு execute ஆகவே ஆகாது — ஆனா stock உங்க விலையை ஒருபோதும் அடையலைனா, அது ஒருபோதும் execute ஆகாமலும் போகலாம்.\n\nStop-Loss Order — உங்க Safety Net ஒரு Stop-Loss (SL) Order, விலை உங்களுக்கு எதிரா move ஆனால் மட்டும் activate ஆகுற ஒரு instruction, தானாகவே விற்று உங்க loss-ஐ limit பண்ணும். நீங்க ₹450-க்கு வாங்கி ₹420-க்கு stop-loss set பண்ணினா, விலை ₹420-க்கு விழுந்தா app தானாக விற்றுடும் — அந்த நேரத்துல நீங்க screen-ஐ பாக்கலைனா கூட."
    },
    "keyTakeaway": {
      "en": "Market orders prioritise speed, limit orders prioritise price, and stop-loss orders protect you when you’re not looking. The 2012 flash crash is a reminder that in real markets, prices can move faster than you can react — which is exactly why these order types exist.",
      "hi": "Market orders speed को priority देते हैं, limit orders price को, और stop-loss orders आपकी रक्षा करते हैं जब आप देख नहीं रहे होते। 2012 का flash crash याद दिलाता है कि असली markets में, prices आपके react करने से भी तेज़ move कर सकते हैं — यही वजह है कि ये order types मौजूद हैं।",
      "ta": "Market orders speed-க்கு முன்னுரிமை தரும், limit orders விலைக்கு முன்னுரிமை தரும், stop-loss orders நீங்க பார்க்காதப்போ உங்களை protect பண்ணும். 2012 flash crash, real markets-ல விலைகள் நீங்க react பண்றதை விட வேகமா move ஆகலாம்னு ஒரு reminder — இந்த order types இருக்குறதுக்கே இது தான் காரணம்."
    },
    "quiz": [
      {
        "question": {
          "en": "Which order type guarantees execution but not the exact price?",
          "hi": "कौन सा order type execution की guarantee देता है लेकिन exact price की नहीं?",
          "ta": "எந்த order type execution-ஐ guarantee பண்ணும் ஆனா exact விலையை இல்ல?"
        },
        "options": {
          "en": [
            "Limit Order",
            "Market Order",
            "Stop-Loss Order",
            "IPO Order"
          ],
          "hi": [
            "Limit Order",
            "Market Order",
            "Stop-Loss Order",
            "IPO Order"
          ],
          "ta": [
            "Limit Order",
            "Market Order",
            "Stop-Loss Order",
            "IPO Order"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A market order executes immediately at the best available price, which can shift slightly in a fast-moving stock.",
          "hi": "एक market order तुरंत best available price पर execute होता है, जो किसी तेज़ी से move करते stock में थोड़ा shift हो सकता है।",
          "ta": "ஒரு market order உடனே best available price-க்கு execute ஆகும், வேகமா move ஆகும் ஒரு stock-ல அது கொஞ்சம் shift ஆகலாம். ₹"
        }
      },
      {
        "question": {
          "en": "You place a Limit Order to buy at ₹450 or lower. The stock is currently at ₹460 and never falls to ₹450 that day. What happens?",
          "hi": "आप ₹450 या उससे कम पर खरीदने के लिए एक Limit Order लगाते हैं। Stock अभी ₹460 पर है और उस दिन कभी ₹450 तक नहीं गिरता। क्या होता है?",
          "ta": "நீங்க 450 அல்லது அதுக்கு கீழே வாங்க ஒரு Limit Order போடுறீங்க. Stock இப்போ 460-                  ₹ ₹ ல இருக்கு, அன்றைக்கு 450-க்கு விழவே இல்ல. என்ன நடக்கும்?"
        },
        "options": {
          "en": [
            "It buys automatically at ₹460",
            "The order simply does not execute",
            "It buys at a random price",
            "The exchange forces a purchase"
          ],
          "hi": [
            "वो automatically ₹460 पर खरीद लेता है",
            "Order बस execute नहीं होता",
            "वो किसी random price पर खरीद लेता है",
            "Exchange खरीदारी force करता है"
          ],
          "ta": [
            "அது தானா ₹460-க்கு வாங்கிடும்",
            "Order வெறுமனே execute ஆகாது",
            "அது ஒரு random விலைக்கு வாங்கிடும்",
            "Exchange ஒரு purchase-ஐ force பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A limit order only executes at your specified price or better — if the market never reaches it, the order stays pending or expires.",
          "hi": "एक limit order सिर्फ आपके तय price या उससे बेहतर पर execute होता है — अगर market कभी वहाँ नहीं पहुँचता, तो order pending रहता है या expire हो जाता है।",
          "ta": "ஒரு limit order உங்க specified விலைக்கோ அதுக்கு மேலோ தான் execute ஆகும் — market அதை அடையலைனா, order pending-ஆ இருக்கும் அல்லது expire ஆகும்."
        }
      },
      {
        "question": {
          "en": "What is the main purpose of a Stop-Loss order?",
          "hi": "एक Stop-Loss order का मुख्य मकसद क्या है?",
          "ta": "Stop-Loss order-ன் main purpose என்ன?"
        },
        "options": {
          "en": [
            "To guarantee a profit",
            "To automatically limit your loss if the price moves against you",
            "To buy shares faster than a market order",
            "To avoid paying brokerage"
          ],
          "hi": [
            "एक profit guarantee करना",
            "अगर price आपके खिलाफ़ move करे तो automatically आपका loss limit करना",
            "Market order से तेज़ shares खरीदना",
            "Brokerage देने से बचना"
          ],
          "ta": [
            "ஒரு profit-ஐ guarantee பண்ண",
            "விலை உங்களுக்கு எதிரா move ஆனா உங்க loss-ஐ தானாக limit பண்ண",
            "Market order-ஐ விட வேகமா shares வாங்க",
            "Brokerage கொடுக்க வேண்டாம்னு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "It triggers an automatic sell once a price falls to a level you've pre-set, protecting you even when you're not watching.",
          "hi": "जब price आपके पहले से set किए level तक गिरता है तो ये automatic sell trigger करता है, चाहे आप देख न रहे हों तब भी आपकी रक्षा करता है।",
          "ta": "நீங்க pre-set பண்ணின ஒரு level-க்கு விலை விழுந்தால் ஒரு automatic sell trigger ஆகும், நீங்க பார்க்காதப்போ கூட உங்களை protect பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What caused the October 2012 Nifty flash crash described in the story?",
          "hi": "कहानी में बताए गए October 2012 के Nifty flash crash की वजह क्या थी?",
          "ta": "கதையில் சொன்ன October 2012 Nifty flash crash-க்கு காரணம் என்ன?"
        },
        "options": {
          "en": [
            "A SEBI policy change",
            "A dealer's mistaken ('fat-finger') order placed across many large-cap stocks",
            "A company going bankrupt",
            "A national holiday"
          ],
          "hi": [
            "एक SEBI policy बदलाव",
            "एक dealer का गलत ('fat-finger') order जो कई large-cap stocks में लगाया गया",
            "एक कं पनी का bankrupt होना",
            "एक national holiday"
          ],
          "ta": [
            "ஒரு SEBI policy change",
            "பல large-cap stocks-க்கு போடப்பட்ட ஒரு dealer-ன் தவறான ('fat-finger') order",
            "ஒரு நிறுவனம் bankrupt ஆனது",
            "ஒரு national holiday"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A single erroneous large order across dozens of stocks caused a sudden, sharp crash before exchanges froze and cancelled the trades.",
          "hi": "दर्जनों stocks में एक अके ले गलत बड़े order ने अचानक, तेज़ crash किया, इससे पहले कि exchanges trades freeze और cancel करें।",
          "ta": "பல stocks-க்கு ஒரே ஒரு தவறான பெரிய order, exchanges freeze பண்ணி trades cancel பண்ணும் முன், ஒரு திடீர், கடுமையான crash-ஐ ஏற்படுத்துச்சு."
        }
      },
      {
        "question": {
          "en": "Which order type would suit someone who cares more about getting a specific price than about how fast the trade happens?",
          "hi": "कौन सा order type उस व्यक्ति के लिए सही होगा जिसे trade कितनी जल्दी होता है उससे ज़्यादा एक specific price मिलने की परवाह है?",
          "ta": "Trade எவ்வளவு வேகமா நடக்குதுனு விட, ஒரு specific விலை கிடைக்குறதை பத்தி அதிகம் கவலைப்படுறவருக்கு எந்த order type பொருத்தமா இருக்கும்?"
        },
        "options": {
          "en": [
            "Market Order",
            "Limit Order",
            "Stop-Loss Order only",
            "None of these"
          ],
          "hi": [
            "Market Order",
            "Limit Order",
            "सिर्फ Stop-Loss Order",
            "इनमें से कोई नहीं"
          ],
          "ta": [
            "Market Order",
            "Limit Order",
            "Stop-Loss Order மட்டும்",
            "இதில் எதுவுமில்லை"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A limit order lets you name your exact acceptable price, trading off speed for price control. 7. What Really Moves Stock Prices",
          "hi": "एक limit order आपको अपना exact acceptable price नाम करने देता है, speed की जगह price पर control चुनते हुए।",
          "ta": "ஒரு limit order உங்க exact acceptable price-ஐ நீங்களே name பண்ண அனுமதிக்கும், price control-க்காக speed-ஐ trade off பண்ணும்."
        }
      }
    ]
  },
  {
    "id": 7,
    "tier": "Beginner",
    "title": {
      "en": "What Really Moves Stock Prices",
      "hi": "Stock Prices को असल में क्या हिलाता है",
      "ta": "பங்கு விலைகளை உண்மையில் என்ன Move பண்ணுது"
    },
    "opener": {
      "en": "“Remember what I told you about mango prices in summer?” Paati asked one evening, watching Meera stare worriedly at a sea of red numbers on her screen. “That was the simple version. Sit down — today I’ll give you the real one.”\n\n“Every single day, lakhs of buyers and sellers are reacting to different pieces of information at the same time. No headline ever tells the whole story — but a few forces matter more than the rest.”",
      "hi": "“याद है मैंने तुम्हें गर्मी में आम के दाम के बारे में क्या बताया था?” पाटी ने एक शाम पूछा, मीरा को उसकी screen पर लाल numbers के समंदर को worried होकर देखते हुए। “वो simple version था। बैठो — आज मैं तुम्हें असली वाला बताती हूँ।”\n\n“हर एक दिन, लाखों buyers और sellers एक ही समय में अलग-अलग जानकारी पर react कर रहे होते हैं। कोई headline कभी पूरी कहानी नहीं बताती — लेकिन कुछ forces बाकियों से ज़्यादा मायने रखती हैं।”",
      "ta": "“கோடைகால மாம்பழ விலையைப் பத்தி நான் சொன்னது நினைவிருக்கா?” ஒரு மாலை பாட்டி கேட்டார், மீரா தன் screen-ல சிவப்பு எண்கள் கடலைப் பார்த்து கவலையா இருந்ததைப் பார்த்து. “அது simple version. உட்காரு — இன்னிக்கு நான் உனக்கு real version-ஐ தர்றேன்.”\n\n“ஒவ்வொரு நாளும், லட்சக்கணக்கான வாங்குபவர்களும் விற்பவர்களும் ஒரே நேரத்தில் வெவ்வேறு தகவல்களுக்கு react பண்றாங்க. ஒரு headline-உம் முழு கதையையும் சொல்லாது — ஆனா சில forces மத்தவற்றை விட அதிகமா matter பண்ணும்.”"
    },
    "realStorySubtitle": {
      "en": "Twenty-Three Trading Days in March 2020",
      "hi": "March 2020 के तेईस Trading Days",
      "ta": "March 2020-ன் இருபத்தி மூன்று Trading Days"
    },
    "realStoryBody": {
      "en": "When COVID-19 lockdowns began in March 2020, the Sensex fell from around 42,000 to under 26,000 in about a month — one of the fastest crashes in its history — as fear about a global economic shutdown spread faster than the virus itself.\n\nBut by late 2020, with interest rates cut sharply and huge amounts of money flowing into markets worldwide looking for returns, the same Sensex had not just recovered but gone on to hit fresh record highs — while many businesses were still struggling in the real economy. The lesson many investors took from it: stock prices often react to expectations of the future, not just the pain of the present.",
      "hi": "जब March 2020 में COVID-19 lockdowns शुरू हुए, Sensex लगभग 42,000 से गिरकर एक महीने में 26,000 से नीचे आ गया — इसके इतिहास के सबसे तेज़ crashes में से एक — क्योंकि एक global economic shutdown का डर खुद वायरस से भी तेज़ फै ला।\n\nलेकिन 2020 के आखिर तक, interest rates तेज़ी से घटने और दुनिया भर के markets में returns ढूँढते हुए भारी पैसा आने के साथ, वही Sensex न सिर्फ recover हो चुका था बल्कि fresh record highs भी बना चुका था — जबकि असली economy में कई businesses अब भी struggle कर रहे थे। कई investors ने इससे जो सीखा: stock prices अक्सर future की उम्मीदों पर react करते हैं, सिर्फ वर्तमान के दर्द पर नहीं।",
      "ta": "March 2020-ல COVID-19 lockdowns ஆரம்பிச்சப்போ, Sensex கிட்டத்தட்ட ஒரு மாசத்துக்குள் 42,000-ல இருந்து 26,000-க்கும் கீழே விழுந்துச்சு — அதன் வரலாற்றிலேயே மிக வேகமான crashes-ல ஒண்ணு — global economic shutdown பற்றின பயம், virus-ஐ விட வேகமா பரவினதால.\n\nஆனா 2020 இறுதியில, interest rates கடுமையா குறைக்கப்பட்டு, huge அளவு பணம் globally returns தேடி market-க்குள் வந்ததால், அதே Sensex வெறுமனே recover மட்டும் ஆகாம, fresh record highs- க்கு போச்சு — பல businesses அப்பவும் real economy-ல struggle பண்ணிக்கிட்டிருந்தாலும் கூட. இதிலிருந்து பல investors எடுத்துக்கிட்ட பாடம்: பங்கு விலைகள் பெரும்பாலும் எதிர்காலத்தை பத்தின expectations-க்கு react பண்ணும், present-ன் pain-க்கு மட்டும் இல்ல."
    },
    "body": {
      "en": "Company-Specific Factors • Quarterly results: Profit, revenue, and growth numbers released every three months, compared against what analysts expected. • Management decisions: A new product launch, a big order win, or a leadership scandal. • Debt and cash flow: Whether the company can comfortably fund its own growth.\n\nEconomy-Wide Factors • Interest rates (RBI policy): Lower rates generally make stocks more attractive versus fixed deposits and bonds. • Inflation: Rising prices can squeeze company profit margins and consumer spending. • Global cues: Crude oil prices, the US Federal Reserve's decisions, and global markets often move Indian markets before the local session even opens.\n\nMoney Flows and Mood Large institutional players — FIIs (Foreign Institutional Investors) and DIIs (Domestic Institutional Investors, like mutual funds and insurers) — move enormous sums in and out of the market, and their buying or selling can shift prices well beyond what any single company's news would justify. Layered on top of all of it is simple collective mood: fear and greed, which is why the same piece of news can be shrugged off on a confident day and cause a sharp fall on a nervous one.",
      "hi": "Company-Specific Factors • Quarterly results: हर तीन महीने में जारी होने वाले profit, revenue, और growth के numbers, analysts की उम्मीदों से compare किए जाते हैं।\n\n• Management decisions: एक नया product launch, एक बड़ा order जीतना, या एक leadership scandal।\n\n• Debt और cash flow: क्या कं पनी आराम से अपनी growth खुद fund कर सकती है।\n\nEconomy-Wide Factors • Interest rates (RBI policy): कम rates आमतौर पर stocks को fixed deposits और bonds के मुकाबले ज़्यादा attractive बनाते हैं।\n\n• Inflation: बढ़ ती prices कं पनी के profit margins और consumer spending को दबा सकती हैं। • Global cues: Crude oil prices, US Federal Reserve के decisions, और global markets अक्सर local session खुलने से पहले ही भारतीय markets को हिला देते हैं।\n\nपैसे का Flow और Mood बड़े institutional players — FIIs (Foreign Institutional Investors) और DIIs (Domestic Institutional Investors, जैसे mutual funds और insurers) — market में भारी रकम अंदर-बाहर move करते हैं, और उनकी खरीदारी या बिकवाली prices को उससे कहीं ज़्यादा हिला सकती है जितना किसी एक कं पनी की news justify करेगी। इन सबके ऊपर बस collective mood है: डर और लालच, यही वजह है कि एक ही news एक confident दिन पर नज़ रअंदाज़ हो सकती है और एक nervous दिन पर तेज़ गिरावट ला सकती है।",
      "ta": "நிறுவனத்திற்கே உரிய Factors • Quarterly results: Profit, revenue, growth எண்கள் ஒவ்வொரு மூணு மாசத்துக்கும் release ஆகும், analysts எதிர்பார்த்ததோட compare பண்ணப்படும்.\n\n• Management decisions: புது product launch, ஒரு பெரிய order win, அல்லது ஒரு leadership scandal.\n\n• Debt மற்றும் cash flow: நிறுவனம் தன் growth-ஐ comfortable-ஆ fund பண்ண முடியுமா.\n\nEconomy முழுவதற்குமான Factors • Interest rates (RBI policy): குறைந்த rates பொதுவா fixed deposits-ஐயும் bonds-ஐயும் விட stocks-ஐ அதிக attractive-ஆ ஆக்கும்.\n\n• Inflation: ஏறுற விலைகள் நிறுவன profit margins-ஐயும் consumer spending-ஐயும் squeeze பண்ணலாம்.\n\n• Global cues: Crude oil விலைகள், US Federal Reserve-ன் decisions, global markets பெரும்பாலும் local session open ஆவதற்கு முன்பே Indian markets-ஐ move பண்ணும்.\n\nபண ஓட்டமும் Mood-உம் பெரிய institutional players — FIIs (Foreign Institutional Investors) மற்றும் DIIs (Domestic Institutional Investors, mutual funds, insurers போல) — huge அளவு பணத்தை market-க்குள்ளும் வெளியேயும் move பண்றாங்க, அவங்களோட buying அல்லது selling, ஒரு single நிறுவனத்தின் news justify பண்றதை தாண்டி விலைகளை shift பண்ணலாம். இதுக்கு மேல, simple collective mood: பயமும்\n\nபேராசையும் — அதனால தான் அதே news, நம்பிக்கையான நாளில் shrug off ஆயிரும், nervous நாளில் கடுமையான fall-ஐ ஏற்படுத்தும்."
    },
    "keyTakeaway": {
      "en": "No single factor ever fully explains a price move — it's usually company news, the economy,",
      "hi": "कोई एक factor कभी price move को पूरी तरह explain नहीं करता — आमतौर पर ये company news, economy, global cues, और investor mood का एक साथ overlap होता है। 2020 का crash-and-recovery दिखाता है क्यों: दुनिया रातोंरात safe नहीं हुई थी, लेकिन future के बारे में उम्मीदें तेज़ी से बदलीं, और prices उनके साथ move हुए।",
      "ta": "ஒரே ஒரு factor ஒருபோதும் ஒரு price move-ஐ முழுசா விளக்காது — பெரும்பாலும் company news, economy, global cues, investor mood எல்லாம் ஒரே நேரத்தில் overlap ஆகும். 2020 crash-and-recovery இதை ஏன் காட்டுது: world ஒரே இரவில் safe ஆகலை, ஆனா எதிர்காலத்தை பத்தின expectations வேகமா மாறுச்சு, விலைகளும் அதோட move ஆனது."
    },
    "quiz": [
      {
        "question": {
          "en": "According to the lesson, why did markets recover strongly in late 2020 even while many businesses were still struggling?",
          "hi": "Lesson के अनुसार, 2020 के आखिर में markets इतनी strongly recover क्यों हुए जबकि कई businesses अब भी struggle कर रहे थे?",
          "ta": "Lesson-ன் படி, பல businesses அப்பவும் struggle பண்ணிக்கிட்டிருந்தாலும், 2020 இறுதியில் markets ஏன் கடுமையா recover ஆனது?"
        },
        "options": {
          "en": [
            "The pandemic had fully ended",
            "Lower interest rates and heavy money flows shifted expectations about the future",
            "All companies reported record profits",
            "The government banned selling"
          ],
          "hi": [
            "Pandemic पूरी तरह खत्म हो चुकी थी",
            "कम interest rates और भारी money flows ने future की उम्मीदें बदल दीं",
            "सभी कं पनियों ने record profits report किए",
            "Government ने selling बैन कर दी"
          ],
          "ta": [
            "Pandemic முழுசா முடிஞ்சுடுச்சு",
            "குறைந்த interest rates-உம் அதிக பண ஓட்டமும் எதிர்காலம் பற்றின expectations-ஐ மாத்துச்சு",
            "எல்லா நிறுவனங்களும் record profits report பண்ணுச்சு",
            "Government selling-ஐ ban பண்ணுச்சு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Markets often price in expectations, not just present-day pain — cheap money and future optimism drove the rebound.",
          "hi": "Markets अक्सर उम्मीदों को price करते हैं, सिर्फ आज के दर्द को नहीं — सस्ता पैसा और future की optimism ने rebound को चलाया।",
          "ta": "Markets பெரும்பாலும் expectations-ஐ price பண்ணும், present-day pain-ஐ மட்டும் இல்ல — சாதாரண பணமும் future optimism-உம் rebound-ஐ drive பண்ணுச்சு."
        }
      },
      {
        "question": {
          "en": "What does FII stand for?",
          "hi": "FII का मतलब क्या है?",
          "ta": "FII என்றால் என்ன?"
        },
        "options": {
          "en": [
            "Federal Investment Institute",
            "Foreign Institutional Investor",
            "Fixed Income Instrument",
            "Financial Index Insurance"
          ],
          "hi": [
            "Federal Investment Institute",
            "Foreign Institutional Investor",
            "Fixed Income Instrument",
            "Financial Index Insurance"
          ],
          "ta": [
            "Federal Investment Institute",
            "Foreign Institutional Investor",
            "Fixed Income Instrument",
            "Financial Index Insurance"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "FIIs are large foreign entities whose buying and selling can move Indian markets significantly.",
          "hi": "FIIs बड़े foreign entities हैं जिनकी खरीदारी और बिकवाली भारतीय markets को काफ़ी हिला सकती है।",
          "ta": "FIIs பெரிய foreign entities, அவங்களோட buying, selling Indian markets-ஐ significant-ஆ move பண்ணலாம்."
        }
      },
      {
        "question": {
          "en": "Which of these is a company-specific factor (rather than an economy-wide one)?",
          "hi": "इनमें से कौन सा एक company-specific factor है (economy-wide की बजाय)?",
          "ta": "இவற்றில் எது ஒரு company-specific factor (economy-wide அல்ல)?"
        },
        "options": {
          "en": [
            "RBI interest rate policy",
            "Global crude oil prices",
            "A company's quarterly results",
            "US Federal Reserve decisions"
          ],
          "hi": [
            "RBI interest rate policy",
            "Global crude oil prices",
            "एक कं पनी के quarterly results",
            "US Federal Reserve के decisions"
          ],
          "ta": [
            "RBI interest rate policy",
            "Global crude oil விலைகள்",
            "ஒரு நிறுவனத்தின் quarterly results",
            "US Federal Reserve decisions"
          ]
        },
        "correctIndex": 2,
        "explanation": {
          "en": "Quarterly results are specific to one company's own performance, unlike broader economic or global factors.",
          "hi": "Quarterly results एक कं पनी के अपने performance से जुड़े होते हैं, बड़े economic या global factors के उलट।",
          "ta": "Quarterly results ஒரு நிறுவனத்தின் சொந்த performance-க்கு specific, broader economic அல்லது global factors-ஐ விட."
        }
      },
      {
        "question": {
          "en": "Why can the same news headline sometimes barely move the market, and other times cause a sharp fall?",
          "hi": "एक ही news headline कभी-कभी market को मुश्किल से हिलाती क्यों है, और कभी तेज़ गिरावट ला देती है?",
          "ta": "அதே news headline சில நேரம் market-ஐ கிட்டத்தட்ட move பண்ணாது, மற்ற நேரங்களில் கடுமையான fall-ஐ ஏற்படுத்துது ஏன்?"
        },
        "options": {
          "en": [
            "News never actually affects prices",
            "Overall investor mood (fear or greed) changes how the same information is received",
            "The stock exchange changes the news",
            "It's completely random with no explanation"
          ],
          "hi": [
            "News कभी असल में prices को प्रभावित नहीं करती",
            "Overall investor mood (डर या लालच) बदल देता है कि वही जानकारी कै से ली जाती है",
            "Stock exchange news बदल देता है",
            "ये पूरी तरह random है, कोई explanation नहीं"
          ],
          "ta": [
            "News ஒருபோதும் விலைகளை affect பண்ணாது",
            "Overall investor mood (பயம் அல்லது greed) அதே information எப்படி எடுத்துக்கொள்ளப்படுதுனு மாத்தும்",
            "Stock exchange news-ஐ மாத்திடும்",
            "இது completely random, explanation இல்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Collective sentiment acts as a lens — the same fact can be shrugged off or cause panic depending on the prevailing mood.",
          "hi": "Collective sentiment एक lens की तरह काम करता है — वही fact मौजूदा mood के हिसाब से नज़ रअंदाज़ हो सकती है या panic ला सकती है।",
          "ta": "Collective sentiment ஒரு lens மாதிரி இயங்கும் — prevailing mood-ஐ பொறுத்து அதே fact shrug off ஆகலாம் அல்லது panic-ஐ ஏற்படுத்தலாம்."
        }
      },
      {
        "question": {
          "en": "What best describes DIIs?",
          "hi": "DIIs को सबसे अच्छे से क्या describe करता है?",
          "ta": "DIIs-ஐ சிறப்பா describe பண்றது எது?"
        },
        "options": {
          "en": [
            "Foreign governments",
            "Domestic Institutional Investors like mutual funds and insurers",
            "Small individual retail traders",
            "Stock exchanges themselves"
          ],
          "hi": [
            "Foreign governments",
            "Domestic Institutional Investors जैसे mutual funds और insurers",
            "छोटे individual retail traders",
            "Stock exchanges खुद"
          ],
          "ta": [
            "Foreign governments",
            "Mutual funds, insurers போன்ற Domestic Institutional Investors",
            "சின்ன individual retail traders",
            "Stock exchanges தாங்களே"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "DIIs are large India-based institutions whose fund flows are watched closely alongside FII activity. 8. Large, Mid & Small Cap Explained",
          "hi": "DIIs बड़े India-based institutions हैं जिनके fund flows को FII activity के साथ closely track किया जाता है।",
          "ta": "DIIs பெரிய India-based institutions, அவங்களோட fund flows FII activity-உடன் closely watch பண்ணப்படும்."
        }
      }
    ]
  },
  {
    "id": 8,
    "tier": "Beginner",
    "title": {
      "en": "Large, Mid & Small Cap Explained",
      "hi": "Large, Mid & Small Cap समझाया गया",
      "ta": "Large, Mid & Small Cap விளக்கம்"
    },
    "opener": {
      "en": "Scrolling through the app, Meera noticed little tags next to company names: “Large Cap,” “Mid Cap,” “Small Cap.” Two companies she was comparing had similar share prices — around ₹250 each — yet one was labelled large-cap and the other small-cap.\n\n“Price alone tells you almost nothing about the size of a company,” Paati explained. “What matters is how many shares exist and what the whole company is worth put together. Let me show you with a company you've definitely heard of.”",
      "hi": "App scroll करते हुए, मीरा को कं पनी के नामों के बगल छोटे tags दिखे: “Large Cap,” “Mid Cap,” “Small Cap.” जिन दो कं पनियों को वो compare कर रही थी उनके share prices similar थे — लगभग ₹250 हर एक — फिर भी एक large-cap और दूसरी small-cap लेबल थी।\n\n“सिर्फ price किसी कं पनी के size के बारे में लगभग कुछ नहीं बताता,” पाटी ने समझाया। “जो मायने रखता है वो है कितने shares मौजूद हैं और पूरी कं पनी मिलाकर कितने की है। मैं तुम्हें एक ऐसी कं पनी से दिखाती हूँ जिसका नाम तुमने ज़ रूर सुना होगा।”",
      "ta": "App-ல scroll பண்ணிக்கிட்டிருந்தபோது, company பெயர்களுக்கு அருகில் சின்ன tags-ஐ மீரா கவனிச்சாள்: “Large Cap,” “Mid Cap,” “Small Cap.” அவள் compare பண்ணிக்கிட்டிருந்த இரண்டு நிறுவனங்களுக்கும் similar share prices — ஒரு ₹250 அருகில் — ஆனா ஒண்ணு large-cap-ஆவும் மற்றொண்ணு small-cap- ஆவும் label பண்ணப்பட்டிருந்துச்சு.\n\n“ஒரு நிறுவனத்தின் size-ஐ பத்தி விலை மட்டும் கிட்டத்தட்ட ஒன்றும் சொல்லாது,” பாட்டி explain பண்ணினார். “எத்தனை shares இருக்கு, முழு நிறுவனம் சேர்த்து என்ன மதிப்புள்ளது என்பது தான் matter பண்ணும். நீ கண்டிப்பா கேள்விப்பட்டிருக்கிற ஒரு நிறுவனத்தோட உனக்கு காட்டறேன்.”"
    },
    "realStorySubtitle": {
      "en": "The Small-Cap Motorcycle Maker That Became a Giant",
      "hi": "Small-Cap Motorcycle Maker जो एक Giant बन गई",
      "ta": "Giant ஆன Small-Cap Motorcycle Maker"
    },
    "realStoryBody": {
      "en": "In the early 2000s, Eicher Motors was a relatively small, unglamorous company, trading at a market capitalisation most large investors barely noticed. It owned a struggling motorcycle brand called Royal Enfield that many assumed was a dying business from another era.\n\nOver the following two decades, Royal Enfield was repositioned as a premium, aspirational motorcycle brand, and demand grew steadily across India and abroad. As profits and investor confidence grew together, Eicher Motors moved from small-cap, to mid-cap, and eventually into India's large-cap league — one of the clearest real examples of how a company's market-cap category can change dramatically as the underlying business grows.",
      "hi": "2000 के दशक की शुरुआत में, Eicher Motors एक अपेक्षाकृत छोटी, बिना चमक-दमक वाली कं पनी थी, जो एक ऐसे market capitalisation पर trade होती थी जिस पर ज़्यादातर बड़े investors का ध्यान भी नहीं जाता था। इसके पास Royal Enfield नाम का एक struggling motorcycle brand था जिसे कई लोग एक दूसरे दौर का मरता हुआ business समझते थे।\n\nअगले दो दशकों में, Royal Enfield को एक premium, aspirational motorcycle brand की तरह repositioned किया गया, और भारत तथा विदेश में demand लगातार बढ़ ती गई। जैसे-जैसे profits और investor confidence साथ बढ़े, Eicher Motors small-cap से mid-cap, और आखिर में भारत की large-cap league में चली गई — इसका एक सबसे साफ़ असली उदाहरण कि underlying business के बढ़ ने के साथ कं पनी की market-cap category कितनी नाटकीय रूप से बदल सकती है।",
      "ta": "2000-களின் தொடக்கத்தில், Eicher Motors ஒரு comparatively சின்ன, glamour இல்லாத நிறுவனமா இருந்துச்சு, பெரிய investors கிட்டத்தட்ட கவனிக்காத ஒரு market capitalisation-ல trade ஆகிக்கிட்டிருந்துச்சு. அது Royal Enfield என்ற struggle பண்ணிக்கிட்டிருந்த ஒரு motorcycle brand-ஐ சொந்தமாக்கியிருந்துச்சு, அது வேற காலத்தின் dying business-ன்னு பலரும் நினைச்சாங்க.\n\nஅடுத்த இரண்டு decades-ல, Royal Enfield ஒரு premium, aspirational motorcycle brand-ஆ repositioned ஆச்சு, demand இந்தியா முழுவதும் வெளிநாட்டிலும் steady-ஆ வளர்ந்துச்சு. Profits-உம் investor confidence-உம் சேர்ந்து வளர்ந்ததால், Eicher Motors small-cap-ல இருந்து mid-cap-க்கு, கடைசியா India-ன் large-cap league-க்கும் move ஆச்சு — underlying business வளரும்போது ஒரு நிறுவனத்தின் market-cap category எவ்வளவு dramatic-ஆ மாறலாம்னு காட்டுற தெளிவான real examples-ல ஒண்ணு."
    },
    "body": {
      "en": "What Market Capitalization Actually Means Market Cap = Share Price × Total Number of Shares. It represents what the market currently thinks the entire company is worth — which is why two stocks priced similarly per share can belong to completely different size categories, depending on how many total shares each company has issued.\n\nSEBI's Three Categories • Large Cap: The top 100 companies by market capitalisation — generally the most established, stable, and closely tracked names. • Mid Cap: Companies ranked 101st to 250th — already sizeable, often still growing at a faster pace than large caps. • Small Cap: Companies ranked 251st and beyond — the widest and most varied group, including future giants and future failures alike.\n\nWhy the Category Matters for Risk As a rough pattern, large caps tend to be more stable with slower, steadier growth; small caps carry higher growth potential alongside meaningfully higher risk and volatility, since smaller companies can be hurt more easily by a bad quarter, a lost order, or an economic slowdown. Mid caps generally sit somewhere in between.",
      "hi": "Market Capitalization का असल मतलब क्या है Market Cap = Share Price × कुल Shares की संख्या। ये दिखाता है कि market अभी पूरी कं पनी को कितने का मानता है — यही वजह है कि similar per-share price वाले दो stocks बिल्कुल अलग size categories के हो सकते हैं, इस पर depend करते हुए कि हर कं पनी ने कुल कितने shares issue किए हैं।\n\nSEBI की तीन Categories • Large Cap: Market capitalisation के हिसाब से top 100 कं पनियाँ — आमतौर पर सबसे established, stable, और closely tracked नाम।\n\n• Mid Cap: 101वें से 250वें नंबर पर रैंक की गई कं पनियाँ — पहले से sizeable, अक्सर large caps से तेज़ रफ़्तार से बढ़ ती हुई।\n\n• Small Cap: 251वें नंबर और उससे आगे की कं पनियाँ — सबसे बड़ा और सबसे varied group, जिसमें future giants और future failures दोनों शामिल हैं।\n\nRisk के लिए Category क्यों मायने रखती है एक मोटे pattern के तौर पर, large caps धीमी, स्थिर growth के साथ ज़्यादा stable होते हैं; small caps ज़्यादा growth potential के साथ काफ़ी ज़्यादा risk और volatility भी रखते हैं, क्योंकि छोटी कं पनियाँ एक बुरे quarter, एक खोए हुए order, या एक economic slowdown से ज़्यादा आसानी से चोटिल हो सकती हैं। Mid caps आमतौर पर बीच में कहीं होते हैं।",
      "ta": "Market Capitalization உண்மையில் என்ன அர்த்தம் Market Cap = Share Price × மொத்த Shares எண்ணிக்கை. Market இப்போ முழு நிறுவனமும் என்ன மதிப்புள்ளதுனு நினைக்கிறதை இது represent பண்ணும் — அதனால தான் per-share similar விலையுள்ள இரண்டு stocks, ஒவ்வொரு நிறுவனமும் issue பண்ணியிருக்கிற total shares-ஐ பொறுத்து, முற்றிலும் வெவ்வேறு size categories-க்கு சொந்தமாக இருக்கலாம்.\n\nSEBI-ன் மூன்று Categories • Large Cap: Market capitalisation-ல top 100 நிறுவனங்கள் — பொதுவா மிகவும் established, stable, closely track ஆகும் பெயர்கள்.\n\n• Mid Cap: 101 முதல் 250 வரை rank பண்ணப்பட்ட நிறுவனங்கள் — already sizeable, பெரும்பாலும் large caps-ஐ விட வேகமா growth ஆகிக்கிட்டிருக்கும்.\n\n• Small Cap: 251 மற்றும் அதற்கு மேல் rank ஆன நிறுவனங்கள் — மிக widest, மிக varied group, future giants-ஐயும் future failures-ஐயும் அடக்கியது.\n\nRisk-க்கு Category ஏன் Matter பண்ணும் ஒரு rough pattern-ஆ, large caps பொதுவா மெதுவான, steady growth-உடன் stable-ஆ இருக்கும்; small caps அதிக growth potential-உடன் சேர்த்து meaningfully அதிக risk-உம் volatility-உம் carry பண்ணும்,\n\nஏனென்னா சின்ன நிறுவனங்கள் ஒரு bad quarter, ஒரு lost order, அல்லது ஒரு economic slowdown-ஆல் எளிதா பாதிக்கப்படலாம். Mid caps பொதுவா நடுவில் எங்கோ இருக்கும்."
    },
    "keyTakeaway": {
      "en": "Market cap is about the size of the whole company, not the price of one share. Eicher",
      "hi": "Market cap पूरी कं पनी के size के बारे में है, किसी एक share के price के बारे में नहीं। Eicher Motors का small-cap से large-cap तक का बहु-दशक climb दिखाता है कि small और mid caps असल में कितना upside दे सकते हैं — लेकिन हर ऐसी कहानी के लिए, कई small-caps वो climb कभी नहीं कर पाते, यही वजह है कि वो ज़्यादा risk रखते हैं।",
      "ta": "Market cap என்பது ஒரு share-ன் விலையைப் பத்தி இல்ல, முழு நிறுவனத்தின் size-ஐ பத்தி. Eicher Motors-ன் decades-கணக்கான small-cap-லிருந்து large-cap-க்கான ஏற்றம், small மற்றும் mid caps தரக்கூடிய real upside-ஐ காட்டுது — ஆனா இது மாதிரி ஒவ்வொரு கதைக்கும், பல small-caps அந்த ஏற்றத்தை ஒருபோதும் அடையாது, அதனால தான் அவை அதிக risk carry பண்றது."
    },
    "quiz": [
      {
        "question": {
          "en": "How is market capitalization calculated?",
          "hi": "Market capitalization कै से calculate होता है?",
          "ta": "Market capitalization எப்படி calculate பண்ணப்படும்?"
        },
        "options": {
          "en": [
            "Share price minus total debt",
            "Share price × Total number of shares",
            "Total revenue × profit margin",
            "Number of employees × average salary"
          ],
          "hi": [
            "Share price घटा total debt",
            "Share price × कुल shares की संख्या",
            "Total revenue × profit margin",
            "Employees की संख्या × average salary"
          ],
          "ta": [
            "Share price கழித்தல் total debt",
            "Share price × மொத்த Shares எண்ணிக்கை",
            "Total revenue × profit margin",
            "Employees எண்ணிக்கை × average salary"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Market cap reflects the market's valuation of the entire company, based on price per share times total shares outstanding.",
          "hi": "Market cap पूरी कं पनी की market की नज़र में value दिखाता है, per-share price गुणा कुल outstanding shares के आधार पर।",
          "ta": "Market cap, share per price × total shares outstanding-ஐ அடிப்படையா வச்சு, முழு நிறுவனத்தின் market valuation-ஐ காட்டுது."
        }
      },
      {
        "question": {
          "en": "Why can two stocks with a similar share price belong to very different market-cap categories?",
          "hi": "Similar share price वाले दो stocks बिल्कुल अलग market-cap categories के क्यों हो सकते हैं?",
          "ta": "Similar share price உள்ள இரண்டு stocks ஏன் மிக வேறுபட்ட market-cap categories-க்கு சொந்தமா இருக்கலாம்?"
        },
        "options": {
          "en": [
            "It's a data error",
            "They can have very different total numbers of shares outstanding",
            "Share price always equals market cap",
            "Only large companies are allowed a high share price"
          ],
          "hi": [
            "ये एक data error है",
            "उनके total outstanding shares की संख्या बहुत अलग हो सकती है",
            "Share price हमेशा market cap के बराबर होता है",
            "सिर्फ बड़ी कं पनियों को high share price की इजाज़त है"
          ],
          "ta": [
            "இது ஒரு data error",
            "அவைக்கு மொத்த shares outstanding எண்ணிக்கை மிகவும் வேறுபடலாம்",
            "Share price எப்போதும் market cap-க்கு equal",
            "பெரிய நிறுவனங்களுக்கு மட்டும் தான் high share price அனுமதி"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Market cap depends on price multiplied by total shares — price alone says nothing about total company size.",
          "hi": "Market cap price गुणा total shares पर depend करता है — अके ले price कं पनी के कुल size के बारे में कुछ नहीं कहता।",
          "ta": "Market cap, price × total shares-ஐ பொறுத்தது — விலை மட்டும் total company size-ஐ பத்தி எதுவும் சொல்லாது."
        }
      },
      {
        "question": {
          "en": "According to SEBI's classification, which companies are 'Large Cap'?",
          "hi": "SEBI के classification के अनुसार, कौन सी कं पनियाँ 'Large Cap' हैं?",
          "ta": "SEBI-ன் classification படி, எந்த நிறுவனங்கள் 'Large Cap'?"
        },
        "options": {
          "en": [
            "The top 100 companies by market capitalisation",
            "Any company above ₹100 per share",
            "Companies ranked 101-250",
            "Only government-owned companies"
          ],
          "hi": [
            "Market capitalisation के हिसाब से top 100 कं पनियाँ",
            "₹100 प्रति share से ऊपर कोई भी कं पनी",
            "101-250 रैंक की कं पनियाँ",
            "सिर्फ government-owned कं पनियाँ"
          ],
          "ta": [
            "Market capitalisation-ல top 100 நிறுவனங்கள்",
            "₹100-க்கு மேல் share உள்ள எந்த நிறுவனமும்",
            "101-250 rank ஆன நிறுவனங்கள்",
            "Government-owned நிறுவனங்கள் மட்டும்"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "SEBI defines large caps strictly by market-cap rank, not by share price or any other measure.",
          "hi": "SEBI large caps को सख़् ती से market-cap rank से define करता है, share price या किसी और measure से नहीं।",
          "ta": "SEBI large caps-ஐ strictly market-cap rank-ஐ பொறுத்து தான் define பண்ணும், share price அல்லது வேற எந்த measure-ஐயும் இல்ல."
        }
      },
      {
        "question": {
          "en": "What does the Eicher Motors story illustrate?",
          "hi": "Eicher Motors की कहानी क्या दिखाती है?",
          "ta": "Eicher Motors கதை எதை காட்டுது?"
        },
        "options": {
          "en": [
            "Large caps never change category",
            "A company can move from small-cap to large-cap as its business grows over time",
            "Motorcycle companies always underperform",
            "Market cap categories are permanent and fixed"
          ],
          "hi": [
            "Large caps कभी category नहीं बदलते",
            "एक कं पनी समय के साथ अपने business के बढ़ ने पर small-cap से large-cap में जा सकती है",
            "Motorcycle कं पनियाँ हमेशा underperform करती हैं",
            "Market cap categories permanent और fixed हैं"
          ],
          "ta": [
            "Large caps ஒருபோதும் category மாறாது",
            "ஒரு நிறுவனம் காலப்போக்கில் அதன் business வளர்ந்தா small-cap-ல இருந்து large-cap-க்கு move ஆகலாம்",
            "Motorcycle நிறுவனங்கள் எப்போதும் underperform ஆகும்",
            "Market cap categories permanent, fixed"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Eicher Motors climbed categories over two decades as Royal Enfield's business grew and investor confidence rose with it.",
          "hi": "Eicher Motors दो दशकों में categories चढ़ी जब Royal Enfield का business बढ़ा और उसके साथ investor confidence भी बढ़ा।",
          "ta": "Royal Enfield-ன் business வளர்ந்ததும் investor confidence அதோட ஏறினதும், Eicher Motors இரண்டு decades-ல categories-ஐ ஏறுச்சு."
        }
      },
      {
        "question": {
          "en": "As a general pattern, how do small-cap stocks compare to large-cap stocks?",
          "hi": "एक सामान्य pattern के तौर पर, small-cap stocks large-cap stocks से कै से compare होते हैं?",
          "ta": "General pattern-ஆ, small-cap stocks large-cap stocks-உடன் எப்படி ஒப்பிடலாம்?"
        },
        "options": {
          "en": [
            "Small caps are always safer",
            "Small caps typically carry higher growth potential but also higher risk and volatility",
            "There is no difference in risk",
            "Large caps always grow faster"
          ],
          "hi": [
            "Small caps हमेशा safer होते हैं",
            "Small caps में आमतौर पर ज़्यादा growth potential लेकिन ज़्यादा risk और volatility भी होती है",
            "Risk में कोई फर्क नहीं है",
            "Large caps हमेशा तेज़ बढ़ ते हैं"
          ],
          "ta": [
            "Small caps எப்போதும் safer",
            "Small caps பொதுவா அதிக growth potential-உம் அதிக risk, volatility-உம் carry பண்ணும்",
            "Risk-ல எந்த வித்தியாசமும் இல்ல",
            "Large caps எப்போதும் வேகமா growth ஆகும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Smaller companies can be hurt more easily by a single bad quarter or economic shift, which is the trade-off for their higher growth potential. 9. What is an IPO and How Does It Work",
          "hi": "छोटी कं पनियाँ एक बुरे quarter या economic shift से ज़्यादा आसानी से चोटिल हो सकती हैं, जो उनके ज़्यादा growth potential का trade-off है।",
          "ta": "சின்ன நிறுவனங்கள் ஒரு bad quarter அல்லது economic shift-ஆல் எளிதா பாதிக்கப்படலாம், அதுவே அவங்களோட அதிக growth potential-க்கான trade-off."
        }
      }
    ]
  },
  {
    "id": 9,
    "tier": "Beginner",
    "title": {
      "en": "What is an IPO and How Does It Work",
      "hi": "IPO क्या है और ये कै से काम करता है",
      "ta": "IPO என்றால் என்ன, அது எப்படி வேலை செய்யுது"
    },
    "opener": {
      "en": "A new IPO was all over the news, with WhatsApp forwards promising “guaranteed listing gains.” Meera's college friend had already applied, borrowing money from a cousin to invest more. “Everyone's applying,” he told her. “It's basically free money on listing day.”\n\nMeera remembered Lesson 2 — how an IPO works, the paperwork, the price band, the allotment. “But how do you actually decide whether an IPO is worth applying to,” she asked Paati, “instead of just following the hype?”",
      "hi": "एक नया IPO हर जगह news में था, WhatsApp forwards “guaranteed listing gains” का वादा कर रहे थे। मीरा के college दोस्त ने पहले ही apply कर दिया था, ज़्यादा invest करने के लिए एक cousin से पैसे उधार लेकर। “सब apply कर रहे हैं,” उसने उसे बताया। “Listing day पर ये लगभग free money है।”\n\nमीरा को Lesson 2 याद आया — कै से एक IPO काम करता है, paperwork, price band, allotment। “लेकिन आप असल में कै से तय करते हो कि एक IPO apply करने लायक है,” उसने पाटी से पूछा, “सिर्फ hype follow करने की बजाय?”",
      "ta": "ஒரு புது IPO news-ல எல்லா இடத்திலும் இருந்துச்சு, WhatsApp forwards “guaranteed listing gains”-ஐ promise பண்ணிக்கிட்டு. மீராவின் college friend ஏற்கனவே apply பண்ணியிருந்தான், அதிகமா invest பண்ண cousin ஒருவரிடம் பணம் கடன் வாங்கி. “எல்லோரும் apply பண்ணிக்கிட்டிருக்காங்க,” அவன் சொன்னான். “Listing day அன்னிக்கு அது basically free money.”\n\nLesson 2-ஐ மீரா நினைவுகூர்ந்தாள் — IPO எப்படி வேலை செய்யுது, paperwork, price band, allotment. “ஆனா hype-ஐ follow பண்றதுக்கு பதிலா, ஒரு IPO apply பண்ண worth-ஆ இருக்கானு உண்மையிலேயே எப்படி முடிவு பண்றது?” என்று பாட்டியிடம் கேட்டாள்."
    },
    "realStorySubtitle": {
      "en": "The Most-Hyped IPO That Fell on Day One",
      "hi": "सबसे ज़्यादा hype वाला IPO जो Day One पर गिर गया",
      "ta": "முதல் நாளிலேயே விழுந்த மிக Hype-ஆன IPO"
    },
    "realStoryBody": {
      "en": "In November 2021, Paytm's IPO was one of the most talked-about listings in Indian stock market history, backed by huge demand and constant media coverage in the weeks before it opened. Many first-time investors applied purely because “everyone else was.”\n\nOn listing day, the stock opened deeply below its issue price and kept falling in the following months, catching many retail investors off guard. It remains one of the most cited real examples in Indian markets of a simple but important truth: hype and popularity are not the same thing as a company's actual value or its readiness to turn a profit.",
      "hi": "November 2021 में, Paytm का IPO भारतीय stock market के इतिहास की सबसे ज़्यादा चर्चा वाली listings में से एक था, जिसे खुलने से हफ़्तों पहले भारी demand और लगातार media coverage का support था। कई first-time investors ने सिर्फ इसलिए apply किया क्योंकि “बाकी सब भी कर रहे थे।”\n\nListing day पर, stock अपने issue price से काफ़ी नीचे खुला और अगले महीनों में गिरता रहा, जिससे कई retail investors हैरान रह गए। ये भारतीय markets में एक simple लेकिन ज़ रूरी सच के सबसे ज़्यादा उद्धृत असली examples में से एक बना हुआ है: hype और popularity किसी कं पनी की असली value या profit कमाने के लिए उसकी तैयारी जैसी चीज़ नहीं हैं।",
      "ta": "November 2021-ல, Paytm-ன் IPO, இந்திய stock market வரலாற்றிலேயே மிக அதிகமா பேசப்பட்ட listings-ல ஒண்ணு, திறக்குமுன் வாரக்கணக்கான huge demand-உம் constant media coverage-உம் இருந்துச்சு. முதல்முறையா invest பண்றவங்கள் பலரும் “எல்லோரும் apply பண்றாங்க”னு மட்டும் தான் apply பண்ணினாங்க.\n\nListing day அன்னிக்கு, அந்த stock அதோட issue price-ஐ விட மிகவும் கீழே open ஆயிடுச்சு, அடுத்த மாசங்களிலும் தொடர்ந்து விழுந்துச்சு, பல retail investors-ஐயும் caught off guard பண்ணிச்சு. Indian markets-ல ஒரு simple ஆனா important truth-க்கு மிக cite பண்ணப்படும் real examples-ல இது ஒண்ணா இருக்கு: hype-உம் popularity-உம், ஒரு நிறுவனத்தின் actual value-க்கோ profit பண்ற readiness-க்கோ ஒண்ணே இல்ல."
    },
    "body": {
      "en": "Basics to Check Before You Apply • Is the company profitable, or losing money? Read the summary financials in the prospectus — growth alone doesn't pay bills. • What will the money be used for? Paying off old debt is a very different signal from funding new factories or expansion. • Who is selling? If mostly existing founders/investors are cashing out (an “Offer for Sale”) rather than the company raising fresh growth capital, ask why. • Valuation: Is the IPO priced reasonably compared to similar, already-listed companies?\n\nHow Retail Investors Actually Apply Retail applications go through ASBA (Application Supported by Blocked Amount) via your bank or broker app — your money is blocked, not deducted, until shares are actually allotted, and released automatically if you don't get any. Applications are typically confirmed with a UPI mandate approval on your phone.\n\nA Word of Caution on ‘GMP’ You'll often see IPOs discussed with a Grey Market Premium (GMP) — an unofficial, unregulated estimate of listing-day demand floating around outside the exchanges. It is not an official number, is not always accurate, and should never be the main reason to apply.",
      "hi": "Apply करने से पहले चेक करने की Basics • क्या कं पनी profitable है, या पैसा गंवा रही है? Prospectus में summary financials पढ़ें — सिर्फ growth से bills नहीं चुकतीं। • पैसे का इस्तेमाल किस लिए होगा? पुराना debt चुकाना नई factories या expansion को fund करने से बिल्कुल अलग signal है।\n\n• कौन बेच रहा है? अगर ज़्यादातर मौजूदा founders/investors कं पनी के fresh growth capital जुटाने की बजाय cash out कर रहे हैं (एक “Offer for Sale”), तो पूछें क्यों।\n\n• Valuation: क्या IPO का price similar, पहले से listed कं पनियों के मुकाबले reasonable है?\n\nRetail Investors असल में Apply कै से करते हैं Retail applications आपके bank या broker app के ज़ रिए ASBA (Application Supported by Blocked Amount) से जाते हैं — आपका पैसा block होता है, कटता नहीं, जब तक shares असल में allot न हों, और अगर आपको कुछ न मिले तो automatically release हो जाता है। Applications आमतौर पर आपके phone पर एक UPI mandate approval से confirm होती हैं।\n\n‘GMP’ पर एक चेतावनी आपको अक्सर IPOs की चर्चा एक Grey Market Premium (GMP) के साथ मिलेगी — listing-day demand का एक unofficial, unregulated अंदाज़ा जो exchanges के बाहर घूमता रहता है। ये कोई official number नहीं है, हमेशा accurate नहीं होता, और कभी भी apply करने की मुख्य वजह नहीं होनी चाहिए।",
      "ta": "Apply பண்றதுக்கு முன் Check பண்ண வேண்டிய Basics • நிறுவனம் profitable-ஆ இருக்கா, இல்ல loss-ல இருக்கா? Prospectus-ல summary financials படிங்க — growth மட்டும் bills-ஐ pay பண்ணாது.\n\n• பணம் எதுக்கு use ஆகும்? பழைய debt-ஐ pay off பண்றது, புது factories அல்லது expansion-ஐ fund பண்றதிலிருந்து முற்றிலும் வேற signal. • யார் விக்குறாங்க? நிறுவனம் fresh growth capital raise பண்ற பதிலா, பெரும்பாலும் existing founders/investors தான் cash out பண்றாங்கனா (ஒரு “Offer for Sale”), ஏன்னு கேளுங்க.\n\n• Valuation: Similar, ஏற்கனவே list ஆன நிறுவனங்களுடன் compare பண்ணும்போது IPO reasonable- ஆ price ஆகியிருக்கா?\n\nRetail Investors உண்மையில் எப்படி Apply பண்றாங்க Retail applications உங்க bank அல்லது broker app வழியா ASBA (Application Supported by Blocked Amount) மூலமா போகும் — shares actual-ஆ allot ஆகும் வரைக்கும் உங்க பணம் block ஆகும், deduct ஆகாது, allot ஆகலைனா தானாக release ஆகும். Applications உங்க phone-ல ஒரு UPI mandate approval-உடன் typically confirm ஆகும்.\n\n‘GMP’ பற்றி ஒரு Word of Caution IPOs பெரும்பாலும் Grey Market Premium (GMP)-உடன் discuss ஆகுறதை பார்ப்பீங்க — exchanges- க்கு வெளியே சுத்திக்கிட்டிருக்கிற listing-day demand-ன் ஒரு unofficial, unregulated estimate. இது ஒரு\n\nofficial number இல்ல, எப்போதும் accurate-உம் இல்ல, apply பண்றதுக்கு main காரணமா ஒருபோதும் இருக்கக்கூடாது."
    },
    "keyTakeaway": {
      "en": "An IPO should be evaluated the same way you'd evaluate any stock — business quality, use",
      "hi": "एक IPO को उसी तरह judge करना चाहिए जैसे आप किसी भी stock को करेंगे — business quality, funds का इस्तेमाल, और fair pricing — ये नहीं कि कितने लोग उसके बारे में बात कर रहे हैं। Paytm का post-listing गिरना एक असली याद दिलाता है कि hype और fundamentals बिल्कुल अलग दिशाओं में इशारा कर सकते हैं।",
      "ta": "ஒரு IPO-ஐ எப்படி எந்த stock-ஐயும் evaluate பண்றீங்களோ அப்படியே evaluate பண்ணணும் — business quality, funds-ன் use, fair pricing — எத்தனை பேர் அதைப் பத்தி பேசுறாங்கனு அல்ல. Paytm-ன் post-listing fall, hype-உம் fundamentals-உம் மிக வேற directions-ஐ point பண்ணலாம்னு ஒரு real reminder."
    },
    "quiz": [
      {
        "question": {
          "en": "What mechanism blocks (rather than immediately deducts) your money when you apply for an IPO?",
          "hi": "जब आप IPO के लिए apply करते हैं तो आपका पैसा block (तुरंत काटने की बजाय) करने वाला mechanism कौन सा है?",
          "ta": "IPO-க்கு apply பண்ணும்போது உங்க பணத்தை உடனே deduct பண்ணாம block பண்ற mechanism எது?"
        },
        "options": {
          "en": [
            "NEFT",
            "ASBA (Application Supported by Blocked Amount)",
            "EMI",
            "SIP"
          ],
          "hi": [
            "NEFT",
            "ASBA (Application Supported by Blocked Amount)",
            "EMI",
            "SIP"
          ],
          "ta": [
            "NEFT",
            "ASBA (Application Supported by Blocked Amount)",
            "EMI",
            "SIP"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "ASBA blocks the amount in your bank account and only debits it if shares are actually allotted to you.",
          "hi": "ASBA आपके bank account में रकम block करता है और सिर्फ तभी debit करता है जब shares असल में आपको allot हों।",
          "ta": "ASBA உங்க bank account-ல amount-ஐ block பண்ணும், shares உங்களுக்கு actual-ஆ allot ஆனால் மட்டும் தான் debit பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What does GMP (Grey Market Premium) represent?",
          "hi": "GMP (Grey Market Premium) क्या represent करता है?",
          "ta": "GMP (Grey Market Premium) எதை represent பண்ணும்?"
        },
        "options": {
          "en": [
            "An official SEBI-regulated price",
            "An unofficial, unregulated estimate of listing-day demand",
            "The company's guaranteed profit",
            "A government tax on IPOs"
          ],
          "hi": [
            "एक official SEBI-regulated price",
            "Listing-day demand का एक unofficial, unregulated अंदाज़ा",
            "कं पनी का guaranteed profit",
            "IPOs पर एक government tax"
          ],
          "ta": [
            "ஒரு official SEBI-regulated price",
            "Listing-day demand-ன் ஒரு unofficial, unregulated estimate",
            "நிறுவனத்தின் guaranteed profit",
            "IPOs மேல ஒரு government tax"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "GMP is an informal, outside-the-exchange indicator — not an official or guaranteed number, and often unreliable.",
          "hi": "GMP एक informal, exchange के बाहर का indicator है — कोई official या guaranteed number नहीं, और अक्सर unreliable।",
          "ta": "GMP ஒரு informal, exchange-க்கு வெளியே இருக்கிற indicator — official அல்லது guaranteed number இல்ல, பெரும்பாலும் unreliable."
        }
      },
      {
        "question": {
          "en": "What happened to Paytm's stock on its 2021 listing day, according to the story?",
          "hi": "कहानी के अनुसार, Paytm के stock का 2021 की listing day पर क्या हुआ?",
          "ta": "கதையின்படி, 2021-ல Paytm-ன் stock அதோட listing day அன்னிக்கு என்ன ஆச்சு?"
        },
        "options": {
          "en": [
            "It doubled in price",
            "It opened well below its issue price and kept falling afterward",
            "It was cancelled by SEBI",
            "Trading was suspended permanently"
          ],
          "hi": [
            "वो price में double हो गया",
            "वो अपने issue price से काफ़ी नीचे खुला और बाद में गिरता रहा",
            "उसे SEBI ने cancel कर दिया",
            "Trading हमेशा के लिए suspend हो गई"
          ],
          "ta": [
            "அது விலை double ஆச்சு",
            "அது issue price-ஐ விட நல்லா கீழே open ஆகி அதற்கு பிறகும் தொடர்ந்து விழுந்துச்சு",
            "அது SEBI-ஆல cancel ஆச்சு",
            "Trading நிரந்தரமா suspend ஆச்சு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Despite huge hype, Paytm listed at a steep discount and continued falling, surprising many retail investors.",
          "hi": "भारी hype के बावजूद, Paytm एक बड़े discount पर listed हुआ और गिरता रहा, जिसने कई retail investors को चौंका दिया।",
          "ta": "Huge hype இருந்தாலும், Paytm ஒரு steep discount-ல list ஆகி தொடர்ந்து விழுந்துச்சு, பல retail investors-ஐ ஆச்சர்யப்படுத்திச்சு."
        }
      },
      {
        "question": {
          "en": "Why should you check what an IPO's funds will be used for?",
          "hi": "आपको ये क्यों चेक करना चाहिए कि एक IPO के funds का इस्तेमाल किस लिए होगा?",
          "ta": "IPO-வின் funds எதுக்கு use ஆகும்னு நீங்க ஏன் check பண்ணணும்?"
        },
        "options": {
          "en": [
            "It doesn't matter at all",
            "Paying off old debt is a very different signal from funding genuine business growth",
            "All IPOs use funds identically",
            "Only foreign companies disclose this"
          ],
          "hi": [
            "इससे बिल्कुल फर्क नहीं पड़ ता",
            "पुराना debt चुकाना genuine business growth को fund करने से बिल्कुल अलग signal है",
            "सभी IPOs funds को एक जैसे इस्तेमाल करते हैं",
            "सिर्फ foreign कं पनियाँ ये disclose करती हैं"
          ],
          "ta": [
            "இது எதுவும் matter பண்ணாது",
            "பழைய debt-ஐ pay off பண்றது, genuine business growth-ஐ fund பண்றதிலிருந்து மிக வேற signal",
            "எல்லா IPOs-உம் funds-ஐ identical-ஆ use பண்ணும்",
            "Foreign நிறுவனங்கள் மட்டும் தான் இதை disclose பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "How a company plans to use IPO proceeds tells you a lot about its financial health and growth intentions.",
          "hi": "कं पनी IPO के पैसे का इस्तेमाल कै से plan करती है, ये उसकी financial health और growth के इरादों के बारे में बहुत कुछ बताता है।",
          "ta": "IPO proceeds-ஐ ஒரு நிறுவனம் எப்படி use பண்ண plan பண்றது, அதன் financial health-ஐயும் growth intentions-ஐயும் பத்தி நிறைய சொல்லும்."
        }
      },
      {
        "question": {
          "en": "What is the main lesson from the Paytm IPO story?",
          "hi": "Paytm IPO की कहानी से मुख्य सीख क्या है?",
          "ta": "Paytm IPO கதையிலிருந்து main பாடம் என்ன?"
        },
        "options": {
          "en": [
            "All IPOs are scams",
            "Hype and popularity are not the same as a company's actual value or profitability",
            "Only foreign IPOs are risky",
            "IPOs always lose money on listing day"
          ],
          "hi": [
            "सभी IPOs scams हैं",
            "Hype और popularity किसी कं पनी की असली value या profitability जैसी नहीं हैं",
            "सिर्फ foreign IPOs risky हैं",
            "IPOs हमेशा listing day पर पैसा गंवाते हैं"
          ],
          "ta": [
            "எல்லா IPOs-உம் scams",
            "Hype-உம் popularity-உம் ஒரு நிறுவனத்தின் actual value அல்லது profitability-க்கு equal இல்ல",
            "Foreign IPOs மட்டும் risky",
            "IPOs எப்போதும் listing day-ல பணம் இழக்கும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Massive public interest didn't protect Paytm's stock from a sharp post-listing fall — fundamentals matter more than buzz. 10. Trading Hours, Holidays & Settlement",
          "hi": "भारी public interest ने Paytm के stock को एक तेज़ post-listing गिरावट से नहीं बचाया — fundamentals buzz से ज़्यादा मायने रखते हैं।",
          "ta": "Massive public interest, Paytm-ன் stock-ஐ ஒரு கடுமையான post-listing fall-ல இருந்து protect பண்ணல — buzz-ஐ விட fundamentals தான் அதிகம் matter பண்ணும்."
        }
      }
    ]
  },
  {
    "id": 10,
    "tier": "Beginner",
    "title": {
      "en": "Trading Hours, Holidays & Settlement",
      "hi": "Trading Hours, Holidays & Settlement",
      "ta": "Trading Hours, Holidays & Settlement"
    },
    "opener": {
      "en": "Meera tried placing an order at 8:30 one morning before college and got confused when nothing happened. Later that evening, she tried again and got a message saying the market was closed. “Is the market open only sometimes?” she asked Paati, only half-joking.\n\n“Very specific times, actually,” Paati smiled. “And once a year, it even opens at a time that has nothing to do with business at all — it's one of my favourite traditions.”",
      "hi": "मीरा ने एक सुबह college से पहले 8:30 बजे एक order लगाने की कोशिश की और जब कुछ नहीं हुआ तो confuse हो गई। उसी शाम बाद में, उसने फिर कोशिश की और एक message मिला कि market बंद है। “क्या market सिर्फ कभी-कभी खुलता है?” उसने आधे- मज़ाक में पाटी से पूछा।\n\n“बहुत specific समय पर, असल में,” पाटी मुस्कु राई। “और साल में एक बार, ये एक ऐसे समय भी खुलता है जिसका business से कोई लेना-देना नहीं होता — ये मेरी favourite traditions में से एक है।”",
      "ta": "ஒரு நாள் காலை college-க்கு முன் 8:30-க்கு order போட மீரா முயற்சி பண்ணினாள், ஒன்றும் நடக்காதப்போ confuse ஆனாள். அன்னிக்கு மாலை, மறுபடியும் முயற்சி பண்ணி, market closed-னு ஒரு message கிடைச்சுச்சு. “Market சில நேரம் மட்டும் தான் open ஆ?” என்று அரை-joke-ஆ பாட்டியிடம் கேட்டாள்.\n\n“Very specific நேரங்கள், actually,” பாட்டி சிரிச்சார். “வருடத்துக்கு ஒரு தடவை, business-உடன் எந்த சம்பந்தமும் இல்லாத ஒரு நேரத்தில் கூட இது open ஆகும் — அது என் favourite traditions-ல ஒண்ணு.”"
    },
    "realStorySubtitle": {
      "en": "The One Hour of Trading Meant for Luck, Not Logic",
      "hi": "Trading का वो एक घंटा जो Luck के लिए है, Logic के लिए नहीं",
      "ta": "Logic-க்காக இல்ல, Luck-க்காக இருக்கிற ஒரு மணி Nேரம் Trading"
    },
    "realStoryBody": {
      "en": "Every year on Diwali evening, Indian stock exchanges hold a special one-hour session called Muhurat Trading — a symbolic trading window considered auspicious for starting new investments, a tradition BSE has followed since the exchange's early years.\n\nVolumes are usually thin and it isn't meant to be a serious trading opportunity, but it remains a well-loved ritual: many Indian families place a small, symbolic trade together on Diwali evening, treating it more like buying gold on Dhanteras than an actual investment decision — a reminder that markets exist inside culture too, not just spreadsheets.",
      "hi": "हर साल Diwali की शाम, भारतीय stock exchanges एक special एक घंटे का session रखते हैं जिसे Muhurat Trading कहते हैं — एक symbolic trading window जिसे नए investments शुरू करने के लिए शुभ माना जाता है, एक tradition जिसे BSE अपने शुरुआती सालों से मानता आ रहा है।\n\nVolumes आमतौर पर पतले होते हैं और ये कोई serious trading opportunity नहीं होना चाहिए, लेकिन ये एक प्यारी परंपरा बनी हुई है: कई भारतीय families Diwali की शाम एक साथ एक छोटा, symbolic trade करती हैं, इसे Dhanteras पर सोना खरीदने जैसा मानते हुए, न कि एक असली investment decision — एक याद दिलाना कि markets culture के अंदर भी होते हैं, सिर्फ spreadsheets में नहीं।",
      "ta": "ஒவ்வொரு வருடமும் Diwali மாலை, Indian stock exchanges Muhurat Trading என்ற special ஒரு மணி நேர session நடத்தும் — புது investments ஆரம்பிக்க auspicious-ஆ கருதப்படுற ஒரு symbolic trading window, exchange-ன் ஆரம்ப வருடங்களில் இருந்தே BSE follow பண்ணிக்கிட்டிருக்கிற ஒரு tradition.\n\nVolumes usually thin-ஆ இருக்கும், அது ஒரு serious trading opportunity-ஆ இருக்கணும்னு இல்ல, ஆனா அது ஒரு well-loved ritual-ஆவே இருக்கு: பல Indian குடும்பங்கள் Diwali மாலை சேர்ந்து ஒரு சின்ன, symbolic trade போடுவாங்க, ஒரு actual investment முடிவைவிட Dhanteras-ல தங்கம் வாங்குறது மாதிரி treat பண்ணுவாங்க — markets spreadsheets-க்குள் மட்டும் இல்ல, culture-க்குள்ளும் இருக்குனு ஒரு reminder."
    },
    "body": {
      "en": "Normal Trading Hours (NSE & BSE) • Pre-open session: 9:00 AM – 9:08 AM — used to set a fair opening price before regular trading starts. • Normal trading session: 9:15 AM – 3:30 PM, Monday to Friday. • Closed: Weekends and official exchange holidays (declared in advance every year).\n\nWhat is Settlement? Settlement is the actual transfer of shares into your demat account and money into the seller's account after a trade. Indian markets run on a T+1 settlement cycle — a trade done today is fully settled the very next working day, one of the fastest settlement cycles among major markets globally.\n\nWhy This Matters Day to Day Knowing trading hours prevents the confusion Meera felt, and knowing settlement timing matters if you plan to sell shares and use that money elsewhere quickly — the money isn't usable the instant you click sell, it follows the T+1 cycle.",
      "hi": "सामान्य Trading Hours (NSE & BSE) • Pre-open session: सुबह 9:00 – 9:08 — regular trading शुरू होने से पहले एक fair opening price set करने के लिए इस्तेमाल होता है।\n\n• Normal trading session: सुबह 9:15 – दोपहर 3:30, सोमवार से शुक्रवार। • बंद: Weekends और official exchange holidays (हर साल पहले से declare की जाती हैं)।\n\nSettlement क्या है? Settlement किसी trade के बाद shares का असल में आपके demat account में transfer होना और पैसे का seller के account में जाना है। भारतीय markets T+1 settlement cycle पर चलते हैं — आज किया गया trade अगले ही working day पूरी तरह settle हो जाता है, ये दुनिया भर के प्रमुख markets में सबसे तेज़ settlement cycles में से एक है।\n\nये रोज़ मर्रा में क्यों मायने रखता है Trading hours जानना मीरा को हुई confusion से बचाता है, और settlement timing जानना तब मायने रखता है जब आप shares बेचकर वो पैसे कहीं और जल्दी इस्तेमाल करने की सोच रहे हों — sell click करते ही पैसा इस्तेमाल के लायक नहीं होता, ये T+1 cycle को follow करता है।",
      "ta": "சாதாரண Trading Hours (NSE & BSE) • Pre-open session: 9:00 AM – 9:08 AM — regular trading ஆரம்பிக்கும் முன் ஒரு fair opening price set பண்ண பயன்படுத்தப்படும்.\n\n• Normal trading session: 9:15 AM – 3:30 PM, திங்கள் முதல் வெள்ளி வரை.\n\n• Closed: Weekends மற்றும் official exchange holidays (ஒவ்வொரு வருடமும் முன்கூட்டியே declare ஆகும்).\n\nSettlement என்றால் என்ன? Settlement என்பது ஒரு trade-க்கு பிறகு, shares உங்க demat account-க்கும், பணம் விற்பவரின் account- க்கும் actual-ஆ transfer ஆவது. Indian markets T+1 settlement cycle-ல இயங்கும் — இன்னிக்கு நடக்கிற ஒரு trade, அடுத்த working day அன்னிக்கே முழுசா settle ஆகிடும், globally major markets-ல மிக வேகமான settlement cycles-ல ஒண்ணு.\n\nஇது நாள்தோறும் ஏன் Matter பண்ணும் Trading hours தெரிஞ்சிருப்பது மீரா feel பண்ண confusion-ஐ தடுக்கும், shares விற்று அந்த பணத்தை வேற இடத்துல வேகமா use பண்ண plan பண்றீங்கனா settlement timing தெரிஞ்சிருப்பது matter பண்ணும் — sell click பண்ணின உடனே பணம் usable ஆகாது, அது T+1 cycle-ஐ follow பண்ணும்."
    },
    "keyTakeaway": {
      "en": "The market has a fixed working window just like any institution, plus its own once-a-year cultural exception in Muhurat Trading. Settlement (T+1) is the quieter, equally important half of every trade — it's what actually moves the shares and money, a day after your order executes.",
      "hi": "Market का एक fixed working window है, बिल्कुल किसी भी institution की तरह, साथ ही Muhurat Trading में इसका अपना साल में एक बार वाला cultural exception भी है। Settlement (T+1) हर trade का वो शांत, उतना ही ज़ रूरी आधा हिस्सा है — यही असल में shares और पैसे को move करता है, आपका order execute होने के एक दिन बाद।",
      "ta": "எந்த institution-ஐயும் மாதிரி market-க்கு ஒரு fixed working window இருக்கு, அத்துடன் Muhurat Trading-ல அதற்கே உரிய வருடத்துக்கு ஒரு தடவை cultural exception-உம். Settlement (T+1) ஒவ்வொரு trade-ன் அமைதியான, சமமா முக்கியமான பாதி — உங்க order execute ஆன ஒரு நாள் கழித்து, shares-ஐயும் பணத்தையும் actual-ஆ move பண்றது இது தான்."
    },
    "quiz": [
      {
        "question": {
          "en": "What are the normal trading hours for NSE and BSE on a working day?",
          "hi": "NSE और BSE के लिए एक working day पर सामान्य trading hours क्या हैं?",
          "ta": "ஒரு working day-ல NSE மற்றும் BSE-ன் normal trading hours என்ன?"
        },
        "options": {
          "en": [
            "9:15 AM to 3:30 PM",
            "8:00 AM to 5:00 PM",
            "24 hours a day",
            "6:00 PM to midnight"
          ],
          "hi": [
            "सुबह 9:15 से दोपहर 3:30",
            "सुबह 8:00 से शाम 5:00",
            "दिन के 24 घंटे",
            "शाम 6:00 से आधी रात"
          ],
          "ta": [
            "காலை 9:15 முதல் மதியம் 3:30 வரை",
            "காலை 8:00 முதல் மாலை 5:00 வரை",
            "நாள் முழுவதும் 24 மணி நேரம்",
            "மாலை 6:00 முதல் நள்ளிரவு வரை"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "This is the regular trading session, preceded by a short pre-open session from 9:00-9:08 AM.",
          "hi": "ये regular trading session है, जिससे पहले सुबह 9:00-9:08 का एक छोटा pre-open session होता है।",
          "ta": "இது regular trading session, அதற்கு முன் காலை 9:00-9:08 வரை ஒரு short pre-open session இருக்கும்."
        }
      },
      {
        "question": {
          "en": "What is Muhurat Trading?",
          "hi": "Muhurat Trading क्या है?",
          "ta": "Muhurat Trading என்றால் என்ன?"
        },
        "options": {
          "en": [
            "A mandatory annual audit",
            "A symbolic one-hour Diwali trading session considered auspicious",
            "A special session only for foreign investors",
            "An emergency trading halt"
          ],
          "hi": [
            "एक mandatory annual audit",
            "एक symbolic एक घंटे का Diwali trading session जिसे शुभ माना जाता है",
            "सिर्फ foreign investors के लिए एक special session",
            "एक emergency trading halt"
          ],
          "ta": [
            "ஒரு mandatory annual audit",
            "Auspicious-ஆ கருதப்படுற ஒரு symbolic ஒரு மணி நேர Diwali trading session",
            "Foreign investors-க்கு மட்டும் ஒரு special session",
            "ஒரு emergency trading halt"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "It's a cultural tradition on Diwali evening, more symbolic than a serious trading opportunity, dating back to BSE's early years.",
          "hi": "ये Diwali की शाम की एक cultural tradition है, एक serious trading opportunity से ज़्यादा symbolic, जो BSE के शुरुआती सालों से चली आ रही है।",
          "ta": "இது Diwali மாலை ஒரு cultural tradition, BSE-ன் ஆரம்ப வருடங்கள் முதலே, ஒரு serious trading opportunity-ஐ விட அதிகம் symbolic-ஆனது."
        }
      },
      {
        "question": {
          "en": "What does T+1 settlement mean?",
          "hi": "T+1 settlement का मतलब क्या है?",
          "ta": "T+1 settlement என்றால் என்ன அர்த்தம்?"
        },
        "options": {
          "en": [
            "Trades take one month to settle",
            "A trade is fully settled the next working day after execution",
            "Trades settle instantly with zero delay",
            "T+1 refers to a type of order"
          ],
          "hi": [
            "Trades settle होने में एक महीना लगता है",
            "एक trade execution के अगले working day पूरी तरह settle हो जाता है",
            "Trades instantly, बिना किसी delay के settle होते हैं",
            "T+1 एक तरह का order है"
          ],
          "ta": [
            "Trades settle ஆக ஒரு மாசம் ஆகும்",
            "ஒரு trade, execute ஆன அடுத்த working day அன்னிக்கே முழுசா settle ஆகும்",
            "Trades instantly zero delay-உடன் settle ஆகும்",
            "T+1 என்பது ஒரு வகை order"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Indian markets moved to a T+1 cycle, meaning shares and money change hands the working day after the trade.",
          "hi": "भारतीय markets T+1 cycle पर चले गए हैं, यानी shares और पैसा trade के अगले working day हाथ बदलते हैं।",
          "ta": "Indian markets T+1 cycle-க்கு move ஆனது, trade நடந்த working day-க்கு அடுத்த நாள், shares-உம் பணமும் கைமாறும்னு அர்த்தம்."
        }
      },
      {
        "question": {
          "en": "What is the purpose of the pre-open session (9:00-9:08 AM)?",
          "hi": "Pre-open session (9:00-9:08 AM) का मकसद क्या है?",
          "ta": "Pre-open session-ன் (9:00-9:08 AM) purpose என்ன?"
        },
        "options": {
          "en": [
            "To close the market early",
            "To help set a fair opening price before regular trading begins",
            "To allow only institutional investors to trade",
            "It has no real purpose"
          ],
          "hi": [
            "Market को जल्दी बंद करना",
            "Regular trading शुरू होने से पहले एक fair opening price set करने में मदद करना",
            "सिर्फ institutional investors को trade करने देना",
            "इसका कोई असली मकसद नहीं है"
          ],
          "ta": [
            "Market-ஐ சீக்கிரமா close பண்ண",
            "Regular trading ஆரம்பிக்கும் முன் ஒரு fair opening price set பண்ண உதவ",
            "Institutional investors மட்டும் trade பண்ண அனுமதிக்க",
            "இதுக்கு real purpose எதுவும் இல்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The pre-open session collects orders to discover a fair starting price, reducing volatility at the market open.",
          "hi": "Pre-open session orders इकट्ठा करके एक fair starting price ढूँढता है, जिससे market खुलने पर volatility कम होती है।",
          "ta": "Pre-open session orders-ஐ collect பண்ணி ஒரு fair starting price discover பண்ணும், market open-ல volatility-ஐ குறைக்கும்."
        }
      },
      {
        "question": {
          "en": "Why does settlement timing matter practically for an investor?",
          "hi": "Settlement timing किसी investor के लिए practically क्यों मायने रखता है?",
          "ta": "Settlement timing ஒரு investor-க்கு practical-ஆ ஏன் matter பண்ணும்?"
        },
        "options": {
          "en": [
            "It doesn't matter at all",
            "Money from a sale isn't usable the instant you click sell — it follows the T+1 cycle",
            "It only affects foreign investors",
            "It changes the company's share price"
          ],
          "hi": [
            "इससे बिल्कुल फर्क नहीं पड़ ता",
            "Sale से पैसा sell click करते ही इस्तेमाल के लायक नहीं होता — ये T+1 cycle को follow करता है",
            "ये सिर्फ foreign investors को प्रभावित करता है",
            "ये कं पनी के share price को बदल देता है"
          ],
          "ta": [
            "இது எதுவும் matter பண்ணாது",
            "Sell click பண்ணின உடனே ஒரு sale-ல இருந்து பணம் usable ஆகாது — அது T+1 cycle-ஐ follow பண்ணும்",
            "இது foreign investors-ஐ மட்டும் தான் affect பண்ணும்",
            "இது நிறுவனத்தின் share price-ஐ மாற்றும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "If you plan to use sale proceeds elsewhere quickly, you need to account for the settlement delay. 11. Volume and Liquidity Explained",
          "hi": "अगर आप sale की रकम कहीं और जल्दी इस्तेमाल करने की योजना बना रहे हैं, तो आपको settlement delay का हिसाब रखना होगा।",
          "ta": "Sale proceeds-ஐ நீங்க வேற இடத்துல வேகமா use பண்ண plan பண்றீங்கனா, settlement delay-ஐ account பண்ணணும்."
        }
      }
    ]
  },
  {
    "id": 11,
    "tier": "Beginner",
    "title": {
      "en": "Volume and Liquidity Explained",
      "hi": "Volume और Liquidity समझाया गया",
      "ta": "Volume மற்றும் Liquidity என்றால் என்ன?"
    },
    "opener": {
      "en": "Meera found a small company whose share price had barely moved in months, and got excited — “It looks so stable, Paati!” But when she tried to place even a small paper-trade order in the simulator, there was almost no one on the other side to trade with.\n\n“That's not stability, kanna, that's a lack of liquidity,” Paati said. “And it's exactly the kind of stock that regulators have had to crack down on more than once.”",
      "hi": "मीरा को एक छोटी कं पनी मिली जिसका share price महीनों से लगभग move ही नहीं हुआ था, और वो excited हो गई — “ये कितना stable लग रहा है, पाटी!” लेकिन जब उसने simulator में एक छोटा सा paper-trade order भी लगाने की कोशिश की, तो दूसरी तरफ़ trade करने के लिए लगभग कोई नहीं था।\n\n“ये stability नहीं है, कन्ना, ये liquidity की कमी है,” पाटी ने कहा। “और ये ठीक वैसा ही stock है जिस पर regulators को एक से ज़्यादा बार सख़् ती करनी पड़ी है।”",
      "ta": "மீரா ஒரு சின்ன நிறுவனத்தைக் கண்டுபிடிச்சாள், அதோட share price மாசக்கணக்கா almost move ஆகாம இருந்துச்சு, அவளுக்கு excitement வந்துடுச்சு — “இது எவ்ளோ stable-ஆ இருக்கு, பாட்டி!” ஆனா simulator-ல ஒரு சின்ன paper-trade order போட முயற்சிச்சப்போ, மறு பக்கம் trade பண்ண யாருமே இல்லாத மாதிரி இருந்துச்சு.\n\n“அது stability இல்ல கண்ணா, அது liquidity இல்லாதது,” என்று பாட்டி சொன்னார். “இதுவே regulators ஒன்றுக்கு மேற்பட்ட தடவை crack down பண்ண வேண்டிய stock வகை.”"
    },
    "realStorySubtitle": {
      "en": "SEBI's Crackdown on the 'Shell' Small-Caps",
      "hi": "'Shell' Small-Caps पर SEBI की सख़् ती",
      "ta": "‘Shell’ Small-Caps-க்கு எதிராக SEBI-ன் Crackdown"
    },
    "realStoryBody": {
      "en": "In 2017, SEBI took the unusual step of restricting trading in over 300 listed companies suspected of being little more than ‘shell’ entities — companies with barely any real business, extremely low trading volumes, and share prices that regulators believed were being artificially manipulated by small groups of operators.\n\nFor genuine investors who had unknowingly bought into a few of these illiquid stocks, it became very difficult to sell at a fair price — or at all — for a period. The episode remains a widely cited real warning about why trading volume and liquidity deserve just as much attention as the price chart itself.",
      "hi": "2017 में, SEBI ने एक असामान्य कदम उठाते हुए 300 से ज़्यादा listed कं पनियों में trading restrict कर दी, जिन पर शक था कि वो मुश्किल से ‘shell’ entities से ज़्यादा कुछ नहीं हैं — ऐसी कं पनियाँ जिनके पास मुश्किल से कोई असली business था, बेहद कम trading volumes थे, और share prices जिन्हें regulators मानते थे कि operators के छोटे groups artificially manipulate कर रहे थे।\n\nजिन genuine investors ने अनजाने में इनमें से कुछ illiquid stocks खरीद लिए थे, उनके लिए एक fair price पर बेचना — या बेचना भी — कुछ समय के लिए बहुत मुश्किल हो गया। ये episode अब भी एक widely cited असली चेतावनी है कि trading volume और liquidity को price chart जितना ही ध्यान क्यों मिलना चाहिए।",
      "ta": "2017-ல, SEBI ஒரு அசாதாரண நடவடிக்கை எடுத்தது — 300-க்கும் மேற்பட்ட listed நிறுவனங்களில் trading-ஐ restrict பண்ணுச்சு, அவை வெறும் ‘shell’ entities-ஆ இருக்கலாம்னு சந்தேகப்பட்டு — கிட்டத்தட்ட எந்த real business-உம் இல்லாத, மிகக் குறைவான trading volume-உடன், சில operators-ன் சிறு குழுக்களால் artificial-ஆ manipulate பண்ணப்படுதுனு regulators நம்பின share prices-உடன். தெரியாம இந்த illiquid stocks-ல சிலதை வாங்கிய genuine investors-க்கு, ஒரு fair price-க்கு விக்கிறது — அல்லது விக்கவே — ஒரு காலகட்டத்திற்கு மிகவும் கஷ்டமா ஆயிடுச்சு. Trading volume-உம் liquidity-உம் price chart அளவுக்கே attention தேவைப்படுவதுக்கு ஏன்னு காட்டுற ஒரு widely cited நிஜமான warning-ஆ இந்த episode இன்னும் இருக்கு."
    },
    "body": {
      "en": "What is Trading Volume? Volume is simply the number of shares that changed hands in a given period. High volume means many buyers and sellers are actively active in a stock every day; very low volume means few trades happen at all.\n\nWhat is Liquidity, and Why It Matters Liquidity is how easily you can buy or sell a stock without your own order significantly moving its price. Highly liquid stocks (most large caps) have narrow gaps between the buy price and sell price. Illiquid stocks can have wide gaps, meaning you might buy high and be forced to sell noticeably lower — a hidden cost many beginners don't notice until they try to exit.\n\nWarning Signs of Poor Liquidity • Very low daily trading volume compared to similar companies. • A wide gap between the best 'buy' and best 'sell' price on the order book. • The stock frequently hits its upper or lower circuit limit (a daily price-move cap) with barely any real trading happening.",
      "hi": "Trading Volume क्या है? Volume बस एक दी हुई अवधि में हाथ बदले shares की संख्या है। High volume मतलब हर दिन एक stock में कई buyers और sellers active हैं; बहुत कम volume मतलब बहुत कम trades ही होते हैं।\n\nLiquidity क्या है, और ये क्यों मायने रखती है Liquidity ये है कि आप बिना अपने order से price को काफ़ी हिलाए, एक stock को कितनी आसानी से खरीद या बेच सकते हैं। Highly liquid stocks (ज़्यादातर large caps) में buy price और sell price के बीच narrow gap होता है। Illiquid stocks में wide gaps हो सकते हैं, मतलब आप high पर खरीदें और काफ़ी नीचे बेचने पर मजबूर हों — एक hidden cost जिसे कई beginners तब तक नहीं देखते जब तक वो exit करने की कोशिश नहीं करते।\n\nखराब Liquidity के Warning Signs • Similar कं पनियों के मुकाबले बहुत कम daily trading volume।\n\n• Order book पर सबसे अच्छे 'buy' और सबसे अच्छे 'sell' price के बीच एक wide gap। • Stock बार-बार अपनी upper या lower circuit limit (एक daily price-move cap) hit करता है, बिना मुश्किल से कोई असली trading हुए।",
      "ta": "Trading Volume என்றால் என்ன? Volume என்பது, ஒரு குறிப்பிட்ட period-ல கைமாறின shares-ன் எண்ணிக்கை தான். High volume என்றால், நிறைய buyers-உம் sellers-உம் ஒரு stock-ல தினமும் active-ஆ இருக்காங்கனு அர்த்தம்; மிகக் குறைவான volume என்றால், trades கிட்டத்தட்ட நடக்காதுனு அர்த்தம்.\n\nLiquidity என்றால் என்ன, அது ஏன் Matter பண்ணுது Liquidity என்பது, உங்க சொந்த order அதன் விலையை பெரிதா மாற்றாம, நீங்க ஒரு stock-ஐ எவ்வளவு எளிதா வாங்க/விக்க முடியும்னுறது. Highly liquid stocks-க்கு (பெரும்பாலான large caps) buy price-க்கும் sell price-க்கும் இடையே narrow gap இருக்கும். Illiquid stocks-க்கு wide gaps இருக்கலாம், அதாவது நீங்க அதிக விலைக்கு வாங்கி, குறிப்பிடத்தக்க அளவு குறைவா விக்க force ஆகலாம் — பெரும்பாலான beginners exit பண்ண முயற்சிக்கும் வரைக்கும் கவனிக்காத ஒரு hidden cost.\n\nPoor Liquidity-ன் Warning Signs • இதே மாதிரி நிறுவனங்களுடன் compare பண்ணும்போது மிகக் குறைவான daily trading volume.\n\n• Order book-ல best ‘buy’-க்கும் best ‘sell’ விலைக்கும் இடையே ஒரு wide gap.\n\n• அந்த stock அடிக்கடி அதன் upper அல்லது lower circuit limit-ஐ (ஒரு daily price-move cap) தொடுது, ஆனா கிட்டத்தட்ட real trading எதுவும் நடக்காம."
    },
    "keyTakeaway": {
      "en": "A quiet, barely-moving price chart isn't automatically a sign of stability — it can just as easily mean nobody is trading the stock at all. The 2017 shell-company crackdown shows why checking volume and liquidity is as important as checking the price.",
      "hi": "एक शांत, मुश्किल से move करता price chart automatically stability का निशान नहीं है — इसका उतनी ही आसानी से मतलब ये हो सकता है कि stock में कोई trade ही नहीं कर रहा। 2017 की shell-company crackdown दिखाती है कि volume और liquidity चेक करना price चेक करने जितना ही ज़ रूरी क्यों है।",
      "ta": "அமைதியா, கிட்டத்தட்ட move ஆகாத ஒரு price chart automatic-ஆ stability-க்கு அடையாளம் இல்ல — அது அந்த stock-ஐ யாருமே trade பண்ணல்லனு கூட அர்த்தமாகலாம். 2017 shell-company crackdown, volume-ஐயும் liquidity-ஐயும் check பண்றது price-ஐ check பண்றது அளவுக்கே முக்கியம்னு காட்டுது."
    },
    "quiz": [
      {
        "question": {
          "en": "What does trading 'volume' measure?",
          "hi": "Trading 'volume' क्या measure करता है?",
          "ta": "Trading ‘volume’ எதை measure பண்ணும்?"
        },
        "options": {
          "en": [
            "A company's total profit",
            "The number of shares that changed hands in a given period",
            "The number of employees at a company",
            "The stock's all-time high price"
          ],
          "hi": [
            "एक कं पनी का total profit",
            "एक दी हुई अवधि में हाथ बदले shares की संख्या",
            "एक कं पनी के employees की संख्या",
            "Stock का all-time high price"
          ],
          "ta": [
            "நிறுவனத்தின் total profit",
            "ஒரு குறிப்பிட்ட period-ல கைமாறின shares-ன் எண்ணிக்கை",
            "நிறுவனத்தில் இருக்கிற employees-ன் எண்ணிக்கை",
            "Stock-ன் all-time high price"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Volume tracks how many shares were actually bought and sold, not price or company size.",
          "hi": "Volume track करता है कि असल में कितने shares खरीदे और बेचे गए, price या कं पनी के size को नहीं।",
          "ta": "Volume என்பது எத்தனை shares உண்மையில் வாங்கப்பட்டு விற்கப்பட்டுச்சுனு track பண்ணும், விலையையோ company size-ஐயோ இல்ல."
        }
      },
      {
        "question": {
          "en": "What does 'liquidity' refer to in stock trading?",
          "hi": "Stock trading में 'liquidity' किसे कहते हैं?",
          "ta": "Stock trading-ல ‘liquidity’ எதைக் குறிக்கும்?"
        },
        "options": {
          "en": [
            "How much debt a company has",
            "How easily a stock can be bought or sold without significantly moving its price",
            "The dividend a company pays",
            "The number of branches a company has"
          ],
          "hi": [
            "एक कं पनी पर कितना debt है",
            "एक stock को बिना उसका price काफ़ी हिलाए कितनी आसानी से खरीदा या बेचा जा सकता है",
            "एक कं पनी जो dividend देती है",
            "एक कं पनी की branches की संख्या"
          ],
          "ta": [
            "ஒரு நிறுவனத்திற்கு இருக்கிற debt அளவு",
            "விலையை பெரிதா மாற்றாம ஒரு stock-ஐ எவ்வளவு எளிதா வாங்க/விக்க முடியும் என்பது",
            "ஒரு நிறுவனம் கொடுக்குற dividend",
            "ஒரு நிறுவனத்திற்கு இருக்கிற branches-ன் எண்ணிக்கை"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Liquidity is about ease of trading — highly liquid stocks can absorb large orders with minimal price impact.",
          "hi": "Liquidity trading की आसानी के बारे में है — highly liquid stocks बड़े orders को न्यूनतम price impact के साथ absorb कर सकते हैं।",
          "ta": "Liquidity என்பது trading-ன் ease-ஐ பத்தினது — highly liquid stocks குறைந்த price impact-உடன் பெரிய orders-ஐ absorb பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What did SEBI do in 2017 regarding suspected 'shell' companies?",
          "hi": "2017 में shakl पर शक वाली 'shell' कं पनियों को लेकर SEBI ने क्या किया?",
          "ta": "Suspected ‘shell’ companies-ஐ பத்தி 2017-ல SEBI என்ன பண்ணுச்சு?"
        },
        "options": {
          "en": [
            "Banned all small-cap investing permanently",
            "Restricted trading in over 300 companies suspected of being shell entities with manipulated, illiquid trading",
            "Merged them into large-cap companies",
            "Gave them free listing status"
          ],
          "hi": [
            "पूरे small-cap investing को हमेशा के लिए बैन कर दिया",
            "300 से ज़्यादा कं पनियों में trading restrict की जिन पर manipulated, illiquid trading वाली shell entities होने का शक था",
            "उन्हें large-cap कं पनियों में merge कर दिया",
            "उन्हें free listing status दे दिया"
          ],
          "ta": [
            "Small-cap investing-ஐ நிரந்தரமா ban பண்ணுச்சு",
            "Manipulated, illiquid trading-உடன் shell entities-ஆ இருக்கலாம்னு சந்தேகப்பட்ட 300-க்கும் மேற்பட்ட நிறுவனங்களில் trading-ஐ restrict பண்ணுச்சு",
            "அவற்றை large-cap நிறுவனங்களுடன் merge பண்ணுச்சு",
            "அவற்றுக்கு free listing status கொடுத்துச்சு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "SEBI acted against companies with minimal real business and suspiciously low, manipulated trading activity.",
          "hi": "SEBI ने उन कं पनियों के खिलाफ़ कार्रवाई की जिनके पास मुश्किल से कोई असली business था और संदिग्ध रूप से कम, manipulated trading activity थी।",
          "ta": "கிட்டத்தட்ட எந்த real business-உம் இல்லாம, சந்தேகத்திற்குரிய குறைவான, manipulate பண்ணப்பட்ட trading activity இருந்த நிறுவனங்களுக்கு எதிராக SEBI action எடுத்துச்சு."
        }
      },
      {
        "question": {
          "en": "Why can a barely-moving share price actually be a warning sign rather than a sign of stability?",
          "hi": "मुश्किल से move करता share price stability के निशान की बजाय असल में एक warning sign क्यों हो सकता है?",
          "ta": "Barely-moving ஒரு share price stability-க்கு அடையாளத்துக்கு பதிலா ஒரு warning sign-ஆ இருக்கக்கூடியது ஏன்?"
        },
        "options": {
          "en": [
            "It never is a warning sign",
            "It can indicate very low liquidity, meaning almost nobody is trading the stock",
            "It always means the company is about to go bankrupt",
            "Stable prices are illegal"
          ],
          "hi": [
            "ये कभी warning sign नहीं होता",
            "ये बहुत कम liquidity का संकेत दे सकता है, मतलब लगभग कोई भी stock trade नहीं कर रहा",
            "इसका हमेशा मतलब है कि कं पनी bankrupt होने वाली है",
            "Stable prices illegal हैं"
          ],
          "ta": [
            "அது ஒருபோதும் warning sign இல்ல",
            "அது மிகக் குறைவான liquidity-ஐக் குறிக்கலாம், அதாவது கிட்டத்தட்ட யாருமே அந்த stock-ஐ trade பண்ணல்ல என்பதை",
            "அது நிறுவனம் bankrupt ஆகப்போகுதுனு எப்போதும் அர்த்தம்",
            "Stable prices illegal"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "As Paati explains, a quiet chart can simply mean there's no real trading activity — not genuine price stability.",
          "hi": "जैसा पाटी समझाती हैं, एक शांत chart का सीधा मतलब हो सकता है कि कोई असली trading activity नहीं है — genuine price stability नहीं।",
          "ta": "பாட்டி விளக்குற மாதிரி, ஒரு அமைதியான chart வெறுமனே real trading activity இல்லைனு அர்த்தமாகலாம் — genuine price stability இல்ல."
        }
      },
      {
        "question": {
          "en": "What is one warning sign of poor liquidity mentioned in the lesson?",
          "hi": "Lesson में बताया गया खराब liquidity का एक warning sign क्या है?",
          "ta": "Lesson-ல சொல்லப்பட்ட poor liquidity-ன் ஒரு warning sign என்ன?"
        },
        "options": {
          "en": [
            "High trading volume every day",
            "A narrow gap between buy and sell prices",
            "A wide gap between the best buy and sell price on the order book",
            "Being part of the Nifty 50"
          ],
          "hi": [
            "हर दिन high trading volume",
            "Buy और sell prices के बीच एक narrow gap",
            "Order book पर सबसे अच्छे buy और sell price के बीच एक wide gap",
            "Nifty 50 का हिस्सा होना"
          ],
          "ta": [
            "தினமும் high trading volume",
            "Buy, sell விலைகளுக்கு இடையே narrow gap",
            "Order book-ல best buy, sell விலைக்கு இடையே wide gap",
            "Nifty 50-ல இருப்பது"
          ]
        },
        "correctIndex": 2,
        "explanation": {
          "en": "A wide bid-ask spread signals few active traders, making it costly to enter or exit the stock. 12. Common Beginner Mistakes to Avoid",
          "hi": "एक wide bid-ask spread कम active traders का संकेत देता है, जिससे stock में enter या exit करना महंगा हो जाता है।",
          "ta": "ஒரு wide bid-ask spread குறைவான active traders-ஐக் காட்டுது, அந்த stock-ல enter/exit பண்றது costly-ஆ ஆகும்."
        }
      }
    ]
  },
  {
    "id": 12,
    "tier": "Beginner",
    "title": {
      "en": "Common Beginner Mistakes to Avoid",
      "hi": "बचने लायक आम Beginner Mistakes",
      "ta": "தவிர்க்க வேண்டிய Common Beginner Mistakes"
    },
    "opener": {
      "en": "Meera's college WhatsApp group had turned into a stock-tips channel almost overnight — someone posted a “guaranteed multibagger” every other day, and a few classmates had started trading options with money borrowed from parents. “Should I be doing what they're doing?” she asked Paati, half-tempted.\n\nPaati didn't answer with a story this time. “Let me answer with a number instead — one that every new trader in India should know before they start.”",
      "hi": "मीरा का college WhatsApp group लगभग रातोंरात एक stock-tips channel बन गया था — कोई हर दूसरे दिन एक “guaranteed multibagger” post करता, और कुछ classmates ने माता-पिता से उधार लिए पैसों से options trade करना शुरू कर दिया था। “क्या मुझे भी वही करना चाहिए जो वो कर रहे हैं?” उसने आधे-मन से पाटी से पूछा।\n\nपाटी ने इस बार किसी कहानी से जवाब नहीं दिया। “इस बार मैं एक number से जवाब देती हूँ — जिसे भारत के हर नए trader को शुरू करने से पहले जानना चाहिए।”",
      "ta": "மீராவின் college WhatsApp group ஒரே இரவுல ஒரு stock-tips channel-ஆ மாறியிருந்துச்சு — யாரோ ஒருவர் இரண்டு நாளைக்கு ஒரு தடவை ஒரு “guaranteed multibagger”-ஐ post பண்ணிக்கிட்டிருந்தாங்க, சில classmates parents கிட்ட borrow பண்ண பணத்துல options trade பண்ண ஆரம்பிச்சுட்டாங்க. “அவங்க பண்றதையே நானும் பண்ணணுமா?” என்று பாதி tempt ஆகி பாட்டியை கேட்டாள்.\n\nபாட்டி இந்தத் தடவை ஒரு கதையால reply பண்ணல. “ஒரு எண்ணால் answer பண்றேன் — புதுசா trading ஆரம்பிக்கிற ஒவ்வொரு இந்தியனும் ஆரம்பிக்கிறதுக்கு முன்னாடி தெரிஞ்சிருக்கணும்.”"
    },
    "realStorySubtitle": {
      "en": "A Number Every Beginner Should Know",
      "hi": "वो Number जो हर Beginner को जानना चाहिए",
      "ta": "ஒவ்வொரு Beginner-உம் தெரிஞ்சிருக்க வேண்டிய ஒரு எண்"
    },
    "realStoryBody": {
      "en": "In a study covering three financial years, capital markets regulator SEBI found that roughly 9 out of every 10 individual traders in the equity derivatives (F&O) segment lost money overall, with average losses running into lakhs of rupees for the most active traders — despite widespread belief among beginners that quick trading is an easy way to earn.\n\nThe finding wasn't a claim that markets are rigged — disciplined, long-term investors in plain equity have a very different track record. It was a specific warning about frequent, high-risk trading (especially in derivatives) without adequate knowledge, capital, or risk control — precisely the pattern Meera was seeing spread through her friend group.",
      "hi": "तीन financial years को cover करने वाली एक study में, capital markets regulator SEBI ने पाया कि equity derivatives (F&O) segment में हर 10 में से लगभग 9 individual traders ने overall पैसा गंवाया, और सबसे active traders का average loss लाखों रुपयों तक पहुँच गया — जबकि beginners में ये व्यापक धारणा है कि जल्दी trading कमाने का आसान तरीका है।\n\nये finding ये claim नहीं था कि markets rigged हैं — plain equity में disciplined, long-term investors का track record बिल्कुल अलग है। ये बिना पर्याप्त knowledge, capital, या risk control के बार-बार, high-risk trading (खासकर derivatives में) को लेकर एक specific चेतावनी थी — ठीक वही pattern जो मीरा अपने दोस्तों के group में फै लता देख रही थी।",
      "ta": "மூன்று financial years-ஐ cover பண்ற ஒரு study-ல, capital markets regulator SEBI கண்டுபிடிச்சது என்னன்னா, equity derivatives (F&O) segment-ல ஒவ்வொரு 10 individual traders-லயும் கிட்டத்தட்ட 9 பேர் overall-ஆ பணத்தை இழந்திருக்காங்க, most active traders-க்கு average losses லட்சக்கணக்கான ரூபாய் வரைக்கும் போயிருக்கு — quick trading easy-ஆ சம்பாதிக்க ஒரு வழின்னு beginners-ல widespread belief இருந்தாலும்.\n\nஇந்த finding, markets rigged-ஆ இருக்குனு ஒரு claim இல்ல — plain equity-ல disciplined, long- term investors-க்கு completely வேற track record இருக்கு. இது specific-ஆ frequent, high-risk trading-ஐ (குறிப்பா derivatives-ல) adequate knowledge, capital, அல்லது risk control இல்லாம பண்றதைப் பத்தின ஒரு warning — சரியா மீரா தன் friend group-ல spread ஆகிக்கிட்டிருக்கிறதைப் பார்த்த pattern தான்."
    },
    "body": {
      "en": "The Most Common Mistakes • Trading on tips, not research: Acting on a WhatsApp forward or a stranger's “hot tip” instead of understanding the business. • No stop-loss: Holding a falling stock and hoping it recovers, without any predefined exit plan. • Over-trading: Buying and selling frequently, which racks up costs and taxes that quietly eat into returns. • Putting everything into one stock: Skipping diversification, so a single bad outcome can wipe out most of your capital. • Using borrowed money or excessive leverage: Amplifying losses beyond what you can actually afford. • Chasing past returns: Buying a stock only because it already went up a lot, rather than because it's still a good investment from here.",
      "hi": "सबसे आम Mistakes • Tips पर trading, research पर नहीं: Business को समझने की बजाय एक WhatsApp forward या किसी अजनबी की “hot tip” पर act करना।\n\n• कोई Stop-loss नहीं: बिना किसी पहले से तय exit plan के, गिरते stock को holding करते रहना और उसके recover होने की उम्मीद करना।\n\n• Over-trading: बार-बार खरीदना-बेचना, जिससे costs और taxes बढ़ ते हैं जो चुपचाप returns खा जाते हैं।\n\n• सब कुछ एक stock में डालना: Diversification छोड़ देना, जिससे एक अके ला बुरा नतीजा आपके ज़्यादातर capital को खत्म कर सकता है।\n\n• उधार के पैसे या ज़्यादा leverage इस्तेमाल करना: Losses को उससे कहीं ज़्यादा बढ़ाना जितना आप असल में afford कर सकते हैं।\n\n• पिछले returns के पीछे भागना: सिर्फ इसलिए एक stock खरीदना क्योंकि वो पहले ही बहुत बढ़ चुका है, न कि इसलिए कि वो अभी भी यहाँ से एक अच्छा investment है।",
      "ta": "மிகவும் பொதுவான Mistakes • Tips-ல trade பண்றது, research இல்ல: Business-ஐ புரிஞ்சுக்குறதுக்கு பதிலா ஒரு WhatsApp forward-ஐயோ ஒரு அறிமுகமில்லாதவரோட “hot tip”-ஐயோ நம்பி act பண்றது.\n\n• Stop-loss இல்லாதது: ஒரு predefined exit plan இல்லாம, விழுற stock-ஐ recover ஆகும்னு நம்பி hold பண்றது.\n\n• Over-trading: அடிக்கடி வாங்கி விக்குறது, returns-ஐ அமைதியா சாப்பிடுற costs, taxes-ஐ கூட்டுது.\n\n• எல்லாத்தையும் ஒரே stock-ல போடுறது: Diversification-ஐ skip பண்றது, அதனால ஒரே ஒரு bad outcome உங்க capital-ல பெரும்பாலானதை wipe out பண்ணலாம்.\n\n• Borrowed money அல்லது excessive leverage: நிஜமா நீங்க afford பண்ண முடியிறதைத் தாண்டி losses-ஐ amplify பண்றது.\n\n• Past returns-ஐ chase பண்றது: ஒரு stock ஏற்கனவே நிறைய ஏறியிருக்குனு மட்டும் அதை வாங்குறது, இப்போலிருந்து அது இன்னும் நல்ல investment-ஆ இருக்குனு இல்ல."
    },
    "keyTakeaway": {
      "en": "SEBI's own data shows most frequent, undisciplined traders lose money — patience, research, diversification, and a clear exit plan aren't just “safe” advice, they're what actually separates the minority who do well from the majority who don't.",
      "hi": "SEBI का अपना data दिखाता है कि ज़्यादातर बार-बार, undisciplined traders पैसा गंवाते हैं — patience, research, diversification, और एक साफ़ exit plan सिर्फ “safe” advice नहीं हैं, यही असल में उस minority को बाकी majority से अलग करता है जो अच्छा करते हैं।",
      "ta": "SEBI-ன் சொந்த data காட்டுது, பெரும்பாலான frequent, undisciplined traders பணத்தை இழக்காங்கனு — பொறுமை, research, diversification, தெளிவான exit plan வெறும் “safe” advice இல்ல, well பண்ற minority-க்கும் பண்ணாத majority-க்கும் இடையேயான உண்மையான வித்தியாசம் இதுதான்."
    },
    "quiz": [
      {
        "question": {
          "en": "According to a SEBI study cited in the lesson, roughly what proportion of individual F&O (derivatives) traders lost money overall?",
          "hi": "Lesson में बताई गई एक SEBI study के अनुसार, individual F&O (derivatives) traders का कितना हिस्सा overall पैसा गंवाता है?",
          "ta": "Lesson-ல quote பண்ணப்பட்ட SEBI study படி, individual F&O (derivatives) traders-ல எவ்வளவு proportion overall-ஆ பணத்தை இழந்தாங்க?"
        },
        "options": {
          "en": [
            "About 1 in 10",
            "About half",
            "About 9 out of 10",
            "Almost none"
          ],
          "hi": [
            "लगभग 10 में से 1",
            "लगभग आधे",
            "लगभग 10 में से 9",
            "लगभग कोई नहीं"
          ],
          "ta": [
            "சுமார் 10-ல் 1",
            "சுமார் பாதி",
            "சுமார் 10-ல் 9",
            "கிட்டத்தட்ட யாரும் இல்ல"
          ]
        },
        "correctIndex": 2,
        "explanation": {
          "en": "SEBI's study found the large majority of individual derivatives traders lost money over the period studied.",
          "hi": "SEBI की study ने पाया कि study किए गए period में individual derivatives traders का बड़ा हिस्सा पैसा गंवाता है।",
          "ta": "Study பண்ணப்பட்ட காலகட்டத்தில் பெரும்பாலான individual derivatives traders பணத்தை இழந்ததாக SEBI- ன் study கண்டுபிடிச்சது."
        }
      },
      {
        "question": {
          "en": "What is the risk of 'trading on tips' instead of research?",
          "hi": "Research की बजाय 'tips पर trading' करने का risk क्या है?",
          "ta": "Research-க்கு பதிலா ‘tips-ல trade பண்றதோட’ risk என்ன?"
        },
        "options": {
          "en": [
            "There is no risk, tips are usually reliable",
            "You end up acting on information you haven't verified or understood yourself",
            "Tips are illegal in India",
            "It guarantees higher returns"
          ],
          "hi": [
            "कोई risk नहीं है, tips आमतौर पर reliable होती हैं",
            "आप ऐसी जानकारी पर act कर लेते हैं जिसे आपने खुद verify या समझा नहीं",
            "भारत में tips illegal हैं",
            "इससे ज़्यादा returns की guarantee मिलती है"
          ],
          "ta": [
            "எந்த risk-உம் இல்ல, tips usually reliable",
            "நீங்க verify பண்ணாத, புரிஞ்சுக்காத information-ல act பண்றீங்க",
            "Tips இந்தியாவில் illegal",
            "அது higher returns-ஐ guarantee பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Acting on unverified tips means you don't actually understand what you're investing in or why.",
          "hi": "Unverified tips पर act करने का मतलब है कि आप असल में नहीं समझते कि आप क्या और क्यों invest कर रहे हैं।",
          "ta": "Unverified tips-ல act பண்றது, எதில் ஏன் invest பண்றீங்கனு உண்மையா புரிஞ்சுக்காம act பண்றதுக்கு சமம்."
        }
      },
      {
        "question": {
          "en": "Why is 'no stop-loss' considered a common beginner mistake?",
          "hi": "'कोई stop-loss नहीं' को एक आम beginner mistake क्यों माना जाता है?",
          "ta": "‘Stop-loss இல்லாதது’ ஏன் ஒரு common beginner mistake-ஆ கருதப்படுது?"
        },
        "options": {
          "en": [
            "Stop-losses are expensive to set",
            "Without one, investors often hold falling stocks hoping for a recovery, with no defined exit plan",
            "It's not actually a mistake",
            "Only professional traders need stop-losses"
          ],
          "hi": [
            "Stop-losses लगाना महंगा होता है",
            "इसके बिना, investors अक्सर बिना किसी defined exit plan के, गिरते stocks को recovery की उम्मीद में पकड़े रहते हैं",
            "ये असल में कोई mistake नहीं है",
            "सिर्फ professional traders को stop-losses चाहिए"
          ],
          "ta": [
            "Stop-losses set பண்ண expensive",
            "அது இல்லாம, investors பெரும்பாலும் தெளிவான exit plan இல்லாம recovery எதிர்பார்த்து விழுற stocks-ஐ hold பண்றாங்க",
            "இது உண்மையில் ஒரு mistake இல்ல",
            "Professional traders மட்டும் தான் stop-losses தேவை"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A predefined exit plan prevents small losses from turning into much larger ones.",
          "hi": "एक पहले से तय exit plan छोटे losses को बहुत बड़े होने से रोकता है।",
          "ta": "ஒரு predefined exit plan, சின்ன losses மிகப் பெரிய losses-ஆ மாறாம தடுக்கும்."
        }
      },
      {
        "question": {
          "en": "What does 'chasing past returns' mean?",
          "hi": "'पिछले returns के पीछे भागना' का क्या मतलब है?",
          "ta": "‘Past returns-ஐ chase பண்றது’ என்றால் என்ன?"
        },
        "options": {
          "en": [
            "Selling a stock too early",
            "Buying a stock mainly because its price already rose a lot, not because of its current value",
            "Diversifying across many stocks",
            "Using a stop-loss order"
          ],
          "hi": [
            "एक stock को बहुत जल्दी बेच देना",
            "मुख्यतः इसलिए एक stock खरीदना क्योंकि उसका price पहले ही बहुत बढ़ चुका है, उसकी वर्तमान value की वजह से नहीं",
            "कई stocks में diversify करना",
            "एक stop-loss order इस्तेमाल करना"
          ],
          "ta": [
            "ஒரு stock-ஐ மிக சீக்கிரமா விக்குறது",
            "இப்போதைய value-ஐ பாராம, விலை ஏற்கனவே நிறைய ஏறியிருக்கு என்பதற்காக மட்டும் ஒரு stock-ஐ வாங்குறது",
            "பல stocks-ல diversify பண்றது",
            "ஒரு stop-loss order பயன்படுத்துறது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Past performance alone doesn't indicate a stock is still a good buy — this is a common trap for beginners.",
          "hi": "अके ले past performance ये नहीं दिखाता कि एक stock अभी भी एक अच्छी खरीद है — beginners के लिए ये एक आम trap है।",
          "ta": "Past performance மட்டும் ஒரு stock இன்னும் நல்ல buy-ஆ இருக்குனு காட்டாது — beginners-க்கு இது ஒரு common trap."
        }
      },
      {
        "question": {
          "en": "What does SEBI's finding mainly caution against, according to the lesson?",
          "hi": "Lesson के अनुसार, SEBI की finding मुख्यतः किसके खिलाफ़ चेतावनी देती है?",
          "ta": "Lesson-ன் படி, SEBI-ன் finding முக்கியமா எதற்கு எதிராக caution பண்ணுது?"
        },
        "options": {
          "en": [
            "All stock market investing",
            "Frequent, high-risk derivatives trading without adequate knowledge or risk control",
            "Long-term equity investing",
            "Opening a demat account"
          ],
          "hi": [
            "पूरे stock market investing के खिलाफ़",
            "बिना पर्याप्त knowledge या risk control के बार-बार, high-risk derivatives trading के खिलाफ़",
            "Long-term equity investing के खिलाफ़",
            "एक demat account खोलने के खिलाफ़"
          ],
          "ta": [
            "எல்லா stock market investing-உம்",
            "Adequate knowledge அல்லது risk control இல்லாம frequent, high-risk derivatives trading",
            "Long-term equity investing",
            "ஒரு demat account திறப்பது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The lesson distinguishes disciplined long-term investing from frequent, undisciplined derivatives trading, which the data shows is far riskier. 13. Risk vs Reward: The First Rule",
          "hi": "Lesson disciplined long-term investing को बार-बार, undisciplined derivatives trading से अलग बताता है, जो data के अनुसार कहीं ज़्यादा risky है।",
          "ta": "Lesson disciplined long-term investing-ஐ frequent, undisciplined derivatives trading-லிருந்து பிரிச்சு காட்டுது, data-ன் படி அது மிக risky."
        }
      }
    ]
  },
  {
    "id": 13,
    "tier": "Beginner",
    "title": {
      "en": "Risk vs Reward: The First Rule",
      "hi": "Risk vs Reward: पहला नियम",
      "ta": "Risk vs Reward: முதல் Rule"
    },
    "opener": {
      "en": "“If I want bigger returns, I should just pick the riskiest stock, right?” Meera asked, only half-serious, after reading about someone who’d supposedly tripled their money in a month.\n\nPaati's face turned more serious than usual. “Let me tell you about a stock that, for a while, made people feel exactly like that — right up until it made them feel the opposite.”",
      "hi": "“अगर मुझे बड़े returns चाहिए, तो मुझे बस सबसे risky stock चुनना चाहिए, है ना?” मीरा ने आधे मज़ाक में पूछा, किसी के बारे में पढ़ ने के बाद जिसने कथित तौर पर एक महीने में अपना पैसा तीन गुना कर लिया था।\n\nपाटी का चेहरा हमेशा से ज़्यादा serious हो गया। “मैं तुम्हें एक ऐसे stock के बारे में बताती हूँ जिसने कुछ समय के लिए लोगों को बिल्कुल ऐसा ही महसूस कराया था — जब तक कि उसने उन्हें बिल्कुल उल्टा महसूस नहीं कराया।”",
      "ta": "“நான் bigger returns வேணும்னா, மிக risky-ஆன stock-ஐ தான் pick பண்ணணுமா?” என்று மீரா கேட்டாள், ஒரு மாசத்துல தன் பணத்தை triple பண்ணினதா சொல்லப்பட்ட ஒருவரைப் பத்தி படிச்ச பிறகு, பாதி serious- ஆ.\n\nபாட்டியின் முகம் வழக்கத்தை விட serious-ஆ ஆயிடுச்சு. “அப்படியே feel பண்ண வைச்ச ஒரு stock-ஐ பத்தி சொல்றேன் — அது எதிர்மறையா feel பண்ண வைக்கிற வரைக்கும்.”"
    },
    "realStorySubtitle": {
      "en": "The Airline That Went From Hero to Zero",
      "hi": "वो Airline जो Hero से Zero बन गई",
      "ta": "Hero-லிருந்து Zero-க்கு போன Airline"
    },
    "realStoryBody": {
      "en": "Through the mid-2000s, Kingfisher Airlines was one of India's most glamorous, aggressively expanding companies, and its stock attracted investors excited by its rapid growth and high public profile. Many bought in heavily, expecting the excitement to keep translating into returns.\n\nMounting debt and losses caught up with the company, and by 2012 it had grounded all flights permanently. Investors who had concentrated large portions of their savings into the stock, chasing its earlier excitement, watched its value fall effectively to zero — one of the starkest real reminders in Indian markets that higher potential reward always comes bundled with higher potential risk, never one without the other.",
      "hi": "2000 के दशक के बीच में, Kingfisher Airlines भारत की सबसे glamorous, aggressively expand होती कं पनियों में से एक थी, और इसके stock ने उन investors को आकर्षित किया जो इसकी तेज़ growth और high public profile से उत्साहित थे। कई लोगों ने भारी मात्रा में खरीदा, उम्मीद करते हुए कि उत्साह returns में बदलता रहेगा।\n\nबढ़ ता debt और losses कं पनी पर भारी पड़े, और 2012 तक इसकी सभी flights हमेशा के लिए ground हो गईं। जिन investors ने अपनी savings का बड़ा हिस्सा उसकी पहले की उत्तेजना के पीछे भागते हुए stock में लगाया था, उन्होंने उसकी value को effectively zero तक गिरते देखा — भारतीय markets की सबसे कड़ी असली यादों में से एक कि ज़्यादा potential reward हमेशा ज़्यादा potential risk के साथ बंधा आता है, कभी एक बिना दूसरे के नहीं।",
      "ta": "2000-களின் mid-ல, Kingfisher Airlines இந்தியாவின் மிக glamorous, aggressive-ஆ expand ஆன நிறுவனங்களில் ஒண்ணா இருந்துச்சு, அதன் stock அதன் வேகமான வளர்ச்சியாலும் high public profile- ஆலும் excite ஆன investors-ஐ ஈர்த்துச்சு. நிறைய பேர் heavy-ஆ invest பண்ணாங்க, அந்த excitement continue-ஆ returns-ஆ மாறும்னு எதிர்பார்த்து.\n\nவளர்ந்துக்கிட்டே இருந்த debt-உம் losses-உம் நிறுவனத்தை பிடிச்சுக்கிட்டுச்சு, 2012-க்குள் அது எல்லா flights-ஐயும் நிரந்தரமா ground பண்ணிட்டுச்சு. முன்னாடி இருந்த excitement-ஐ chase பண்ணி, தங்க savings-ல பெரிய பகுதியை அந்த stock-ல concentrate பண்ணின investors, அதன் value effectively zero-க்கு விழுறதை பார்த்தாங்க — higher potential reward எப்போதும் higher potential risk-உடன் தான் வரும், ஒண்ணு தனியா ஒருபோதும் வராதுனு Indian markets-ல மிகக் கடுமையான நிஜமான நினைவூட்டல்களில் ஒண்ணு இது."
    },
    "body": {
      "en": "The Rule That Never Changes Every investment carries a trade-off between risk (the chance of losing money, or of returns being far lower than expected) and reward (the potential gain). Fixed deposits offer low risk and low reward; a single small-cap stock offers a shot at high reward alongside real risk of large loss. Neither is “wrong” — they simply serve different goals.\n\nHow Diversification Manages Risk Spreading money across many different stocks, sectors, or asset types means one company's failure — even a total one, like Kingfisher — only affects a small slice of your overall portfolio, instead of wiping out your savings. It's the single most practical tool a beginner has against concentrated risk.\n\nMatching Risk to Your Own Goals • Time horizon: Money you'll need in 1 year should generally sit in far safer places than money you won't touch for 15 years. • Your own comfort with volatility: A strategy that keeps you awake at night isn't sustainable, however good it looks on paper. • No guarantees, ever: Anyone promising “guaranteed high returns” in the stock market is either misinformed or misleading you.",
      "hi": "वो नियम जो कभी नहीं बदलता हर investment risk (पैसा गंवाने का मौका, या returns के उम्मीद से बहुत कम होने का मौका) और reward (potential gain) के बीच एक trade-off रखता है। Fixed deposits कम risk और कम reward देते हैं; एक अके ला small-cap stock ज़्यादा नुकसान के असली risk के साथ high reward का एक मौका देता है। कोई भी “गलत” नहीं है — वो बस अलग-अलग goals की सेवा करते हैं।\n\nDiversification Risk को कै से Manage करता है पैसे को कई अलग-अलग stocks, sectors, या asset types में फै लाने का मतलब है कि एक कं पनी की असफलता — यहाँ तक कि Kingfisher जैसी पूरी असफलता — आपके overall portfolio के सिर्फ एक छोटे हिस्से को प्रभावित करती है, आपकी पूरी savings को खत्म करने की बजाय। ये concentrated risk के खिलाफ़ एक beginner के पास सबसे practical tool है।\n\nRisk को अपने Goals से Match करना • Time horizon: जो पैसा आपको 1 साल में चाहिए, उसे आमतौर पर उस पैसे से कहीं safer जगहों पर रखना चाहिए जिसे आप 15 साल तक नहीं छु एंगे।\n\n• Volatility के साथ आपका खुद का comfort: एक strategy जो आपको रात को जगाए रखे sustainable नहीं है, चाहे वो कागज़ पर कितनी भी अच्छी लगे।\n\n• कभी कोई guarantee नहीं: कोई भी जो stock market में “guaranteed high returns” का वादा करे, या तो misinformed है या आपको misleading कर रहा है।",
      "ta": "ஒருபோதும் மாறாத Rule ஒவ்வொரு investment-உம் risk-க்கும் (பணத்தை இழக்கிற chance, அல்லது returns expected-ஐ விட குறைவா இருக்கிற chance) reward-க்கும் (potential gain) இடையே ஒரு trade-off carry பண்ணும். Fixed deposits low risk, low reward தரும்; ஒரு single small-cap stock பெரிய loss-க்கான real risk-உடன் high reward-க்கான ஒரு shot தரும். இரண்டும் “தப்பு” இல்ல — அவை வெவ்வேறு goals-ஐ serve பண்றது.\n\nDiversification Risk-ஐ எப்படி Manage பண்ணும் பணத்தை பல வெவ்வேறு stocks, sectors, அல்லது asset types-ல spread பண்றது என்றால், ஒரு நிறுவனத்தின் failure — Kingfisher மாதிரி ஒரு total failure கூட — உங்க overall portfolio-ல ஒரு சின்ன slice-ஐ மட்டும் தான் affect பண்ணும், உங்க savings முழுசையும் wipe out பண்றதுக்கு பதிலா. Concentrated risk-க்கு எதிராக ஒரு beginner-க்கு இருக்கிற மிக practical tool இது ஒண்ணு தான்.\n\nRisk-ஐ உங்க சொந்த Goals-உடன் Match பண்றது • Time horizon: 1 வருடத்தில் உங்களுக்கு தேவைப்படும் பணம், 15 வருடம் தொடமாட்டீங்கனு நினைக்கிற பணத்தை விட generally மிகவும் safer இடங்களில் இருக்கணும்.\n\n• Volatility-உடன் உங்க comfort: Paper-ல எவ்ளோ நல்லா தெரிஞ்சாலும், இரவு தூக்கம் கெடுக்கிற ஒரு strategy sustainable இல்ல.\n\n• Guarantee ஒருபோதும் இல்ல: Stock market-ல “guaranteed high returns” promise பண்ற யாரும், misinformed-ஆ இருக்காங்க, இல்ல உங்களை mislead பண்றாங்க."
    },
    "keyTakeaway": {
      "en": "Risk and reward move together, never apart — Kingfisher's collapse is what unmanaged, concentrated risk actually looks like in real life. Diversification and knowing your own time horizon are how you take on reward without betting everything on one outcome.",
      "hi": "Risk और reward साथ move करते हैं, कभी अलग नहीं — Kingfisher का collapse असल ज़िंदगी में unmanaged, concentrated risk का असली रूप है। Diversification और अपने time horizon को जानना, बिना सब कुछ एक नतीजे पर दांव लगाए reward लेने का तरीका है।",
      "ta": "Risk-உம் reward-உம் சேர்ந்தே move ஆகும், தனித்தனியா ஒருபோதும் இல்ல — Kingfisher-ன் collapse தான் unmanaged, concentrated risk real life-ல எப்படி இருக்கும்னு காட்டுது. Diversification-உம் உங்க own time horizon-ஐ தெரிஞ்சுக்குறதும் தான், ஒரே ஒரு outcome-ல எல்லாத்தையும் bet பண்ணாம reward-ஐ take பண்ற வழி."
    },
    "quiz": [
      {
        "question": {
          "en": "What is the fundamental relationship between risk and reward in investing?",
          "hi": "Investing में risk और reward के बीच fundamental रिश्ता क्या है?",
          "ta": "Investing-ல risk-க்கும் reward-க்கும் இடையேயான fundamental relationship என்ன?"
        },
        "options": {
          "en": [
            "Higher reward potential usually comes with higher risk",
            "Higher reward always means lower risk",
            "Risk and reward are unrelated",
            "Only small-cap stocks carry any risk"
          ],
          "hi": [
            "ज़्यादा reward potential आमतौर पर ज़्यादा risk के साथ आता है",
            "ज़्यादा reward का हमेशा मतलब है कम risk",
            "Risk और reward का आपस में कोई संबंध नहीं है",
            "सिर्फ small-cap stocks में कोई risk होता है"
          ],
          "ta": [
            "Higher reward potential usually higher risk-உடன் வரும்",
            "Higher reward எப்போதும் lower risk-ஐக் குறிக்கும்",
            "Risk-உம் reward-உம் unrelated",
            "Small-cap stocks மட்டும் தான் எந்த risk-உம் carry பண்ணும்"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "This is the core trade-off in all investing — the two move together, not independently.",
          "hi": "ये सभी investing में core trade-off है — दोनों साथ move करते हैं, अलग-अलग नहीं।",
          "ta": "எல்லா investing-லயும் இருக்கிற core trade-off இது — இரண்டும் சேர்ந்தே move ஆகும், தனித்தனியா இல்ல."
        }
      },
      {
        "question": {
          "en": "What ultimately happened to Kingfisher Airlines, as described in the lesson?",
          "hi": "Lesson में बताए अनुसार, Kingfisher Airlines का आखिर में क्या हुआ?",
          "ta": "Lesson-ல சொன்ன மாதிரி, Kingfisher Airlines-க்கு இறுதியில் என்ன ஆயிடுச்சு?"
        },
        "options": {
          "en": [
            "It became India's most profitable airline",
            "It grounded all flights permanently in 2012 after mounting debt and losses",
            "It merged with a foreign airline",
            "It was nationalised by the government"
          ],
          "hi": [
            "वो भारत की सबसे profitable airline बन गई",
            "बढ़ ते debt और losses के बाद 2012 में इसकी सभी flights हमेशा के लिए ground हो गईं",
            "उसका एक foreign airline से merger हो गया",
            "उसे government ने nationalise कर लिया"
          ],
          "ta": [
            "அது இந்தியாவின் மிக profitable airline ஆயிடுச்சு",
            "அதிகரிச்ச debt-உம் losses-உம் காரணமா 2012-ல எல்லா flights-ஐயும் நிரந்தரமா ground பண்ணிட்டுச்சு",
            "அது ஒரு foreign airline-உடன் merge ஆயிடுச்சு",
            "அரசு அதை nationalise பண்ணிடுச்சு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Despite early excitement and high investor interest, the company collapsed under debt, wiping out shareholder value.",
          "hi": "शुरुआती उत्साह और high investor interest के बावजूद, कं पनी debt के नीचे collapse हो गई, जिससे shareholder value खत्म हो गई।",
          "ta": "ஆரம்ப excitement-உம் high investor interest-உம் இருந்தாலும், debt-ன் கீழ் நிறுவனம் collapse ஆயிடுச்சு, shareholder value-ஐ wipe out பண்ணிச்சு."
        }
      },
      {
        "question": {
          "en": "How does diversification help manage risk?",
          "hi": "Diversification risk manage करने में कै से मदद करता है?",
          "ta": "Diversification risk-ஐ manage பண்ண எப்படி உதவும்?"
        },
        "options": {
          "en": [
            "It guarantees profits",
            "It ensures one company's failure only affects a small part of your overall portfolio",
            "It eliminates all risk completely",
            "It only works for large-cap stocks"
          ],
          "hi": [
            "ये profits guarantee करता है",
            "ये सुनिश्चित करता है कि एक कं पनी की असफलता आपके overall portfolio के सिर्फ एक छोटे हिस्से को प्रभावित करे",
            "ये सारा risk पूरी तरह खत्म कर देता है",
            "ये सिर्फ large-cap stocks के लिए काम करता है"
          ],
          "ta": [
            "அது profits-ஐ guarantee பண்ணும்",
            "ஒரு நிறுவனத்தின் failure உங்க overall portfolio-ல ஒரு சின்ன பகுதியை மட்டும் தான் affect பண்ணும்னு உறுதி செய்யும்",
            "அது எல்லா risk-ஐயும் completely eliminate பண்ணும்",
            "அது large-cap stocks-க்கு மட்டும் தான் வேலை செய்யும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Spreading investments means no single bad outcome, even a total loss like Kingfisher, wipes out your entire portfolio.",
          "hi": "Investments फै लाने का मतलब है कि कोई एक बुरा नतीजा, Kingfisher जैसा पूरा नुकसान भी, आपका पूरा portfolio खत्म नहीं करता।",
          "ta": "Investments-ஐ spread பண்றது என்றால், Kingfisher மாதிரி ஒரு total loss கூட, உங்க முழு portfolio-ஐயும் wipe out பண்ணாது."
        }
      },
      {
        "question": {
          "en": "Why should money needed within 1 year generally be kept in safer investments than money needed in 15 years?",
          "hi": "1 साल में चाहिए वाले पैसे को आमतौर पर 15 साल बाद चाहिए वाले पैसे से safer investments में क्यों रखना चाहिए?",
          "ta": "1 வருடத்தில் தேவைப்படும் பணத்தை, 15 வருடத்தில் தேவைப்படும் பணத்தை விட safer investments-ல வைக்கணும் ஏன்?"
        },
        "options": {
          "en": [
            "Short-term money legally cannot be invested in stocks",
            "A shorter time horizon gives less time to recover from a downturn before the money is needed",
            "It doesn't matter, all money should be treated the same",
            "Long-term money is always less valuable"
          ],
          "hi": [
            "Short-term पैसे को legally stocks में invest नहीं किया जा सकता",
            "एक छोटा time horizon पैसे की ज़ रूरत पड़ ने से पहले एक downturn से recover होने का कम समय देता है",
            "इससे फर्क नहीं पड़ ता, सारे पैसे को एक जैसा treat करना चाहिए",
            "Long-term पैसा हमेशा कम valuable होता है"
          ],
          "ta": [
            "Short-term பணத்தை legally stocks-ல invest பண்ண முடியாது",
            "Shorter time horizon, பணம் தேவைப்படுறதுக்கு முன் ஒரு downturn-லிருந்து recover ஆக குறைவான நேரம் தரும்",
            "இது matter பண்ணாது, எல்லா பணத்தையும் ஒரே மாதிரி treat பண்ணணும்",
            "Long-term பணம் எப்போதும் less valuable"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Time horizon affects how much risk is appropriate — less time means less room to recover from a temporary fall.",
          "hi": "Time horizon तय करता है कि कितना risk उचित है — कम समय मतलब एक temporary गिरावट से recover होने के लिए कम जगह।",
          "ta": "எவ்வளவு risk appropriate-ஆ இருக்கும்னு time horizon தீர்மானிக்கும் — குறைவான நேரம் என்றால், ஒரு temporary fall-லிருந்து recover ஆக குறைவான room."
        }
      },
      {
        "question": {
          "en": "What should you think if someone promises 'guaranteed high returns' in the stock market?",
          "hi": "अगर कोई stock market में 'guaranteed high returns' का वादा करे तो आपको क्या सोचना चाहिए?",
          "ta": "Stock market-ல யாராவது ‘guaranteed high returns’ promise பண்ணா நீங்க என்ன நினைக்கணும்?"
        },
        "options": {
          "en": [
            "It's a normal, trustworthy offer",
            "They are either misinformed or being misleading, since no such guarantee is possible",
            "Only apply if it sounds urgent",
            "Guaranteed returns are common in large-cap stocks"
          ],
          "hi": [
            "ये एक normal, trustworthy offer है",
            "वो या तो misinformed हैं या misleading कर रहे हैं, क्योंकि ऐसी कोई guarantee possible ही नहीं है",
            "सिर्फ तभी apply करें जब ये urgent लगे",
            "Large-cap stocks में guaranteed returns आम हैं"
          ],
          "ta": [
            "இது ஒரு normal, trustworthy offer",
            "அவங்க misinformed-ஆ இருக்காங்க, இல்ல mislead பண்றாங்க, ஏன்னா அப்படி ஒரு guarantee possible இல்ல",
            "அது urgent-ஆ தெரிஞ்சா மட்டும் apply பண்ணுங்க",
            "Large-cap stocks-ல guaranteed returns common"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The stock market carries inherent risk — no legitimate source can guarantee high returns with certainty. 14. Start Small, Build Confidence",
          "hi": "Stock market में inherent risk होता है — कोई legitimate source पक्के तौर पर high returns guarantee नहीं कर सकता।",
          "ta": "Stock market-ல inherent risk இருக்கு — உறுதியா high returns-ஐ guarantee பண்ண எந்த legitimate source-உம் முடியாது."
        }
      }
    ]
  },
  {
    "id": 14,
    "tier": "Beginner",
    "title": {
      "en": "Start Small, Build Confidence",
      "hi": "छोटा शुरू करें, Confidence बनाएं",
      "ta": "சின்னதா Start பண்ணுங்க, Confidence Build"
    },
    "opener": {
      "en": "Two weeks into learning, Meera finally felt like she understood enough to start — but she also felt oddly nervous about actually putting in real money. “What if I mess it up with everything I've learned?” she asked.\n\n“Then you start small, and you let time do what worrying can't,” Paati said. “That's not a consolation prize, kanna — it's literally how millions of Indians have built wealth, slowly and on purpose.”",
      "hi": "सीखने के दो हफ़्तों बाद, मीरा को आखिर लगा कि वो शुरू करने लायक काफ़ी समझती है — लेकिन असल में real पैसे लगाने को लेकर वो अजीब तरह से nervous भी महसूस कर रही थी। “अगर मैं जो कुछ सीखा वो सब गड़ बड़ कर दूं तो?” उसने पूछा।\n\n“फिर तुम छोटे से शुरू करो, और time को वो करने दो जो worrying नहीं कर सकती,” पाटी ने कहा। “ये कोई consolation prize नहीं है, कन्ना — ये literally वो तरीका है जिससे लाखों भारतीयों ने धीरे-धीरे और जान-बूझकर wealth बनाई है।”",
      "ta": "பண்ணுங்க\n\nLearning ஆரம்பிச்சு இரண்டு வாரங்கள் ஆனதும், மீராவுக்கு போதுமான அளவு புரியுதுனு finally feel ஆச்சு — ஆனா real பணத்தை போடுறதைப் பத்தி ஏதோ ஒரு விசித்திரமான nervousness-உம் இருந்துச்சு. “நான் கத்துக்கிட்ட எல்லாத்தையும் வச்சு mess பண்ணிடேனா?” என்று கேட்டாள்.\n\n“அப்போ சின்னதா start பண்ணு, worry பண்ண முடியாததை நேரம் பண்ணட்டும்,” பாட்டி சொன்னார். “அது ஒரு consolation prize இல்ல கண்ணா — லட்சக்கணக்கான இந்தியர்கள் மெதுவா, purpose-உடன் wealth build பண்ணின literal வழி இது.”"
    },
    "realStorySubtitle": {
      "en": "The Quiet Habit Behind India's Biggest Investing Shift",
      "hi": "वो शांत आदत जो भारत के सबसे बड़े Investing Shift के पीछे है",
      "ta": "இந்தியாவின் மிகப்பெரிய Investing Shift-க்கு பின்னால் இருக்கிற"
    },
    "realStoryBody": {
      "en": "Over the past decade, monthly contributions into mutual funds through SIPs (Systematic Investment Plans) — small, fixed amounts invested automatically every month — have grown from a few thousand crore rupees to well over ₹20,000 crore a month across India, driven overwhelmingly by ordinary retail investors, not large institutions.\n\nNone of those individual monthly amounts were dramatic on their own — many SIPs start at just a few hundred or a couple of thousand rupees. What made the difference, across millions of investors, was starting early, staying consistent through both good years and bad, and letting the amounts grow gradually as confidence and income grew too.",
      "hi": "पिछले दशक में, SIPs (Systematic Investment Plans) के ज़ रिए mutual funds में monthly योगदान — हर महीने automatically invest होने वाली छोटी, fixed रकमें — कुछ हज़ार करोड़ रुपये से बढ़ कर पूरे भारत में एक महीने में ₹20,000 करोड़ से भी ज़्यादा हो गए हैं, जो ज़्यादातर आम retail investors की वजह से हुआ है, बड़े institutions की वजह से नहीं।\n\nउन individual monthly रकमों में से कोई भी अके ले dramatic नहीं थी — कई SIPs बस कुछ सौ या कुछ हज़ार रुपयों से शुरू होते हैं। लाखों investors में जो फर्क लाया, वो था जल्दी शुरू करना, अच्छे और बुरे दोनों सालों में consistent रहना, और confidence और income बढ़ ने के साथ रकमों को धीरे-धीरे बढ़ ने देना।",
      "ta": "அமைதியான Habit கடந்த decade-ல, SIP-கள் (Systematic Investment Plans) — ஒவ்வொரு மாசமும் automatic-ஆ invest ஆகுற சின்ன, fixed amounts — மூலமா mutual funds-க்குள் போற monthly contributions, சில ஆயிரம் crore ரூபாயிலிருந்து இந்தியா முழுக்க ஒரு மாசத்துக்கு ₹20,000 crore-க்கும் அதிகமா வளர்ந்திருக்கு, பெரிய institutions இல்ல, ordinary retail investors தான் இதை drive பண்ணிருக்காங்க.\n\nஅந்த individual monthly amounts எதுவுமே தனியா dramatic இல்ல — நிறைய SIPs சில நூறு அல்லது ஒரு couple ஆயிரம் ரூபாய்க்கே ஆரம்பிக்கும். லட்சக்கணக்கான investors-ல வித்தியாசத்தை உண்டாக்கியது, சீக்கிரமா start பண்றது, நல்ல வருடங்கள் கெட்ட வருடங்கள் இரண்டிலும் consistent-ஆ இருக்குறது, confidence-உம் income-உம் வளர வளர amounts-ஐ மெதுவா வளர்க்க விடுறது தான்."
    },
    "body": {
      "en": "Why Starting Small Actually Works • Mistakes cost less while you're still learning your own habits and temperament. • Consistency matters more than size — a small, regular amount invested for years often outperforms an occasional large, emotional bet. • Confidence compounds too — each cycle of investing, reviewing, and learning makes the next decision a little steadier.\n\nA Practical Path Forward • Practice first with the app's Paper Trading simulator using virtual money and real historical data — no real risk, real lessons. • Start real investing with a small amount you're fully prepared to see fluctuate. • Keep a simple trading journal of what you bought, why, and what happened — patterns become obvious only in hindsight, and only if you've written them down. • Increase your amounts gradually, only as your understanding (not just your excitement) grows.",
      "hi": "छोटा शुरू करना असल में क्यों काम करता है • जब तक आप अपनी habits और temperament सीख रहे हैं, mistakes कम खर्चीली होती हैं।\n\n• Size से ज़्यादा consistency मायने रखती है — सालों तक invest की गई एक छोटी, नियमित रकम अक्सर कभी-कभार वाले बड़े, emotional दांव से बेहतर perform करती है।\n\n• Confidence भी compound होती है — investing, review करने, और सीखने का हर cycle अगले decision को थोड़ा और स्थिर बनाता है।\n\nआगे बढ़ ने का एक Practical रास्ता • पहले app के Paper Trading simulator में virtual पैसे और असली historical data से practice करें — कोई असली risk नहीं, असली सीख।\n\n• असली investing एक ऐसी छोटी रकम से शुरू करें जिसे fluctuate होते देखने के लिए आप पूरी तरह तैयार हों।\n\n• एक simple trading journal रखें कि आपने क्या खरीदा, क्यों, और क्या हुआ — patterns सिर्फ पीछे मुड़ कर देखने पर ही साफ़ होते हैं, और सिर्फ तब जब आपने उन्हें लिखा हो। • अपनी रकम धीरे-धीरे बढ़ाएं, सिर्फ तब जब आपकी समझ (सिर्फ उत्साह नहीं) बढ़े।",
      "ta": "சின்னதா Start பண்றது ஏன் உண்மையிலேயே Work பண்ணுது • உங்க own habits-ஐயும் temperament-ஐயும் இன்னும் கத்துக்கிட்டிருக்கும்போது mistakes குறைவா cost ஆகும்.\n\n• Size-ஐ விட consistency தான் முக்கியம் — வருடக்கணக்கா invest பண்ண ஒரு சின்ன, regular amount, occasional-ஆன பெரிய, emotional bet-ஐ விட frequently outperform பண்ணும். • Confidence-உம் compound ஆகும் — invest பண்றது, review பண்றது, கத்துக்குறது ஒவ்வொரு cycle- உம் அடுத்த முடிவை கொஞ்சம் steadier ஆக்கும்.\n\nஒரு Practical Path Forward • முதலில் virtual பணத்துடனும் real historical data-உடனும் app-ன் Paper Trading simulator-ல practice பண்ணுங்க — real risk இல்ல, real lessons. • Fully fluctuate பார்க்க தயார் இருக்கிற ஒரு சின்ன amount-உடன் real investing ஆரம்பியுங்க.\n\n• நீங்க என்ன வாங்கினீங்க, ஏன், என்ன ஆச்சுனு ஒரு simple trading journal வையுங்க — Patterns hindsight-ல தான் obvious ஆகும், நீங்க அதை எழுதி வச்சிருந்தா மட்டும் தான்.\n\n• உங்க understanding (உங்க excitement மட்டும் இல்ல) வளர வளர மட்டும் உங்க amounts-ஐ gradual- ஆ கூட்டுங்க."
    },
    "keyTakeaway": {
      "en": "India's SIP boom proves that small, consistent action beats big, occasional bets over time. Starting small isn't a lesser version of investing — for almost everyone, it's the version that actually lasts long enough to work.",
      "hi": "भारत का SIP boom साबित करता है कि छोटा, consistent action समय के साथ बड़े, कभी-कभार वाले दांवों को हरा देता है। छोटा शुरू करना investing का कमतर version नहीं है — लगभग सबके लिए, ये वो version है जो असल में इतना लंबा चलता है कि काम कर सके।",
      "ta": "இந்தியாவின் SIP boom, நேரம் ஆக ஆக சின்ன, consistent action தான் பெரிய, occasional bets-ஐ விட win பண்ணும்னு prove பண்ணுது. சின்னதா start பண்றது investing-ன் ஒரு lesser version இல்ல — கிட்டத்தட்ட எல்லோருக்கும், work ஆகும் அளவுக்கு நீடிக்கிற version இதுதான்."
    },
    "quiz": [
      {
        "question": {
          "en": "What is a SIP (Systematic Investment Plan)?",
          "hi": "एक SIP (Systematic Investment Plan) क्या है?",
          "ta": "ஒரு SIP (Systematic Investment Plan) என்றால் என்ன?"
        },
        "options": {
          "en": [
            "A one-time lump sum investment",
            "A small, fixed amount invested automatically every month",
            "A type of stock order",
            "A government savings bond"
          ],
          "hi": [
            "एक one-time lump sum investment",
            "हर महीने automatically invest होने वाली एक छोटी, fixed रकम",
            "एक तरह का stock order",
            "एक government savings bond"
          ],
          "ta": [
            "ஒரு one-time lump sum investment",
            "ஒவ்வொரு மாசமும் automatic-ஆ invest ஆகுற ஒரு சின்ன, fixed amount",
            "ஒரு வகை stock order",
            "ஒரு government savings bond"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "SIPs automate regular, disciplined investing in fixed amounts, typically into mutual funds.",
          "hi": "SIPs fixed रकमों में नियमित, disciplined investing को, आमतौर पर mutual funds में, automate करते हैं।",
          "ta": "SIPs, பெரும்பாலும் mutual funds-க்குள், fixed amounts-ல regular, disciplined investing-ஐ automate பண்ணும். ₹"
        }
      },
      {
        "question": {
          "en": "What has driven India's SIP contributions to grow to over ₹20,000 crore a month, according to the lesson?",
          "hi": "Lesson के अनुसार, भारत के SIP contributions को एक महीने में ₹20,000 करोड़ से ज़्यादा तक बढ़ाने में किसका हाथ रहा?",
          "ta": "Lesson-ன் படி, இந்தியாவின் SIP contributions ஒரு மாசத்துக்கு 20,000 crore-க்கும் அதிகமா வளர எது drive பண்ணுச்சு?"
        },
        "options": {
          "en": [
            "A few large institutional investors",
            "Ordinary retail investors contributing small, consistent monthly amounts",
            "Government mandates",
            "Foreign investment alone"
          ],
          "hi": [
            "कुछ बड़े institutional investors",
            "छोटी, consistent monthly रकमें देने वाले आम retail investors",
            "Government के mandates",
            "सिर्फ foreign investment"
          ],
          "ta": [
            "சில பெரிய institutional investors",
            "Small, consistent monthly amounts contribute பண்ற ordinary retail investors",
            "Government mandates",
            "Foreign investment மட்டும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The growth has been driven overwhelmingly by individual retail investors, not large institutions.",
          "hi": "ये growth ज़्यादातर individual retail investors की वजह से हुई है, बड़े institutions की वजह से नहीं।",
          "ta": "இந்த வளர்ச்சியை பெரிய institutions இல்ல, individual retail investors தான் overwhelmingly drive பண்ணிருக்காங்க."
        }
      },
      {
        "question": {
          "en": "Why does the lesson suggest starting with small investment amounts?",
          "hi": "Lesson छोटी investment रकमों से शुरू करने का सुझाव क्यों देता है?",
          "ta": "சின்ன investment amounts-உடன் start பண்ணுங்கனு lesson ஏன் suggest பண்ணுது?"
        },
        "options": {
          "en": [
            "Small amounts guarantee higher returns",
            "Mistakes cost less while you're still learning your own habits and temperament",
            "Brokers require it by law",
            "Large amounts are illegal for beginners"
          ],
          "hi": [
            "छोटी रकमें ज़्यादा returns guarantee करती हैं",
            "जब तक आप अपनी habits और temperament सीख रहे हैं, mistakes कम खर्चीली होती हैं",
            "Brokers को कानूनन इसकी ज़ रूरत होती है",
            "बड़ी रकमें beginners के लिए illegal हैं"
          ],
          "ta": [
            "சின்ன amounts higher returns-ஐ guarantee பண்ணும்",
            "உங்க own habits-ஐயும் temperament-ஐயும் இன்னும் கத்துக்கிட்டிருக்கும்போது mistakes குறைவா cost ஆகும்",
            "Brokers சட்டப்படி இதை require பண்றாங்க",
            "பெரிய amounts beginners-க்கு illegal"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Starting small limits the cost of early mistakes while you build real experience and judgment.",
          "hi": "छोटा शुरू करना शुरुआती mistakes की cost को सीमित रखता है जबकि आप असली experience और judgment बनाते हैं।",
          "ta": "சின்னதா start பண்றது, real experience-ஐயும் judgment-ஐயும் build பண்றபோது early mistakes-ன் cost-ஐ limit பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What is the recommended first step before investing real money, according to the lesson?",
          "hi": "Lesson के अनुसार, असली पैसा invest करने से पहले recommended पहला कदम क्या है?",
          "ta": "Lesson-ன் படி, real பணத்தை invest பண்றதுக்கு முன் recommended முதல் step என்ன?"
        },
        "options": {
          "en": [
            "Borrow money to invest more",
            "Practice with the app's Paper Trading simulator using virtual money",
            "Invest your entire savings immediately",
            "Skip research and just start"
          ],
          "hi": [
            "ज़्यादा invest करने के लिए पैसे उधार लेना",
            "App के Paper Trading simulator में virtual पैसे से practice करना",
            "अपनी पूरी savings तुरंत invest कर देना",
            "Research skip करके बस शुरू कर देना"
          ],
          "ta": [
            "அதிகமா invest பண்ண பணம் borrow பண்றது",
            "Virtual பணத்துடன் app-ன் Paper Trading simulator-ல practice பண்றது",
            "உங்க முழு savings-ஐயும் உடனே invest பண்றது",
            "Research-ஐ skip பண்ணி வெறுமனே start பண்றது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Paper trading lets you practice with real historical data and no real financial risk before committing real money.",
          "hi": "Paper trading आपको real पैसा लगाने से पहले असली historical data और बिना असली financial risk के practice करने देता है।",
          "ta": "Paper trading, real பணத்தை commit பண்றதுக்கு முன், real historical data-உடன் real financial risk இல்லாம practice பண்ண உதவும்."
        }
      },
      {
        "question": {
          "en": "According to the lesson, what matters more for long-term success: consistency or occasional large bets?",
          "hi": "Lesson के अनुसार, long-term success के लिए क्या ज़्यादा मायने रखता है: consistency या कभी-कभार बड़े दांव?",
          "ta": "Lesson-ன் படி, long-term success-க்கு எது அதிகம் matter பண்ணும்: consistency இல்ல occasional large bets?"
        },
        "options": {
          "en": [
            "Occasional large, emotional bets",
            "Consistency — small, regular amounts invested over years",
            "Neither matters",
            "Only the size of the very first investment matters"
          ],
          "hi": [
            "कभी-कभार वाले बड़े, emotional दांव",
            "Consistency — सालों तक invest की गई छोटी, नियमित रकमें",
            "दोनों में से कोई मायने नहीं रखता",
            "सिर्फ पहले investment का size मायने रखता है"
          ],
          "ta": [
            "Occasional large, emotional bets",
            "Consistency — வருடக்கணக்கா invest பண்ண சின்ன, regular amounts",
            "இரண்டுமே matter பண்ணாது",
            "மிக முதல் investment-ன் size மட்டும் தான் matter பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The SIP boom demonstrates that steady, disciplined investing tends to outperform occasional large, emotional bets. 15. Glossary Review & Self-Check",
          "hi": "SIP boom दिखाता है कि steady, disciplined investing कभी-कभार वाले बड़े, emotional दांवों से बेहतर perform करती है।",
          "ta": "SIP boom demonstrate பண்றது, steady, disciplined investing occasional, large, emotional bets-ஐ விட outperform பண்ணும் tend-ஆ இருக்குனு."
        }
      }
    ]
  },
  {
    "id": 15,
    "tier": "Beginner",
    "title": {
      "en": "Glossary Review & Self-Check",
      "hi": "Glossary Review & Self-Check",
      "ta": "Glossary Review & Self-Check"
    },
    "opener": {
      "en": "Two weeks after finding that yellowed 1987 share certificate in her grandfather's trunk, Meera opened the app and, for the first time, didn't feel like a stranger to any of the words on the screen. Bid, ask, LTP, market cap, liquidity, IPO, stop-loss — each one now had a story attached to it, not just a definition.\n\n“You know,” she told Paati, “I think I finally understand what you meant, that first day. It really was never about the paper, or even the price. It was about understanding what you actually own, and why.”\n\nPaati just smiled and slid the old certificate back across the table. “Then you're ready for the next fifteen, kanna. This time, the stories get a little more interesting.”\n\nQuick Glossary — Lessons 1–14 at a Glance • Share/Stock: A unit of ownership in a company. • NSE / BSE: India's two main stock exchanges. • SEBI: The regulator overseeing India's stock markets. • Primary Market: Where new shares are sold for the first time (an IPO). • Secondary Market: Where existing shares are traded between investors daily. • Demat Account: Holds your shares electronically. • Bid / Ask / LTP: The best buy offer, best sell offer, and the price of the last completed trade. • Nifty 50 / Sensex: India's two headline market indices. • Market / Limit / Stop-Loss Order: Three different ways to instruct a trade — by speed, by price, or as a safety net. • Market Capitalization: Share price × total shares — the market's valuation of a whole company. • FII / DII: Foreign and domestic large institutional investors. • Volume / Liquidity: How much a stock trades, and how easily you can buy or sell it without moving its price. • T+1 Settlement: Shares and money change hands the working day after a trade. • Risk vs Reward: Higher potential gains always come with higher potential losses. • SIP: A fixed amount invested automatically at regular intervals, usually monthly.\n\nFINAL SELF-CHECK · TEST YOURSELF (8 QUESTIONS)\n\n1. A shareholder owns: A) A loan to the company B) Partial ownership in the company C) A government bond D) A fixed deposit Correct: B) Partial ownership in the company Why: Owning a share means owning a small real piece of the company, as Lesson 1 established.\n\n2. An IPO takes place in the: A) Secondary market B) Primary market C) Currency market D) Debt market Correct: B) Primary market Why: The very first sale of shares to the public happens in the primary market.\n\n3. Which order type activates only if the price moves against you? A) Market Order B) Limit Order C) Stop-Loss Order D) Bulk Order Correct: C) Stop-Loss Order Why: A stop-loss automatically triggers a sell to cap losses if the price falls to a set level.\n\n4. Market capitalization is calculated as: A) Revenue × profit margin B) Share price × total shares C) Total assets − total debt D) Number of branches × average sale Correct: B) Share price × total shares Why: This reflects the market's total valuation of the whole company.\n\n5. T+1 settlement means a trade is fully settled: A) Instantly B) The next working day C) After one month D) Only during Muhurat Trading Correct: B) The next working day Why: Indian markets settle trades one working day after execution.\n\n6. According to SEBI's own study cited in this book, most individual F&O traders: A) Made consistent profits B) Lost money overall C) Broke even exactly D) Were banned from trading Correct: B) Lost money overall Why: Roughly 9 out of 10 individual F&O traders lost money, underlining the risk of frequent, undisciplined trading.\n\n7. Diversification mainly helps by: A) Guaranteeing profits B) Reducing the impact of any single investment's failure on your whole portfolio C) Eliminating all risk D) Increasing brokerage fees Correct: B) Reducing the impact of any single investment's failure on your whole portfolio Why: Spreading investments limits the damage from any one bad outcome, as the Kingfisher story showed.\n\n8. A SIP (Systematic Investment Plan) is best described as: A) A one-time lump sum bet B) A small, fixed amount invested automatically at regular intervals C) A type of stop-loss order D) A government tax on trading Correct: B) A small, fixed amount invested automatically at regular intervals Why: SIPs build wealth through small, consistent, automated investments over time.\n\nINTERMEDIATE 16. Reading a Balance Sheet",
      "hi": "अपने दादाजी के trunk में वो पीला पड़ चुका 1987 का share certificate मिलने के दो हफ़्ते बाद, मीरा ने app खोला और पहली बार, screen पर किसी भी शब्द से अजनबी महसूस नहीं किया। Bid, ask, LTP, market cap, liquidity, IPO, stop-loss — अब हर एक के साथ एक कहानी जुड़ी थी, सिर्फ एक definition नहीं।\n\n“पता है,” उसने पाटी से कहा, “मुझे लगता है आखिर मुझे समझ आ गया कि तुम्हारा मतलब उस पहले दिन क्या था। ये कभी कागज़ के बारे में नहीं था, price के बारे में भी नहीं। ये इस बारे में था कि आप असल में क्या रखते हैं, और क्यों।”\n\nपाटी बस मुस्कु राई और पुराना certificate table के पार वापस सरका दिया। “तो तुम अगले पंद्रह के लिए तैयार हो, कन्ना। इस बार, कहानियाँ थोड़ी और दिलचस्प हो जाती हैं।”\n\nQuick Glossary — Lessons 1–14 एक नज़र में • Share/Stock: किसी कं पनी में ownership की एक unit।\n\n• NSE / BSE: भारत के दो मुख्य stock exchanges।\n\n• SEBI: भारत के stock markets की निगरानी करने वाला regulator। • Primary Market: जहाँ नए shares पहली बार बेचे जाते हैं (एक IPO)।\n\n• Secondary Market: जहाँ मौजूदा shares रोज़ investors के बीच trade होते हैं।\n\n• Demat Account: आपके shares electronically रखता है।\n\n• Bid / Ask / LTP: सबसे अच्छा buy offer, सबसे अच्छा sell offer, और आखिरी complete हुए trade का price।\n\n• Nifty 50 / Sensex: भारत के दो headline market indices।\n\n• Market / Limit / Stop-Loss Order: एक trade को instruct करने के तीन अलग तरीके — speed से, price से, या एक safety net के रूप में।\n\n• Market Capitalization: Share price × total shares — पूरी कं पनी की market की valuation।\n\n• FII / DII: Foreign और domestic बड़े institutional investors।\n\n• Volume / Liquidity: एक stock कितना trade होता है, और आप बिना उसका price हिलाए उसे कितनी आसानी से खरीद या बेच सकते हैं।\n\n• T+1 Settlement: एक trade के अगले working day shares और पैसा हाथ बदलते हैं।\n\n• Risk vs Reward: ज़्यादा potential gains हमेशा ज़्यादा potential losses के साथ आते हैं।\n\n• SIP: नियमित अंतराल पर, आमतौर पर हर महीने, automatically invest होने वाली एक fixed रकम।\n\nFINAL SELF-CHECK · खुद को टेस्ट करें (8 सवाल)\n\n1. एक shareholder किसका मालिक होता है: A) कं पनी को दिया गया एक loan B) कं पनी में आंशिक ownership C) एक government bond D) एक fixed deposit सही जवाब: B) कं पनी में आंशिक ownership क्यों: Share रखने का मतलब है कं पनी का एक छोटा असली हिस्सा रखना, जैसा Lesson 1 में बताया गया।\n\n2. एक IPO किसमें होता है: A) Secondary market B) Primary market C) Currency market D) Debt market सही जवाब: B) Primary market क्यों: जनता को shares की बिल्कुल पहली बिक्री primary market में होती है।\n\n3. कौन सा order type सिर्फ तभी activate होता है जब price आपके खिलाफ़ move करे? A) Market Order B) Limit Order C) Stop-Loss Order D) Bulk Order सही जवाब: C) Stop-Loss Order क्यों: अगर price एक set level तक गिरे तो एक stop-loss automatically losses को cap करने के लिए एक sell trigger करता है।\n\n4. Market capitalization कै से calculate होता है: A) Revenue × profit margin B) Share price × total shares C) Total assets − total debt D) Branches की संख्या × average sale सही जवाब: B) Share price × total shares क्यों: ये पूरी कं पनी की market की कुल valuation दिखाता है।\n\n5. T+1 settlement का मतलब है कि एक trade पूरी तरह settle होता है: A) तुरंत B) अगले working day C) एक महीने बाद D) सिर्फ Muhurat Trading के दौरान सही जवाब: B) अगले working day क्यों: भारतीय markets execution के एक working day बाद trades settle करते हैं।\n\n6. इस book में बताई गई SEBI की अपनी study के अनुसार, ज़्यादातर individual F&O traders: A) Consistent profits कमाते हैं B) Overall पैसा गंवाते हैं C) बिल्कुल break even करते हैं D) Trading से बैन कर दिए जाते हैं सही जवाब: B) Overall पैसा गंवाते हैं क्यों: लगभग 10 में से 9 individual F&O traders पैसा गंवाते हैं, जो बार-बार, undisciplined trading के risk को दिखाता है।\n\n7. Diversification मुख्यतः किससे मदद करता है: A) Profits guarantee करके B) किसी एक investment की असफलता का आपके पूरे portfolio पर असर कम करके C) सारा risk खत्म करके D) Brokerage fees बढ़ाकर सही जवाब: B) किसी एक investment की असफलता का आपके पूरे portfolio पर असर कम करके क्यों: Investments फै लाने से किसी एक बुरे नतीजे से नुकसान सीमित रहता है, जैसा Kingfisher की कहानी ने दिखाया।\n\n8. एक SIP (Systematic Investment Plan) को सबसे अच्छे से कै से describe किया जाता है: A) एक one-time lump sum दांव B) नियमित अंतराल पर automatically invest होने वाली एक छोटी, fixed रकम C) एक तरह का stop-loss order D) trading पर एक government tax सही जवाब: B) नियमित अंतराल पर automatically invest होने वाली एक छोटी, fixed रकम क्यों: SIPs समय के साथ छोटी, consistent, automated investments से wealth बनाते हैं।",
      "ta": "தன் தாத்தாவின் trunk-ல அந்த மஞ்சள் நிற 1987 share certificate-ஐ கண்டுபிடிச்சு இரண்டு வாரங்கள் கழித்து, மீரா app-ஐ open பண்ணினாள், முதன்முறையா screen-ல இருக்கிற எந்த வார்த்தைக்கும் ஒரு stranger மாதிரி feel ஆகல. Bid, ask, LTP, market cap, liquidity, IPO, stop-loss — ஒவ்வொண்ணுக்கும் இப்போ ஒரு story attach ஆகியிருந்துச்சு, வெறும் definition மட்டும் இல்ல.\n\n“தெரியுமா,” என்று பாட்டியிடம் சொன்னாள், “அந்த முதல் நாள் நீங்க என்ன சொன்னீங்கனு இப்போ finally புரியுதுனு நினைக்கிறேன். இது ஒருபோதும் caகிதத்தைப் பத்தியோ, விலையைப் பத்தியோ கூட இல்ல. நீங்க உண்மையில் என்னை சொந்தமாக்கியிருக்கீங்க, ஏன் என்பதைப் புரிஞ்சுக்குறதைப் பத்தி தான்.\n\nபாட்டி வெறுமனே புன்னகைச்சு, அந்தப் பழைய certificate-ஐ table-ல திரும்ப அவளிடம் நகர்த்தினார். “அப்போ நீ அடுத்த பதினைந்துக்கு தயார் கண்ணா. இந்த தடவை, stories இன்னும் கொஞ்சம் interesting ஆகும்.”\n\nQuick Glossary — Lessons 1–14, ஒரு Glance-ல • Share/Stock: ஒரு நிறுவனத்தில் ownership-ன் ஒரு unit.\n\n• NSE / BSE: இந்தியாவின் இரண்டு main stock exchanges.\n\n• SEBI: இந்தியாவின் stock markets-ஐ oversee பண்ற regulator.\n\n• Primary Market: புது shares முதன்முறையா விக்கப்படும் இடம் (ஒரு IPO).\n\n• Secondary Market: ஏற்கனவே இருக்கிற shares investors-க்கு இடையே தினமும் trade ஆகும் இடம்.\n\n• Demat Account: உங்க shares-ஐ electronic-ஆ வைச்சிருக்கும்.\n\n• Bid / Ask / LTP: Best buy offer, best sell offer, மற்றும் கடைசியா complete ஆன trade-ன் விலை.\n\n• Nifty 50 / Sensex: இந்தியாவின் இரண்டு headline market indices.\n\n• Market / Limit / Stop-Loss Order: Trade-ஐ instruct பண்ண மூன்று வெவ்வேறு வழிகள் — speed- ஆல, price-ஆல, அல்லது ஒரு safety net-ஆ.\n\n• Market Capitalization: Share price × total shares — முழு நிறுவனத்தின் market valuation.\n\n• FII / DII: Foreign மற்றும் domestic பெரிய institutional investors.\n\n• Volume / Liquidity: ஒரு stock எவ்வளவு trade ஆகுது, அதன் விலையை மாத்தாம எவ்வளவு எளிதா வாங்க/விக்க முடியும்.\n\n• T+1 Settlement: ஒரு trade நடந்த அடுத்த working day shares-உம் பணமும் கைமாறும்.\n\n• Risk vs Reward: Higher potential gains எப்போதும் higher potential losses-உடன் தான் வரும்.\n\n• SIP: Regular intervals-ல, usually monthly, automatic-ஆ invest ஆகுற ஒரு fixed amount.\n\nFINAL SELF-CHECK · சுயபரிசோதனை (8 கேள்விகள்)\n\n1. ஒரு shareholder எதை சொந்தமாக்கியிருக்காங்க: A) நிறுவனத்திற்கு ஒரு loan B) நிறுவனத்தில் Partial ownership C) ஒரு government bond D) ஒரு fixed deposit சரியான பதில்:B) நிறுவனத்தில் Partial ownership ஏன்:Lesson 1 establish பண்ணின மாதிரி, ஒரு share வைத்திருப்பது என்றால் நிறுவனத்தின் ஒரு சின்ன real பகுதியை சொந்தமாக்குறது.\n\n2. ஒரு IPO எந்த market-ல நடக்கும்: A) Secondary market B) Primary market C) Currency market D) Debt market சரியான பதில்:B) Primary market ஏன்:Shares-ன் மிக முதல் sale பொதுமக்களுக்கு primary market-ல தான் நடக்கும்.\n\n3. விலை உங்களுக்கு எதிரா move ஆனால் மட்டும் தான் எந்த order type activate ஆகும்: A) Market Order B) Limit Order C) Stop-Loss Order D) Bulk Order சரியான பதில்:C) Stop-Loss Order ஏன்:விலை ஒரு set level-க்கு விழுந்தா, losses-ஐ cap பண்ண ஒரு stop-loss automatic-ஆ sell-ஐ trigger பண்ணும்.\n\n4. Market capitalization எப்படி calculate பண்ணப்படும்: A) Revenue × profit margin B) Share price × total shares C) Total assets − total debt D) Number of branches × average sale சரியான பதில்:B) Share price × total shares ஏன்:இது முழு நிறுவனத்தின் market-ன் total valuation-ஐ reflect பண்ணும்.\n\n5. T+1 settlement என்றால், ஒரு trade முழுசா settle ஆகும்: A) Instantly B) அடுத்த working day C) ஒரு மாசம் கழித்து D) Muhurat Trading சமயத்தில் மட்டும் சரியான பதில்:B) அடுத்த working day ஏன்:Execution ஆன ஒரு working day கழித்து Indian markets trades-ஐ settle பண்ணும்.\n\n6. இந்தப் புத்தகத்தில் quote பண்ணப்பட்ட SEBI-ன் சொந்த study படி, பெரும்பாலான individual F&O traders: A) Consistent profits பண்ணினாங்க B) Overall-ஆ பணத்தை இழந்தாங்க C) சரியா break even ஆனாங்க D) Trading-லிருந்து ban பண்ணப்பட்டாங்க சரியான பதில்:B) Overall-ஆ பணத்தை இழந்தாங்க ஏன்:சுமார் 10-ல் 9 individual F&O traders பணத்தை இழந்தாங்க, frequent, undisciplined trading-ன் risk-ஐ underline பண்ணுது.\n\n7. Diversification முக்கியமா எப்படி உதவும்: A) Profits-ஐ guarantee பண்றதால் B) உங்க முழு portfolio-லும் ஒரே ஒரு investment-ன் failure-ன் impact-ஐ குறைப்பதால் C) எல்லா risk-ஐயும் eliminate பண்றதால் D) Brokerage fees-ஐ கூட்டுவதால் சரியான பதில்:B) உங்க முழு portfolio-லும் ஒரே ஒரு investment-ன் failure-ன் impact-ஐ குறைப்பதால் ஏன்:Kingfisher கதை காட்டின மாதிரி, investments-ஐ spread பண்றது ஒரு bad outcome-லிருந்து வரும் damage-ஐ limit பண்ணும்.\n\n8. ஒரு SIP (Systematic Investment Plan) எப்படி best describe ஆகும்: A) ஒரு one-time lump sum bet B) Regular intervals-ல automatic-ஆ invest ஆகுற ஒரு சின்ன, fixed amount C) ஒரு வகை stop-loss order D) Trading-ன் மேல ஒரு government tax சரியான பதில்:B) Regular intervals-ல automatic-ஆ invest ஆகுற ஒரு சின்ன, fixed amount ஏன்:SIPs சின்ன, consistent, automated investments மூலமா நேரம் ஆக wealth build பண்ணும்."
    },
    "body": {
      "en": "Two weeks after finding that yellowed 1987 share certificate in her grandfather's trunk, Meera opened the app and, for the first time, didn't feel like a stranger to any of the words on the screen. Bid, ask, LTP, market cap, liquidity, IPO, stop-loss — each one now had a story attached to it, not just a definition.\n\n“You know,” she told Paati, “I think I finally understand what you meant, that first day. It really was never about the paper, or even the price. It was about understanding what you actually own, and why.”\n\nPaati just smiled and slid the old certificate back across the table. “Then you're ready for the next fifteen, kanna. This time, the stories get a little more interesting.”\n\nQuick Glossary — Lessons 1–14 at a Glance • Share/Stock: A unit of ownership in a company. • NSE / BSE: India's two main stock exchanges. • SEBI: The regulator overseeing India's stock markets. • Primary Market: Where new shares are sold for the first time (an IPO). • Secondary Market: Where existing shares are traded between investors daily. • Demat Account: Holds your shares electronically. • Bid / Ask / LTP: The best buy offer, best sell offer, and the price of the last completed trade. • Nifty 50 / Sensex: India's two headline market indices. • Market / Limit / Stop-Loss Order: Three different ways to instruct a trade — by speed, by price, or as a safety net. • Market Capitalization: Share price × total shares — the market's valuation of a whole company. • FII / DII: Foreign and domestic large institutional investors. • Volume / Liquidity: How much a stock trades, and how easily you can buy or sell it without moving its price. • T+1 Settlement: Shares and money change hands the working day after a trade. • Risk vs Reward: Higher potential gains always come with higher potential losses. • SIP: A fixed amount invested automatically at regular intervals, usually monthly.\n\nFINAL SELF-CHECK · TEST YOURSELF (8 QUESTIONS)\n\n1. A shareholder owns: A) A loan to the company B) Partial ownership in the company C) A government bond D) A fixed deposit Correct: B) Partial ownership in the company Why: Owning a share means owning a small real piece of the company, as Lesson 1 established.\n\n2. An IPO takes place in the: A) Secondary market B) Primary market C) Currency market D) Debt market Correct: B) Primary market Why: The very first sale of shares to the public happens in the primary market.\n\n3. Which order type activates only if the price moves against you? A) Market Order B) Limit Order C) Stop-Loss Order D) Bulk Order Correct: C) Stop-Loss Order Why: A stop-loss automatically triggers a sell to cap losses if the price falls to a set level.\n\n4. Market capitalization is calculated as: A) Revenue × profit margin B) Share price × total shares C) Total assets − total debt D) Number of branches × average sale Correct: B) Share price × total shares Why: This reflects the market's total valuation of the whole company.\n\n5. T+1 settlement means a trade is fully settled: A) Instantly B) The next working day C) After one month D) Only during Muhurat Trading Correct: B) The next working day Why: Indian markets settle trades one working day after execution.\n\n6. According to SEBI's own study cited in this book, most individual F&O traders: A) Made consistent profits B) Lost money overall C) Broke even exactly D) Were banned from trading Correct: B) Lost money overall Why: Roughly 9 out of 10 individual F&O traders lost money, underlining the risk of frequent, undisciplined trading.\n\n7. Diversification mainly helps by: A) Guaranteeing profits B) Reducing the impact of any single investment's failure on your whole portfolio C) Eliminating all risk D) Increasing brokerage fees Correct: B) Reducing the impact of any single investment's failure on your whole portfolio Why: Spreading investments limits the damage from any one bad outcome, as the Kingfisher story showed.\n\n8. A SIP (Systematic Investment Plan) is best described as: A) A one-time lump sum bet B) A small, fixed amount invested automatically at regular intervals C) A type of stop-loss order D) A government tax on trading Correct: B) A small, fixed amount invested automatically at regular intervals Why: SIPs build wealth through small, consistent, automated investments over time.\n\nINTERMEDIATE 16. Reading a Balance Sheet",
      "hi": "अपने दादाजी के trunk में वो पीला पड़ चुका 1987 का share certificate मिलने के दो हफ़्ते बाद, मीरा ने app खोला और पहली बार, screen पर किसी भी शब्द से अजनबी महसूस नहीं किया। Bid, ask, LTP, market cap, liquidity, IPO, stop-loss — अब हर एक के साथ एक कहानी जुड़ी थी, सिर्फ एक definition नहीं।\n\n“पता है,” उसने पाटी से कहा, “मुझे लगता है आखिर मुझे समझ आ गया कि तुम्हारा मतलब उस पहले दिन क्या था। ये कभी कागज़ के बारे में नहीं था, price के बारे में भी नहीं। ये इस बारे में था कि आप असल में क्या रखते हैं, और क्यों।”\n\nपाटी बस मुस्कु राई और पुराना certificate table के पार वापस सरका दिया। “तो तुम अगले पंद्रह के लिए तैयार हो, कन्ना। इस बार, कहानियाँ थोड़ी और दिलचस्प हो जाती हैं।”\n\nQuick Glossary — Lessons 1–14 एक नज़र में • Share/Stock: किसी कं पनी में ownership की एक unit।\n\n• NSE / BSE: भारत के दो मुख्य stock exchanges।\n\n• SEBI: भारत के stock markets की निगरानी करने वाला regulator। • Primary Market: जहाँ नए shares पहली बार बेचे जाते हैं (एक IPO)।\n\n• Secondary Market: जहाँ मौजूदा shares रोज़ investors के बीच trade होते हैं।\n\n• Demat Account: आपके shares electronically रखता है।\n\n• Bid / Ask / LTP: सबसे अच्छा buy offer, सबसे अच्छा sell offer, और आखिरी complete हुए trade का price।\n\n• Nifty 50 / Sensex: भारत के दो headline market indices।\n\n• Market / Limit / Stop-Loss Order: एक trade को instruct करने के तीन अलग तरीके — speed से, price से, या एक safety net के रूप में।\n\n• Market Capitalization: Share price × total shares — पूरी कं पनी की market की valuation।\n\n• FII / DII: Foreign और domestic बड़े institutional investors।\n\n• Volume / Liquidity: एक stock कितना trade होता है, और आप बिना उसका price हिलाए उसे कितनी आसानी से खरीद या बेच सकते हैं।\n\n• T+1 Settlement: एक trade के अगले working day shares और पैसा हाथ बदलते हैं।\n\n• Risk vs Reward: ज़्यादा potential gains हमेशा ज़्यादा potential losses के साथ आते हैं।\n\n• SIP: नियमित अंतराल पर, आमतौर पर हर महीने, automatically invest होने वाली एक fixed रकम।\n\nFINAL SELF-CHECK · खुद को टेस्ट करें (8 सवाल)\n\n1. एक shareholder किसका मालिक होता है: A) कं पनी को दिया गया एक loan B) कं पनी में आंशिक ownership C) एक government bond D) एक fixed deposit सही जवाब: B) कं पनी में आंशिक ownership क्यों: Share रखने का मतलब है कं पनी का एक छोटा असली हिस्सा रखना, जैसा Lesson 1 में बताया गया।\n\n2. एक IPO किसमें होता है: A) Secondary market B) Primary market C) Currency market D) Debt market सही जवाब: B) Primary market क्यों: जनता को shares की बिल्कुल पहली बिक्री primary market में होती है।\n\n3. कौन सा order type सिर्फ तभी activate होता है जब price आपके खिलाफ़ move करे? A) Market Order B) Limit Order C) Stop-Loss Order D) Bulk Order सही जवाब: C) Stop-Loss Order क्यों: अगर price एक set level तक गिरे तो एक stop-loss automatically losses को cap करने के लिए एक sell trigger करता है।\n\n4. Market capitalization कै से calculate होता है: A) Revenue × profit margin B) Share price × total shares C) Total assets − total debt D) Branches की संख्या × average sale सही जवाब: B) Share price × total shares क्यों: ये पूरी कं पनी की market की कुल valuation दिखाता है।\n\n5. T+1 settlement का मतलब है कि एक trade पूरी तरह settle होता है: A) तुरंत B) अगले working day C) एक महीने बाद D) सिर्फ Muhurat Trading के दौरान सही जवाब: B) अगले working day क्यों: भारतीय markets execution के एक working day बाद trades settle करते हैं।\n\n6. इस book में बताई गई SEBI की अपनी study के अनुसार, ज़्यादातर individual F&O traders: A) Consistent profits कमाते हैं B) Overall पैसा गंवाते हैं C) बिल्कुल break even करते हैं D) Trading से बैन कर दिए जाते हैं सही जवाब: B) Overall पैसा गंवाते हैं क्यों: लगभग 10 में से 9 individual F&O traders पैसा गंवाते हैं, जो बार-बार, undisciplined trading के risk को दिखाता है।\n\n7. Diversification मुख्यतः किससे मदद करता है: A) Profits guarantee करके B) किसी एक investment की असफलता का आपके पूरे portfolio पर असर कम करके C) सारा risk खत्म करके D) Brokerage fees बढ़ाकर सही जवाब: B) किसी एक investment की असफलता का आपके पूरे portfolio पर असर कम करके क्यों: Investments फै लाने से किसी एक बुरे नतीजे से नुकसान सीमित रहता है, जैसा Kingfisher की कहानी ने दिखाया।\n\n8. एक SIP (Systematic Investment Plan) को सबसे अच्छे से कै से describe किया जाता है: A) एक one-time lump sum दांव B) नियमित अंतराल पर automatically invest होने वाली एक छोटी, fixed रकम C) एक तरह का stop-loss order D) trading पर एक government tax सही जवाब: B) नियमित अंतराल पर automatically invest होने वाली एक छोटी, fixed रकम क्यों: SIPs समय के साथ छोटी, consistent, automated investments से wealth बनाते हैं।",
      "ta": "தன் தாத்தாவின் trunk-ல அந்த மஞ்சள் நிற 1987 share certificate-ஐ கண்டுபிடிச்சு இரண்டு வாரங்கள் கழித்து, மீரா app-ஐ open பண்ணினாள், முதன்முறையா screen-ல இருக்கிற எந்த வார்த்தைக்கும் ஒரு stranger மாதிரி feel ஆகல. Bid, ask, LTP, market cap, liquidity, IPO, stop-loss — ஒவ்வொண்ணுக்கும் இப்போ ஒரு story attach ஆகியிருந்துச்சு, வெறும் definition மட்டும் இல்ல.\n\n“தெரியுமா,” என்று பாட்டியிடம் சொன்னாள், “அந்த முதல் நாள் நீங்க என்ன சொன்னீங்கனு இப்போ finally புரியுதுனு நினைக்கிறேன். இது ஒருபோதும் caகிதத்தைப் பத்தியோ, விலையைப் பத்தியோ கூட இல்ல. நீங்க உண்மையில் என்னை சொந்தமாக்கியிருக்கீங்க, ஏன் என்பதைப் புரிஞ்சுக்குறதைப் பத்தி தான்.\n\nபாட்டி வெறுமனே புன்னகைச்சு, அந்தப் பழைய certificate-ஐ table-ல திரும்ப அவளிடம் நகர்த்தினார். “அப்போ நீ அடுத்த பதினைந்துக்கு தயார் கண்ணா. இந்த தடவை, stories இன்னும் கொஞ்சம் interesting ஆகும்.”\n\nQuick Glossary — Lessons 1–14, ஒரு Glance-ல • Share/Stock: ஒரு நிறுவனத்தில் ownership-ன் ஒரு unit.\n\n• NSE / BSE: இந்தியாவின் இரண்டு main stock exchanges.\n\n• SEBI: இந்தியாவின் stock markets-ஐ oversee பண்ற regulator.\n\n• Primary Market: புது shares முதன்முறையா விக்கப்படும் இடம் (ஒரு IPO).\n\n• Secondary Market: ஏற்கனவே இருக்கிற shares investors-க்கு இடையே தினமும் trade ஆகும் இடம்.\n\n• Demat Account: உங்க shares-ஐ electronic-ஆ வைச்சிருக்கும்.\n\n• Bid / Ask / LTP: Best buy offer, best sell offer, மற்றும் கடைசியா complete ஆன trade-ன் விலை.\n\n• Nifty 50 / Sensex: இந்தியாவின் இரண்டு headline market indices.\n\n• Market / Limit / Stop-Loss Order: Trade-ஐ instruct பண்ண மூன்று வெவ்வேறு வழிகள் — speed- ஆல, price-ஆல, அல்லது ஒரு safety net-ஆ.\n\n• Market Capitalization: Share price × total shares — முழு நிறுவனத்தின் market valuation.\n\n• FII / DII: Foreign மற்றும் domestic பெரிய institutional investors.\n\n• Volume / Liquidity: ஒரு stock எவ்வளவு trade ஆகுது, அதன் விலையை மாத்தாம எவ்வளவு எளிதா வாங்க/விக்க முடியும்.\n\n• T+1 Settlement: ஒரு trade நடந்த அடுத்த working day shares-உம் பணமும் கைமாறும்.\n\n• Risk vs Reward: Higher potential gains எப்போதும் higher potential losses-உடன் தான் வரும்.\n\n• SIP: Regular intervals-ல, usually monthly, automatic-ஆ invest ஆகுற ஒரு fixed amount.\n\nFINAL SELF-CHECK · சுயபரிசோதனை (8 கேள்விகள்)\n\n1. ஒரு shareholder எதை சொந்தமாக்கியிருக்காங்க: A) நிறுவனத்திற்கு ஒரு loan B) நிறுவனத்தில் Partial ownership C) ஒரு government bond D) ஒரு fixed deposit சரியான பதில்:B) நிறுவனத்தில் Partial ownership ஏன்:Lesson 1 establish பண்ணின மாதிரி, ஒரு share வைத்திருப்பது என்றால் நிறுவனத்தின் ஒரு சின்ன real பகுதியை சொந்தமாக்குறது.\n\n2. ஒரு IPO எந்த market-ல நடக்கும்: A) Secondary market B) Primary market C) Currency market D) Debt market சரியான பதில்:B) Primary market ஏன்:Shares-ன் மிக முதல் sale பொதுமக்களுக்கு primary market-ல தான் நடக்கும்.\n\n3. விலை உங்களுக்கு எதிரா move ஆனால் மட்டும் தான் எந்த order type activate ஆகும்: A) Market Order B) Limit Order C) Stop-Loss Order D) Bulk Order சரியான பதில்:C) Stop-Loss Order ஏன்:விலை ஒரு set level-க்கு விழுந்தா, losses-ஐ cap பண்ண ஒரு stop-loss automatic-ஆ sell-ஐ trigger பண்ணும்.\n\n4. Market capitalization எப்படி calculate பண்ணப்படும்: A) Revenue × profit margin B) Share price × total shares C) Total assets − total debt D) Number of branches × average sale சரியான பதில்:B) Share price × total shares ஏன்:இது முழு நிறுவனத்தின் market-ன் total valuation-ஐ reflect பண்ணும்.\n\n5. T+1 settlement என்றால், ஒரு trade முழுசா settle ஆகும்: A) Instantly B) அடுத்த working day C) ஒரு மாசம் கழித்து D) Muhurat Trading சமயத்தில் மட்டும் சரியான பதில்:B) அடுத்த working day ஏன்:Execution ஆன ஒரு working day கழித்து Indian markets trades-ஐ settle பண்ணும்.\n\n6. இந்தப் புத்தகத்தில் quote பண்ணப்பட்ட SEBI-ன் சொந்த study படி, பெரும்பாலான individual F&O traders: A) Consistent profits பண்ணினாங்க B) Overall-ஆ பணத்தை இழந்தாங்க C) சரியா break even ஆனாங்க D) Trading-லிருந்து ban பண்ணப்பட்டாங்க சரியான பதில்:B) Overall-ஆ பணத்தை இழந்தாங்க ஏன்:சுமார் 10-ல் 9 individual F&O traders பணத்தை இழந்தாங்க, frequent, undisciplined trading-ன் risk-ஐ underline பண்ணுது.\n\n7. Diversification முக்கியமா எப்படி உதவும்: A) Profits-ஐ guarantee பண்றதால் B) உங்க முழு portfolio-லும் ஒரே ஒரு investment-ன் failure-ன் impact-ஐ குறைப்பதால் C) எல்லா risk-ஐயும் eliminate பண்றதால் D) Brokerage fees-ஐ கூட்டுவதால் சரியான பதில்:B) உங்க முழு portfolio-லும் ஒரே ஒரு investment-ன் failure-ன் impact-ஐ குறைப்பதால் ஏன்:Kingfisher கதை காட்டின மாதிரி, investments-ஐ spread பண்றது ஒரு bad outcome-லிருந்து வரும் damage-ஐ limit பண்ணும்.\n\n8. ஒரு SIP (Systematic Investment Plan) எப்படி best describe ஆகும்: A) ஒரு one-time lump sum bet B) Regular intervals-ல automatic-ஆ invest ஆகுற ஒரு சின்ன, fixed amount C) ஒரு வகை stop-loss order D) Trading-ன் மேல ஒரு government tax சரியான பதில்:B) Regular intervals-ல automatic-ஆ invest ஆகுற ஒரு சின்ன, fixed amount ஏன்:SIPs சின்ன, consistent, automated investments மூலமா நேரம் ஆக wealth build பண்ணும்."
    },
    "quiz": [
      {
        "question": {
          "en": "A shareholder owns:",
          "hi": "एक shareholder किसका मालिक होता है:",
          "ta": "ஒரு shareholder எதை சொந்தமாக்கியிருக்காங்க:"
        },
        "options": {
          "en": [
            "A loan to the company",
            "Partial ownership in the company",
            "A government bond",
            "A fixed deposit"
          ],
          "hi": [
            "कं पनी को दिया गया एक loan",
            "कं पनी में आंशिक ownership",
            "एक government bond",
            "एक fixed deposit"
          ],
          "ta": [
            "நிறுவனத்திற்கு ஒரு loan",
            "நிறுவனத்தில் Partial ownership",
            "ஒரு government bond",
            "ஒரு fixed deposit"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Owning a share means owning a small real piece of the company, as Lesson 1 established.",
          "hi": "Share रखने का मतलब है कं पनी का एक छोटा असली हिस्सा रखना, जैसा Lesson 1 में बताया गया।",
          "ta": "Lesson 1 establish பண்ணின மாதிரி, ஒரு share வைத்திருப்பது என்றால் நிறுவனத்தின் ஒரு சின்ன real பகுதியை சொந்தமாக்குறது."
        }
      },
      {
        "question": {
          "en": "An IPO takes place in the:",
          "hi": "एक IPO किसमें होता है:",
          "ta": "ஒரு IPO எந்த market-ல நடக்கும்:"
        },
        "options": {
          "en": [
            "Secondary market",
            "Primary market",
            "Currency market",
            "Debt market"
          ],
          "hi": [
            "Secondary market",
            "Primary market",
            "Currency market",
            "Debt market"
          ],
          "ta": [
            "Secondary market",
            "Primary market",
            "Currency market",
            "Debt market"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The very first sale of shares to the public happens in the primary market.",
          "hi": "जनता को shares की बिल्कुल पहली बिक्री primary market में होती है।",
          "ta": "Shares-ன் மிக முதல் sale பொதுமக்களுக்கு primary market-ல தான் நடக்கும்."
        }
      },
      {
        "question": {
          "en": "Which order type activates only if the price moves against you?",
          "hi": "कौन सा order type सिर्फ तभी activate होता है जब price आपके खिलाफ़ move करे?",
          "ta": "விலை உங்களுக்கு எதிரா move ஆனால் மட்டும் தான் எந்த order type activate ஆகும்:"
        },
        "options": {
          "en": [
            "Market Order",
            "Limit Order",
            "Stop-Loss Order",
            "Bulk Order"
          ],
          "hi": [
            "Market Order",
            "Limit Order",
            "Stop-Loss Order",
            "Bulk Order"
          ],
          "ta": [
            "Market Order",
            "Limit Order",
            "Stop-Loss Order",
            "Bulk Order"
          ]
        },
        "correctIndex": 2,
        "explanation": {
          "en": "A stop-loss automatically triggers a sell to cap losses if the price falls to a set level.",
          "hi": "अगर price एक set level तक गिरे तो एक stop-loss automatically losses को cap करने के लिए एक sell trigger करता है।",
          "ta": "விலை ஒரு set level-க்கு விழுந்தா, losses-ஐ cap பண்ண ஒரு stop-loss automatic-ஆ sell-ஐ trigger பண்ணும்."
        }
      },
      {
        "question": {
          "en": "Market capitalization is calculated as:",
          "hi": "Market capitalization कै से calculate होता है:",
          "ta": "Market capitalization எப்படி calculate பண்ணப்படும்:"
        },
        "options": {
          "en": [
            "Revenue × profit margin",
            "Share price × total shares",
            "Total assets − total debt",
            "Number of branches × average sale"
          ],
          "hi": [
            "Revenue × profit margin",
            "Share price × total shares",
            "Total assets − total debt",
            "Branches की संख्या × average sale"
          ],
          "ta": [
            "Revenue × profit margin",
            "Share price × total shares",
            "Total assets − total debt",
            "Number of branches × average sale"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This reflects the market's total valuation of the whole company.",
          "hi": "ये पूरी कं पनी की market की कुल valuation दिखाता है।",
          "ta": "இது முழு நிறுவனத்தின் market-ன் total valuation-ஐ reflect பண்ணும்."
        }
      },
      {
        "question": {
          "en": "T+1 settlement means a trade is fully settled:",
          "hi": "T+1 settlement का मतलब है कि एक trade पूरी तरह settle होता है:",
          "ta": "T+1 settlement என்றால், ஒரு trade முழுசா settle ஆகும்:"
        },
        "options": {
          "en": [
            "Instantly",
            "The next working day",
            "After one month",
            "Only during Muhurat Trading"
          ],
          "hi": [
            "तुरंत",
            "अगले working day",
            "एक महीने बाद",
            "सिर्फ Muhurat Trading के दौरान"
          ],
          "ta": [
            "Instantly",
            "அடுத்த working day",
            "ஒரு மாசம் கழித்து",
            "Muhurat Trading சமயத்தில் மட்டும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Indian markets settle trades one working day after execution.",
          "hi": "भारतीय markets execution के एक working day बाद trades settle करते हैं।",
          "ta": "Execution ஆன ஒரு working day கழித்து Indian markets trades-ஐ settle பண்ணும்."
        }
      },
      {
        "question": {
          "en": "According to SEBI's own study cited in this book, most individual F&O traders:",
          "hi": "इस book में बताई गई SEBI की अपनी study के अनुसार, ज़्यादातर individual F&O traders:",
          "ta": "இந்தப் புத்தகத்தில் quote பண்ணப்பட்ட SEBI-ன் சொந்த study படி, பெரும்பாலான individual F&O traders:"
        },
        "options": {
          "en": [
            "Made consistent profits",
            "Lost money overall",
            "Broke even exactly",
            "Were banned from trading"
          ],
          "hi": [
            "Consistent profits कमाते हैं",
            "Overall पैसा गंवाते हैं",
            "बिल्कुल break even करते हैं",
            "Trading से बैन कर दिए जाते हैं"
          ],
          "ta": [
            "Consistent profits பண்ணினாங்க",
            "Overall-ஆ பணத்தை இழந்தாங்க",
            "சரியா break even ஆனாங்க",
            "Trading-லிருந்து ban பண்ணப்பட்டாங்க"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Roughly 9 out of 10 individual F&O traders lost money, underlining the risk of frequent, undisciplined trading.",
          "hi": "लगभग 10 में से 9 individual F&O traders पैसा गंवाते हैं, जो बार-बार, undisciplined trading के risk को दिखाता है।",
          "ta": "சுமார் 10-ல் 9 individual F&O traders பணத்தை இழந்தாங்க, frequent, undisciplined trading-ன் risk-ஐ underline பண்ணுது."
        }
      },
      {
        "question": {
          "en": "Diversification mainly helps by:",
          "hi": "Diversification मुख्यतः किससे मदद करता है:",
          "ta": "Diversification முக்கியமா எப்படி உதவும்:"
        },
        "options": {
          "en": [
            "Guaranteeing profits",
            "Reducing the impact of any single investment's failure on your whole portfolio",
            "Eliminating all risk",
            "Increasing brokerage fees"
          ],
          "hi": [
            "Profits guarantee करके",
            "किसी एक investment की असफलता का आपके पूरे portfolio पर असर कम करके",
            "सारा risk खत्म करके",
            "Brokerage fees बढ़ाकर"
          ],
          "ta": [
            "Profits-ஐ guarantee பண்றதால்",
            "உங்க முழு portfolio-லும் ஒரே ஒரு investment-ன் failure-ன் impact-ஐ குறைப்பதால்",
            "எல்லா risk-ஐயும் eliminate பண்றதால்",
            "Brokerage fees-ஐ கூட்டுவதால்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Spreading investments limits the damage from any one bad outcome, as the Kingfisher story showed.",
          "hi": "Investments फै लाने से किसी एक बुरे नतीजे से नुकसान सीमित रहता है, जैसा Kingfisher की कहानी ने दिखाया।",
          "ta": "Kingfisher கதை காட்டின மாதிரி, investments-ஐ spread பண்றது ஒரு bad outcome-லிருந்து வரும் damage-ஐ limit பண்ணும்."
        }
      },
      {
        "question": {
          "en": "A SIP (Systematic Investment Plan) is best described as:",
          "hi": "एक SIP (Systematic Investment Plan) को सबसे अच्छे से कै से describe किया जाता है:",
          "ta": "ஒரு SIP (Systematic Investment Plan) எப்படி best describe ஆகும்:"
        },
        "options": {
          "en": [
            "A one-time lump sum bet",
            "A small, fixed amount invested automatically at regular intervals",
            "A type of stop-loss order",
            "A government tax on trading"
          ],
          "hi": [
            "एक one-time lump sum दांव",
            "नियमित अंतराल पर automatically invest होने वाली एक छोटी, fixed रकम",
            "एक तरह का stop-loss order",
            "trading पर एक government tax"
          ],
          "ta": [
            "ஒரு one-time lump sum bet",
            "Regular intervals-ல automatic-ஆ invest ஆகுற ஒரு சின்ன, fixed amount",
            "ஒரு வகை stop-loss order",
            "Trading-ன் மேல ஒரு government tax"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "SIPs build wealth through small, consistent, automated investments over time. INTERMEDIATE 16. Reading a Balance Sheet",
          "hi": "SIPs समय के साथ छोटी, consistent, automated investments से wealth बनाते हैं।",
          "ta": "SIPs சின்ன, consistent, automated investments மூலமா நேரம் ஆக wealth build பண்ணும்."
        }
      }
    ]
  },
  {
    "id": 16,
    "tier": "Intermediate",
    "title": {
      "en": "Reading a Balance Sheet",
      "hi": "Balance Sheet पढ़ ना",
      "ta": "ஒரு Balance Sheet படிப்பது"
    },
    "opener": {
      "en": "Six months into real investing, Meera got a job offer analysing small companies for a local investment club. Her first assignment: read a company's balance sheet and say whether she'd trust it with her own money. She had no idea where to start.\n\n“A balance sheet is just one simple sentence, broken into three parts,” Paati said. “What the company owns, what it owes, and what's left over for owners like you.”",
      "hi": "असली investing शुरू किए छह महीने बाद, मीरा को एक local investment club के लिए छोटी कं पनियों को analyse करने का job offer मिला। उसका पहला assignment: एक कं पनी की balance sheet पढ़ ना और बताना कि क्या वो अपना पैसा उस पर trust करेगी। उसे पता नहीं था कहाँ से शुरू करे।\n\n“एक balance sheet बस एक simple sentence है, तीन हिस्सों में टूटा हुआ,” पाटी ने कहा। “कं पनी के पास क्या है, कं पनी पर क्या बकाया है, और तुम्हारे जैसे owners के लिए क्या बचता है।”",
      "ta": "Real investing ஆரம்பிச்சு ஆறு மாசம் கழித்து, மீராவுக்கு ஒரு local investment club-க்காக சின்ன நிறுவனங்களை analyse பண்ற job offer வந்துச்சு. அவளோட முதல் assignment: ஒரு நிறுவனத்தின் balance sheet-ஐ படிச்சு, அதோட தன் சொந்த பணத்தை trust பண்ணுவாளானு சொல்லணும். எங்க ஆரம்பிக்கணும்னே தெரியல அவளுக்கு.\n\n“ஒரு balance sheet வெறும் ஒரு simple sentence தான், மூணு பகுதிகளா break ஆகியிருக்கும்,” பாட்டி சொன்னார். “நிறுவனம் என்ன சொந்தமாக்கியிருக்கு, என்ன கடன்பட்டிருக்கு, உங்களைப் போன்ற owners-க்கு என்ன மிச்சம் இருக்கு.”"
    },
    "realStorySubtitle": {
      "en": "The Infrastructure Giant Whose Balance Sheet Hid the Truth",
      "hi": "Infrastructure Giant जिसकी Balance Sheet ने सच छु पाया",
      "ta": "Balance Sheet உண்மையை மறைச்ச Infrastructure Giant"
    },
    "realStoryBody": {
      "en": "IL&FS was a well-respected infrastructure financing group that suddenly defaulted on its debt repayments in 2018, shocking the market. Investors and rating agencies had trusted its balance sheet for years — but it had quietly built up enormous, poorly disclosed debt against long-term, hard-to-sell infrastructure assets.\n\nThe default triggered a liquidity crunch across India's entire NBFC (non-banking finance) sector, since so many other institutions had lent to or invested alongside IL&FS. It remains one of the strongest real arguments for actually reading a company's balance sheet yourself — total assets and impressive projects mean little if liabilities are quietly outgrowing them.",
      "hi": "IL&FS एक respected infrastructure financing group थी जो 2018 में अचानक अपने debt repayments पर default कर गई, जिससे market को झटका लगा। Investors और rating agencies सालों से इसकी balance sheet पर trust करते थे — लेकिन इसने चुपचाप long-term, बेचने में मुश्किल infrastructure assets के खिलाफ़ भारी, poorly disclosed debt बना लिया था।\n\nइस default ने पूरे भारत के NBFC (non-banking finance) sector में एक liquidity crunch trigger कर दी, क्योंकि इतने सारे दूसरे institutions ने IL&FS को loan दिया था या उसके साथ invest किया था। ये अब भी खुद एक कं पनी की balance sheet पढ़ ने के सबसे मज़ बूत असली arguments में से एक है — total assets और impressive projects का कोई मतलब नहीं अगर liabilities चुपचाप उनसे आगे निकल रही हों।",
      "ta": "IL&FS ஒரு well-respected infrastructure financing group, 2018-ல திடீரென்று தன் debt repayments- ல default ஆகி market-ஐ shock பண்ணுச்சு. Investors-உம் rating agencies-உம் வருடக்கணக்கா அதோட balance sheet-ஐ trust பண்ணி இருந்தாங்க — ஆனா அது அமைதியா, long-term, sell பண்ண கஷ்டமான infrastructure assets-க்கு எதிரா poorly disclosed, enormous debt-ஐ கட்டியிருந்துச்சு.\n\nஇந்த default இந்தியாவின் முழு NBFC (non-banking finance) sector முழுக்கவும் ஒரு liquidity crunch-ஐ trigger பண்ணுச்சு, ஏன்னா நிறைய institutions IL&FS-க்கு loan கொடுத்தோ, அதனுடன் சேர்ந்து invest பண்ணியோ இருந்தாங்க. நீங்களே ஒரு நிறுவனத்தின் balance sheet-ஐ படிக்கணும்னதுக்கு இன்னும் இருக்கிற மிக strong-ஆன real arguments-ல இது ஒண்ணா இருக்கு — liabilities அமைதியா அவற்றை outgrow பண்ணிக்கிட்டிருந்தா, total assets-உம் impressive projects-உம் ரொம்ப meaning ஆகாது."
    },
    "body": {
      "en": "The Three Parts of a Balance Sheet • Assets: Everything the company owns or is owed — cash, inventory, factories, land, receivables from customers. • Liabilities: Everything the company owes — bank loans, bonds, unpaid supplier bills. • Shareholders' Equity: What's left for owners after subtracting liabilities from assets — the company's real net worth.\n\nThe Equation That Always Holds Assets = Liabilities + Shareholders' Equity. This must always balance — hence the name. A company can look impressive on the assets side while its liabilities side quietly grows faster, which is exactly the pattern that caught up with IL&FS.\n\nThe balance sheet equation: what a company owns vs. what it owes and what's left for owners.",
      "hi": "Balance Sheet के तीन हिस्से • Assets: कं पनी के पास जो कुछ है या जो उसे मिलना है — cash, inventory, factories, ज़ मीन, customers से receivables।\n\n• Liabilities: कं पनी पर जो कुछ बकाया है — bank loans, bonds, suppliers के unpaid bills।\n\n• Shareholders' Equity: Assets में से liabilities घटाने के बाद owners के लिए जो बचता है — कं पनी की असली net worth।\n\nवो Equation जो हमेशा सही रहता है Assets = Liabilities + Shareholders' Equity। ये हमेशा balance होना चाहिए — इसीलिए इसका नाम भी यही है। एक कं पनी assets side पर impressive लग सकती है जबकि उसका liabilities side चुपचाप उससे तेज़ बढ़ रहा हो, ठीक यही pattern IL&FS को ले डूबा।\n\nBalance sheet equation: कं पनी के पास क्या है vs. उस पर क्या owe है, owners के लिए क्या बचता है।",
      "ta": "Balance Sheet-ன் மூன்று பகுதிகள் • Assets: நிறுவனம் சொந்தமாக்கியிருக்கிறது அல்லது கடன் கொடுத்திருக்கிறது எல்லாம் — cash, inventory, factories, land, customers-லிருந்து receivables.\n\n• Liabilities: நிறுவனம் கடன்பட்டிருக்கிறது எல்லாம் — bank loans, bonds, unpaid supplier bills.\n\n• Shareholders' Equity: Assets-லிருந்து liabilities-ஐ கழிச்ச பிறகு owners-க்கு மிச்சம் இருக்கிறது — நிறுவனத்தின் real net worth.\n\nஎப்போதும் Balance ஆகும் Equation Assets = Liabilities + Shareholders' Equity. இது எப்போதும் balance ஆகணும் — அதனால் தான் அந்த பெயர். Liabilities side அமைதியா வேகமா வளர்ந்துக்கிட்டிருக்கும்போது, ஒரு நிறுவனம் assets side-ல impressive-ஆ தெரியலாம் — IL&FS-ஐ catch பண்ணின pattern சரியா இதுதான்.\n\nBalance sheet equation: நிறுவனம் என்ன சொந்தமாக்கியிருக்கு vs. என்ன கடன்பட்டிருக்கு, owners-க்கு என்ன மிச்சம்."
    },
    "keyTakeaway": {
      "en": "A balance sheet is a snapshot of financial health at one point in time. Large assets are only",
      "hi": "एक balance sheet एक समय पर financial health की एक snapshot है। बड़े assets तभी अच्छी खबर हैं जब liabilities उनसे तेज़ न बढ़ रही हों — जैसा IL&FS ने साबित किया, एक trusted नाम और एक impressive asset base खुद debt side चेक करने का विकल्प नहीं है।",
      "ta": "ஒரு balance sheet, ஒரு point-ல financial health-ன் ஒரு snapshot. Liabilities வேகமா growth ஆகலைனா மட்டும் தான் பெரிய assets நல்ல செய்தி — IL&FS prove பண்ணின மாதிரி, ஒரு trusted பெயரும் impressive asset base-உம், debt side-ஐ நீங்களே check பண்றதுக்கு substitute இல்ல."
    },
    "quiz": [
      {
        "question": {
          "en": "What does a balance sheet show?",
          "hi": "एक balance sheet क्या दिखाती है?",
          "ta": "ஒரு balance sheet எதைக் காட்டும்?"
        },
        "options": {
          "en": [
            "Only a company's profit for the year",
            "What a company owns, owes, and what's left over for owners",
            "Only cash transactions",
            "A company's stock price history"
          ],
          "hi": [
            "सिर्फ साल के लिए कं पनी का profit",
            "कं पनी के पास क्या है, उस पर क्या बकाया है, और owners के लिए क्या बचता है",
            "सिर्फ cash transactions",
            "कं पनी के stock price का इतिहास"
          ],
          "ta": [
            "வருடத்திற்கு நிறுவனத்தின் profit மட்டும்",
            "ஒரு நிறுவனம் என்ன சொந்தமாக்கியிருக்கு, கடன்பட்டிருக்கு, owners-க்கு என்ன மிச்சம்",
            "Cash transactions மட்டும்",
            "நிறுவனத்தின் stock price history"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "It's a snapshot of assets, liabilities, and shareholders' equity at one point in time.",
          "hi": "ये एक समय पर assets, liabilities, और shareholders' equity की एक snapshot है।",
          "ta": "ஒரு point-ல assets, liabilities, shareholders' equity-ன் ஒரு snapshot இது."
        }
      },
      {
        "question": {
          "en": "What is the fundamental balance sheet equation?",
          "hi": "Fundamental balance sheet equation क्या है?",
          "ta": "Fundamental balance sheet equation என்ன?"
        },
        "options": {
          "en": [
            "Assets = Liabilities + Shareholders' Equity",
            "Assets = Revenue − Expenses",
            "Assets = Profit × Shares",
            "Assets = Liabilities − Equity"
          ],
          "hi": [
            "Assets = Liabilities + Shareholders' Equity",
            "Assets = Revenue − Expenses",
            "Assets = Profit × Shares",
            "Assets = Liabilities − Equity"
          ],
          "ta": [
            "Assets = Liabilities + Shareholders' Equity",
            "Assets = Revenue − Expenses",
            "Assets = Profit × Shares",
            "Assets = Liabilities − Equity"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "This equation must always hold true — it's the structural basis of a balance sheet.",
          "hi": "ये equation हमेशा सही होना चाहिए — ये balance sheet का structural आधार है।",
          "ta": "இந்த equation எப்போதும் true-ஆ இருக்கணும் — இது balance sheet-ன் structural basis."
        }
      },
      {
        "question": {
          "en": "What went wrong with IL&FS, according to the story?",
          "hi": "कहानी के अनुसार, IL&FS के साथ क्या गलत हुआ?",
          "ta": "கதையின் படி, IL&FS-க்கு என்ன தப்பு நடந்துச்சு?"
        },
        "options": {
          "en": [
            "It had too much cash",
            "It built up large, poorly disclosed debt against hard-to-sell assets, then defaulted",
            "It was a small, unknown company nobody trusted",
            "It never had any assets"
          ],
          "hi": [
            "उसके पास बहुत ज़्यादा cash था",
            "उसने बेचने में मुश्किल assets के खिलाफ़ भारी, poorly disclosed debt बना लिया, फिर default कर गई",
            "वो एक छोटी, अनजान कं पनी थी जिस पर कोई trust नहीं करता था",
            "उसके पास कभी कोई assets नहीं थे"
          ],
          "ta": [
            "அதிகமா cash இருந்துச்சு",
            "Sell பண்ண கஷ்டமான assets-க்கு எதிரா பெரிய, poorly disclosed debt-ஐ கட்டி, பிறகு default ஆயிடுச்சு",
            "யாருமே trust பண்ணாத சின்ன, unknown நிறுவனம்",
            "அதுக்கு assets-ஏ இருந்ததில்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Its liabilities quietly outgrew its ability to service them, despite an impressive-looking asset base.",
          "hi": "एक impressive दिखने वाली asset base के बावजूद, उसकी liabilities चुपचाप उसे चुकाने की क्षमता से आगे निकल गईं।",
          "ta": "Impressive-ஆ தெரிஞ்ச asset base இருந்தாலும், liabilities அதை service பண்ற ability-ஐ அமைதியா outgrow பண்ணிடுச்சு."
        }
      },
      {
        "question": {
          "en": "What does 'shareholders' equity' represent?",
          "hi": "'Shareholders' equity' क्या represent करती है?",
          "ta": "‘Shareholders' equity’ எதை represent பண்ணும்?"
        },
        "options": {
          "en": [
            "The company's total debt",
            "What's left for owners after subtracting liabilities from assets",
            "The company's annual revenue",
            "The stock's daily trading volume"
          ],
          "hi": [
            "कं पनी का total debt",
            "Assets में से liabilities घटाने के बाद owners के लिए जो बचता है",
            "कं पनी का annual revenue",
            "Stock का daily trading volume"
          ],
          "ta": [
            "நிறுவனத்தின் total debt",
            "Assets-லிருந்து liabilities-ஐ கழிச்ச பிறகு owners-க்கு மிச்சம் இருக்கிறது",
            "நிறுவனத்தின் annual revenue",
            "Stock-ன் daily trading volume"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Equity is the company's real net worth belonging to shareholders.",
          "hi": "Equity shareholders की कं पनी की असली net worth है।",
          "ta": "Shareholders-க்கு சொந்தமான நிறுவனத்தின் real net worth தான் equity."
        }
      },
      {
        "question": {
          "en": "What broader effect did the IL&FS default have on Indian markets?",
          "hi": "IL&FS के default का भारतीय markets पर कौन सा बड़ा असर हुआ?",
          "ta": "IL&FS default Indian markets-ல என்ன broader effect-ஐ ஏற்படுத்துச்சு?"
        },
        "options": {
          "en": [
            "None, it was fully contained",
            "It triggered a liquidity crunch across the NBFC sector",
            "It caused all banks to shut down",
            "It only affected IL&FS employees"
          ],
          "hi": [
            "कोई नहीं, वो पूरी तरह contained रहा",
            "इसने पूरे NBFC sector में एक liquidity crunch trigger कर दिया",
            "इससे सारे banks बंद हो गए",
            "इसका असर सिर्फ IL&FS के employees पर हुआ"
          ],
          "ta": [
            "ஒன்றும் இல்ல, அது fully contained ஆயிடுச்சு",
            "NBFC sector முழுக்க ஒரு liquidity crunch-ஐ trigger பண்ணுச்சு",
            "எல்லா banks-உம் shut down ஆயிடுச்சு",
            "IL&FS employees-ஐ மட்டும் தான் affect பண்ணுச்சு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Many institutions had lent to or invested alongside IL&FS, spreading the shock across non-banking finance companies. 17. Reading a Profit & Loss Statement",
          "hi": "कई institutions ने IL&FS को loan दिया था या उसके साथ invest किया था, जिससे झटका non-banking finance companies में फैल गया।",
          "ta": "நிறைய institutions IL&FS-க்கு loan கொடுத்தோ, அதனுடன் invest பண்ணியோ இருந்ததால், அந்த shock non- banking finance நிறுவனங்கள் முழுக்க பரவிச்சு."
        }
      }
    ]
  },
  {
    "id": 17,
    "tier": "Intermediate",
    "title": {
      "en": "Reading a Profit & Loss Statement",
      "hi": "Profit & Loss Statement पढ़ ना",
      "ta": "ஒரு Profit & Loss Statement படிப்பது"
    },
    "opener": {
      "en": "Meera's next assignment involved a fast-growing food-delivery company. Its revenue had tripled in three years — headline after headline celebrated it. But when she opened its Profit & Loss (P&L) statement, the bottom line was still deep in red.\n\n“Growing revenue and growing profit are two completely different stories,” Paati said. “A lot of investors learned that the hard way with exactly this kind of company.”",
      "hi": "मीरा के अगले assignment में एक तेज़ी से बढ़ ती food-delivery कं पनी शामिल थी। उसका revenue तीन सालों में तीन गुना हो गया था — एक के बाद एक headline इसका जश्न मना रही थी। लेकिन जब उसने उसका Profit & Loss (P&L) statement खोला, तो bottom line अब भी गहरे लाल रंग में था।\n\n“बढ़ ता revenue और बढ़ ता profit बिल्कुल दो अलग कहानियाँ हैं,” पाटी ने कहा। “कई investors ने ये ठीक ऐसी ही कं पनी के साथ hard way में सीखा।”",
      "ta": "மீராவின் அடுத்த assignment ஒரு fast-growing food-delivery நிறுவனத்தைப் பத்தி இருந்துச்சு. அதோட revenue மூணு வருடத்துல triple ஆயிருந்துச்சு — headline பிறகு headline அதை celebrate பண்ணுச்சு. ஆனா அது Profit & Loss (P&L) statement-ஐ open பண்ணும்போது, bottom line இன்னும் deep red-ல தான் இருந்துச்சு.\n\n“Growing revenue-உம் growing profit-உம் முற்றிலும் வெவ்வேறு கதைகள்,” பாட்டி சொன்னார். “நிறைய investors அதை exact இதே மாதிரி நிறுவனத்துடன் தான் hard way-ல கத்துக்கிட்டாங்க.”"
    },
    "realStorySubtitle": {
      "en": "Revenue Up, Profit Nowhere — A Very Modern Story",
      "hi": "Revenue ऊपर, Profit कहीं नहीं — एक बेहद Modern कहानी",
      "ta": "Revenue Up, Profit எங்கேயும் இல்ல — ஒரு Very Modern Story"
    },
    "realStoryBody": {
      "en": "When India's major food-delivery and quick-commerce platforms went public in the early 2020s, their revenues were growing at an impressive pace every quarter, fuelling huge investor excitement and rich valuations at listing.\n\nYet several of them posted losses for years after listing — spending heavily on discounts, delivery infrastructure, and marketing to keep growing revenue. Investors who focused only on the revenue headline, without checking the P&L's actual profit line, were often surprised by how long profitability took to arrive — a pattern that has repeated across many new-age listings.",
      "hi": "जब 2020 के दशक की शुरुआत में भारत के बड़े food-delivery और quick-commerce platforms public हुए, उनका revenue हर quarter एक प्रभावशाली रफ़्तार से बढ़ रहा था, जिसने listing पर भारी investor उत्साह और अच्छी valuations को हवा दी।\n\nफिर भी इनमें से कई ने listing के बाद सालों तक losses report किए — revenue बढ़ाते रहने के लिए discounts, delivery infrastructure, और marketing पर भारी खर्च करते हुए। जिन investors ने सिर्फ revenue वाली headline पर ध्यान दिया, बिना P&L की असली profit line चेक किए, वो अक्सर हैरान रह गए कि profitability आने में कितना समय लगा — एक pattern जो कई new-age listings में दोहराया गया।",
      "ta": "இந்தியாவின் major food-delivery, quick-commerce platforms 2020-களின் ஆரம்பத்தில் public ஆனபோது, அவற்றின் revenues ஒவ்வொரு quarter-உம் impressive pace-ல growth ஆகிக்கிட்டிருந்துச்சு, listing-ல huge investor excitement-ஐயும் rich valuations-ஐயும் fuel பண்ணுச்சு.\n\nஆனாலும், அவற்றில் பலது listing ஆன பிறகு வருடங்களா losses post பண்ணுச்சு — revenue-ஐ continue-ஆ வளர்க்க discounts, delivery infrastructure, marketing-ல heavy-ஆ spend பண்ணி. Revenue headline-ஐ மட்டும் focus பண்ணி, P&L-ன் actual profit line-ஐ check பண்ணாத investors, profitability வர எவ்வளவு நேரம் ஆச்சுனு பெரும்பாலும் ஆச்சர்யப்பட்டாங்க — நிறைய new-age listings-ல repeat ஆன ஒரு pattern இது."
    },
    "body": {
      "en": "The P&L Statement, Top to Bottom • Revenue (Sales): Total money earned from the company's core business. • Cost of Goods/Services + Operating Expenses: What it cost to earn that revenue. • Operating Profit (EBITDA): Profit from core operations, before interest, tax, depreciation, amortisation. • Net Profit (the 'bottom line'): What's actually left after every single expense, interest, and tax.\n\nWhy Revenue Growth Alone Can Mislead A company can grow revenue simply by spending heavily to acquire customers or by discounting prices — which can grow the top line while shrinking or erasing profit. Always check the margin (profit as a percentage of revenue) trend, not just the revenue number in isolation.",
      "hi": "P&L Statement, ऊपर से नीचे तक • Revenue (Sales): कं पनी के core business से कमाया गया total पैसा।\n\n• Cost of Goods/Services + Operating Expenses: वो revenue कमाने में जो खर्च हुआ।\n\n• Operating Profit (EBITDA): Core operations से profit, interest, tax, depreciation, amortisation से पहले।\n\n• Net Profit ('bottom line'): हर एक expense, interest, और tax के बाद जो असल में बचता है।\n\nअके ले Revenue Growth क्यों गुमराह कर सकती है एक कं पनी बस customers पाने के लिए भारी खर्च करके या prices discount करके revenue बढ़ा सकती है — जो top line को बढ़ा सकता है जबकि profit को घटाता या मिटाता है। हमेशा margin trend (revenue के percentage के तौर पर profit) चेक करें, अके ले revenue के number को नहीं।",
      "ta": "P&L Statement, Top-லிருந்து Bottom வரை • Revenue (Sales): நிறுவனத்தின் core business-லிருந்து சம்பாதிச்ச total பணம்.\n\n• Cost of Goods/Services + Operating Expenses: அந்த revenue-ஐ சம்பாதிக்க எவ்வளவு cost ஆச்சு.\n\n• Operating Profit (EBITDA): Interest, tax, depreciation, amortisation-க்கு முன், core operations- லிருந்து profit.\n\n• Net Profit (the ‘bottom line’): ஒவ்வொரு single expense, interest, tax கழிச்ச பிறகு உண்மையிலேயே மிச்சம் இருக்கிறது.\n\nRevenue Growth மட்டும் ஏன் Mislead பண்ணலாம் ஒரு நிறுவனம் customers-ஐ acquire பண்ண heavy-ஆ spend பண்ணி, அல்லது prices-ஐ discount பண்ணி வெறுமனே revenue-ஐ grow பண்ணலாம் — இது top line-ஐ grow பண்ணும்போதே profit-ஐ shrink அல்லது erase பண்ணலாம். Isolation-ல revenue number மட்டும் இல்லாம, எப்போதும் margin (revenue-ன் percentage-ஆ profit) trend-ஐ check பண்ணுங்க."
    },
    "keyTakeaway": {
      "en": "Revenue tells you a company is getting bigger; net profit tells you whether that size is actually making money. The new-age listings story shows why professional investors read all the way down to the bottom line before getting excited about a growth headline.",
      "hi": "Revenue बताता है कि एक कं पनी बड़ी हो रही है; net profit बताता है कि क्या वो size असल में पैसा कमा रहा है। New-age listings की कहानी दिखाती है कि professional investors किसी growth headline से उत्साहित होने से पहले पूरी तरह bottom line तक क्यों पढ़ ते हैं।",
      "ta": "Revenue, நிறுவனம் பெரிதாகிக்கிட்டிருக்குனு சொல்லும்; net profit, அந்த size உண்மையிலேயே பணம் சம்பாதிக்குதா இல்லையான்னு சொல்லும். ஒரு growth headline-ஐ பத்தி excite ஆகுறதுக்கு முன், professional investors bottom line வரைக்கும் படிப்பாங்கனு new-age listings கதை காட்டுது."
    },
    "quiz": [
      {
        "question": {
          "en": "What does the 'bottom line' of a P&L statement refer to?",
          "hi": "एक P&L statement की 'bottom line' किसे कहते हैं?",
          "ta": "ஒரு P&L statement-ன் ‘bottom line’ எதைக் குறிக்கும்?"
        },
        "options": {
          "en": [
            "Total revenue",
            "Net profit, after all expenses, interest, and tax",
            "Total assets",
            "The company's share price"
          ],
          "hi": [
            "Total revenue",
            "Net profit, सभी expenses, interest, और tax के बाद",
            "Total assets",
            "कं पनी का share price"
          ],
          "ta": [
            "Total revenue",
            "எல்லா expenses, interest, tax-க்கும் பிறகு Net profit",
            "Total assets",
            "நிறுவனத்தின் share price"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The bottom line is what's genuinely left for the company after every cost is accounted for.",
          "hi": "Bottom line वो है जो हर cost हिसाब में लेने के बाद कं पनी के लिए असल में बचता है।",
          "ta": "ஒவ்வொரு cost-ஐயும் கணக்கில் எடுத்த பிறகு நிறுவனத்திற்கு genuinely மிச்சம் இருக்கிறது தான் bottom line."
        }
      },
      {
        "question": {
          "en": "Why can a company's revenue grow while its profit shrinks or turns negative?",
          "hi": "एक कं पनी का revenue बढ़ ते हुए उसका profit क्यों घट सकता है या negative हो सकता है?",
          "ta": "ஒரு நிறுவனத்தின் revenue வளர்ந்துக்கிட்டே இருக்கும்போது, profit ஏன் shrink அல்லது negative ஆகலாம்?"
        },
        "options": {
          "en": [
            "This is impossible",
            "Heavy spending on discounts, marketing, or expansion can grow revenue while eating into profit",
            "Revenue and profit are always identical",
            "Only small companies face this"
          ],
          "hi": [
            "ये नामुमकिन है",
            "Discounts, marketing, या expansion पर भारी खर्च revenue बढ़ा सकता है जबकि profit को खा सकता है",
            "Revenue और profit हमेशा एक जैसे होते हैं",
            "सिर्फ छोटी कं पनियों को इसका सामना करना पड़ ता है"
          ],
          "ta": [
            "இது impossible",
            "Discounts, marketing, expansion-ல heavy spending revenue-ஐ grow பண்ணும்போதே profit-ஐ eat பண்ணலாம்",
            "Revenue-உம் profit-உம் எப்போதும் identical",
            "சின்ன நிறுவனங்கள் மட்டும் தான் இதை face பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This is exactly what several new-age Indian listings experienced — fast revenue growth alongside continued losses.",
          "hi": "कई new-age भारतीय listings ने ठीक यही अनुभव किया — तेज़ revenue growth के साथ लगातार losses।",
          "ta": "நிறைய new-age Indian listings இதைத்தான் experience பண்ணுச்சு — fast revenue growth-உடன் continued losses."
        }
      },
      {
        "question": {
          "en": "What does EBITDA represent?",
          "hi": "EBITDA क्या represent करता है?",
          "ta": "EBITDA எதை represent பண்ணும்?"
        },
        "options": {
          "en": [
            "Net profit after tax",
            "Operating profit before interest, tax, depreciation, and amortisation",
            "Total company debt",
            "Total shareholder equity"
          ],
          "hi": [
            "Tax के बाद Net profit",
            "Interest, tax, depreciation, और amortisation से पहले Operating profit",
            "कं पनी का Total debt",
            "Total shareholder equity"
          ],
          "ta": [
            "Tax-க்கு பிறகு Net profit",
            "Interest, tax, depreciation, amortisation-க்கு முன் Operating profit",
            "நிறுவனத்தின் total debt",
            "Total shareholder equity"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "EBITDA isolates core operating performance before these other financial factors.",
          "hi": "EBITDA इन दूसरे financial factors से पहले core operating performance को अलग करता है।",
          "ta": "இந்த மற்ற financial factors-க்கு முன் core operating performance-ஐ EBITDA isolate பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What should investors check alongside a company's revenue growth, according to the lesson?",
          "hi": "Lesson के अनुसार, investors को कं पनी के revenue growth के साथ और क्या चेक करना चाहिए?",
          "ta": "Lesson-ன் படி, revenue growth-உடன் சேர்த்து investors என்ன check பண்ணணும்?"
        },
        "options": {
          "en": [
            "Nothing else matters",
            "The margin (profit as a percentage of revenue) trend",
            "Only the company's logo",
            "The number of employees"
          ],
          "hi": [
            "कुछ और मायने नहीं रखता",
            "Margin (revenue के percentage के तौर पर profit) trend",
            "सिर्फ कं पनी का logo",
            "Employees की संख्या"
          ],
          "ta": [
            "வேற எதுவும் matter பண்ணாது",
            "Margin (revenue-ன் percentage-ஆ profit) trend",
            "நிறுவனத்தின் logo மட்டும்",
            "Employees-ன் எண்ணிக்கை"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Margins reveal whether growing revenue is translating into genuine profitability.",
          "hi": "Margins ये उजागर करते हैं कि क्या बढ़ ता revenue genuine profitability में बदल रहा है।",
          "ta": "Margins, growing revenue genuine profitability-ஆ translate ஆகுதான்னு reveal பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What pattern did several new-age Indian companies show after their IPOs, according to the story?",
          "hi": "कहानी के अनुसार, कई new-age भारतीय कं पनियों ने अपने IPOs के बाद कौन सा pattern दिखाया?",
          "ta": "கதையின் படி, IPO-க்கு பிறகு நிறைய new-age Indian நிறுவனங்கள் என்ன pattern-ஐ காட்டுச்சு?"
        },
        "options": {
          "en": [
            "Immediate high profitability",
            "Strong revenue growth alongside continued losses for years",
            "Declining revenue every quarter",
            "No revenue at all"
          ],
          "hi": [
            "तुरंत high profitability",
            "Strong revenue growth के साथ सालों तक लगातार losses",
            "हर quarter घटता revenue",
            "बिल्कुल कोई revenue नहीं"
          ],
          "ta": [
            "Immediate high profitability",
            "Strong revenue growth-உடன் வருடங்களா continued losses",
            "Quarter-க்கு quarter declining revenue",
            "எந்த revenue-உம் இல்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Many prioritised growth and market share over near-term profitability, surprising investors who only tracked revenue. 18. Reading a Cash Flow Statement",
          "hi": "कई ने near-term profitability से ज़्यादा growth और market share को priority दी, जिससे सिर्फ revenue track करने वाले investors हैरान रह गए।",
          "ta": "Near-term profitability-ஐ விட growth-ஐயும் market share-ஐயும் நிறைய பேர் prioritise பண்ணாங்க, revenue மட்டும் track பண்ண investors-ஐ ஆச்சர்யப்படுத்துச்சு."
        }
      }
    ]
  },
  {
    "id": 18,
    "tier": "Intermediate",
    "title": {
      "en": "Reading a Cash Flow Statement",
      "hi": "Cash Flow Statement पढ़ ना",
      "ta": "ஒரு Cash Flow Statement படிப்பது"
    },
    "opener": {
      "en": "“If a company shows healthy profit, doesn't that mean it has plenty of cash too?” Meera asked, genuinely surprised when Paati said no. “Not always — and one of India's biggest corporate scandals happened almost entirely inside that gap.”",
      "hi": "“अगर एक कं पनी healthy profit दिखाती है, तो क्या इसका मतलब उसके पास ढेर सारा cash भी है?” मीरा ने पूछा, सच में हैरान होकर जब पाटी ने ना कहा। “हमेशा नहीं — और भारत के सबसे बड़े corporate scandals में से एक लगभग पूरी तरह उसी gap के अंदर हुआ।”",
      "ta": "“ஒரு நிறுவனம் healthy profit காட்டினா, அதற்கு நிறைய cash-உம் இருக்குனு அர்த்தமா?” என்று மீரா கேட்டாள், பாட்டி இல்லைனு சொன்னதும் genuine-ஆ ஆச்சர்யப்பட்டு. “எப்போதுமே இல்ல — இந்தியாவின் மிகப்பெரிய corporate scandals-ல ஒண்ணு கிட்டத்தட்ட முழுக்க அந்த gap-க்குள் தான் நடந்துச்சு.”"
    },
    "realStorySubtitle": {
      "en": "The Fraud That Faked an Entire Bank Balance",
      "hi": "वो Fraud जिसने एक पूरा Bank Balance नकली बना दिया",
      "ta": "ஒரு முழு Bank Balance-ஐயே Fake பண்ண Fraud"
    },
    "realStoryBody": {
      "en": "In January 2009, Ramalinga Raju, chairman of IT company Satyam Computer Services, publicly admitted that the company's accounts had been falsified for years — including a cash and bank balance of over ₹5,000 crore that simply did not exist.\n\nThe company's reported profits had looked healthy for years, but its actual cash position was wildly different from what was disclosed. It remains India's most infamous accounting fraud, and it's the single biggest real-world reason serious investors treat the cash flow statement as the hardest of the three financial statements to fake — cash movements leave a far more verifiable trail than accounting profit does.",
      "hi": "January 2009 में, IT कं पनी Satyam Computer Services के chairman Ramalinga Raju ने publicly माना कि कं पनी के accounts सालों से falsify किए जा रहे थे — जिसमें ₹5,000 करोड़ से ज़्यादा का cash और bank balance शामिल था जो असल में मौजूद ही नहीं था।\n\nकं पनी के reported profits सालों तक healthy दिखते रहे, लेकिन उसकी असली cash position disclose की गई चीज़ से बेहद अलग थी। ये अब भी भारत का सबसे कु ख्यात accounting fraud है, और यही अके ली सबसे बड़ी असली वजह है कि serious investors cash flow statement को तीनों financial statements में सबसे मुश्किल fake करने वाला मानते हैं — cash movements accounting profit से कहीं ज़्यादा verifiable trail छोड़ ते हैं।",
      "ta": "January 2009-ல, IT நிறுவனம் Satyam Computer Services-ன் chairman Ramalinga Raju, நிறுவனத்தின் accounts வருடக்கணக்கா falsify பண்ணப்பட்டிருக்குனு publicly admit பண்ணார் — ₹5,000 crore-க்கும் அதிகமான ஒரு cash, bank balance கூட existed-ஆ இல்லாதது உட்பட.\n\nநிறுவனத்தின் reported profits வருடக்கணக்கா healthy-ஆ தெரிஞ்சிருந்துச்சு, ஆனா அதன் actual cash position disclose பண்ணப்பட்டதிலிருந்து wildly வித்தியாசமா இருந்துச்சு. இது இந்தியாவின் மிக infamous accounting fraud-ஆ இன்னும் இருக்கு, cash flow statement-ஐ மூணு financial statements-லயும் fake பண்ண மிகக் கஷ்டமான ஒண்ணா serious investors treat பண்றதுக்கு மிகப் பெரிய single real-world காரணம் இதுதான் — accounting profit-ஐ விட cash movements ரொம்ப verifiable-ஆன ஒரு trail-ஐ விட்டுடும்."
    },
    "body": {
      "en": "The Three Types of Cash Flow • Operating Activities: Cash generated from the company's actual core business. • Investing Activities: Cash spent on or received from buying/selling assets like equipment, land, or other businesses. • Financing Activities: Cash from borrowing, repaying loans, issuing shares, or paying dividends.\n\nWhy Cash Flow Deserves Its Own Careful Read A company can report a profit on paper (say, from sales made on credit that customers haven't actually paid yet) while its real bank balance shrinks. Consistently strong operating cash flow, ideally growing alongside reported profit, is one of the healthiest signs a business is real and sustainable.",
      "hi": "Cash Flow के तीन प्रकार • Operating Activities: कं पनी के असली core business से generate हुआ cash।\n\n• Investing Activities: equipment, ज़ मीन, या दूसरे businesses जैसे assets खरीदने/बेचने पर खर्च या मिला cash।\n\n• Financing Activities: उधार लेने, loans चुकाने, shares issue करने, या dividends देने से cash।\n\nCash Flow अपने खुद के सावधान पढ़ ने का हकदार क्यों है एक कं पनी कागज़ पर profit report कर सकती है (मान लो, credit पर हुई sales से जिन्हें customers ने असल में अभी भुगतान नहीं किया), जबकि उसका असली bank balance घट रहा हो। लगातार strong operating cash flow, जो reported profit के साथ बढ़ रहा हो, एक business के असली और sustainable होने के सबसे healthy संके तों में से एक है।",
      "ta": "Cash Flow-ன் மூன்று வகைகள் • Operating Activities: நிறுவனத்தின் actual core business-லிருந்து generate ஆன cash.\n\n• Investing Activities: Equipment, land, அல்லது வேற businesses மாதிரி assets வாங்குறதுக்கும், விக்குறதுக்கும் spend பண்ணப்பட்ட அல்லது received cash.\n\n• Financing Activities: Borrowing, loans repay பண்றது, shares issue பண்றது, அல்லது dividends கொடுப்பதிலிருந்து வரும் cash.\n\nCash Flow ஏன் அதன் சொந்த Careful Read-ஐ Deserve பண்ணுது ஒரு நிறுவனம் paper-ல profit report பண்ணலாம் (சொல்லப்போனா, customers இன்னும் pay பண்ணாத credit sales-லிருந்து) அதன் real bank balance shrink ஆகும்போது. Reported profit-உடன் சேர்ந்து ideally growing ஆன, consistently strong operating cash flow, ஒரு business real-ஆவும் sustainable-ஆவும் இருக்குனு காட்ட மிக healthy signs-ல ஒண்ணு."
    },
    "keyTakeaway": {
      "en": "Profit is an accounting opinion; cash is a fact. The Satyam scandal is the starkest reminder in Indian market history that a healthy-looking profit number means little if the cash flow statement doesn't tell the same story.",
      "hi": "Profit एक accounting opinion है; cash एक fact है। Satyam scandal भारतीय market के इतिहास की सबसे कड़ी याद है कि एक healthy दिखने वाला profit number ज़्यादा मायने नहीं रखता अगर cash flow statement वही कहानी न बताए।",
      "ta": "Profit ஒரு accounting opinion; cash ஒரு fact. Cash flow statement அதே கதையை சொல்லலைனா, ஒரு healthy-ஆ தெரியுற profit number ரொம்ப meaning ஆகாதுனு Indian market history-ல மிகக் கடுமையான நினைவூட்டல் Satyam scandal தான்."
    },
    "quiz": [
      {
        "question": {
          "en": "What did Ramalinga Raju admit to in the 2009 Satyam scandal?",
          "hi": "2009 के Satyam scandal में Ramalinga Raju ने क्या माना?",
          "ta": "2009 Satyam scandal-ல Ramalinga Raju எதை admit பண்ணார்?"
        },
        "options": {
          "en": [
            "Underpaying employee salaries",
            "Falsifying the company's accounts, including a cash balance that didn't exist",
            "Delaying an IPO",
            "Merging with a competitor"
          ],
          "hi": [
            "Employee salaries कम देना",
            "कं पनी के accounts falsify करना, जिसमें एक cash balance भी शामिल था जो मौजूद ही नहीं था",
            "एक IPO में देरी करना",
            "एक competitor के साथ merge होना"
          ],
          "ta": [
            "Employee salaries-ஐ underpay பண்ணது",
            "Existed-ஆ இல்லாத cash balance உட்பட, நிறுவனத்தின் accounts-ஐ falsify பண்ணது",
            "ஒரு IPO-ஐ delay பண்ணது",
            "ஒரு competitor-உடன் merge ஆனது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The company had reported a cash and bank balance of over ₹5,000 crore that was entirely fictitious.",
          "hi": "कं पनी ने ₹5,000 करोड़ से ज़्यादा का cash और bank balance report किया था जो पूरी तरह काल्पनिक था।",
          "ta": "நிறுவனம் ₹5,000 crore-க்கும் அதிகமான cash, bank balance report பண்ணியிருந்துச்சு, அது முழுக்க fictitious."
        }
      },
      {
        "question": {
          "en": "Why is the cash flow statement considered harder to fake than the profit figure?",
          "hi": "Cash flow statement को profit figure से fake करना ज़्यादा मुश्किल क्यों माना जाता है?",
          "ta": "Profit figure-ஐ விட cash flow statement fake பண்ண கஷ்டம்னு ஏன் கருதப்படுது?"
        },
        "options": {
          "en": [
            "It isn't harder to fake",
            "Actual cash movements leave a more verifiable trail than accounting profit does",
            "Cash flow statements are optional",
            "Only foreign companies publish cash flow statements"
          ],
          "hi": [
            "ये fake करना मुश्किल नहीं है",
            "असली cash movements accounting profit से ज़्यादा verifiable trail छोड़ ते हैं",
            "Cash flow statements optional हैं",
            "सिर्फ foreign कं पनियाँ cash flow statements publish करती हैं"
          ],
          "ta": [
            "அது கஷ்டம் இல்ல",
            "Actual cash movements, accounting profit-ஐ விட ரொம்ப verifiable-ஆன trail-ஐ விடும்",
            "Cash flow statements optional",
            "Foreign நிறுவனங்கள் மட்டும் தான் cash flow statements publish பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This is why serious investors give the cash flow statement particular weight when checking a company's health.",
          "hi": "यही वजह है कि serious investors किसी कं पनी की health चेक करते समय cash flow statement को खास तवज्जो देते हैं।",
          "ta": "ஒரு நிறுவனத்தின் health-ஐ check பண்ணும்போது serious investors cash flow statement-க்கு particular weight தருறது இதனால் தான்."
        }
      },
      {
        "question": {
          "en": "Which of these is an 'Operating Activity' on a cash flow statement?",
          "hi": "Cash flow statement पर इनमें से कौन सी एक 'Operating Activity' है?",
          "ta": "Cash flow statement-ல ‘Operating Activity’ எது?"
        },
        "options": {
          "en": [
            "Issuing new shares",
            "Cash generated from the company's core business",
            "Buying a new factory",
            "Repaying a bank loan"
          ],
          "hi": [
            "नए shares issue करना",
            "कं पनी के core business से generate हुआ cash",
            "एक नई factory खरीदना",
            "एक bank loan चुकाना"
          ],
          "ta": [
            "Puது shares issue பண்றது",
            "நிறுவனத்தின் core business-லிருந்து generate ஆன cash",
            "ஒரு புது factory வாங்குறது",
            "ஒரு bank loan-ஐ repay பண்றது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Operating activities relate directly to the day-to-day business, unlike investing or financing activities.",
          "hi": "Operating activities सीधे रोज़ मर्रा के business से जुड़ी होती हैं, investing या financing activities के उलट।",
          "ta": "Investing அல்லது financing activities-க்கு வித்தியாசமா, operating activities day-to-day business-உடன் directly related."
        }
      },
      {
        "question": {
          "en": "How can a company report profit on paper while its actual cash shrinks?",
          "hi": "एक कं पनी कागज़ पर profit कै से report कर सकती है जबकि उसका असली cash घट रहा हो?",
          "ta": "Actual cash shrink ஆகும்போது ஒரு நிறுவனம் paper-ல எப்படி profit report பண்ணும்?"
        },
        "options": {
          "en": [
            "This is not possible",
            "Sales made on credit can count as profit before the customer actually pays",
            "Profit and cash are always identical",
            "Only loss-making companies face this"
          ],
          "hi": [
            "ये possible नहीं है",
            "Credit पर हुई sales customer के असल में भुगतान करने से पहले ही profit में count हो सकती हैं",
            "Profit और cash हमेशा एक जैसे होते हैं",
            "सिर्फ loss-making कं पनियों को इसका सामना करना पड़ ता है"
          ],
          "ta": [
            "இது possible இல்ல",
            "Customer actually pay பண்றதுக்கு முன், credit-ல பண்ண sales profit-ஆ count ஆகலாம்",
            "Profit-உம் cash-உம் எப்போதும் identical",
            "Loss-making நிறுவனங்கள் மட்டும் இதை face பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Accounting profit can include revenue not yet received in cash, creating a gap between reported profit and real cash.",
          "hi": "Accounting profit में ऐसा revenue शामिल हो सकता है जो अभी cash में नहीं मिला, जिससे reported profit और असली cash के बीच gap बनता है।",
          "ta": "இன்னும் cash-ஆ receive ஆகாத revenue accounting profit-ல include ஆகலாம், reported profit-க்கும் real cash-க்கும் இடையே ஒரு gap create பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What is considered one of the healthiest signs of a sustainable business, per the lesson?",
          "hi": "Lesson के अनुसार, एक sustainable business के सबसे healthy संके तों में से एक क्या माना जाता है?",
          "ta": "Lesson-ன் படி, ஒரு sustainable business-ன் மிக healthy signs-ல ஒண்ணு என்ன கருதப்படுது?"
        },
        "options": {
          "en": [
            "Rising share price alone",
            "Consistently strong operating cash flow, growing alongside reported profit",
            "A large marketing budget",
            "Frequent management changes"
          ],
          "hi": [
            "अके ले बढ़ ता share price",
            "Reported profit के साथ बढ़ ता, लगातार strong operating cash flow",
            "एक बड़ा marketing budget",
            "बार-बार management बदलना"
          ],
          "ta": [
            "Share price மட்டும் rise ஆகுறது",
            "Reported profit-உடன் சேர்ந்து growing ஆன, consistently strong operating cash flow",
            "ஒரு பெரிய marketing budget",
            "அடிக்கடி management changes"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "When cash flow and profit move together, it's a strong signal the business's numbers are real. 19. Key Ratios: The P/E Ratio",
          "hi": "जब cash flow और profit साथ move करते हैं, ये एक strong संकेत है कि business के numbers असली हैं।",
          "ta": "Cash flow-உம் profit-உம் சேர்ந்து move ஆகும்போது, business-ன் numbers real-ஆ இருக்குனு அது ஒரு strong signal."
        }
      }
    ]
  },
  {
    "id": 19,
    "tier": "Intermediate",
    "title": {
      "en": "Key Ratios: The P/E Ratio",
      "hi": "Key Ratios: P/E Ratio",
      "ta": "Key Ratios: P/E Ratio"
    },
    "opener": {
      "en": "Meera found two companies she liked equally. One traded at a share price of ₹2,000, the other at ₹200. “The cheaper one is the better deal, right?” she asked — and Paati shook her head immediately.\n\n“Price alone tells you nothing, kanna. You need to know how much profit you're actually paying for. That number sent the whole Indian IT sector into a bubble once.”",
      "hi": "मीरा को दो कं पनियाँ मिलीं जो उसे बराबर पसंद थीं। एक ₹2,000 के share price पर trade हो रही थी, दूसरी ₹200 पर। “सस्ती वाली बेहतर deal है, है ना?” उसने पूछा — और पाटी ने तुरंत सिर हिला दिया।\n\n“अके ले price कुछ नहीं बताता, कन्ना। तुम्हें जानना होगा कि तुम असल में कितने profit के लिए pay कर रही हो। इस number ने एक बार पूरे भारतीय IT sector को एक bubble में डाल दिया था।”",
      "ta": "மீரா சமமா பிடிச்ச இரண்டு நிறுவனங்களைக் கண்டுபிடிச்சாள். ஒண்ணு ₹2,000 share price-ல trade ஆகுச்சு, மற்றொண்ணு ₹200-ல. “Cheaper-ஆ இருக்கிறதே தானே better deal?” என்று கேட்டாள் — பாட்டி உடனடியா தலையை ஆட்டினார்.\n\n“விலை மட்டும் ஒன்றுமே சொல்லாது கண்ணா. உண்மையில் எவ்வளவு profit-க்கு நீ pay பண்றேன்னு தெரிஞ்சுக்கணும். அந்த எண் ஒரு காலத்துல முழு Indian IT sector-ஐயும் ஒரு bubble-க்குள் அனுப்பிச்சு.”"
    },
    "realStorySubtitle": {
      "en": "When IT Stocks Traded at 200 Times Profit",
      "hi": "जब IT Stocks Profit के 200 गुना पर Trade होते थे",
      "ta": "IT Stocks 200 Times Profit-ல Trade ஆன காலம்"
    },
    "realStoryBody": {
      "en": "During the dot-com boom around 1999-2000, several Indian technology stocks traded at Price-to-Earnings (P/E) ratios well above 100, and some beyond 200 — meaning investors were paying over 100 or 200 times a company's annual profit for a single share, betting almost entirely on future growth.\n\nWhen the global dot-com bubble burst in 2001, many of these stocks fell 80-90% or more from their peaks, as their sky-high P/E ratios collapsed back toward levels justified by actual earnings. It remains one of the clearest Indian examples of what happens when a stock's price runs far ahead of the profit actually backing it.",
      "hi": "1999-2000 के dot-com boom के दौरान, कई भारतीय technology stocks 100 से भी काफ़ी ऊपर, और कुछ 200 से भी ऊपर, Price-to-Earnings (P/E) ratios पर trade हुए — मतलब investors एक share के लिए कं पनी के annual profit का 100 या 200 गुना pay कर रहे थे, लगभग पूरी तरह future growth पर दांव लगाते हुए।\n\nजब 2001 में global dot-com bubble फू टा, इनमें से कई stocks अपने peaks से 80-90% या उससे ज़्यादा गिर गए, क्योंकि उनके आसमान छू ते P/E ratios वापस उन levels की तरफ़ collapse हो गए जो असली earnings justify करती थीं। ये अब भी इसका सबसे साफ़ भारतीय example है कि जब एक stock का price उसके पीछे के असली profit से बहुत आगे निकल जाए तो क्या होता है।",
      "ta": "1999-2000-க்கு அருகில் dot-com boom-ன் போது, பல Indian technology stocks 100-க்கும் மேற்பட்ட, சில 200-க்கும் மேற்பட்ட Price-to-Earnings (P/E) ratios-ல trade ஆச்சு — investors ஒரு single share-க்கு ஒரு நிறுவனத்தின் annual profit-ன் 100 அல்லது 200 மடங்கை pay பண்ணிட்டு, கிட்டத்தட்ட முழுக்க future growth-ன் மேல bet பண்ணுனாங்க.\n\n2001-ல global dot-com bubble burst ஆனபோது, இந்த stocks-ல நிறைய அவற்றின் peaks-லிருந்து 80- 90% அல்லது அதற்கும் மேல் விழுந்துச்சு, sky-high P/E ratios actual earnings justify பண்ணும் levels- க்கு collapse ஆனது. ஒரு stock-ன் விலை, அதை back பண்ற profit-ஐ விட ரொம்ப முன்னாடி போனா என்ன ஆகும்னு காட்ட இந்தியாவின் மிகத் தெளிவான examples-ல இது ஒண்ணா இருக்கு."
    },
    "body": {
      "en": "What P/E Actually Means P/E Ratio = Share Price ÷ Earnings Per Share (EPS). It tells you how many years of the company's current profit (per share) you're effectively paying for at today's price. A P/E of 20 means you're paying 20 times the company's annual per-share profit.\n\nReading a P/E Number Sensibly • High P/E can mean the market expects strong future growth — or that the stock is simply overpriced. • Low P/E can mean a genuine bargain — or a business the market has real, valid concerns about. • Always compare P/E within the same sector — a 'high' P/E in banking may be a perfectly normal P/E in a fast-growing software company.",
      "hi": "P/E का असल में मतलब क्या है P/E Ratio = Share Price ÷ Earnings Per Share (EPS)। ये बताता है कि आज के price पर आप कं पनी के current profit (per share) के effectively कितने सालों के लिए pay कर रहे हैं। 20 का P/E मतलब आप कं पनी के annual per-share profit का 20 गुना pay कर रहे हैं।\n\nएक P/E Number को समझदारी से पढ़ ना • High P/E का मतलब हो सकता है market strong future growth की उम्मीद कर रहा है — या बस ये कि stock overpriced है।\n\n• Low P/E का मतलब हो सकता है एक genuine bargain — या एक business जिसे लेकर market को असली, valid चिंताएं हैं।\n\n• हमेशा P/E को उसी sector के अंदर compare करें — banking में एक 'high' P/E किसी तेज़ी से बढ़ ती software कं पनी में बिल्कुल normal P/E हो सकता है।",
      "ta": "P/E உண்மையில் என்ன அர்த்தம் P/E Ratio = Share Price ÷ Earnings Per Share (EPS). இன்றைய விலைக்கு, நிறுவனத்தின் current profit-ன் (per share) எத்தனை வருடங்களுக்கு நீங்க effectively pay பண்றீங்கனு இது சொல்லும். P/E of 20 என்றால், நிறுவனத்தின் annual per-share profit-ன் 20 மடங்கு pay பண்றீங்க.\n\nஒரு P/E Number-ஐ Sensibly படிப்பது • High P/E, market strong future growth-ஐ expect பண்றதுக்கு அர்த்தமாகலாம் — அல்லது அந்த stock வெறுமனே overpriced-ஆ இருக்குனு.\n\n• Low P/E ஒரு genuine bargain-ஆ இருக்கலாம் — அல்லது market-க்கு அந்த business-ஐ பத்தி real, valid concerns இருக்கலாம்.\n\n• எப்போதும் அதே sector-க்குள் P/E-ஐ compare பண்ணுங்க — banking-ல ஒரு ‘high’ P/E ஒரு fast- growing software நிறுவனத்தில் perfectly normal P/E-ஆ இருக்கலாம்."
    },
    "keyTakeaway": {
      "en": "P/E is a starting question, not a final answer — “how much am I paying for each rupee of profit, and is that fair for this business?” The 1999-2000 IT bubble shows what happens when the answer to that question is ignored for too long.",
      "hi": "P/E एक शुरुआती सवाल है, आखिरी जवाब नहीं — “मैं profit के हर रुपये के लिए कितना pay कर रहा हूँ, और क्या ये इस business के लिए fair है?” 1999-2000 का IT bubble दिखाता है कि जब इस सवाल के जवाब को बहुत लंबे समय तक नज़ रअंदाज़ किया जाए तो क्या होता है।",
      "ta": "P/E ஒரு starting question, final answer இல்ல — “ஒவ்வொரு rupee profit-க்கும் நான் எவ்வளவு pay பண்றேன், இந்த business-க்கு அது fair-ஆ?” அந்தக் கேள்விக்கான பதில் நிறைய நேரம் ignore ஆனா என்ன ஆகும்னு 1999-2000 IT bubble காட்டுது."
    },
    "quiz": [
      {
        "question": {
          "en": "How is the P/E ratio calculated?",
          "hi": "P/E ratio कै से calculate होता है?",
          "ta": "P/E ratio எப்படி calculate பண்ணப்படும்?"
        },
        "options": {
          "en": [
            "Share Price ÷ Total Revenue",
            "Share Price ÷ Earnings Per Share",
            "Total Assets ÷ Total Liabilities",
            "Net Profit × Total Shares"
          ],
          "hi": [
            "Share Price ÷ Total Revenue",
            "Share Price ÷ Earnings Per Share",
            "Total Assets ÷ Total Liabilities",
            "Net Profit × Total Shares"
          ],
          "ta": [
            "Share Price ÷ Total Revenue",
            "Share Price ÷ Earnings Per Share",
            "Total Assets ÷ Total Liabilities",
            "Net Profit × Total Shares"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "P/E shows how many times a company's per-share earnings you're paying at the current price.",
          "hi": "P/E दिखाता है कि current price पर आप कं पनी की per-share earnings का कितना गुना pay कर रहे हैं।",
          "ta": "Current விலைக்கு நிறுவனத்தின் per-share earnings-ன் எத்தனை மடங்கு pay பண்றீங்கனு P/E காட்டும்."
        }
      },
      {
        "question": {
          "en": "What happened to many Indian IT stocks during the 1999-2000 dot-com boom, according to the story?",
          "hi": "कहानी के अनुसार, 1999-2000 के dot-com boom के दौरान कई भारतीय IT stocks के साथ क्या हुआ?",
          "ta": "கதையின் படி, 1999-2000 dot-com boom-ன் போது நிறைய Indian IT stocks-க்கு என்ன ஆச்சு?"
        },
        "options": {
          "en": [
            "Their P/E ratios stayed low and stable",
            "They traded at P/E ratios above 100, sometimes above 200",
            "They were all delisted",
            "They had no P/E ratio at all"
          ],
          "hi": [
            "उनके P/E ratios कम और स्थिर रहे",
            "वो 100 से ऊपर, कभी-कभी 200 से ऊपर के P/E ratios पर trade हुए",
            "वो सब delist हो गए",
            "उनका कोई P/E ratio था ही नहीं"
          ],
          "ta": [
            "அவற்றின் P/E ratios low-ஆவும் stable-ஆவும் இருந்துச்சு",
            "அவை 100-க்கும் மேற்பட்ட, சில நேரம் 200-க்கும் மேற்பட்ட P/E ratios-ல trade ஆச்சு",
            "அவை எல்லாம் delist ஆயிடுச்சு",
            "அவற்றுக்கு P/E ratio-வே இல்லாம இருந்துச்சு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Investors paid extremely high multiples of profit, betting heavily on future growth that didn't justify such levels.",
          "hi": "Investors ने profit के बेहद high multiples pay किए, future growth पर भारी दांव लगाते हुए जो ऐसे levels को justify नहीं करती थी।",
          "ta": "அந்த levels-ஐ justify பண்ணாத future growth-ல heavy-ஆ bet பண்ணி, extremely high profit multiples-ஐ investors pay பண்ணுனாங்க."
        }
      },
      {
        "question": {
          "en": "Why isn't a low P/E automatically a 'good buy'?",
          "hi": "एक low P/E automatically एक 'अच्छी खरीद' क्यों नहीं है?",
          "ta": "Low P/E automatic-ஆ ஒரு ‘good buy’ ஆகாதது ஏன்?"
        },
        "options": {
          "en": [
            "Low P/E is always a mistake by the market",
            "It can also reflect genuine, valid concerns the market has about that business",
            "P/E doesn't affect share price",
            "Low P/E stocks can't be purchased by retail investors"
          ],
          "hi": [
            "Low P/E हमेशा market की एक गलती है",
            "ये उस business को लेकर market की genuine, valid चिंताओं को भी दिखा सकता है",
            "P/E share price को प्रभावित नहीं करता",
            "Low P/E stocks retail investors द्वारा खरीदे नहीं जा सकते"
          ],
          "ta": [
            "Low P/E எப்போதும் market-ன் ஒரு mistake",
            "அது அந்த business-ஐ பத்தி market-க்கு இருக்கிற genuine, valid concerns-ஐயும் reflect பண்ணலாம்",
            "P/E share price-ஐ affect பண்ணாது",
            "Low P/E stocks-ஐ retail investors வாங்க முடியாது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A low P/E can mean a bargain, or it can mean the market correctly sees real risk in the business.",
          "hi": "एक low P/E का मतलब एक bargain हो सकता है, या इसका मतलब हो सकता है कि market business में सही मायने में real risk देख रहा है।",
          "ta": "Low P/E ஒரு bargain-ஆ இருக்கலாம், அல்லது market அந்த business-ல real risk-ஐ சரியா பார்க்குதுனு அர்த்தமாகலாம்."
        }
      },
      {
        "question": {
          "en": "Why should P/E ratios generally be compared within the same sector?",
          "hi": "P/E ratios को आमतौर पर एक ही sector के अंदर compare क्यों करना चाहिए?",
          "ta": "Generally P/E ratios அதே sector-க்குள் ஏன் compare பண்ணணும்?"
        },
        "options": {
          "en": [
            "P/E is identical across all sectors",
            "Different sectors have different normal P/E ranges based on their typical growth and risk",
            "Sector comparison is illegal under SEBI rules",
            "Only IT companies have a P/E ratio"
          ],
          "hi": [
            "P/E सारे sectors में एक जैसा होता है",
            "अलग-अलग sectors के अपने typical growth और risk के आधार पर अलग normal P/E ranges होते हैं",
            "Sector comparison SEBI के rules के तहत illegal है",
            "सिर्फ IT कं पनियों का P/E ratio होता है"
          ],
          "ta": [
            "எல்லா sectors-லயும் P/E identical",
            "வெவ்வேறு sectors-க்கு அவற்றின் typical growth, risk-ஐ பொறுத்து வெவ்வேறு normal P/E ranges இருக்கும்",
            "SEBI rules-ன் கீழ் sector comparison illegal",
            "IT நிறுவனங்களுக்கு மட்டும் தான் P/E ratio"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A 'high' P/E in one sector can be entirely normal in a faster-growing or different-risk sector.",
          "hi": "एक sector में एक 'high' P/E किसी तेज़ी से बढ़ ते या अलग-risk वाले sector में बिल्कुल normal हो सकता है।",
          "ta": "ஒரு sector-ல ‘high’-ஆ இருக்கிற P/E, வேற வேகமாக-வளரும் அல்லது வேற risk-ஐ கொண்ட sector-ல entirely normal-ஆ இருக்கலாம்."
        }
      },
      {
        "question": {
          "en": "What ultimately happened when the dot-com bubble burst in 2001?",
          "hi": "2001 में जब dot-com bubble फू टा तो आखिर में क्या हुआ?",
          "ta": "2001-ல dot-com bubble burst ஆனபோது இறுதியில் என்ன ஆச்சு?"
        },
        "options": {
          "en": [
            "IT stock prices kept rising",
            "Many high-P/E stocks fell 80-90% or more from their peaks",
            "P/E ratios became irrelevant",
            "The government banned IT stocks"
          ],
          "hi": [
            "IT stock prices बढ़ ते रहे",
            "कई high-P/E stocks अपने peaks से 80-90% या ज़्यादा गिर गए",
            "P/E ratios irrelevant हो गए",
            "Government ने IT stocks बैन कर दिए"
          ],
          "ta": [
            "IT stock prices ஏறிக்கிட்டே இருந்துச்சு",
            "நிறைய high-P/E stocks அவற்றின் peaks-லிருந்து 80-90% அல்லது அதற்கு மேல் விழுந்துச்சு",
            "P/E ratios irrelevant ஆயிடுச்சு",
            "அரசு IT stocks-ஐ ban பண்ணுச்சு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Prices collapsed back toward levels more in line with actual earnings once the growth hype faded. 20. P/B, ROE & Debt-to-Equity",
          "hi": "Growth hype फीकी पड़ ने के बाद prices वापस उन levels की तरफ़ collapse हो गए जो असली earnings के ज़्यादा अनुरूप थे।",
          "ta": "Growth hype fade ஆனதும், actual earnings-க்கு ஏற்ற levels-க்கு விலைகள் collapse ஆயிடுச்சு."
        }
      }
    ]
  },
  {
    "id": 20,
    "tier": "Intermediate",
    "title": {
      "en": "P/B, ROE & Debt-to-Equity",
      "hi": "P/B, ROE & Debt-to-Equity",
      "ta": "P/B, ROE & Debt-to-Equity"
    },
    "opener": {
      "en": "Meera's next challenge was a public-sector bank trading at a share price below what its own books said it was worth. “How can a company trade for less than its own net worth?” she asked, genuinely puzzled.\n\n“That exact puzzle played out across almost the entire PSU banking sector for years,” Paati said. “And these three ratios are exactly how you'd have understood why.”",
      "hi": "मीरा की अगली चुनौती एक public-sector bank थी जो अपनी books में बताई गई value से कम share price पर trade हो रहा था। “एक कं पनी अपनी net worth से कम पर कै से trade हो सकती है?” उसने सच में हैरान होकर पूछा।\n\n“ये ठीक यही पहेली लगभग पूरे PSU banking sector में सालों तक चलती रही,” पाटी ने कहा। “और ये तीन ratios ठीक वो तरीका हैं जिनसे तुम समझ सकती थीं कि क्यों।”",
      "ta": "மீராவின் அடுத்த challenge, அதன் சொந்த books சொல்ற worth-ஐ விட குறைவான share price-ல trade ஆகுற ஒரு public-sector bank தான். “ஒரு நிறுவனம் தன் சொந்த net worth-ஐ விட குறைவா எப்படி trade ஆகும்?” என்று genuine-ஆ புரியாம கேட்டாள்.\n\n“அதே exact puzzle வருடங்களா கிட்டத்தட்ட முழு PSU banking sector-லயும் play ஆச்சு,” பாட்டி சொன்னார். “இந்த மூணு ratios தான், நீங்க ஏன்னு புரிஞ்சிருக்க இருந்த வழி.”"
    },
    "realStorySubtitle": {
      "en": "When Bank Shares Traded Below Their Own Book Value",
      "hi": "जब Bank Shares अपने Book Value से नीचे Trade होते थे",
      "ta": "Bank Shares அவற்றின் சொந்த Book Value-ஐ விட குறைவா Trade ஆனது"
    },
    "realStoryBody": {
      "en": "Through much of the mid-2010s, many Indian public-sector banks saw a sharp rise in bad loans (non-performing assets), badly denting profitability and investor confidence. Several of these banks' shares traded at a Price-to-Book (P/B) ratio below 1 — meaning the market valued the entire company at less than its own stated net worth.\n\nIt wasn't a pricing error — investors were pricing in real doubts about the true health of those book values and future returns. Banks with a low Return on Equity (ROE) and asset-quality worries traded at a persistent discount, while stronger private banks with higher ROE traded at a premium — showing all three ratios working together in real time.",
      "hi": "2010 के दशक के बीच के ज़्यादातर हिस्से में, कई भारतीय public-sector banks में bad loans (non-performing assets) में तेज़ बढ़ोतरी देखी गई, जिससे profitability और investor confidence को बुरी तरह चोट लगी। इनमें से कई banks के shares 1 से नीचे के Price-to-Book (P/B) ratio पर trade हुए — मतलब market पूरी कं पनी को उसकी अपनी बताई गई net worth से कम आंक रहा था। ये कोई pricing गलती नहीं थी — investors उन book values और future returns की असली health को लेकर real doubts को price कर रहे थे। कम Return on Equity (ROE) और asset-quality चिंताओं वाले banks एक लगातार discount पर trade हुए, जबकि ज़्यादा ROE वाले मज़ बूत private banks एक premium पर trade हुए — जो तीनों ratios को real time में साथ काम करते दिखाता है।",
      "ta": "2010-களின் mid-ல, நிறைய Indian public-sector banks-ல bad loans-ல (non-performing assets) ஒரு sharp rise ஏற்பட்டு, profitability-ஐயும் investor confidence-ஐயும் மோசமா dent பண்ணுச்சு. இந்த banks-ல பலவற்றின் shares 1-க்கு கீழ் ஒரு Price-to-Book (P/B) ratio-ல trade ஆச்சு — அதாவது முழு நிறுவனத்தையும் market, அதன் சொந்த stated net worth-ஐ விட குறைவா value பண்ணுச்சு.\n\nஇது ஒரு pricing error இல்ல — investors அந்த book values-ன் true health-ஐயும் future returns- ஐயும் பத்தின real doubts-ஐ price பண்ணிக்கிட்டிருந்தாங்க. Low Return on Equity (ROE)-உம் asset- quality worries-உம் இருந்த banks ஒரு persistent discount-ல trade ஆச்சு, higher ROE-உடன் strong private banks ஒரு premium-ல trade ஆச்சு — மூணு ratios-உம் real time-ல சேர்ந்து வேலை பண்றதை காட்டுது."
    },
    "body": {
      "en": "Price-to-Book (P/B) Ratio P/B = Share Price ÷ Book Value Per Share. A P/B below 1 means the market values the company at less than its net worth on paper — often a red flag about asset quality, unless there's a genuine turnaround story.\n\nReturn on Equity (ROE) ROE measures how efficiently a company turns shareholders' money into profit — net profit as a percentage of shareholders' equity. A consistently high ROE (generally 15%+ is considered strong in India) signals a genuinely efficient, well-run business.\n\nDebt-to-Equity (D/E) Ratio D/E compares total debt to shareholders' equity. A high D/E means the company relies heavily on borrowed money — riskier in a downturn, since debt must be repaid regardless of how business is going, unlike equity.",
      "hi": "Price-to-Book (P/B) Ratio P/B = Share Price ÷ Book Value Per Share। 1 से नीचे का P/B मतलब market कं पनी को कागज़ पर उसकी net worth से कम आंक रहा है — अक्सर asset quality को लेकर एक red flag, जब तक कोई genuine turnaround story न हो।\n\nReturn on Equity (ROE) ROE मापता है कि एक कं पनी shareholders के पैसे को कितनी efficiently profit में बदलती है — net profit, shareholders' equity के percentage के तौर पर। लगातार high ROE (भारत में आमतौर पर 15%+ को strong माना जाता है) एक genuinely efficient, अच्छे से चलाए जा रहे business का संकेत देता है।\n\nDebt-to-Equity (D/E) Ratio D/E total debt को shareholders' equity से compare करता है। High D/E मतलब कं पनी उधार के पैसे पर भारी depend करती है — एक downturn में ज़्यादा risky, क्योंकि debt को business कै सा भी चल रहा हो, चुकाना ही होता है, equity के उलट।",
      "ta": "Price-to-Book (P/B) Ratio P/B = Share Price ÷ Book Value Per Share. 1-க்கு கீழ் ஒரு P/B என்றால், market நிறுவனத்தை paper-ல அதன் net worth-ஐ விட குறைவா value பண்றது — ஒரு genuine turnaround story இல்லைனா, பெரும்பாலும் asset quality-ஐ பத்தின ஒரு red flag.\n\nReturn on Equity (ROE) ROE, shareholders-ன் பணத்தை ஒரு நிறுவனம் எவ்வளவு efficient-ஆ profit-ஆ மாற்றுதுனு measure பண்ணும் — shareholders' equity-ன் percentage-ஆ net profit. Consistently high ROE (இந்தியாவில் generally 15%+ strong-ஆ கருதப்படுது) ஒரு genuinely efficient, well-run business-ஐ signal பண்ணும்.\n\nDebt-to-Equity (D/E) Ratio D/E, total debt-ஐ shareholders' equity-உடன் compare பண்ணும். High D/E என்றால், நிறுவனம் borrowed money-ஐ heavily சார்ந்திருக்கு — business எப்படி போனாலும் debt repay பண்ணப்படணும், equity-ஐ போல் இல்லாம, downturn-ல அது riskier."
    },
    "keyTakeaway": {
      "en": "No single ratio tells the whole story — a low P/B, weak ROE, and high D/E together painted a clear, consistent picture of distress across PSU banks for years. Reading ratios together, not in isolation, is what separates real analysis from guesswork.",
      "hi": "कोई एक ratio पूरी कहानी नहीं बताता — एक low P/B, कमज़ोर ROE, और high D/E ने मिलकर सालों तक PSU banks में distress की एक साफ़, consistent तस्वीर दिखाई। Ratios को अलग-अलग नहीं बल्कि साथ में पढ़ ना ही असली analysis को guesswork से अलग करता है।",
      "ta": "ஒரே ஒரு ratio முழு கதையையும் சொல்லாது — low P/B, weak ROE, high D/E சேர்ந்து, PSU banks-ல வருடங்களா distress-ன் தெளிவான, consistent picture-ஐ paint பண்ணுச்சு. Isolation-ல இல்லாம ratios-ஐ சேர்த்து படிக்குறது தான் real analysis-ஐ guesswork-லிருந்து பிரிக்கும்."
    },
    "quiz": [
      {
        "question": {
          "en": "What does a Price-to-Book (P/B) ratio below 1 typically suggest?",
          "hi": "1 से नीचे का Price-to-Book (P/B) ratio आमतौर पर क्या दिखाता है?",
          "ta": "Price-to-Book (P/B) ratio 1-க்கு கீழ் இருந்தா, typically அது என்னை suggest பண்ணும்?"
        },
        "options": {
          "en": [
            "The company is extremely overvalued",
            "The market values the company at less than its stated net worth",
            "The company has no shareholders",
            "The company pays no tax"
          ],
          "hi": [
            "कं पनी बेहद overvalued है",
            "Market कं पनी को उसकी बताई गई net worth से कम आंकता है",
            "कं पनी के पास कोई shareholders नहीं हैं",
            "कं पनी कोई tax नहीं देती"
          ],
          "ta": [
            "நிறுவனம் extremely overvalued",
            "Market நிறுவனத்தை அதன் stated net worth-ஐ விட குறைவா value பண்றது",
            "நிறுவனத்திற்கு shareholders இல்லை",
            "நிறுவனம் எந்த tax-உம் pay பண்ணாது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This often signals market doubts about the true quality of the company's assets or future returns.",
          "hi": "ये अक्सर कं पनी के assets या future returns की असली quality को लेकर market के doubts का संकेत देता है।",
          "ta": "நிறுவனத்தின் assets-ன் true quality அல்லது future returns-ஐ பத்தி market doubts-ஐ இது பெரும்பாலும் signal பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What does Return on Equity (ROE) measure?",
          "hi": "Return on Equity (ROE) क्या मापता है?",
          "ta": "Return on Equity (ROE) எதை measure பண்ணும்?"
        },
        "options": {
          "en": [
            "Total company debt",
            "How efficiently a company turns shareholders' money into profit",
            "The company's share price history",
            "The number of shares outstanding"
          ],
          "hi": [
            "कं पनी का total debt",
            "एक कं पनी shareholders के पैसे को कितनी efficiently profit में बदलती है",
            "कं पनी के share price का इतिहास",
            "Outstanding shares की संख्या"
          ],
          "ta": [
            "நிறுவனத்தின் total debt",
            "Shareholders-ன் பணத்தை ஒரு நிறுவனம் எவ்வளவு efficient-ஆ profit-ஆ மாற்றுது",
            "நிறுவனத்தின் share price history",
            "Outstanding shares-ன் எண்ணிக்கை"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "ROE expresses net profit as a percentage of shareholders' equity, showing capital efficiency.",
          "hi": "ROE net profit को shareholders' equity के percentage के तौर पर express करता है, capital efficiency दिखाते हुए।",
          "ta": "Shareholders' equity-ன் percentage-ஆ net profit-ஐ ROE express பண்ணும், capital efficiency-ஐ காட்டும்."
        }
      },
      {
        "question": {
          "en": "What does a high Debt-to-Equity (D/E) ratio indicate?",
          "hi": "एक high Debt-to-Equity (D/E) ratio क्या दिखाता है?",
          "ta": "High Debt-to-Equity (D/E) ratio எதை indicate பண்ணும்?"
        },
        "options": {
          "en": [
            "The company has no debt",
            "The company relies heavily on borrowed money, which is riskier in a downturn",
            "The company is definitely a bad investment",
            "The company pays high dividends"
          ],
          "hi": [
            "कं पनी पर कोई debt नहीं है",
            "कं पनी उधार के पैसे पर भारी depend करती है, जो एक downturn में ज़्यादा risky है",
            "कं पनी निश्चित रूप से एक बुरा investment है",
            "कं पनी high dividends देती है"
          ],
          "ta": [
            "நிறுவனத்திற்கு debt இல்ல",
            "நிறுவனம் borrowed money-ஐ heavily சார்ந்திருக்கு, downturn-ல அது riskier",
            "நிறுவனம் definitely ஒரு bad investment",
            "நிறுவனம் high dividends pay பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Debt must be repaid regardless of business performance, unlike equity, making high D/E riskier in tough times.",
          "hi": "Business performance चाहे जैसी भी हो, debt को चुकाना ही होता है, equity के उलट, जिससे high D/E मुश्किल समय में ज़्यादा risky हो जाता है।",
          "ta": "Equity-ஐ போல் இல்லாம, business performance எப்படி போனாலும் debt repay பண்ணப்படணும், high D/E-ஐ கடினமான காலங்களில் riskier ஆக்கும்."
        }
      },
      {
        "question": {
          "en": "According to the story, why did many PSU banks trade at a P/B below 1 in the mid-2010s?",
          "hi": "कहानी के अनुसार, 2010 के दशक के बीच में कई PSU banks 1 से नीचे के P/B पर क्यों trade हुए?",
          "ta": "கதையின் படி, 2010-களின் mid-ல நிறைய PSU banks ஏன் P/B 1-க்கு கீழ் trade ஆச்சு?"
        },
        "options": {
          "en": [
            "They had too much cash",
            "Rising bad loans (NPAs) hurt profitability and investor confidence in their true book value",
            "They stopped operating",
            "Interest rates were too low"
          ],
          "hi": [
            "उनके पास बहुत ज़्यादा cash था",
            "बढ़ ते bad loans (NPAs) ने उनकी असली book value को लेकर profitability और investor confidence को चोट पहुँचाई",
            "उन्होंने operate करना बंद कर दिया",
            "Interest rates बहुत कम थे"
          ],
          "ta": [
            "அவங்களிடம் அதிகமா cash இருந்துச்சு",
            "Rising bad loans (NPAs) profitability-ஐயும், அவற்றின் true book value-ல investor confidence-ஐயும் பாதிச்சுச்சு",
            "அவை operating-ஐ நிறுத்திடுச்சு",
            "Interest rates ரொம்ப குறைவா இருந்துச்சு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Bad-loan stress made investors doubt the real value behind the reported book value, pushing P/B below 1.",
          "hi": "Bad-loan stress ने investors को reported book value के पीछे की असली value पर शक करने पर मजबूर किया, जिससे P/B 1 से नीचे चला गया।",
          "ta": "Bad-loan stress, reported book value-க்கு பின்னால் இருக்கிற real value-ஐ பத்தி investors-க்கு doubt-ஐ உண்டாக்குச்சு, P/B-ஐ 1-க்கு கீழ் தள்ளுச்சு."
        }
      },
      {
        "question": {
          "en": "What is the key lesson about using P/B, ROE, and D/E together?",
          "hi": "P/B, ROE, और D/E को साथ इस्तेमाल करने की मुख्य सीख क्या है?",
          "ta": "P/B, ROE, D/E-ஐ சேர்த்து பயன்படுத்துறதைப் பத்தின key lesson என்ன?"
        },
        "options": {
          "en": [
            "Only one ratio is ever necessary",
            "Reading them together gives a more complete, reliable picture than any single ratio alone",
            "These ratios contradict each other and should be ignored",
            "They only apply to banks"
          ],
          "hi": [
            "सिर्फ एक ratio ही कभी ज़ रूरी होता है",
            "उन्हें साथ पढ़ ना किसी अके ले ratio से कहीं ज़्यादा पूरी, भरोसेमंद तस्वीर देता है",
            "ये ratios एक-दूसरे का खंडन करते हैं और नज़ रअंदाज़ करने चाहिए",
            "ये सिर्फ banks पर लागू होते हैं"
          ],
          "ta": [
            "ஒரே ஒரு ratio மட்டும் தான் எப்போதும் necessary",
            "அவற்றை சேர்த்து படிக்குறது, எந்த single ratio-ஐ விடவும் ஒரு complete, reliable picture-ஐ தரும்",
            "இந்த ratios ஒண்ணுக்கொண்ணு contradict பண்ணும், ignore பண்ணணும்",
            "அவை banks-க்கு மட்டும் தான் apply ஆகும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The PSU bank story shows how low P/B, weak ROE, and high D/E together painted a consistent picture of real distress. 21. Earnings Per Share (EPS)",
          "hi": "PSU bank की कहानी दिखाती है कि कै से low P/B, कमज़ोर ROE, और high D/E ने मिलकर असली distress की एक consistent तस्वीर दिखाई।",
          "ta": "Low P/B, weak ROE, high D/E சேர்ந்து real distress-ன் consistent picture-ஐ எப்படி paint பண்ணுச்சுனு PSU bank கதை காட்டுது."
        }
      }
    ]
  },
  {
    "id": 21,
    "tier": "Intermediate",
    "title": {
      "en": "Earnings Per Share (EPS)",
      "hi": "Earnings Per Share (EPS)",
      "ta": "Earnings Per Share (EPS)"
    },
    "opener": {
      "en": "“Company A made ₹500 crore profit. Company B made only ₹50 crore. A must be the better investment,” Meera said confidently — until Paati asked her a simple follow-up question: how many shares does each company actually have?\n\nIt turned out Company A had ten times as many shares outstanding as Company B. Once divided out, each share of tiny Company B actually earned more profit than each share of giant Company A.\n\nWhat EPS Actually Tells You EPS = Net Profit ÷ Total Number of Outstanding Shares. It converts a company's total profit into a per-share figure — the actual profit backing the one unit (a share) that you, as an individual investor, actually own.\n\nWhy Total Profit Alone Is Misleading Comparing two companies' total profit directly is like comparing two restaurants' total revenue without asking how many tables each one has. A bigger number doesn't mean a better deal per share — EPS puts every company on the same, comparable, per-share footing.\n\nEPS and Corporate Actions EPS can also shift for reasons unrelated to business performance — for instance, a bonus share issue (covered in Lesson 33) increases the number of shares without changing total profit, which mechanically lowers EPS even though nothing about the underlying business changed.\n\nKey takeaway: Never compare companies by total profit alone — always look at profit per share (EPS), and understand why EPS moved before reacting to it. A falling EPS after a bonus issue is very different news from a falling EPS after a bad quarter.\n\nQUICK QUIZ · TEST YOURSELF (5 QUESTIONS)\n\n1. How is EPS (Earnings Per Share) calculated? A) Net Profit ÷ Total Number of Outstanding Shares B) Share Price ÷ Net Profit C) Total Revenue ÷ Total Shares D) Net Profit × Share Price Correct: A) Net Profit ÷ Total Number of Outstanding Shares Why: EPS converts total company profit into a comparable per-share figure.\n\n2. Why is comparing two companies' total profit alone misleading? A) Total profit is always accurate on its own B) Companies can have very different numbers of shares outstanding, changing the per-share value C) Only EPS matters, profit is irrelevant D) It isn't misleading at all Correct: B) Companies can have very different numbers of shares outstanding, changing the per-share value Why: A smaller total profit split among fewer shares can mean a higher EPS than a larger profit split among many more shares.\n\n3. What can cause EPS to fall even if a company's actual business performance hasn't changed? A) A dividend payment B) A bonus share issue, which increases share count without changing total profit C) Higher trading volume D) A change in the CEO Correct: B) A bonus share issue, which increases share count without changing total profit Why: More shares outstanding mechanically lowers EPS, even with identical total profit.\n\n4. What does EPS allow investors to do? A) Avoid taxes B) Compare companies on a comparable, per-share basis rather than by raw total profit C) Predict interest rate changes D) Guarantee future returns Correct: B) Compare companies on a comparable, per-share basis rather than by raw total profit Why: EPS puts differently-sized companies on the same per-share footing for fair comparison.\n\n5. Why should you understand *why* EPS changed before reacting to it? A) EPS changes never matter B) A fall from a bonus issue is very different news from a fall due to a bad quarter C) EPS cannot actually change D) Only quarterly EPS changes are real Correct: B) A fall from a bonus issue is very different news from a fall due to a bad quarter Why: The cause behind an EPS move determines whether it's actually a concerning signal or a harmless mechanical effect.\n\n22. Introduction to Fundamental Analysis",
      "hi": "“कं पनी A ने ₹500 करोड़ प्रॉफिट कमाया। कं पनी B ने सिर्फ ₹50 करोड़ कमाया। A ही बेहतर investment होगी,” मीरा ने confidently कहा — जब तक पाटी ने एक simple सवाल नहीं पूछा: हर कं पनी के पास actually कितने shares हैं?\n\nपता चला कि कं पनी A के पास कं पनी B से दस गुना ज़्यादा outstanding shares थे। divide करने पर, छोटी कं पनी B के हर share ने बड़ी कं पनी A के हर share से ज़्यादा प्रॉफिट कमाया।\n\nEPS असल में क्या बताता है EPS = Net Profit ÷ Outstanding Shares की कुल संख्या। ये किसी कं पनी के कुल प्रॉफिट को per-share figure में बदल देता है — वो actual profit जो एक unit (एक share) के पीछे है, जिसे आप, एक individual investor के तौर पर, असल में own करते हैं।\n\nसिर्फ कुल Profit क्यों Misleading है दो कं पनियों के कुल profit को सीधे compare करना ऐसा है जैसे दो restaurants की कुल revenue compare करना, बिना ये पूछे कि हर एक के पास कितने tables हैं। बड़ा नंबर मतलब per share बेहतर deal नहीं — EPS हर कं पनी को same, comparable, per- share footing पर रख देता है।\n\nEPS और Corporate Actions EPS business performance से अलग वजहों से भी बदल सकता है — जैसे, bonus share issue (Lesson 33 में cover किया गया) shares की संख्या बढ़ा देता है बिना total profit बदले, जिससे EPS mechanically कम हो जाता है, भले ही underlying business में कुछ भी ना बदला हो।\n\nमुख्य सीख: कभी भी कं पनियों को सिर्फ total profit से compare मत करो — हमेशा profit per share (EPS) देखो, और react करने से पहले समझो कि EPS क्यों बदला। bonus issue के बाद गिरता EPS, एक बुरी quarter के बाद गिरते EPS से बिलकुल अलग news है।\n\nक्विक क्विज़ · खुद को टेस्ट करें (5 सवाल)\n\n1. EPS (Earnings Per Share) कै से calculate होता है? A) Net Profit ÷ Outstanding Shares की कुल संख्या B) Share Price ÷ Net Profit C) Total Revenue ÷ Total Shares D) Net Profit × Share Price सही जवाब: A) Net Profit ÷ Outstanding Shares की कुल संख्या क्यों: EPS कं पनी के total profit को एक comparable per-share figure में बदल देता है।\n\n2. दो कं पनियों के सिर्फ total profit को compare करना misleading क्यों है? A) Total profit हमेशा खुद में accurate होता है B) कं पनियों के पास outstanding shares की संख्या बहुत अलग हो सकती है, जिससे per-share value बदल जाती है C) सिर्फ EPS matter करता है, profit irrelevant है D) ये misleading है ही नहीं सही जवाब: B) कं पनियों के पास outstanding shares की संख्या बहुत अलग हो सकती है, जिससे per-share value बदल जाती है क्यों: कम shares में बंटा छोटा total profit, ज़्यादा shares में बंटे बड़े profit से ज़्यादा EPS दे सकता है।\n\n3. भले ही कं पनी की actual business performance ना बदली हो, फिर भी EPS किस वजह से गिर सकता है? A) Dividend payment से B) Bonus share issue से, जो total profit बदले बिना share count बढ़ा देता है C) ज़्यादा trading volume से D) CEO बदलने से सही जवाब: B) Bonus share issue से, जो total profit बदले बिना share count बढ़ा देता है क्यों: ज़्यादा outstanding shares, same total profit के बावजूद EPS को mechanically कम कर देते हैं।\n\n4. EPS investors को क्या करने देता है? A) Taxes avoid करने B) कं पनियों को raw total profit की बजाय एक comparable, per-share basis पर compare करने C) Interest rate changes predict करने D) Future returns guarantee करने सही जवाब: B) कं पनियों को raw total profit की बजाय एक comparable, per-share basis पर compare करने क्यों: EPS अलग-अलग size की कं पनियों को same per-share footing पर रखता है, ताकि fair comparison हो सके।\n\n5. EPS पर react करने से पहले ये समझना क्यों ज़ रूरी है कि वो *क्यों* बदला? A) EPS में बदलाव कभी matter नहीं करते B) Bonus issue से आई गिरावट, एक बुरी quarter की वजह से आई गिरावट से बिलकुल अलग news है C) EPS actually बदल ही नहीं सकता D) सिर्फ quarterly EPS changes real होते हैं सही जवाब: B) Bonus issue से आई गिरावट, एक बुरी quarter की वजह से आई गिरावट से बिलकुल अलग news है क्यों: EPS में बदलाव के पीछे की वजह ये तय करती है कि ये असल में चिंता की बात है या एक harmless mechanical effect।",
      "ta": "“Company A ₹500 crore profit பண்ணுச்சு. Company B வெறும் ₹50 crore தான் பண்ணுச்சு. A தான் better investment,” மீரா confident-ஆ சொன்னாள் — பாட்டி ஒரு simple follow-up question கேட்குற வரைக்கும்: ஒவ்வொரு நிறுவனத்துக்கும் actual-ஆ எத்தனை shares இருக்கு?\n\nCompany A-க்கு Company B-ஐ விட outstanding shares பத்து மடங்கு இருந்துச்சு. Divide பண்ணி பார்த்தா, சின்ன Company B-ன் ஒவ்வொரு share-உம், giant Company A-ன் ஒவ்வொரு share-ஐ விட actual-ஆ அதிக profit சம்பாதிச்சிருந்துச்சு.\n\nEPS உண்மையில் என்ன சொல்லும் EPS = Net Profit ÷ Total Number of Outstanding Shares. இது நிறுவனத்தின் total profit-ஐ ஒரு per- share figure-ஆ மாற்றும் — ஒரு individual investor-ஆ நீங்க actual-ஆ சொந்தமாக்கியிருக்கிற ஒரு unit- க்கு (ஒரு share) பின்னாடி இருக்கிற actual profit.\n\nTotal Profit மட்டும் ஏன் Misleading இரண்டு நிறுவனங்களின் total profit-ஐ directly compare பண்றது, இரண்டு restaurants-ன் total revenue-ஐ, ஒவ்வொண்ணுக்கும் எத்தனை tables இருக்குனு கேக்காம compare பண்றது மாதிரி. பெரிய எண் என்றால் per share better deal இல்ல — EPS ஒவ்வொரு நிறுவனத்தையும் ஒரே, comparable, per-share footing-ல வைக்கும்.\n\nEPS மற்றும் Corporate Actions Business performance-உடன் relation இல்லாத காரணங்களுக்காகவும் EPS shift ஆகலாம் — உதாரணத்துக்கு, ஒரு bonus share issue (Lesson 33-ல cover பண்ணப்படும்) total profit மாறாம shares-ன் எண்ணிக்கையை கூட்டும், underlying business-ல ஒன்றும் மாறாம இருந்தாலும் இது mechanical-ஆ EPS-ஐ குறைக்கும்.\n\nமுக்கிய பாடம்: Total profit மட்டும் வச்சு நிறுவனங்களை compare பண்ணாதீங்க — எப்போதும் profit per share (EPS)-ஐ பாருங்க, react பண்றதுக்கு முன் EPS ஏன் move ஆச்சுனு புரிஞ்சுக்குங்க. Bonus issue-க்கு பிறகு falling EPS, ஒரு bad quarter-க்கு பிறகு falling EPS-ஐ விட முற்றிலும் வேற news.\n\nவினாடி வினா · சுயபரிசோதனை (5 கேள்விகள்)\n\n1. EPS (Earnings Per Share) எப்படி calculate பண்ணப்படும்? A) Net Profit ÷ Total Number of Outstanding Shares B) Share Price ÷ Net Profit C) Total Revenue ÷ Total Shares D) Net Profit × Share Price சரியான பதில்:A) Net Profit ÷ Total Number of Outstanding Shares ஏன்:Total company profit-ஐ EPS ஒரு comparable per-share figure-ஆ மாற்றும்.\n\n2. இரண்டு நிறுவனங்களின் total profit-ஐ மட்டும் compare பண்றது ஏன் misleading? A) Total profit தானாகவே எப்போதும் accurate B) Outstanding shares-ன் எண்ணிக்கை நிறுவனங்களுக்கு ரொம்ப வித்தியாசமா இருக்கலாம், per-share value மாறும் C) EPS மட்டும் தான் matter பண்ணும், profit irrelevant D) இது misleading இல்லவே இல்ல சரியான பதில்:B) Outstanding shares-ன் எண்ணிக்கை நிறுவனங்களுக்கு ரொம்ப வித்தியாசமா இருக்கலாம், per-share value மாறும் ஏன்:குறைவான shares-ல split ஆன சின்ன total profit, அதிக shares-ல split ஆன பெரிய profit-ஐ விட higher EPS-ஆ இருக்கலாம்.\n\n3. நிறுவனத்தின் actual business performance மாறலைனாலும் EPS ஏன் விழலாம்? A) ஒரு dividend payment B) Total profit மாறாம shares count-ஐ கூட்டுற ஒரு bonus share issue C) அதிக trading volume D) CEO-ல ஒரு மாற்றம் சரியான பதில்:B) Total profit மாறாம shares count-ஐ கூட்டுற ஒரு bonus share issue ஏன்:Total profit identical-ஆ இருந்தாலும், அதிக outstanding shares mechanical-ஆ EPS-ஐ குறைக்கும்.\n\n4. EPS investors-ஐ என்ன பண்ண அனுமதிக்கும்? A) Taxes-ஐ avoid பண்ண B) Raw total profit-ஐ விட, comparable, per-share basis-ல நிறுவனங்களை compare பண்ண C) Interest rate changes-ஐ predict பண்ண D) Future returns-ஐ guarantee பண்ண சரியான பதில்:B) Raw total profit-ஐ விட, comparable, per-share basis-ல நிறுவனங்களை compare பண்ண ஏன்:வெவ்வேறு size-ல இருக்கிற நிறுவனங்களை fair comparison-க்கு EPS ஒரே per-share footing-ல வைக்கும்.\n\n5. EPS-ல react பண்றதுக்கு முன், அது ஏன் மாறுச்சுனு நீங்க ஏன் புரிஞ்சுக்கணும்? A) EPS changes ஒருபோதும் matter பண்ணாது B) Bonus issue-லிருந்து வரும் ஒரு fall, bad quarter-லிருந்து வரும் fall-ஐ விட முற்றிலும் வேற news C) EPS actual-ஆ மாற முடியாது D) Quarterly EPS changes மட்டும் தான் real சரியான பதில்:B) Bonus issue-லிருந்து வரும் ஒரு fall, bad quarter-லிருந்து வரும் fall-ஐ விட முற்றிலும் வேற news ஏன்:ஒரு EPS move-க்கு பின்னால் இருக்கிற காரணம் தான், அது worry பண்ண வேண்டிய signal-ஆ இல்ல ஒரு harmless mechanical effect-ஆனு தீர்மானிக்கும்."
    },
    "body": {
      "en": "“Company A made ₹500 crore profit. Company B made only ₹50 crore. A must be the better investment,” Meera said confidently — until Paati asked her a simple follow-up question: how many shares does each company actually have?\n\nIt turned out Company A had ten times as many shares outstanding as Company B. Once divided out, each share of tiny Company B actually earned more profit than each share of giant Company A.\n\nWhat EPS Actually Tells You EPS = Net Profit ÷ Total Number of Outstanding Shares. It converts a company's total profit into a per-share figure — the actual profit backing the one unit (a share) that you, as an individual investor, actually own.\n\nWhy Total Profit Alone Is Misleading Comparing two companies' total profit directly is like comparing two restaurants' total revenue without asking how many tables each one has. A bigger number doesn't mean a better deal per share — EPS puts every company on the same, comparable, per-share footing.\n\nEPS and Corporate Actions EPS can also shift for reasons unrelated to business performance — for instance, a bonus share issue (covered in Lesson 33) increases the number of shares without changing total profit, which mechanically lowers EPS even though nothing about the underlying business changed.",
      "hi": "“कं पनी A ने ₹500 करोड़ प्रॉफिट कमाया। कं पनी B ने सिर्फ ₹50 करोड़ कमाया। A ही बेहतर investment होगी,” मीरा ने confidently कहा — जब तक पाटी ने एक simple सवाल नहीं पूछा: हर कं पनी के पास actually कितने shares हैं?\n\nपता चला कि कं पनी A के पास कं पनी B से दस गुना ज़्यादा outstanding shares थे। divide करने पर, छोटी कं पनी B के हर share ने बड़ी कं पनी A के हर share से ज़्यादा प्रॉफिट कमाया।\n\nEPS असल में क्या बताता है EPS = Net Profit ÷ Outstanding Shares की कुल संख्या। ये किसी कं पनी के कुल प्रॉफिट को per-share figure में बदल देता है — वो actual profit जो एक unit (एक share) के पीछे है, जिसे आप, एक individual investor के तौर पर, असल में own करते हैं।\n\nसिर्फ कुल Profit क्यों Misleading है दो कं पनियों के कुल profit को सीधे compare करना ऐसा है जैसे दो restaurants की कुल revenue compare करना, बिना ये पूछे कि हर एक के पास कितने tables हैं। बड़ा नंबर मतलब per share बेहतर deal नहीं — EPS हर कं पनी को same, comparable, per- share footing पर रख देता है।\n\nEPS और Corporate Actions EPS business performance से अलग वजहों से भी बदल सकता है — जैसे, bonus share issue (Lesson 33 में cover किया गया) shares की संख्या बढ़ा देता है बिना total profit बदले, जिससे EPS mechanically कम हो जाता है, भले ही underlying business में कुछ भी ना बदला हो।",
      "ta": "“Company A ₹500 crore profit பண்ணுச்சு. Company B வெறும் ₹50 crore தான் பண்ணுச்சு. A தான் better investment,” மீரா confident-ஆ சொன்னாள் — பாட்டி ஒரு simple follow-up question கேட்குற வரைக்கும்: ஒவ்வொரு நிறுவனத்துக்கும் actual-ஆ எத்தனை shares இருக்கு?\n\nCompany A-க்கு Company B-ஐ விட outstanding shares பத்து மடங்கு இருந்துச்சு. Divide பண்ணி பார்த்தா, சின்ன Company B-ன் ஒவ்வொரு share-உம், giant Company A-ன் ஒவ்வொரு share-ஐ விட actual-ஆ அதிக profit சம்பாதிச்சிருந்துச்சு.\n\nEPS உண்மையில் என்ன சொல்லும் EPS = Net Profit ÷ Total Number of Outstanding Shares. இது நிறுவனத்தின் total profit-ஐ ஒரு per- share figure-ஆ மாற்றும் — ஒரு individual investor-ஆ நீங்க actual-ஆ சொந்தமாக்கியிருக்கிற ஒரு unit- க்கு (ஒரு share) பின்னாடி இருக்கிற actual profit.\n\nTotal Profit மட்டும் ஏன் Misleading இரண்டு நிறுவனங்களின் total profit-ஐ directly compare பண்றது, இரண்டு restaurants-ன் total revenue-ஐ, ஒவ்வொண்ணுக்கும் எத்தனை tables இருக்குனு கேக்காம compare பண்றது மாதிரி. பெரிய எண் என்றால் per share better deal இல்ல — EPS ஒவ்வொரு நிறுவனத்தையும் ஒரே, comparable, per-share footing-ல வைக்கும்.\n\nEPS மற்றும் Corporate Actions Business performance-உடன் relation இல்லாத காரணங்களுக்காகவும் EPS shift ஆகலாம் — உதாரணத்துக்கு, ஒரு bonus share issue (Lesson 33-ல cover பண்ணப்படும்) total profit மாறாம shares-ன் எண்ணிக்கையை கூட்டும், underlying business-ல ஒன்றும் மாறாம இருந்தாலும் இது mechanical-ஆ EPS-ஐ குறைக்கும்."
    },
    "keyTakeaway": {
      "en": "Never compare companies by total profit alone — always look at profit per share (EPS), and understand why EPS moved before reacting to it. A falling EPS after a bonus issue is very different news from a falling EPS after a bad quarter.",
      "hi": "कभी भी कं पनियों को सिर्फ total profit से compare मत करो — हमेशा profit per share (EPS) देखो, और react करने से पहले समझो कि EPS क्यों बदला। bonus issue के बाद गिरता EPS, एक बुरी quarter के बाद गिरते EPS से बिलकुल अलग news है।",
      "ta": "Total profit மட்டும் வச்சு நிறுவனங்களை compare பண்ணாதீங்க — எப்போதும் profit per share (EPS)-ஐ பாருங்க, react பண்றதுக்கு முன் EPS ஏன் move ஆச்சுனு புரிஞ்சுக்குங்க. Bonus issue-க்கு பிறகு falling EPS, ஒரு bad quarter-க்கு பிறகு falling EPS-ஐ விட முற்றிலும் வேற news."
    },
    "quiz": [
      {
        "question": {
          "en": "How is EPS (Earnings Per Share) calculated?",
          "hi": "EPS (Earnings Per Share) कै से calculate होता है?",
          "ta": "EPS (Earnings Per Share) எப்படி calculate பண்ணப்படும்?"
        },
        "options": {
          "en": [
            "Net Profit ÷ Total Number of Outstanding Shares",
            "Share Price ÷ Net Profit",
            "Total Revenue ÷ Total Shares",
            "Net Profit × Share Price"
          ],
          "hi": [
            "Net Profit ÷ Outstanding Shares की कुल संख्या",
            "Share Price ÷ Net Profit",
            "Total Revenue ÷ Total Shares",
            "Net Profit × Share Price"
          ],
          "ta": [
            "Net Profit ÷ Total Number of Outstanding Shares",
            "Share Price ÷ Net Profit",
            "Total Revenue ÷ Total Shares",
            "Net Profit × Share Price"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "EPS converts total company profit into a comparable per-share figure.",
          "hi": "EPS कं पनी के total profit को एक comparable per-share figure में बदल देता है।",
          "ta": "Total company profit-ஐ EPS ஒரு comparable per-share figure-ஆ மாற்றும்."
        }
      },
      {
        "question": {
          "en": "Why is comparing two companies' total profit alone misleading?",
          "hi": "दो कं पनियों के सिर्फ total profit को compare करना misleading क्यों है?",
          "ta": "இரண்டு நிறுவனங்களின் total profit-ஐ மட்டும் compare பண்றது ஏன் misleading?"
        },
        "options": {
          "en": [
            "Total profit is always accurate on its own",
            "Companies can have very different numbers of shares outstanding, changing the per-share value",
            "Only EPS matters, profit is irrelevant",
            "It isn't misleading at all"
          ],
          "hi": [
            "Total profit हमेशा खुद में accurate होता है",
            "कं पनियों के पास outstanding shares की संख्या बहुत अलग हो सकती है, जिससे per-share value बदल जाती है",
            "सिर्फ EPS matter करता है, profit irrelevant है",
            "ये misleading है ही नहीं"
          ],
          "ta": [
            "Total profit தானாகவே எப்போதும் accurate",
            "Outstanding shares-ன் எண்ணிக்கை நிறுவனங்களுக்கு ரொம்ப வித்தியாசமா இருக்கலாம், per-share value மாறும்",
            "EPS மட்டும் தான் matter பண்ணும், profit irrelevant",
            "இது misleading இல்லவே இல்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A smaller total profit split among fewer shares can mean a higher EPS than a larger profit split among many more shares.",
          "hi": "कम shares में बंटा छोटा total profit, ज़्यादा shares में बंटे बड़े profit से ज़्यादा EPS दे सकता है।",
          "ta": "குறைவான shares-ல split ஆன சின்ன total profit, அதிக shares-ல split ஆன பெரிய profit-ஐ விட higher EPS-ஆ இருக்கலாம்."
        }
      },
      {
        "question": {
          "en": "What can cause EPS to fall even if a company's actual business performance hasn't changed?",
          "hi": "भले ही कं पनी की actual business performance ना बदली हो, फिर भी EPS किस वजह से गिर सकता है?",
          "ta": "நிறுவனத்தின் actual business performance மாறலைனாலும் EPS ஏன் விழலாம்?"
        },
        "options": {
          "en": [
            "A dividend payment",
            "A bonus share issue, which increases share count without changing total profit",
            "Higher trading volume",
            "A change in the CEO"
          ],
          "hi": [
            "Dividend payment से",
            "Bonus share issue से, जो total profit बदले बिना share count बढ़ा देता है",
            "ज़्यादा trading volume से",
            "CEO बदलने से"
          ],
          "ta": [
            "ஒரு dividend payment",
            "Total profit மாறாம shares count-ஐ கூட்டுற ஒரு bonus share issue",
            "அதிக trading volume",
            "CEO-ல ஒரு மாற்றம்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "More shares outstanding mechanically lowers EPS, even with identical total profit.",
          "hi": "ज़्यादा outstanding shares, same total profit के बावजूद EPS को mechanically कम कर देते हैं।",
          "ta": "Total profit identical-ஆ இருந்தாலும், அதிக outstanding shares mechanical-ஆ EPS-ஐ குறைக்கும்."
        }
      },
      {
        "question": {
          "en": "What does EPS allow investors to do?",
          "hi": "EPS investors को क्या करने देता है?",
          "ta": "EPS investors-ஐ என்ன பண்ண அனுமதிக்கும்?"
        },
        "options": {
          "en": [
            "Avoid taxes",
            "Compare companies on a comparable, per-share basis rather than by raw total profit",
            "Predict interest rate changes",
            "Guarantee future returns"
          ],
          "hi": [
            "Taxes avoid करने",
            "कं पनियों को raw total profit की बजाय एक comparable, per-share basis पर compare करने",
            "Interest rate changes predict करने",
            "Future returns guarantee करने"
          ],
          "ta": [
            "Taxes-ஐ avoid பண்ண",
            "Raw total profit-ஐ விட, comparable, per-share basis-ல நிறுவனங்களை compare பண்ண",
            "Interest rate changes-ஐ predict பண்ண",
            "Future returns-ஐ guarantee பண்ண"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "EPS puts differently-sized companies on the same per-share footing for fair comparison.",
          "hi": "EPS अलग-अलग size की कं पनियों को same per-share footing पर रखता है, ताकि fair comparison हो सके।",
          "ta": "வெவ்வேறு size-ல இருக்கிற நிறுவனங்களை fair comparison-க்கு EPS ஒரே per-share footing-ல வைக்கும்."
        }
      },
      {
        "question": {
          "en": "Why should you understand *why* EPS changed before reacting to it?",
          "hi": "EPS पर react करने से पहले ये समझना क्यों ज़ रूरी है कि वो *क्यों* बदला?",
          "ta": "EPS-ல react பண்றதுக்கு முன், அது ஏன் மாறுச்சுனு நீங்க ஏன் புரிஞ்சுக்கணும்?"
        },
        "options": {
          "en": [
            "EPS changes never matter",
            "A fall from a bonus issue is very different news from a fall due to a bad quarter",
            "EPS cannot actually change",
            "Only quarterly EPS changes are real"
          ],
          "hi": [
            "EPS में बदलाव कभी matter नहीं करते",
            "Bonus issue से आई गिरावट, एक बुरी quarter की वजह से आई गिरावट से बिलकुल अलग news है",
            "EPS actually बदल ही नहीं सकता",
            "सिर्फ quarterly EPS changes real होते हैं"
          ],
          "ta": [
            "EPS changes ஒருபோதும் matter பண்ணாது",
            "Bonus issue-லிருந்து வரும் ஒரு fall, bad quarter-லிருந்து வரும் fall-ஐ விட முற்றிலும் வேற news",
            "EPS actual-ஆ மாற முடியாது",
            "Quarterly EPS changes மட்டும் தான் real"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The cause behind an EPS move determines whether it's actually a concerning signal or a harmless mechanical effect. 22. Introduction to Fundamental Analysis",
          "hi": "EPS में बदलाव के पीछे की वजह ये तय करती है कि ये असल में चिंता की बात है या एक harmless mechanical effect।",
          "ta": "ஒரு EPS move-க்கு பின்னால் இருக்கிற காரணம் தான், அது worry பண்ண வேண்டிய signal-ஆ இல்ல ஒரு harmless mechanical effect-ஆனு தீர்மானிக்கும்."
        }
      }
    ]
  },
  {
    "id": 22,
    "tier": "Intermediate",
    "title": {
      "en": "Introduction to Fundamental Analysis",
      "hi": "Fundamental Analysis का परिचय",
      "ta": "Fundamental Analysis அறிமுகம்"
    },
    "opener": {
      "en": "With balance sheets, P&L statements, and ratios all under her belt, Meera realised she'd actually been learning one connected skill all along: fundamental analysis — judging a business by what it's actually worth, not by what its chart looks like.\n\n“This is exactly how the most patient, long-term investors in this country have made their money,” Paati said, “and one bank's thirty-year story shows it better than almost any other.”",
      "hi": "Balance sheets, P&L statements, और ratios सब सीखने के बाद, मीरा को एहसास हुआ कि वो असल में शुरू से एक ही connected skill सीख रही थी: fundamental analysis — किसी business को इस आधार पर judge करना कि वो असल में क्या worth है, ना कि उसका chart कै सा दिखता है।\n\n“ये बिल्कुल वैसे ही है जैसे इस देश के सबसे patient, long-term investors ने अपना पैसा बनाया है,” पाटी ने कहा, “और एक bank की तीस साल की story इसे किसी और चीज़ से बेहतर दिखाती है।”",
      "ta": "Balance sheets, P&L statements, ratios எல்லாம் கத்துக்கிட்ட பிறகு, மீரா unwrapped பண்ணுச்சு — இது வரைக்கும் ஒரே connected skill தான் கத்துக்கிட்டிருந்தாளுனு: fundamental analysis — ஒரு business அதன் chart எப்படி தெரியுதுனு அல்லாம், அது actual-ஆ என்ன worth-னு judge பண்றது.\n\n“இந்த நாட்டில் மிகவும் பொறுமையான, long-term investors தான் இப்படி தான் பணம் சம்பாதிச்சிருக்காங்க,” பாட்டி சொன்னார், “ஒரு bank-ன் முப்பது வருட கதை இதை வேறு எதையும் விட நல்லா காட்டும்.”"
    },
    "realStorySubtitle": {
      "en": "Three Decades of Boring, Consistent Fundamentals",
      "hi": "Boring, Consistent Fundamentals के तीन दशक",
      "ta": "Boring, Consistent Fundamentals-ன் மூன்று Decades"
    },
    "realStoryBody": {
      "en": "Since its early years after being founded in the 1990s, HDFC Bank built a reputation for careful lending, steady profit growth, and consistent management — none of it flashy, all of it fundamentally sound, quarter after quarter, for decades.\n\nThat unglamorous consistency turned it into one of India's largest and most valuable banks, and one of the most widely cited long-term wealth-creation stories in Indian stock market history. No single dramatic event drove its rise — steady fundamentals, held for a very long time, did.",
      "hi": "1990s में बनने के शुरुआती सालों से ही, HDFC Bank ने careful lending, steady profit growth, और consistent management की पहचान बनाई — इसमें कुछ भी flashy नहीं था, सब कुछ fundamentally sound था, quarter दर quarter, दशकों तक।\n\nउस unglamorous consistency ने इसे India के सबसे बड़े और सबसे valuable banks में से एक बना दिया, और Indian stock market history की सबसे widely cited long-term wealth-creation stories में से एक बना दिया। इसके उभरने के पीछे कोई एक dramatic event नहीं था — बहुत लंबे समय तक टिकी steady fundamentals ने ये किया।",
      "ta": "1990-களில் founded ஆன early years முதலே, HDFC Bank careful lending, steady profit growth, consistent management-க்கான ஒரு reputation-ஐ கட்டுச்சு — எதுவுமே flashy இல்ல, எல்லாமே decades-கணக்கா, quarter-க்கு quarter fundamentally sound.\n\nஅந்த unglamorous consistency, அதை இந்தியாவின் மிகப்பெரிய, மிக valuable banks-ல ஒண்ணா, Indian stock market history-ல widely cited long-term wealth-creation கதைகளில் ஒண்ணா மாத்துச்சு. ஒரே ஒரு dramatic event அதன் rise-ஐ drive பண்ணல — மிக நீண்ட காலமா hold பண்ணப்பட்ட steady fundamentals தான் பண்ணுச்சு."
    },
    "body": {
      "en": "What Fundamental Analysis Actually Combines • The financial statements (balance sheet, P&L, cash flow) from Lessons 16-18. • Valuation ratios (P/E, P/B, ROE, D/E, EPS) from Lessons 19-21. • Qualitative factors: management quality, competitive position, and the industry's own growth prospects.\n\nThe Core Question Fundamental Analysis Asks “Is this a genuinely good business, and am I paying a fair price to own a piece of it?” It's a slower, research-heavy approach best suited to investors planning to hold for years — the opposite instinct of chasing a quick price move.",
      "hi": "Fundamental Analysis असल में क्या Combine करता है • Lessons 16-18 के financial statements (balance sheet, P&L, cash flow)। • Lessons 19-21 के valuation ratios (P/E, P/B, ROE, D/E, EPS)।\n\n• Qualitative factors: management quality, competitive position, और industry की अपनी growth prospects।\n\nFundamental Analysis जो मूल सवाल पूछता है “क्या ये genuinely एक अच्छा business है, और क्या मैं इसका एक हिस्सा own करने के लिए fair price चुका रहा हूँ?” ये एक slower, research-heavy approach है जो उन investors के लिए सबसे अच्छा है जो सालों तक hold करने की plan बना रहे हैं — quick price move को chase करने की instinct से बिल्कुल उलटा।",
      "ta": "Fundamental Analysis உண்மையில் என்ன Combine பண்ணும் • Lessons 16-18-லிருந்து financial statements (balance sheet, P&L, cash flow).\n\n• Lessons 19-21-லிருந்து valuation ratios (P/E, P/B, ROE, D/E, EPS).\n\n• Qualitative factors: management quality, competitive position, industry-ன் சொந்த growth prospects.\n\nFundamental Analysis கேக்குற Core Question “இது genuinely ஒரு நல்ல business-ஆ, அதன் ஒரு பங்கை சொந்தமாக்க நான் fair விலையை pay பண்றேனா?” இது ஒரு slower, research-heavy approach, வருடங்கள் hold பண்ண plan பண்ற investors- க்கு best suited — ஒரு quick price move-ஐ chase பண்ற instinct-க்கு opposite."
    },
    "keyTakeaway": {
      "en": "Fundamental analysis isn't any single ratio — it's combining everything from Lessons 16-21 into one honest judgment about a business. HDFC Bank's three-decade climb shows what steady fundamentals, held patiently, can genuinely compound into.",
      "hi": "Fundamental analysis कोई एक single ratio नहीं है — ये Lessons 16-21 की हर चीज़ को एक honest judgment में combine करना है। HDFC Bank की तीस साल की climb दिखाती है कि patiently टिकी steady fundamentals असल में किसमें compound हो सकती हैं।",
      "ta": "Fundamental analysis எந்த single ratio-உம் இல்ல — Lessons 16-21-லிருந்து எல்லாத்தையும் ஒரு business-ஐ பத்தின ஒரே honest judgment-ஆ combine பண்றது. Steady fundamentals, பொறுமையா hold பண்ணப்பட்டா, genuinely எதுக்குள் compound ஆகும்னு HDFC Bank-ன் மூன்று-decade climb காட்டுது."
    },
    "quiz": [
      {
        "question": {
          "en": "What core question does fundamental analysis try to answer?",
          "hi": "Fundamental analysis कौन सा मूल सवाल जवाब देने की कोशिश करता है?",
          "ta": "Fundamental analysis எந்த core question-ஐ answer பண்ண முயற்சிக்கும்?"
        },
        "options": {
          "en": [
            "What will the stock price do tomorrow?",
            "Is this a genuinely good business, and is the price fair for owning a piece of it?",
            "How many people are discussing the stock online?",
            "What time does the market open?"
          ],
          "hi": [
            "Stock price कल क्या करेगा?",
            "क्या ये genuinely एक अच्छा business है, और इसका एक हिस्सा own करने के लिए price fair है?",
            "Stock के बारे में online कितने लोग discuss कर रहे हैं?",
            "Market कितने बजे खुलता है?"
          ],
          "ta": [
            "நாளைக்கு stock price என்ன பண்ணும்?",
            "இது genuinely ஒரு நல்ல business-ஆ, அதன் ஒரு பங்கை சொந்தமாக்க விலை fair-ஆ?",
            "Online-ல எத்தனை பேர் அந்த stock-ஐ பத்தி discuss பண்றாங்க?",
            "Market எப்போ open ஆகும்?"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Fundamental analysis is about judging real business quality and value, not short-term price behaviour.",
          "hi": "Fundamental analysis असली business quality और value को judge करने के बारे में है, ना कि short-term price behaviour को।",
          "ta": "Short-term price behaviour இல்ல, real business quality-ஐயும் value-ஐயும் judge பண்றதைப் பத்தினது fundamental analysis."
        }
      },
      {
        "question": {
          "en": "Which of these is a 'qualitative' factor in fundamental analysis (rather than a number from a financial statement)?",
          "hi": "इनमें से fundamental analysis का कौन सा 'qualitative' factor है (किसी financial statement के नंबर की बजाय)?",
          "ta": "Fundamental analysis-ல (ஒரு financial statement-ன் number-க்கு பதிலா) இது ‘qualitative’ factor எது?"
        },
        "options": {
          "en": [
            "The P/E ratio",
            "Management quality and competitive position",
            "Net profit",
            "Total shares outstanding"
          ],
          "hi": [
            "P/E ratio",
            "Management quality और competitive position",
            "Net profit",
            "Total outstanding shares"
          ],
          "ta": [
            "P/E ratio",
            "Management quality-உம் competitive position-உம்",
            "Net profit",
            "Total outstanding shares"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "These are judgment-based factors that complement the hard numbers from financial statements and ratios.",
          "hi": "ये judgment-based factors हैं जो financial statements और ratios के hard numbers को complement करते हैं।",
          "ta": "Financial statements-லிருந்தும் ratios-லிருந்தும் வரும் hard numbers-ஐ complement பண்ற judgment-based factors இவை."
        }
      },
      {
        "question": {
          "en": "What made HDFC Bank's multi-decade growth story notable, according to the lesson?",
          "hi": "लेसन के अनुसार, HDFC Bank की multi-decade growth story को क्या खास बनाता है?",
          "ta": "Lesson-ன் படி, HDFC Bank-ன் multi-decade growth story ஏன் notable-ஆ இருந்துச்சு?"
        },
        "options": {
          "en": [
            "One single dramatic breakthrough event",
            "Steady, unglamorous, consistent fundamentals sustained over decades",
            "A risky, speculative business model",
            "A one-time government bailout"
          ],
          "hi": [
            "एक ही dramatic breakthrough event",
            "दशकों तक बरकरार रही steady, unglamorous, consistent fundamentals",
            "एक risky, speculative business model",
            "एक one-time government bailout"
          ],
          "ta": [
            "ஒரே ஒரு dramatic breakthrough event",
            "Decades-கணக்கா sustain ஆன steady, unglamorous, consistent fundamentals",
            "ஒரு risky, speculative business model",
            "ஒரு one-time government bailout"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Consistent, careful performance over a very long period — not a single dramatic event — drove its rise.",
          "hi": "एक ही dramatic event ने नहीं, बल्कि बहुत लंबे समय तक consistent, careful performance ने इसके उभरने को driven किया।",
          "ta": "மிக நீண்ட காலமா consistent, careful performance தான் — ஒரே ஒரு dramatic event இல்ல — அதன் rise-ஐ drive பண்ணுச்சு."
        }
      },
      {
        "question": {
          "en": "Fundamental analysis is generally best suited to which kind of investing approach?",
          "hi": "Fundamental analysis आमतौर पर किस तरह के investing approach के लिए सबसे उपयुक्त है?",
          "ta": "Fundamental analysis generally எந்த investing approach-க்கு best suited?"
        },
        "options": {
          "en": [
            "Very short-term, minute-by-minute trading",
            "Slower, research-heavy investing meant for holding over years",
            "Guessing based on chart patterns alone",
            "Ignoring financial statements entirely"
          ],
          "hi": [
            "बहुत short-term, minute-by-minute trading",
            "Slower, research-heavy investing जो सालों तक hold करने के लिए है",
            "सिर्फ chart patterns के आधार पर guess करना",
            "Financial statements को पूरी तरह ignore करना"
          ],
          "ta": [
            "Very short-term, minute-by-minute trading",
            "வருடங்களா hold பண்றதுக்கு meant, slower, research-heavy investing",
            "Chart patterns மட்டும் வச்சு guess பண்றது",
            "Financial statements-ஐ முழுசா ignore பண்றது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "It requires patience to let a genuinely good business's value show up in returns over time.",
          "hi": "इसके लिए patience चाहिए ताकि एक genuinely अच्छे business की value समय के साथ returns में दिखे।",
          "ta": "Genuinely நல்ல business-ன் value returns-ல நேரம் ஆக show up ஆக பொறுமை தேவை."
        }
      },
      {
        "question": {
          "en": "Fundamental analysis combines which of the following?",
          "hi": "Fundamental analysis इनमें से किसे combine करता है?",
          "ta": "Fundamental analysis இவற்றில் எவற்றை combine பண்ணும்?"
        },
        "options": {
          "en": [
            "Only the P/E ratio",
            "Financial statements, valuation ratios, and qualitative business factors together",
            "Only chart patterns",
            "Only news headlines"
          ],
          "hi": [
            "सिर्फ P/E ratio को",
            "Financial statements, valuation ratios, और qualitative business factors को साथ में",
            "सिर्फ chart patterns को",
            "सिर्फ news headlines को"
          ],
          "ta": [
            "P/E ratio மட்டும்",
            "Financial statements, valuation ratios, qualitative business factors சேர்ந்து",
            "Chart patterns மட்டும்",
            "News headlines மட்டும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "It's the synthesis of everything learned about a business's numbers and qualitative strength into one judgment. 23. Introduction to Technical Analysis",
          "hi": "ये किसी business के numbers और qualitative strength के बारे में सीखी गई हर चीज़ को एक judgment में synthesize करना है।",
          "ta": "ஒரு business-ன் numbers-ஐயும் qualitative strength-ஐயும் பத்தி கத்துக்கிட்ட எல்லாத்தையும் ஒரே judgment-ஆ synthesis பண்றது தான் இது."
        }
      }
    ]
  },
  {
    "id": 23,
    "tier": "Intermediate",
    "title": {
      "en": "Introduction to Technical Analysis",
      "hi": "Technical Analysis का परिचय",
      "ta": "Technical Analysis அறிமுகம்"
    },
    "opener": {
      "en": "At the investment club, Meera met Arjun, who never once mentioned a balance sheet. He only looked at price charts. “I don't care what the company does,” he said. “I care what the price is doing, and what it's done at this exact level before.”\n\nPaati wasn't dismissive when Meera mentioned it later. “That's technical analysis — a completely different lens. It has its own real, well-documented moments, too.”",
      "hi": "Investment club में, मीरा की मुलाकात अर्जुन से हुई, जिसने कभी balance sheet का ज़ि क्र तक नहीं किया। वो सिर्फ price charts देखता था। “मुझे इस बात से फर्क नहीं पड़ ता कि कं पनी क्या करती है,” उसने कहा। “मुझे इस बात से फर्क पड़ ता है कि price क्या कर रही है, और इस exact level पर पहले क्या हुआ था।”\n\nबाद में जब मीरा ने इसका ज़ि क्र किया तो पाटी ने इसे dismiss नहीं किया। “वो technical analysis है — एक बिल्कुल अलग lens। इसके भी अपने असली, well-documented moments हैं।”",
      "ta": "Investment club-ல, மீரா அர்ஜுனை சந்திச்சாள், அவன் ஒரு தடவை கூட balance sheet-ஐ mention பண்ணல. அவன் price charts-ஐ மட்டும் தான் பார்ப்பான். “நிறுவனம் என்ன பண்றதுனு எனக்கு கவலை இல்ல,” என்றான். “விலை என்ன பண்றது, முன்னாடி இதே level-ல அது என்ன பண்ணிருக்கு அப்படினு தான் எனக்கு கவலை.”\n\nமீரா பிறகு mention பண்ணும்போது பாட்டி dismissive-ஆ இருக்கல. “அது technical analysis — முற்றிலும் வேற lens. அதற்கும் அதோட சொந்த real, well-documented moments இருக்கு.”"
    },
    "realStorySubtitle": {
      "en": "The Day Nifty Crossed a Number Everyone Was Watching",
      "hi": "वो दिन जब Nifty ने एक ऐसा नंबर Cross किया जिसे सब देख रहे थे",
      "ta": "எல்லோரும் Watch பண்ணின ஒரு Number-ஐ Nifty Cross பண்ண நாள்"
    },
    "realStoryBody": {
      "en": "In July 2017, the Nifty 50 crossed the 10,000 mark for the very first time — a purely round, psychological number with no special financial meaning on its own, yet one that traders and the media had been watching closely as a symbolic level for months.\n\nThe crossing was followed by a fresh wave of buying interest, illustrating a core technical-analysis idea: round numbers and previous price levels can genuinely influence trader behaviour, regardless of what any single company's balance sheet says that week.",
      "hi": "जुलाई 2017 में, Nifty 50 ने पहली बार 10,000 का mark cross किया — एक शुद्ध रूप से round, psychological नंबर जिसका अपने आप में कोई special financial मतलब नहीं था, फिर भी traders और media महीनों से इसे एक symbolic level के तौर पर बारीकी से देख रहे थे।\n\ncrossing के बाद खरीदारी की एक नई लहर आई, जो एक core technical-analysis idea को दिखाती है: round numbers और पिछले price levels सच में trader behaviour को प्रभावित कर सकते हैं, चाहे उस हफ्ते किसी एक कं पनी का balance sheet कुछ भी कहे।",
      "ta": "July 2017-ல, Nifty 50 முதன்முறையா 10,000 mark-ஐ cross பண்ணுச்சு — தனியா special financial meaning எதுவும் இல்லாத ஒரு purely round, psychological number, ஆனாலும் மாசக்கணக்கா traders- உம் media-உம் ஒரு symbolic level-ஆ closely watch பண்ணிக்கிட்டிருந்தது.\n\nஅந்த crossing-ஐ followed பண்ணி ஒரு புது buying interest wave வந்துச்சு, ஒரு core technical- analysis idea-ஐ illustrate பண்ணி: அந்த வாரம் எந்த single நிறுவனத்தின் balance sheet என்ன சொன்னாலும் சரி, round numbers-உம் previous price levels-உம் genuinely trader behaviour-ஐ influence பண்ணலாம்னு."
    },
    "body": {
      "en": "What Technical Analysis Assumes • Price reflects everything already known — news, fundamentals, and sentiment are assumed to already be baked into the current price. • Prices move in identifiable patterns and trends, driven substantially by crowd psychology. • History tends to rhyme — how a stock behaved at a similar price level before offers useful clues about how it might behave again.\n\nFundamental vs Technical — Not Enemies Fundamental analysis asks “is this a good business at a fair price?” Technical analysis asks “what is the price actually doing, and what have buyers and sellers done at this level before?” Many experienced investors use fundamentals to choose what to buy, and technicals to help decide when.\n\nDEEP DIVE: CHART ANALYSIS\n\nHow to read a price chart on its own terms — candles, trend, support/resistance, the patterns that repeat, and how volume confirms what the chart is telling you. Keywords such as support, resistance, trend, breakout and volume stay in English across every language edition of this lesson.\n\n1. What chart analysis actually does Chart analysis (also called technical analysis) studies price and volume history to judge where a stock might go next. It does not look at a company's profit or business quality — that is fundamental analysis. Chart analysis works on one assumption: price reflects everything already known about a stock, and price tends to move in trends that repeat in recognisable shapes, because the same crowd psychology — fear, greed, hesitation, relief — plays out the same way again and again.\n\nIt is not a crystal ball. Chart analysis gives probabilities and levels to watch, never certainties. The goal of this lesson is to read a chart clearly enough to have a reasoned view — not to predict the future.\n\n2. The three chart types ● Line chart — joins closing prices only. Cleanest view of the overall trend, but hides what happened inside each day. ● Bar chart (OHLC) — a vertical bar per period with small ticks for open (left) and close (right), plus the high – low range. ● Candlestick chart — the same open/high/low/close data as a bar chart, but drawn as a body and wicks. This is the standard chart used by almost every trader today, and the one this lesson builds on.\n\n3. Reading a single candle Every candle covers one time period — a day, an hour, five minutes — and shows four prices: the open, the close, the high, and the low for that period. The thick part is the body (the open–close range); the thin lines above and below are the wicks (also called shadows), showing how far price reached before settling back. Figure 1 — A green (bullish) candle closes above its open; a red (bearish) candle closes below its open.\n\nA long body means one side (buyers or sellers) was firmly in control. A long wick with a small body means price was pushed hard in one direction and then rejected — often a sign the move is running out of strength.\n\n4. Identifying the trend A trend is not a feeling — it is a structure you can point to on the chart. An uptrend is a sequence of higher highs (HH) and higher lows (HL): every peak beats the last peak, and every dip stays above the last dip. A downtrend is the mirror image — lower highs (LH) and lower lows (LL). When price stops making either, and moves sideways between a rough ceiling and floor, that is a range (or consolidation) — no trend yet.\n\nFigure 2 — Mark the swing highs and swing lows first; the trend is defined by how they line up, not by drawing a line and hoping.\n\nA trend is considered intact until it is broken — specifically, until price makes a lower low in an uptrend, or a higher high in a downtrend. That is the simplest, most reliable trend-reversal signal there is.\n\n5. Support and resistance Support is a price level where buying has repeatedly stepped in and stopped a fall. Resistance is a level where selling has repeatedly stopped a rise. These levels form because traders remember them — the same price attracts the same decisions each time it is revisited. Figure 3 — The more times a level is tested without breaking, the more significant it becomes — and the more forceful the move tends to be once it finally breaks.\n\nKey rule When resistance is broken with strong volume, it very often flips and becomes the new support on the next pullback — and the same happens in reverse when support breaks down. This role-reversal is one of the most dependable ideas in chart analysis.\n\n6. Trendlines and channels A trendline connects at least two swing lows (in an uptrend) or two swing highs (in a downtrend) with a straight line. A third touch that holds confirms the line is being respected by the market; a close clearly beyond it warns the trend may be turning. Draw a parallel line on the opposite side of price and you get a channel — useful for spotting where price is stretched and likely to pause.\n\n7. Reversal patterns Reversal patterns form at the end of a trend and warn that direction is about to change. Two of the most reliable are covered here.\n\nHead and shoulders Forms after an uptrend: a peak (left shoulder), a higher peak (head), then a third peak roughly level with the first (right shoulder). The line joining the two dips between them is the neckline. A close below the neckline, ideally on rising volume, confirms the reversal — price often falls by roughly the same distance as the height from head to neckline. Figure 4 — A head and shoulders that never closes below its neckline is not confirmed — treat it as a watch level, not a signal.\n\nDouble top and double bottom Price tests a level twice, fails to break through both times, and reverses — a double top after an uptrend, a double bottom after a downtrend. The dip (or rally) between the two peaks (or troughs) is again the neckline; a confirmed close through it triggers the pattern.\n\nFigure 5 — The second top or bottom does not need to match the first exactly — being within a small percentage of it is enough for the pattern to count.\n\n8. Continuation patterns Not every pause in a trend is a reversal — most are the trend catching its breath before continuing. These are the common shapes that pause takes: ● Flag — a short, tight channel sloping against the trend after a sharp move. Usually resolves quickly in the original direction. ● Pennant — like a flag, but the channel narrows to a small triangle instead of staying parallel. ● Triangle (ascending, descending, symmetrical) — converging trendlines as buyers and sellers compress into a tighter range before a breakout. ● Wedge — both trendlines slope the same direction but converge; a rising wedge in an uptrend is often bearish, a falling wedge in a downtrend is often bullish. 9. Candlestick patterns worth knowing These form over one to three candles and are read together with the trend they appear in — the same shape means little in isolation.\n\nFigure 6 — Doji: open and close are almost equal — indecision, often at a turning point. Hammer: small body, long lower wick after a fall — buyers rejected lower prices. Bullish engulfing: a big green body fully covers the prior red body — buyers have taken control. Shooting star: small body, long upper wick after a rise — sellers rejected higher prices.\n\n10. Volume: the confirmation tool Volume is how many shares changed hands in a period, and it tells you how much conviction is behind a price move. A breakout on high volume is far more trustworthy than the same breakout on low volume, which often fails and reverses (a false breakout). As a rule: volume should expand in the direction of the trend, and shrink during pullbacks or pauses within it.\n\n11. A simple chart-reading checklist ● What is the trend right now — uptrend, downtrend, or range? (Section 4) ● Where is the nearest support below price, and resistance above it? (Section 5) ● Is price sitting near a trendline or channel edge? (Section 6) ● Is a recognisable reversal or continuation pattern forming, and has its neckline / breakout level actually been confirmed by a close — not just touched? (Sections 7–8) ● What are the last 2–3 candles saying at this level? (Section 9) ● Does volume support the move, or is it fading? (Section 10)\n\nGoing through these six questions in order, on any chart, is what “reading a chart clearly” means in practice — not memorising patterns, but checking the same structure every time.",
      "hi": "Technical Analysis क्या मानकर चलता है • Price पहले से जो कुछ भी जाना हुआ है, उसे reflect करती है — news, fundamentals, और sentiment को माना जाता है कि वो पहले से current price में बेक्ड-इन हैं।\n\n• Prices identifiable patterns और trends में चलती हैं, जो काफी हद तक crowd psychology से driven होती हैं।\n\n• History अक्सर rhyme करती है — किसी stock ने पहले किसी similar price level पर कै सा व्यवहार किया था, ये इस बारे में useful clues देता है कि वो फिर से कै सा व्यवहार कर सकता है।\n\nFundamental vs Technical — दुश्मन नहीं हैं Fundamental analysis पूछता है “क्या ये एक अच्छा business fair price पर है?” Technical analysis पूछता है “price असल में क्या कर रही है, और buyers और sellers ने पहले इस level पर क्या किया है?” कई experienced investors ये चुनने के लिए fundamentals use करते हैं कि क्या खरीदना है, और technicals ये decide करने में मदद के लिए use करते हैं कि कब खरीदना है।",
      "ta": "Technical Analysis எதை Assume பண்ணும் • Price ஏற்கனவே தெரிஞ்சிருக்கிற எல்லாத்தையும் reflect பண்ணுது — news, fundamentals, sentiment ஏற்கனவே current price-ல baked-ஆ இருக்குனு assume பண்ணப்படுது.\n\n• Crowd psychology-ஆல substantially driven ஆகி, identifiable patterns-லும் trends-லும் prices move ஆகும். • History rhyme பண்ண tend ஆகும் — முன்னாடி ஒரு similar price level-ல ஒரு stock எப்படி behave பண்ணுச்சுனுறது, மறுபடியும் அது எப்படி behave பண்ணலாம்னு useful clues தரும்.\n\nFundamental vs Technical — Enemies இல்ல Fundamental analysis கேக்குது “இது fair விலைக்கு ஒரு நல்ல business-ஆ?” Technical analysis கேக்குது “Price actual-ஆ என்ன பண்றது, முன்னாடி இந்த level-ல buyers-உம் sellers-உம் என்ன பண்ணிருக்காங்க?” நிறைய experienced investors, என்ன வாங்கணும்னு தேர்ந்தெடுக்க fundamentals-ஐயும், எப்போ decide பண்ண technicals-ஐயும் பயன்படுத்துவாங்க."
    },
    "keyTakeaway": {
      "en": "Technical analysis studies price and trader behaviour itself, not the business behind it. Nifty's 2017 crossing of 10,000 shows how real, observable, and psychologically driven these patterns can be — worth understanding even if fundamentals remain your primary lens.",
      "hi": "Technical analysis price और trader behaviour को ही study करता है, ना कि उसके पीछे के business को। Nifty का 2017 में 10,000 cross करना दिखाता है कि ये patterns कितने real, observable, और psychologically driven हो सकते हैं — समझने लायक हैं भले ही fundamentals आपका primary lens बने रहें।",
      "ta": "Technical analysis price-ஐயும் trader behaviour-ஐயுமே study பண்ணும், பின்னால் இருக்கிற business-ஐ இல்ல. இந்த patterns எவ்வளவு real-ஆவும், observable-ஆவும், psychologically driven-ஆவும் இருக்கும்னு Nifty-ன் 2017 10,000 crossing காட்டுது — fundamentals உங்க primary lens-ஆ இருந்தாலும் புரிஞ்சுக்க worth-ஆனது தான்."
    },
    "quiz": [
      {
        "question": {
          "en": "What is the core assumption of technical analysis?",
          "hi": "Technical analysis की core assumption क्या है?",
          "ta": "Technical analysis-ன் core assumption என்ன?"
        },
        "options": {
          "en": [
            "Only a company's balance sheet matters",
            "Price already reflects known information, and moves in identifiable, psychology-driven patterns",
            "Stock prices move completely randomly with no patterns",
            "Technical analysis ignores price entirely"
          ],
          "hi": [
            "सिर्फ कं पनी की balance sheet matter करती है",
            "Price पहले से जानी हुई information को reflect करती है, और identifiable, psychology-driven patterns में चलती है",
            "Stock prices बिना किसी pattern के पूरी तरह randomly move करती हैं",
            "Technical analysis price को पूरी तरह ignore करता है"
          ],
          "ta": [
            "நிறுவனத்தின் balance sheet மட்டும் தான் matter பண்ணும்",
            "Price ஏற்கனவே தெரிஞ்ச information-ஐ reflect பண்ணுது, identifiable, psychology-driven patterns-ல move ஆகும்",
            "Stock prices எந்த pattern-உம் இல்லாம completely randomly move ஆகும்",
            "Technical analysis price-ஐ முழுசா ignore பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Technical analysts believe price action itself, shaped by crowd behaviour, contains useful patterns.",
          "hi": "Technical analysts मानते हैं कि खुद price action, जो crowd behaviour से shape होती है, में useful patterns होते हैं।",
          "ta": "Crowd behaviour-ஆல shape ஆன price action-லேயே useful patterns இருக்குனு technical analysts நம்புவாங்க."
        }
      },
      {
        "question": {
          "en": "What happened when Nifty crossed 10,000 in July 2017?",
          "hi": "जुलाई 2017 में जब Nifty ने 10,000 cross किया तो क्या हुआ?",
          "ta": "July 2017-ல Nifty 10,000-ஐ cross பண்ணும்போது என்ன ஆச்சு?"
        },
        "options": {
          "en": [
            "The market crashed immediately",
            "It was followed by a fresh wave of buying interest around a closely watched psychological level",
            "Trading was halted permanently",
            "It had no effect on trader behaviour"
          ],
          "hi": [
            "Market तुरंत crash हो गया",
            "एक closely watched psychological level के आसपास खरीदारी की एक नई लहर आई",
            "Trading permanently रोक दी गई",
            "इसका trader behaviour पर कोई असर नहीं पड़ा"
          ],
          "ta": [
            "Market உடனடியா crash ஆயிடுச்சு",
            "Closely watched ஆன ஒரு psychological level-ஐ சுத்தி ஒரு புது buying interest wave followed பண்ணுச்சு",
            "Trading நிரந்தரமா halt ஆயிடுச்சு",
            "அதற்கு trader behaviour-ல எந்த effect-உம் இல்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Round, symbolic price levels can genuinely influence trader behaviour, a key technical-analysis concept.",
          "hi": "Round, symbolic price levels सच में trader behaviour को प्रभावित कर सकते हैं, जो एक key technical-analysis concept है।",
          "ta": "Round, symbolic price levels genuinely trader behaviour-ஐ influence பண்ணலாம் — ஒரு key technical- analysis concept."
        }
      },
      {
        "question": {
          "en": "How does technical analysis differ from fundamental analysis?",
          "hi": "Technical analysis, fundamental analysis से कै से अलग है?",
          "ta": "Technical analysis fundamental analysis-லிருந்து எப்படி வித்தியாசம்?"
        },
        "options": {
          "en": [
            "They are exactly the same thing",
            "Technical analysis studies price and trading behaviour; fundamental analysis studies the underlying business",
            "Technical analysis only applies to bonds",
            "Fundamental analysis ignores financial statements"
          ],
          "hi": [
            "दोनों बिल्कुल एक जैसी चीज़ हैं",
            "Technical analysis price और trading behaviour को study करता है; fundamental analysis underlying business को study करता है",
            "Technical analysis सिर्फ bonds पर लागू होता है",
            "Fundamental analysis financial statements को ignore करता है"
          ],
          "ta": [
            "இரண்டும் exactly ஒரே விஷயம் தான்",
            "Technical analysis price-ஐயும் trading behaviour-ஐயும் study பண்ணும்; fundamental analysis underlying business-ஐ study பண்ணும்",
            "Technical analysis bonds-க்கு மட்டும் தான் apply ஆகும்",
            "Fundamental analysis financial statements-ஐ ignore பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "They are two distinct lenses — one on the business, one on the price action itself.",
          "hi": "ये दो अलग lenses हैं — एक business पर, दूसरा खुद price action पर।",
          "ta": "இவை இரண்டு distinct lenses — ஒண்ணு business-ன் மேல, ஒண்ணு price action-ன் மேலயே."
        }
      },
      {
        "question": {
          "en": "According to the lesson, how do many experienced investors combine both approaches?",
          "hi": "Lesson के अनुसार, कई experienced investors दोनों approaches को कै से combine करते हैं?",
          "ta": "Lesson-ன் படி, நிறைய experienced investors இரண்டு approaches-ஐயும் எப்படி combine பண்றாங்க?"
        },
        "options": {
          "en": [
            "They only ever use one and ignore the other completely",
            "Fundamentals to decide what to buy, technicals to help decide when",
            "Technicals to decide what to buy, fundamentals to decide when",
            "They never combine them"
          ],
          "hi": [
            "वो सिर्फ एक use करते हैं और दूसरे को पूरी तरह ignore करते हैं",
            "क्या खरीदना है ये decide करने के लिए fundamentals, कब खरीदना है ये decide करने में मदद के लिए technicals",
            "क्या खरीदना है ये decide करने के लिए technicals, कब खरीदना है ये decide करने के लिए fundamentals",
            "वो इन्हें कभी combine नहीं करते"
          ],
          "ta": [
            "அவங்க ஒண்ணை மட்டும் பயன்படுத்தி மற்றொண்ணை முழுசா ignore பண்றாங்க",
            "என்ன வாங்கணும்னு decide பண்ண fundamentals, எப்போ decide பண்ண உதவ technicals",
            "என்ன வாங்கணும்னு decide பண்ண technicals, எப்போ decide பண்ண fundamentals",
            "அவங்க அவற்றை ஒருபோதும் combine பண்ண மாட்டாங்க"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This is a common practical combination — business quality guides the choice, price action can help time the entry.",
          "hi": "ये एक common practical combination है — business quality choice guide करती है, price action entry का समय तय करने में मदद कर सकती है।",
          "ta": "இது ஒரு common practical combination — business quality choice-ஐ guide பண்ணும், price action entry- ஐ time பண்ண உதவும்."
        }
      },
      {
        "question": {
          "en": "What does the technical-analysis idea 'history tends to rhyme' suggest?",
          "hi": "Technical-analysis idea 'history rhyme करती है' किस बात का सुझाव देता है?",
          "ta": "‘History rhyme பண்ண tend ஆகும்’ என்ற technical-analysis idea என்ன suggest பண்ணும்?"
        },
        "options": {
          "en": [
            "Stock prices repeat with 100% certainty",
            "How a stock behaved at a similar price level before can offer useful (not guaranteed) clues",
            "Company history has no relevance to price",
            "Only very old companies show price patterns"
          ],
          "hi": [
            "Stock prices 100% certainty के साथ repeat होती हैं",
            "किसी stock ने पहले किसी similar price level पर कै सा behave किया, ये useful (guaranteed नहीं) clues दे सकता है",
            "Company history का price से कोई लेना-देना नहीं है",
            "सिर्फ बहुत पुरानी companies price patterns दिखाती हैं"
          ],
          "ta": [
            "Stock prices 100% certainty-உடன் repeat ஆகும்",
            "முன்னாடி ஒரு similar price level-ல ஒரு stock எப்படி behave பண்ணுச்சுனுறது useful (guaranteed இல்ல) clues தரலாம்",
            "Company history-க்கு price-உடன் எந்த relevance-உம் இல்ல",
            "மிகவும் பழைய நிறுவனங்கள் மட்டும் தான் price patterns காட்டும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Technical analysis treats past price behaviour as informative, not as a certain predictor of the future. 24. Candlestick Charts: The Basics",
          "hi": "Technical analysis past price behaviour को informative मानता है, future का एक certain predictor नहीं।",
          "ta": "Past price behaviour-ஐ ஒரு certain predictor-ஆ இல்லாம, informative-ஆ technical analysis treat பண்ணும்."
        }
      }
    ]
  },
  {
    "id": 24,
    "tier": "Intermediate",
    "title": {
      "en": "Candlestick Charts: The Basics",
      "hi": "Candlestick Charts: बेसिक्स",
      "ta": "Candlestick Charts: Basics"
    },
    "opener": {
      "en": "Arjun showed Meera his screen — rows of little red and green rectangles with thin lines poking out the top and bottom. “These are candlesticks,” he said. “And believe it or not, they were invented for rice, not stocks.”",
      "hi": "अर्जुन ने मीरा को अपनी screen दिखाई — छोटे-छोटे लाल और हरे rectangles की rows, जिनके ऊपर और नीचे पतली lines निकली हुई थीं। “ये candlesticks हैं,” उसने कहा। “और मानो या ना मानो, ये चावल के लिए invent हुए थे, stocks के लिए नहीं।”",
      "ta": "அர்ஜுன் மீராவுக்கு தன் screen-ஐ காட்டினான் — மேலேயும் கீழேயும் thin lines poke ஆகும் சின்ன சிவப்பு, பச்சை rectangles-ன் rows. “இவை candlesticks,” என்றான். “நம்பினாலும் நம்பாட்டியும், இவை stocks-க்காக இல்ல, rice-க்காக invent பண்ணப்பட்டவை.”"
    },
    "realStorySubtitle": {
      "en": "The Rice Trader Who Invented a Global Charting Language",
      "hi": "वो Rice Trader जिसने एक Global Charting Language Invent की",
      "ta": "ஒரு Global Charting Language-ஐ Invent பண்ண Rice Trader"
    },
    "realStoryBody": {
      "en": "In 18th-century Japan, a rice trader named Munehisa Homma developed a way of visually tracking rice prices at the Dojima Rice Exchange, recording the open, high, low, and close of each trading period as a single visual shape.\n\nCenturies later, that same visual method — the candlestick — became the global standard for reading price charts across every modern stock, commodity, and currency market, including in India today. It's one of the oldest surviving pieces of market technology still in daily use, largely unchanged.",
      "hi": "18वीं सदी के Japan में, Munehisa Homma नाम के एक rice trader ने Dojima Rice Exchange पर rice prices को visually track करने का एक तरीका develop किया, जिसमें हर trading period का open, high, low, और close एक ही visual shape के रूप में record किया जाता था। सदियों बाद, वही visual method — candlestick — आज के हर modern stock, commodity, और currency market में price charts पढ़ ने का global standard बन गया, जिसमें आज India भी शामिल है। ये market technology के सबसे पुराने, फिर भी बड़े हिस्से में unchanged, daily इस्तेमाल होने वाले pieces में से एक है।",
      "ta": "18th-century Japan-ல, Munehisa Homma என்ற ஒரு rice trader, Dojima Rice Exchange-ல rice prices-ஐ visually track பண்ண ஒரு வழியை develop பண்ணார், ஒவ்வொரு trading period-ன் open, high, low, close-ஐயும் ஒரே ஒரு visual shape-ஆ record பண்ணி.\n\nCenturies கழித்து, அதே visual method — candlestick — இன்று இந்தியாவில் உட்பட, ஒவ்வொரு modern stock, commodity, currency market-ல price charts படிக்க global standard-ஆ மாறிடுச்சு. இன்னும் daily use-ல இருக்கிற, largely unchanged-ஆ இருக்கிற மிக பழைய surviving market technology-ல இதுவும் ஒண்ணு."
    },
    "body": {
      "en": "What One Candlestick Shows • Open: The price when the period (e.g., one day) began. • Close: The price when the period ended. • High / Low: The highest and lowest prices reached during that period, shown as thin 'wicks'. • Colour (Green/Red): Whether the price closed higher (green) or lower (red) than it opened.\n\nWhy Candlesticks Beat a Plain Line A simple line chart only shows the closing price, hiding how volatile or contested a period actually was. A candlestick shows the full battle between buyers and sellers within that single period — useful context a plain line simply erases.\n\nAnatomy of a single candle — body, wicks, open, high, low and close.",
      "hi": "एक Candlestick क्या दिखाता है • Open: वो price जब period (जैसे, एक दिन) शुरू हुआ।\n\n• Close: वो price जब period खत्म हुआ। • High / Low: उस period के दौरान पहुंची सबसे ऊँ ची और सबसे नीची prices, जिन्हें पतली 'wicks' के तौर पर दिखाया जाता है।\n\n• Colour (Green/Red): क्या price खुलने से ज़्यादा (green) पर बंद हुआ या कम (red) पर।\n\nCandlesticks एक Plain Line से बेहतर क्यों हैं एक simple line chart सिर्फ closing price दिखाता है, जिससे ये छिप जाता है कि एक period असल में कितना volatile या contested था। एक candlestick उस एक period के अंदर buyers और sellers के बीच हुई पूरी लड़ाई दिखाता है — एक useful context जिसे एक plain line बस मिटा देता है।\n\nएक candle की Anatomy — body, wicks, open, high, low, close।",
      "ta": "ஒரு Candlestick என்ன காட்டும் • Open: Period (உ.தா., ஒரு நாள்) ஆரம்பிச்சபோது இருந்த விலை.\n\n• Close: Period முடிஞ்சபோது இருந்த விலை.\n\n• High / Low: அந்த period-ல reach பண்ண மிக அதிக, மிகக் குறைந்த விலைகள், thin ‘wicks’-ஆ காட்டப்படும்.\n\n• Colour (Green/Red): Price open ஆனதை விட ஏறி close ஆச்சா (green) இல்ல குறைஞ்சு close ஆச்சா (red).\n\nஒரு Plain Line-ஐ Candlesticks ஏன் Beat பண்ணும் ஒரு simple line chart closing price-ஐ மட்டும் தான் காட்டும், அந்த period எவ்வளவு volatile-ஆ அல்லது contested-ஆ இருந்துச்சுனு மறைச்சிடும். ஒரு candlestick, அந்த single period-க்குள் buyers-க்கும் sellers- க்கும் இடையே இருந்த full battle-ஐ காட்டும் — ஒரு plain line வெறுமனே erase பண்ணும் useful context.\n\nஒரே ஒரு candle-ன் Anatomy — body, wicks, open, high, low, close."
    },
    "keyTakeaway": {
      "en": "Every candlestick is a compressed story of one trading period's opening, closing, high, and",
      "hi": "हर candlestick एक trading period के open, close, high, और low की एक compressed story है। 18वीं सदी की rice trading के लिए invent हुआ एक method, हैरानी की बात है कि, आज मीरा के phone screen पर इस्तेमाल होने वाली वही exact visual language है।",
      "ta": "ஒவ்வொரு candlestick-உம் ஒரு trading period-ன் opening, closing, high, low-ன் compressed story தான். 18th-century rice trading-க்காக invent பண்ணப்பட்ட ஒரு method, remarkably, இன்று மீராவின் phone screen-ல பயன்படுத்தப்படும் அதே visual language தான்."
    },
    "quiz": [
      {
        "question": {
          "en": "Who is credited with developing the earliest candlestick charting method?",
          "hi": "सबसे पहले candlestick charting method develop करने का credit किसे दिया जाता है?",
          "ta": "Earliest candlestick charting method develop பண்ணினதா யாருக்கு credit கொடுக்கப்படுது?"
        },
        "options": {
          "en": [
            "Warren Buffett",
            "Munehisa Homma, an 18th-century Japanese rice trader",
            "SEBI",
            "Benjamin Graham"
          ],
          "hi": [
            "Warren Buffett",
            "Munehisa Homma, एक 18वीं सदी के Japanese rice trader",
            "SEBI",
            "Benjamin Graham"
          ],
          "ta": [
            "Warren Buffett",
            "Munehisa Homma, ஒரு 18th-century Japanese rice trader",
            "SEBI",
            "Benjamin Graham"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "He developed this visual price-tracking method at the Dojima Rice Exchange in Japan, long before modern stock markets.",
          "hi": "उसने Japan के Dojima Rice Exchange पर ये visual price-tracking method develop की थी, modern stock markets से बहुत पहले।",
          "ta": "Modern stock markets வருறதுக்கு நிறைய முன்னாடியே, Japan-ல Dojima Rice Exchange-ல இந்த visual price-tracking method-ஐ அவர் develop பண்ணார்."
        }
      },
      {
        "question": {
          "en": "What does the color of a candlestick typically indicate?",
          "hi": "एक candlestick का colour आमतौर पर क्या indicate करता है?",
          "ta": "ஒரு candlestick-ன் color typically எதைக் குறிக்கும்?"
        },
        "options": {
          "en": [
            "The company's sector",
            "Whether the price closed higher (green) or lower (red) than it opened",
            "The trading volume",
            "The company's market cap"
          ],
          "hi": [
            "कं पनी का sector",
            "क्या price खुलने से ज़्यादा (green) पर बंद हुआ या कम (red) पर",
            "Trading volume",
            "कं पनी का market cap"
          ],
          "ta": [
            "நிறுவனத்தின் sector",
            "Price open ஆனதை விட ஏறி close ஆச்சா (green) இல்ல குறைஞ்சு close ஆச்சா (red)",
            "Trading volume",
            "நிறுவனத்தின் market cap"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Color gives an instant visual read on whether that period was net positive or negative for price.",
          "hi": "Colour तुरंत ये visually बता देता है कि वो period price के लिए net positive था या negative।",
          "ta": "அந்த period net positive-ஆ இல்ல negative-ஆ இருந்துச்சுனு color ஒரு instant visual read தரும்."
        }
      },
      {
        "question": {
          "en": "What do the thin lines ('wicks') on a candlestick represent?",
          "hi": "Candlestick पर पतली lines ('wicks') क्या represent करती हैं?",
          "ta": "ஒரு candlestick-ல இருக்கிற thin lines (‘wicks’) எதை represent பண்ணும்?"
        },
        "options": {
          "en": [
            "The company's dividend",
            "The highest and lowest prices reached during that period",
            "The trading volume",
            "The stock's P/E ratio"
          ],
          "hi": [
            "कं पनी का dividend",
            "उस period के दौरान पहुंची सबसे ऊँ ची और सबसे नीची prices",
            "Trading volume",
            "Stock का P/E ratio"
          ],
          "ta": [
            "நிறுவனத்தின் dividend",
            "அந்த period-ல reach பண்ண மிக அதிக, மிகக் குறைந்த விலைகள்",
            "Trading volume",
            "Stock-ன் P/E ratio"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Wicks show the full price range explored during the period, beyond just open and close.",
          "hi": "Wicks सिर्फ open और close से आगे, उस period में explore हुई पूरी price range दिखाती हैं।",
          "ta": "Open, close-ஐத் தாண்டி, அந்த period-ல explore பண்ண full price range-ஐ wicks காட்டும்."
        }
      },
      {
        "question": {
          "en": "What key information does a plain line chart typically leave out that a candlestick includes?",
          "hi": "एक plain line chart आमतौर पर कौन सी key information छोड़ देता है जो candlestick में शामिल होती है?",
          "ta": "ஒரு plain line chart typically விட்டுடும், ஆனா candlestick include பண்ணும் key information என்ன?"
        },
        "options": {
          "en": [
            "The closing price",
            "The full range of price movement (open, high, low) within each period",
            "The company name",
            "The stock exchange"
          ],
          "hi": [
            "Closing price",
            "हर period के अंदर price movement की पूरी range (open, high, low)",
            "कं पनी का नाम",
            "Stock exchange"
          ],
          "ta": [
            "Closing price",
            "ஒவ்வொரு period-க்குள்ளும் full range of price movement (open, high, low)",
            "நிறுவனத்தின் பெயர்",
            "Stock exchange"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A line chart usually plots only closing prices, hiding the intra-period volatility a candlestick reveals.",
          "hi": "एक line chart आमतौर पर सिर्फ closing prices plot करता है, जिससे candlestick में दिखने वाली intra-period volatility छिप जाती है।",
          "ta": "ஒரு line chart usually closing prices-ஐ மட்டும் தான் plot பண்ணும், ஒரு candlestick reveal பண்ற intra- period volatility-ஐ மறைக்கும்."
        }
      },
      {
        "question": {
          "en": "Roughly how old is the candlestick charting method, according to the lesson?",
          "hi": "Lesson के अनुसार, candlestick charting method लगभग कितनी पुरानी है?",
          "ta": "Lesson-ன் படி, candlestick charting method roughly எவ்ளோ பழையது?"
        },
        "options": {
          "en": [
            "Invented in the 2000s for online trading apps",
            "Traces back to 18th-century Japanese rice trading",
            "Invented by SEBI in the 1990s",
            "Less than 10 years old"
          ],
          "hi": [
            "Online trading apps के लिए 2000s में invent हुई",
            "18वीं सदी की Japanese rice trading तक जाती है",
            "SEBI ने 1990s में invent की",
            "10 साल से भी कम पुरानी है"
          ],
          "ta": [
            "Online trading apps-க்காக 2000-களில் invent பண்ணப்பட்டது",
            "18th-century Japanese rice trading-க்கு trace பண்ணும்",
            "1990-களில் SEBI-ஆல invent பண்ணப்பட்டது",
            "10 வருடத்திற்கும் குறைவா பழையது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "It's one of the oldest market-analysis tools still in common use today, largely unchanged. 25. Chart Types: Line, Bar & Candlestick",
          "hi": "ये आज भी आम इस्तेमाल में रहने वाले, बड़े हिस्से में unchanged, सबसे पुराने market-analysis tools में से एक है।",
          "ta": "இன்றும் largely unchanged-ஆ, common use-ல இருக்கிற மிக பழைய market-analysis tools-ல இதுவும் ஒண்ணு."
        }
      }
    ]
  },
  {
    "id": 25,
    "tier": "Intermediate",
    "title": {
      "en": "Chart Types: Line, Bar & Candlestick",
      "hi": "Chart के प्रकार: Line, Bar और Candlestick",
      "ta": "Chart Types: Line, Bar & Candlestick"
    },
    "opener": {
      "en": "The app let Meera switch between three chart styles for the same stock, and each one looked completely different. “Which one is correct?” she asked. “All of them,” Arjun laughed. “They're just showing you the same data with a different amount of detail.”\n\nLine Chart Connects only the closing prices over time into a single smooth line. Simple and clean, ideal for spotting a stock's overall long-term direction at a glance, but it hides all the detail within each individual period.\n\nBar Chart (OHLC) Shows Open, High, Low, and Close using a single vertical bar per period, with small tick marks on the left (open) and right (close). It carries the same information as a candlestick, just in a less visually intuitive shape.\n\nCandlestick Chart The most widely used format today (from Lesson 24) — the same Open/High/Low/Close data as a bar chart, but shown as a filled, colour-coded rectangle that's faster for most people to read at a glance, especially across many periods at once.\n\nThe same price data drawn three ways: line, bar (OHLC) and candlestick.\n\nKey takeaway: All three chart types plot the exact same underlying price data — the difference is purely how much detail is shown and how easy it is to read quickly. Most active chart-readers today default to candlesticks; long-term investors often prefer the simplicity of a line chart.\n\nQUICK QUIZ · TEST YOURSELF (5 QUESTIONS)\n\n1. What does a line chart typically plot? A) Only the opening price B) Only the closing price over time C) High and low prices only D) Trading volume only Correct: B) Only the closing price over time Why: Line charts connect closing prices, giving a simple view of overall direction while omitting intra-period detail.\n\n2. What information does a Bar (OHLC) chart show? A) Only the company name B) Open, High, Low, and Close for each period C) Only trading volume D) Only the P/E ratio Correct: B) Open, High, Low, and Close for each period Why: A bar chart carries the same OHLC information as a candlestick, just in a different visual shape.\n\n3. How does a candlestick chart's information compare to a bar chart's? A) Candlesticks show completely different data B) They show the same OHLC data, just in a more visually intuitive, color-coded shape C) Candlesticks omit the closing price D) Bar charts show more information than candlesticks Correct: B) They show the same OHLC data, just in a more visually intuitive, color-coded shape Why: Both formats plot identical Open/High/Low/Close data — the difference is purely visual readability.\n\n4. Which chart type is best suited for quickly spotting a stock's overall long-term direction, with less detail? A) Candlestick chart B) Line chart C) Bar chart D) None of these show direction Correct: B) Line chart Why: Its simplicity makes overall trend direction easy to see, at the cost of hiding intra-period detail.\n\n5. What is the main takeaway about the three chart types discussed? A) They plot completely unrelated data B) They all plot the same underlying price data, differing mainly in detail and readability C) Only candlestick charts are accurate D) Line charts are always wrong Correct: B) They all plot the same underlying price data, differing mainly in detail and readability Why: The choice between them is about preference and how much detail you want to see, not about differing accuracy.\n\n26. Support and Resistance Levels",
      "hi": "App मीरा को एक ही stock के लिए तीन chart styles के बीच switch करने देता था, और हर एक पूरी तरह अलग दिखता था। “कौन सा सही है?” उसने पूछा। “ये सब,” अर्जुन हँसा। “ये बस तुम्हें same data को अलग-अलग मात्रा में detail के साथ दिखा रहे हैं।”\n\nLine Chart समय के साथ सिर्फ closing prices को एक smooth line में जोड़ ता है। Simple और clean, एक नज़र में किसी stock की overall long-term direction spot करने के लिए ideal, लेकिन ये हर individual period के अंदर के सारे detail को छिपा देता है।\n\nBar Chart (OHLC) हर period के लिए एक single vertical bar इस्तेमाल करके Open, High, Low, और Close दिखाता है, जिसमें left (open) और right (close) पर छोटे tick marks होते हैं। इसमें candlestick जितनी ही information होती है, बस एक कम visually intuitive shape में।\n\nCandlestick Chart आज सबसे ज़्यादा इस्तेमाल होने वाला format (Lesson 24 से) — bar chart जैसा ही Open/High/Low/Close data, लेकिन एक filled, colour-coded rectangle के रूप में दिखाया जाता है जो ज़्यादातर लोगों के लिए एक नज़र में पढ़ ना तेज़ होता है, खासकर एक साथ कई periods में।\n\nवही price data तीन तरीकों में draw किया गया: line, bar (OHLC), candlestick।\n\nमुख्य सीख: तीनों chart types बिल्कुल same underlying price data plot करते हैं — फर्क सिर्फ इसमें है कि कितना detail दिखाया गया है और इसे जल्दी पढ़ ना कितना आसान है। आज ज़्यादातर active chart-readers default रूप से candlesticks इस्तेमाल करते हैं; long-term investors अक्सर line chart की simplicity पसंद करते हैं।\n\nक्विक क्विज़ · खुद को टेस्ट करें (5 सवाल)\n\n1. एक line chart आमतौर पर क्या plot करता है? A) सिर्फ opening price B) समय के साथ सिर्फ closing price C) सिर्फ high और low prices D) सिर्फ trading volume सही जवाब: B) समय के साथ सिर्फ closing price क्यों: Line charts closing prices को जोड़ ते हैं, जिससे overall direction का एक simple view मिलता है जबकि intra-period detail छूट जाता है।\n\n2. एक Bar (OHLC) chart क्या information दिखाता है? A) सिर्फ कं पनी का नाम B) हर period के लिए Open, High, Low, और Close C) सिर्फ trading volume D) सिर्फ P/E ratio सही जवाब: B) हर period के लिए Open, High, Low, और Close क्यों: एक bar chart में candlestick जितनी ही OHLC information होती है, बस एक अलग visual shape में।\n\n3. एक candlestick chart की information, bar chart से कै से compare होती है? A) Candlesticks बिल्कुल अलग data दिखाते हैं B) दोनों same OHLC data दिखाते हैं, बस एक ज़्यादा visually intuitive, colour-coded shape में C) Candlesticks closing price को छोड़ देते हैं D) Bar charts, candlesticks से ज़्यादा information दिखाते हैं सही जवाब: B) दोनों same OHLC data दिखाते हैं, बस एक ज़्यादा visually intuitive, colour-coded shape में क्यों: दोनों formats एक जैसा ही Open/High/Low/Close data plot करते हैं — फर्क सिर्फ visual readability का है।\n\n4. कम detail के साथ किसी stock की overall long-term direction जल्दी spot करने के लिए कौन सा chart type सबसे उपयुक्त है? A) Candlestick chart B) Line chart C) Bar chart D) इनमें से कोई भी direction नहीं दिखाता सही जवाब: B) Line chart क्यों: इसकी simplicity की वजह से overall trend direction देखना आसान हो जाता है, इसकी कीमत intra-period detail छिपाकर चुकानी पड़ ती है।\n\n5. चर्चा किए गए तीन chart types के बारे में मुख्य takeaway क्या है? A) वो पूरी तरह unrelated data plot करते हैं B) वो सब same underlying price data plot करते हैं, मुख्य रूप से detail और readability में अलग हैं C) सिर्फ candlestick charts accurate होते हैं D) Line charts हमेशा गलत होते हैं सही जवाब: B) वो सब same underlying price data plot करते हैं, मुख्य रूप से detail और readability में अलग हैं क्यों: इनके बीच का choice preference और आप कितना detail देखना चाहते हैं इसके बारे में है, अलग-अलग accuracy के बारे में नहीं।",
      "ta": "App அதே stock-க்கு மூணு chart styles-க்கு இடையே switch பண்ண மீராவை அனுமதிச்சுச்சு, ஒவ்வொண்ணும் completely வித்தியாசமா தெரிஞ்சுச்சு. “எது correct?” என்று கேட்டாள். “எல்லாமே,” அர்ஜுன் சிரிச்சான். “அவை ஒரே data-வை, வெவ்வேறு அளவு detail-உடன் காட்டுது அவ்வளவு தான்.”\n\nLine Chart நேரத்தில் closing prices-ஐ மட்டும் ஒரே smooth line-ஆ connect பண்ணும். Simple, clean, ஒரு stock-ன் overall long-term direction-ஐ ஒரு glance-ல spot பண்ண ideal, ஆனா ஒவ்வொரு individual period- க்குள்ளும் இருக்கிற detail-ஐ முழுசா மறைக்கும்.\n\nBar Chart (OHLC) Open, High, Low, Close-ஐ ஒரு period-க்கு ஒரு single vertical bar வச்சு காட்டும், left-ல (open) right-ல (close) சின்ன tick marks-உடன். ஒரு candlestick அளவே information-ஐ இது carry பண்ணும், வெறும் less visually intuitive-ஆன ஒரு shape-ல.\n\nCandlestick Chart இன்று most widely used format (Lesson 24-லிருந்து) — bar chart-ன் அதே Open/High/Low/Close data, ஆனா ஒரு filled, colour-coded rectangle-ஆ காட்டப்படுது, ஒரே நேரத்தில் நிறைய periods-ஐ பார்க்கும்போதும் பெரும்பாலான பேருக்கு ஒரு glance-ல படிக்க வேகமா இருக்கும்.\n\nஅதே price data மூணு வழிகளில் draw பண்ணப்பட்டது: line, bar (OHLC), candlestick.\n\nமுக்கிய பாடம்: மூணு chart types-உம் exact அதே underlying price data-வை தான் plot பண்ணும் — வித்தியாசம் purely எவ்வளவு detail காட்டப்படுது, எவ்வளவு quick-ஆ படிக்க முடியும்னது தான். இன்று most active chart-readers candlesticks-ஐ default-ஆ பயன்படுத்துவாங்க; long-term investors பெரும்பாலும் line chart-ன் simplicity-ஐ prefer பண்ணுவாங்க.\n\nவினாடி வினா · சுயபரிசோதனை (5 கேள்விகள்)\n\n1. ஒரு line chart typically எதை plot பண்ணும்? A) Opening price மட்டும் B) நேரத்தில் closing price மட்டும் C) High, low prices மட்டும் D) Trading volume மட்டும் சரியான பதில்:B) நேரத்தில் closing price மட்டும் ஏன்:Line charts closing prices-ஐ connect பண்ணும், intra-period detail-ஐ omit பண்ணும்போதே overall direction-ன் ஒரு simple view தரும்.\n\n2. ஒரு Bar (OHLC) chart என்ன information-ஐ காட்டும்? A) நிறுவனத்தின் பெயர் மட்டும் B) ஒவ்வொரு period-க்கும் Open, High, Low, Close C) Trading volume மட்டும் D) P/E ratio மட்டும் சரியான பதில்:B) ஒவ்வொரு period-க்கும் Open, High, Low, Close ஏன்:ஒரு bar chart candlestick-ன் அதே OHLC information-ஐ carry பண்ணும், வெறும் வேற visual shape-ல.\n\n3. ஒரு candlestick chart-ன் information, bar chart-ன் information-உடன் எப்படி compare ஆகும்? A) Candlesticks completely வித்தியாசமான data காட்டும் B) அவை அதே OHLC data-வை காட்டும், வெறும் more visually intuitive, colour-coded shape-ல C) Candlesticks closing price-ஐ omit பண்ணும் D) Bar charts candlesticks-ஐ விட அதிக information காட்டும் சரியான பதில்:B) அவை அதே OHLC data-வை காட்டும், வெறும் more visually intuitive, colour- coded shape-ல ஏன்:இரண்டு formats-உம் identical Open/High/Low/Close data-வை plot பண்ணும் — வித்தியாசம் purely visual readability.\n\n4. குறைவான detail-உடன், ஒரு stock-ன் overall long-term direction-ஐ quick-ஆ spot பண்ண எந்த chart type best suited? A) Candlestick chart B) Line chart C) Bar chart D) இவற்றில் எதுவும் direction-ஐ காட்டாது சரியான பதில்:B) Line chart ஏன்:இதன் simplicity, intra-period detail-ஐ மறைக்கும் cost-ல, overall trend direction-ஐ எளிதா பார்க்க வைக்கும்.\n\n5. Discuss பண்ணப்பட்ட மூணு chart types-ஐ பத்தி main takeaway என்ன? A) அவை முற்றிலும் unrelated data plot பண்ணும் B) அவை எல்லாம் அதே underlying price data-வை plot பண்ணும், detail-லும் readability-லும் மட்டும் வித்தியாசம் C) Candlestick charts மட்டும் accurate D) Line charts எப்போதும் தப்பு சரியான பதில்:B) அவை எல்லாம் அதே underlying price data-வை plot பண்ணும், detail-லும் readability-லும் மட்டும் வித்தியாசம் ஏன்:Accuracy வேறுபாடு இல்ல, preference-ஐயும் எவ்வளவு detail பார்க்கணும்னதையும் பத்தினது தான் அவற்றுக்கு இடையேயான தேர்வு."
    },
    "body": {
      "en": "The app let Meera switch between three chart styles for the same stock, and each one looked completely different. “Which one is correct?” she asked. “All of them,” Arjun laughed. “They're just showing you the same data with a different amount of detail.”\n\nLine Chart Connects only the closing prices over time into a single smooth line. Simple and clean, ideal for spotting a stock's overall long-term direction at a glance, but it hides all the detail within each individual period.\n\nBar Chart (OHLC) Shows Open, High, Low, and Close using a single vertical bar per period, with small tick marks on the left (open) and right (close). It carries the same information as a candlestick, just in a less visually intuitive shape.\n\nCandlestick Chart The most widely used format today (from Lesson 24) — the same Open/High/Low/Close data as a bar chart, but shown as a filled, colour-coded rectangle that's faster for most people to read at a glance, especially across many periods at once.\n\nThe same price data drawn three ways: line, bar (OHLC) and candlestick.",
      "hi": "App मीरा को एक ही stock के लिए तीन chart styles के बीच switch करने देता था, और हर एक पूरी तरह अलग दिखता था। “कौन सा सही है?” उसने पूछा। “ये सब,” अर्जुन हँसा। “ये बस तुम्हें same data को अलग-अलग मात्रा में detail के साथ दिखा रहे हैं।”\n\nLine Chart समय के साथ सिर्फ closing prices को एक smooth line में जोड़ ता है। Simple और clean, एक नज़र में किसी stock की overall long-term direction spot करने के लिए ideal, लेकिन ये हर individual period के अंदर के सारे detail को छिपा देता है।\n\nBar Chart (OHLC) हर period के लिए एक single vertical bar इस्तेमाल करके Open, High, Low, और Close दिखाता है, जिसमें left (open) और right (close) पर छोटे tick marks होते हैं। इसमें candlestick जितनी ही information होती है, बस एक कम visually intuitive shape में।\n\nCandlestick Chart आज सबसे ज़्यादा इस्तेमाल होने वाला format (Lesson 24 से) — bar chart जैसा ही Open/High/Low/Close data, लेकिन एक filled, colour-coded rectangle के रूप में दिखाया जाता है जो ज़्यादातर लोगों के लिए एक नज़र में पढ़ ना तेज़ होता है, खासकर एक साथ कई periods में।\n\nवही price data तीन तरीकों में draw किया गया: line, bar (OHLC), candlestick।",
      "ta": "App அதே stock-க்கு மூணு chart styles-க்கு இடையே switch பண்ண மீராவை அனுமதிச்சுச்சு, ஒவ்வொண்ணும் completely வித்தியாசமா தெரிஞ்சுச்சு. “எது correct?” என்று கேட்டாள். “எல்லாமே,” அர்ஜுன் சிரிச்சான். “அவை ஒரே data-வை, வெவ்வேறு அளவு detail-உடன் காட்டுது அவ்வளவு தான்.”\n\nLine Chart நேரத்தில் closing prices-ஐ மட்டும் ஒரே smooth line-ஆ connect பண்ணும். Simple, clean, ஒரு stock-ன் overall long-term direction-ஐ ஒரு glance-ல spot பண்ண ideal, ஆனா ஒவ்வொரு individual period- க்குள்ளும் இருக்கிற detail-ஐ முழுசா மறைக்கும்.\n\nBar Chart (OHLC) Open, High, Low, Close-ஐ ஒரு period-க்கு ஒரு single vertical bar வச்சு காட்டும், left-ல (open) right-ல (close) சின்ன tick marks-உடன். ஒரு candlestick அளவே information-ஐ இது carry பண்ணும், வெறும் less visually intuitive-ஆன ஒரு shape-ல.\n\nCandlestick Chart இன்று most widely used format (Lesson 24-லிருந்து) — bar chart-ன் அதே Open/High/Low/Close data, ஆனா ஒரு filled, colour-coded rectangle-ஆ காட்டப்படுது, ஒரே நேரத்தில் நிறைய periods-ஐ பார்க்கும்போதும் பெரும்பாலான பேருக்கு ஒரு glance-ல படிக்க வேகமா இருக்கும்.\n\nஅதே price data மூணு வழிகளில் draw பண்ணப்பட்டது: line, bar (OHLC), candlestick."
    },
    "keyTakeaway": {
      "en": "All three chart types plot the exact same underlying price data — the difference is purely how much detail is shown and how easy it is to read quickly. Most active chart-readers today default to candlesticks; long-term investors often prefer the simplicity of a line chart.",
      "hi": "तीनों chart types बिल्कुल same underlying price data plot करते हैं — फर्क सिर्फ इसमें है कि कितना detail दिखाया गया है और इसे जल्दी पढ़ ना कितना आसान है। आज ज़्यादातर active chart-readers default रूप से candlesticks इस्तेमाल करते हैं; long-term investors अक्सर line chart की simplicity पसंद करते हैं।",
      "ta": "மூணு chart types-உம் exact அதே underlying price data-வை தான் plot பண்ணும் — வித்தியாசம் purely எவ்வளவு detail காட்டப்படுது, எவ்வளவு quick-ஆ படிக்க முடியும்னது தான். இன்று most active chart-readers candlesticks-ஐ default-ஆ பயன்படுத்துவாங்க; long-term investors பெரும்பாலும் line chart-ன் simplicity-ஐ prefer பண்ணுவாங்க."
    },
    "quiz": [
      {
        "question": {
          "en": "What does a line chart typically plot?",
          "hi": "एक line chart आमतौर पर क्या plot करता है?",
          "ta": "ஒரு line chart typically எதை plot பண்ணும்?"
        },
        "options": {
          "en": [
            "Only the opening price",
            "Only the closing price over time",
            "High and low prices only",
            "Trading volume only"
          ],
          "hi": [
            "सिर्फ opening price",
            "समय के साथ सिर्फ closing price",
            "सिर्फ high और low prices",
            "सिर्फ trading volume"
          ],
          "ta": [
            "Opening price மட்டும்",
            "நேரத்தில் closing price மட்டும்",
            "High, low prices மட்டும்",
            "Trading volume மட்டும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Line charts connect closing prices, giving a simple view of overall direction while omitting intra-period detail.",
          "hi": "Line charts closing prices को जोड़ ते हैं, जिससे overall direction का एक simple view मिलता है जबकि intra-period detail छूट जाता है।",
          "ta": "Line charts closing prices-ஐ connect பண்ணும், intra-period detail-ஐ omit பண்ணும்போதே overall direction-ன் ஒரு simple view தரும்."
        }
      },
      {
        "question": {
          "en": "What information does a Bar (OHLC) chart show?",
          "hi": "एक Bar (OHLC) chart क्या information दिखाता है?",
          "ta": "ஒரு Bar (OHLC) chart என்ன information-ஐ காட்டும்?"
        },
        "options": {
          "en": [
            "Only the company name",
            "Open, High, Low, and Close for each period",
            "Only trading volume",
            "Only the P/E ratio"
          ],
          "hi": [
            "सिर्फ कं पनी का नाम",
            "हर period के लिए Open, High, Low, और Close",
            "सिर्फ trading volume",
            "सिर्फ P/E ratio"
          ],
          "ta": [
            "நிறுவனத்தின் பெயர் மட்டும்",
            "ஒவ்வொரு period-க்கும் Open, High, Low, Close",
            "Trading volume மட்டும்",
            "P/E ratio மட்டும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A bar chart carries the same OHLC information as a candlestick, just in a different visual shape.",
          "hi": "एक bar chart में candlestick जितनी ही OHLC information होती है, बस एक अलग visual shape में।",
          "ta": "ஒரு bar chart candlestick-ன் அதே OHLC information-ஐ carry பண்ணும், வெறும் வேற visual shape-ல."
        }
      },
      {
        "question": {
          "en": "How does a candlestick chart's information compare to a bar chart's?",
          "hi": "एक candlestick chart की information, bar chart से कै से compare होती है?",
          "ta": "ஒரு candlestick chart-ன் information, bar chart-ன் information-உடன் எப்படி compare ஆகும்?"
        },
        "options": {
          "en": [
            "Candlesticks show completely different data",
            "They show the same OHLC data, just in a more visually intuitive, color-coded shape",
            "Candlesticks omit the closing price",
            "Bar charts show more information than candlesticks"
          ],
          "hi": [
            "Candlesticks बिल्कुल अलग data दिखाते हैं",
            "दोनों same OHLC data दिखाते हैं, बस एक ज़्यादा visually intuitive, colour-coded shape में",
            "Candlesticks closing price को छोड़ देते हैं",
            "Bar charts, candlesticks से ज़्यादा information दिखाते हैं"
          ],
          "ta": [
            "Candlesticks completely வித்தியாசமான data காட்டும்",
            "அவை அதே OHLC data-வை காட்டும், வெறும் more visually intuitive, colour-coded shape-ல",
            "Candlesticks closing price-ஐ omit பண்ணும்",
            "Bar charts candlesticks-ஐ விட அதிக information காட்டும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Both formats plot identical Open/High/Low/Close data — the difference is purely visual readability.",
          "hi": "दोनों formats एक जैसा ही Open/High/Low/Close data plot करते हैं — फर्क सिर्फ visual readability का है।",
          "ta": "இரண்டு formats-உம் identical Open/High/Low/Close data-வை plot பண்ணும் — வித்தியாசம் purely visual readability."
        }
      },
      {
        "question": {
          "en": "Which chart type is best suited for quickly spotting a stock's overall long-term direction, with less detail?",
          "hi": "कम detail के साथ किसी stock की overall long-term direction जल्दी spot करने के लिए कौन सा chart type सबसे उपयुक्त है?",
          "ta": "குறைவான detail-உடன், ஒரு stock-ன் overall long-term direction-ஐ quick-ஆ spot பண்ண எந்த chart type best suited?"
        },
        "options": {
          "en": [
            "Candlestick chart",
            "Line chart",
            "Bar chart",
            "None of these show direction"
          ],
          "hi": [
            "Candlestick chart",
            "Line chart",
            "Bar chart",
            "इनमें से कोई भी direction नहीं दिखाता"
          ],
          "ta": [
            "Candlestick chart",
            "Line chart",
            "Bar chart",
            "இவற்றில் எதுவும் direction-ஐ காட்டாது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Its simplicity makes overall trend direction easy to see, at the cost of hiding intra-period detail.",
          "hi": "इसकी simplicity की वजह से overall trend direction देखना आसान हो जाता है, इसकी कीमत intra-period detail छिपाकर चुकानी पड़ ती है।",
          "ta": "இதன் simplicity, intra-period detail-ஐ மறைக்கும் cost-ல, overall trend direction-ஐ எளிதா பார்க்க வைக்கும்."
        }
      },
      {
        "question": {
          "en": "What is the main takeaway about the three chart types discussed?",
          "hi": "चर्चा किए गए तीन chart types के बारे में मुख्य takeaway क्या है?",
          "ta": "Discuss பண்ணப்பட்ட மூணு chart types-ஐ பத்தி main takeaway என்ன?"
        },
        "options": {
          "en": [
            "They plot completely unrelated data",
            "They all plot the same underlying price data, differing mainly in detail and readability",
            "Only candlestick charts are accurate",
            "Line charts are always wrong"
          ],
          "hi": [
            "वो पूरी तरह unrelated data plot करते हैं",
            "वो सब same underlying price data plot करते हैं, मुख्य रूप से detail और readability में अलग हैं",
            "सिर्फ candlestick charts accurate होते हैं",
            "Line charts हमेशा गलत होते हैं"
          ],
          "ta": [
            "அவை முற்றிலும் unrelated data plot பண்ணும்",
            "அவை எல்லாம் அதே underlying price data-வை plot பண்ணும், detail-லும் readability-லும் மட்டும் வித்தியாசம்",
            "Candlestick charts மட்டும் accurate",
            "Line charts எப்போதும் தப்பு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The choice between them is about preference and how much detail you want to see, not about differing accuracy. 26. Support and Resistance Levels",
          "hi": "इनके बीच का choice preference और आप कितना detail देखना चाहते हैं इसके बारे में है, अलग-अलग accuracy के बारे में नहीं।",
          "ta": "Accuracy வேறுபாடு இல்ல, preference-ஐயும் எவ்வளவு detail பார்க்கணும்னதையும் பத்தினது தான் அவற்றுக்கு இடையேயான தேர்வு."
        }
      }
    ]
  },
  {
    "id": 26,
    "tier": "Intermediate",
    "title": {
      "en": "Support and Resistance Levels",
      "hi": "Support और Resistance Levels",
      "ta": "Support மற்றும் Resistance Levels"
    },
    "opener": {
      "en": "Arjun pointed at a chart where the price kept falling to almost the exact same level, again and again, before bouncing back up each time. “That line the price keeps refusing to fall below? That's support. There's an opposite version too, above the price — resistance.”",
      "hi": "अर्जुन ने एक chart की तरफ इशारा किया जहाँ price बार-बार लगभग एक ही exact level तक गिर रही थी, हर बार वापस ऊपर bounce करने से पहले। “वो line जिसके नीचे price बार-बार गिरने से मना कर रही है? वो support है। इसका एक opposite version भी है, price के ऊपर — resistance।”",
      "ta": "விலை மறுபடியும் மறுபடியும் கிட்டத்தட்ட அதே exact level-க்கு விழுந்து, ஒவ்வொரு தடவையும் bounce பண்ணி திரும்ப ஏறுற ஒரு chart-ஐ அர்ஜுன் point பண்ணினான். “அந்த price refuse பண்ணிக்கிட்டே இருக்கிற line, அதுக்கு கீழ விழாம? அதுதான் support. Price-க்கு மேல ஒரு opposite version-உம் இருக்கு — resistance.”"
    },
    "realStorySubtitle": {
      "en": "The Level the Sensex Struggled to Break for Months",
      "hi": "वो Level जिसे तोड़ ने में Sensex को महीनों लगे",
      "ta": "Sensex மாசக்கணக்கா Break பண்ண Struggle பண்ண Level"
    },
    "realStoryBody": {
      "en": "Through parts of 2019, the Sensex repeatedly approached the 40,000 mark and pulled back several times before finally breaking above it — a textbook example of a round-number level acting as resistance, a price ceiling that buyers struggled to push through, until they finally did.\n\nOnce a resistance level is decisively broken, it often flips roles and starts acting as support on future pullbacks — traders who missed buying below the old resistance often look to buy again if the price returns to test that same level from above.",
      "hi": "2019 के कुछ हिस्सों में, Sensex बार-बार 40,000 के mark के पास पहुँचा और आखिरकार उसके ऊपर break होने से पहले कई बार वापस pull back हुआ — एक textbook example कि कै से एक round-number level resistance की तरह काम करता है, एक price ceiling जिसे तोड़ ने में buyers को दिक्कत हुई, जब तक कि आखिरकार उन्होंने तोड़ नहीं दिया।\n\nएक बार जब एक resistance level निर्णायक रूप से टूट जाता है, तो वो अक्सर अपना role flip कर लेता है और future pullbacks पर support की तरह काम करना शुरू कर देता है — जिन traders ने पुराने resistance के नीचे खरीदना miss किया था, वो अक्सर दोबारा खरीदने की सोचते हैं अगर price ऊपर से आकर उसी level को test करने वापस आए।",
      "ta": "2019-ன் சில பகுதிகளில், Sensex மறுபடியும் மறுபடியும் 40,000 mark-ஐ approach பண்ணி, finally அதற்கு மேல break ஆகும் முன் பல தடவை pull back ஆச்சு — resistance-ஆ act பண்ற ஒரு round-number level-ன் ஒரு textbook example, buyers push பண்ண struggle பண்ண ஒரு price ceiling, இறுதியில் அவங்க பண்ணுற வரைக்கும்.\n\nஒரு resistance level decisively break ஆனதும், அது பெரும்பாலும் roles-ஐ flip பண்ணி, future pullbacks-ல support-ஆ act பண்ண ஆரம்பிக்கும் — பழைய resistance-க்கு கீழ வாங்க miss பண்ண traders, price மறுபடியும் மேலிருந்து அதே level-ஐ test பண்ண திரும்பி வந்தா, மறுபடியும் வாங்க பார்ப்பாங்க."
    },
    "body": {
      "en": "Support — A Price Floor A price level where buying interest has historically been strong enough to stop a fall and push price back up. Think of it as a floor the price keeps bouncing off.\n\nResistance — A Price Ceiling A price level where selling interest has historically been strong enough to stop a rise and push price back down — a ceiling the price struggles to break through.\n\nWhy These Levels Form at All They form simply because many traders remember the same past price points and act similarly around them — placing buy orders near an old low, or selling near an old high — which becomes a self-reinforcing pattern as more participants watch the same charts.\n\nPrice often bounces between a support floor and a resistance ceiling — until it breaks out.",
      "hi": "Support — एक Price Floor एक price level जहाँ खरीदारी का interest historically इतना मज़ बूत रहा है कि गिरावट रुक जाए और price वापस ऊपर push हो जाए। इसे उस floor की तरह सोचो जिससे price बार-बार टकराकर वापस उछलती है।\n\nResistance — एक Price Ceiling एक price level जहाँ बिकवाली का interest historically इतना मज़ बूत रहा है कि बढ़त रुक जाए और price वापस नीचे push हो जाए — एक ceiling जिसे तोड़ ने में price को दिक्कत होती है।\n\nये Levels बनते ही क्यों हैं ये सिर्फ इसलिए बनते हैं क्योंकि कई traders एक ही पुराने price points को याद रखते हैं और उनके आसपास एक जैसा व्यवहार करते हैं — किसी पुराने low के पास buy orders रखना, या किसी पुराने high के पास बेचना — जो एक self-reinforcing pattern बन जाता है जैसे-जैसे ज़्यादा participants एक ही charts देखते हैं।\n\nPrice ज़्यादातर एक support floor और resistance ceiling के बीच bounce करती है — जब तक वो break out ना हो जाए।",
      "ta": "Support — ஒரு Price Floor வரலாற்றுல buying interest ஒரு fall-ஐ நிறுத்தி price-ஐ மறுபடியும் தள்ள போதுமான strong-ஆ இருந்த ஒரு price level. Price மறுபடியும் மறுபடியும் bounce ஆகுற ஒரு floor-ஆ இதை நினைச்சுப் பாருங்க.\n\nResistance — ஒரு Price Ceiling வரலாற்றுல selling interest ஒரு rise-ஐ நிறுத்தி price-ஐ மறுபடியும் கீழ தள்ள போதுமான strong-ஆ இருந்த ஒரு price level — price break through பண்ண struggle பண்ற ஒரு ceiling.\n\nஇந்த Levels ஏன் Form ஆகும் நிறைய traders அதே past price points-ஐ நினைவு வச்சிருந்து அதைச் சுற்றி similar-ஆ act பண்றதால் மட்டும் தான் அவை form ஆகும் — ஒரு old low-க்கு அருகில் buy orders போடுறது, அல்லது ஒரு old high-க்கு அருகில் sell பண்றது — அதே charts-ஐ பார்க்கிற participants கூட கூட, இது ஒரு self- reinforcing pattern-ஆ மாறும்.\n\nPrice பெரும்பாலும் ஒரு support floor-க்கும் resistance ceiling-க்கும் இடையே bounce ஆகும் — அது break out ஆகும் வரைக்கும்."
    },
    "keyTakeaway": {
      "en": "Support and resistance are about collective trader memory and behaviour repeating at",
      "hi": "Support और resistance, familiar price levels पर बार-बार repeat होती collective trader memory और behaviour के बारे में हैं — कोई physical law नहीं। Sensex का 2019 में 40,000 पर struggle दिखाता है कि ये levels कितने real और visible हो सकते हैं, और कै से एक टूटा हुआ resistance अगला support बन सकता है।",
      "ta": "Support-உம் resistance-உம், familiar price levels-ல repeat ஆகுற collective trader memory-ஐயும் behaviour-ஐயும் பத்தினது — ஒரு physical law இல்ல. 2019-ல 40,000-ல Sensex-ன் struggle, இந்த levels எவ்ளோ real-ஆவும் visible-ஆவும் இருக்கும்னு, ஒரு broken resistance next support-ஆ எப்படி மாறும்னு காட்டுது."
    },
    "quiz": [
      {
        "question": {
          "en": "What is a 'support' level?",
          "hi": "'Support' level क्या होता है?",
          "ta": "ஒரு ‘support’ level என்றால் என்ன?"
        },
        "options": {
          "en": [
            "A price ceiling that's hard to break above",
            "A price floor where buying interest has historically stopped a fall",
            "A company's total debt",
            "A type of order"
          ],
          "hi": [
            "एक price ceiling जिसके ऊपर तोड़ ना मुश्किल है",
            "एक price floor जहाँ खरीदारी का interest historically गिरावट रोकता आया है",
            "कं पनी का total debt",
            "एक तरह का order"
          ],
          "ta": [
            "மேல break பண்ண கஷ்டமான ஒரு price ceiling",
            "வரலாற்றுல buying interest ஒரு fall-ஐ நிறுத்தின ஒரு price floor",
            "நிறுவனத்தின் total debt",
            "ஒரு வகை order"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Support is where buyers have repeatedly stepped in to halt declines and push price back up.",
          "hi": "Support वो जगह है जहाँ buyers बार-बार गिरावट रोकने और price को वापस ऊपर push करने के लिए आगे आए हैं।",
          "ta": "Declines-ஐ நிறுத்தி price-ஐ மறுபடியும் தள்ள buyers மறுபடியும் மறுபடியும் step in பண்ணின இடம் தான் support."
        }
      },
      {
        "question": {
          "en": "What is a 'resistance' level?",
          "hi": "'Resistance' level क्या होता है?",
          "ta": "ஒரு ‘resistance’ level என்றால் என்ன?"
        },
        "options": {
          "en": [
            "A price floor",
            "A price ceiling where selling interest has historically stopped a rise",
            "The company's book value",
            "A dividend payment date"
          ],
          "hi": [
            "एक price floor",
            "एक price ceiling जहाँ बिकवाली का interest historically बढ़त रोकता आया है",
            "कं पनी की book value",
            "एक dividend payment date"
          ],
          "ta": [
            "ஒரு price floor",
            "வரலாற்றுல selling interest ஒரு rise-ஐ நிறுத்தின ஒரு price ceiling",
            "நிறுவனத்தின் book value",
            "ஒரு dividend payment date"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Resistance is where sellers have repeatedly capped further gains, until it's eventually broken.",
          "hi": "Resistance वो जगह है जहाँ sellers बार-बार आगे की बढ़त पर cap लगाते आए हैं, जब तक कि आखिरकार वो टूट ना जाए।",
          "ta": "Sellers மறுபடியும் மறுபடியும் further gains-ஐ cap பண்ணின இடம் தான் resistance, அது இறுதியில் break ஆகும் வரைக்கும்."
        }
      },
      {
        "question": {
          "en": "What happened to the Sensex's 40,000 level after it was finally broken, according to the concept described?",
          "hi": "बताए गए concept के अनुसार, आखिरकार टूटने के बाद Sensex के 40,000 level का क्या हुआ?",
          "ta": "Describe பண்ணப்பட்ட concept-ன் படி, Sensex-ன் 40,000 level finally break ஆன பிறகு அதற்கு என்ன ஆச்சு?"
        },
        "options": {
          "en": [
            "It disappeared and never mattered again",
            "It could flip and start acting as a support level on future pullbacks",
            "It became illegal to trade near that level",
            "The Sensex was renamed"
          ],
          "hi": [
            "वो गायब हो गया और फिर कभी matter नहीं किया",
            "वो flip हो सकता है और future pullbacks पर एक support level की तरह काम करना शुरू कर सकता है",
            "उस level के पास trade करना illegal हो गया",
            "Sensex का नाम बदल दिया गया"
          ],
          "ta": [
            "அது மறைஞ்சு மறுபடியும் ஒருபோதும் matter பண்ணல",
            "அது flip ஆகி, future pullbacks-ல support level-ஆ act பண்ண ஆரம்பிக்கலாம்",
            "அந்த level-க்கு அருகில் trade பண்றது illegal ஆயிடுச்சு",
            "Sensex-ன் பெயர் மாறிடுச்சு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A broken resistance often becomes the new support, a common pattern in technical analysis.",
          "hi": "एक टूटा हुआ resistance अक्सर नया support बन जाता है, जो technical analysis में एक common pattern है।",
          "ta": "Technical analysis-ல ஒரு common pattern, ஒரு broken resistance பெரும்பாலும் புது support ஆகும்."
        }
      },
      {
        "question": {
          "en": "Why do support and resistance levels form?",
          "hi": "Support और resistance levels क्यों बनते हैं?",
          "ta": "Support, resistance levels ஏன் form ஆகும்?"
        },
        "options": {
          "en": [
            "They are set by SEBI",
            "Many traders remember and act similarly around the same past price points, creating a self-reinforcing pattern",
            "They are randomly generated by exchanges",
            "They only apply to government bonds"
          ],
          "hi": [
            "वो SEBI द्वारा set किए जाते हैं",
            "कई traders एक ही पुराने price points को याद रखते हैं और उनके आसपास एक जैसा व्यवहार करते हैं, जिससे एक self-reinforcing pattern बनता है",
            "वो exchanges द्वारा randomly generate किए जाते हैं",
            "वो सिर्फ government bonds पर लागू होते हैं"
          ],
          "ta": [
            "அவை SEBI-ஆல set பண்ணப்படும்",
            "நிறைய traders அதே past price points-ஐ நினைவு வச்சு similar-ஆ act பண்றாங்க, ஒரு self-reinforcing pattern-ஐ create பண்றாங்க",
            "அவை exchanges-ஆல randomly generate பண்ணப்படும்",
            "அவை government bonds-க்கு மட்டும் தான் apply ஆகும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Collective trader behavior around familiar price levels is what creates these patterns, not any fixed rule.",
          "hi": "familiar price levels के आसपास collective trader behavior ही इन patterns को बनाता है, कोई fixed rule नहीं।",
          "ta": "Familiar price levels-ஐ சுற்றி collective trader behavior தான் இந்த patterns-ஐ create பண்ணும், எந்த fixed rule-உம் இல்ல."
        }
      },
      {
        "question": {
          "en": "Are support and resistance levels guaranteed to hold every time?",
          "hi": "क्या support और resistance levels हर बार टिकने की guarantee होती है?",
          "ta": "Support, resistance levels ஒவ்வொரு தடவையும் hold ஆகுமா guarantee?"
        },
        "options": {
          "en": [
            "Yes, always, without exception",
            "No — they reflect historical tendencies, not a guaranteed physical law",
            "They only apply to small-cap stocks",
            "They are set permanently by the exchange"
          ],
          "hi": [
            "हाँ, हमेशा, बिना किसी exception के",
            "नहीं — वो historical tendencies दिखाते हैं, कोई guaranteed physical law नहीं",
            "वो सिर्फ small-cap stocks पर लागू होते हैं",
            "वो exchange द्वारा permanently set किए जाते हैं"
          ],
          "ta": [
            "ஆமா, always, no exception",
            "இல்ல — அவை historical tendencies-ஐ reflect பண்ணும், guaranteed physical law இல்ல",
            "அவை small-cap stocks-க்கு மட்டும் தான் apply ஆகும்",
            "அவை exchange-ஆல நிரந்தரமா set பண்ணப்படும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "These levels can and do break, as the Sensex eventually broke through 40,000 — they're tendencies, not certainties. 27. Moving Averages Explained",
          "hi": "ये levels टूट सकते हैं और टूटते भी हैं, जैसे Sensex आखिरकार 40,000 के ऊपर टूट गया — ये tendencies हैं, certainties नहीं।",
          "ta": "Sensex இறுதியில் 40,000-ஐ break பண்ணின மாதிரி, இந்த levels break ஆகும் — அவை certainties இல்ல, tendencies."
        }
      }
    ]
  },
  {
    "id": 27,
    "tier": "Intermediate",
    "title": {
      "en": "Moving Averages Explained",
      "hi": "Moving Averages समझाया गया",
      "ta": "Moving Averages விளக்கம்"
    },
    "opener": {
      "en": "“The chart's too jumpy to read any trend,” Meera complained, watching a stock zig-zag wildly day to day. Arjun added one smooth line on top of the mess. “That's a moving average. It just calms the noise down so you can see the actual trend.”",
      "hi": "“Chart बहुत जंपी है, कोई trend पढ़ ना मुश्किल है,” मीरा ने शिकायत की, एक stock को दिन-ब-दिन wildly zig-zag करते देखते हुए। अर्जुन ने उस गड़ बड़ी के ऊपर एक smooth line जोड़ दी। “वो एक moving average है। ये बस noise को शांत कर देता है ताकि तुम actual trend देख सको।”",
      "ta": "“Trend-ஐ படிக்க முடியாத அளவுக்கு chart ரொம்ப jumpy-ஆ இருக்கு,” ஒரு stock தினமும் wild-ஆ zig- zag ஆகுறதை பார்த்து மீரா complain பண்ணினாள். அர்ஜுன் அந்த mess-ன் மேல ஒரு smooth line add பண்ணினான். “அதுதான் moving average. Noise-ஐ calm பண்ணி, actual trend-ஐ நீங்க பார்க்க வைக்கும் அவ்வளவு தான்.”"
    },
    "realStorySubtitle": {
      "en": "The 'Golden Cross' After the 2020 Crash",
      "hi": "2020 Crash के बाद का 'Golden Cross'",
      "ta": "2020 Crash-க்கு பிறகு வந்த ‘Golden Cross’"
    },
    "realStoryBody": {
      "en": "After the sharp COVID-19 crash in March 2020, the Nifty's 50-day moving average — which had fallen well below its 200-day moving average during the crash — began recovering faster than the longer-term average, and eventually crossed back above it later that year.\n\nTechnical analysts call this a Golden Cross, widely watched as a signal of a strengthening longer-term uptrend, and it lined up closely with the market's continued recovery through the rest of 2020 — a real, well-documented example of moving averages being used to read a broader market trend.",
      "hi": "मार्च 2020 के तेज़ COVID-19 crash के बाद, Nifty का 50-day moving average — जो crash के दौरान अपने 200-day moving average से काफी नीचे गिर गया था — longer-term average से तेज़ी से recover होना शुरू हुआ, और आखिरकार उस साल बाद में वापस उसके ऊपर cross कर गया।\n\nTechnical analysts इसे Golden Cross कहते हैं, जिसे widely एक strengthening longer-term uptrend के signal के तौर पर देखा जाता है, और ये 2020 के बाकी बचे समय में market की जारी recovery के साथ काफी हद तक मेल खाता था — moving averages को एक broader market trend पढ़ ने के लिए इस्तेमाल किए जाने का एक real, well-documented example।",
      "ta": "March 2020-ல sharp COVID-19 crash-க்கு பிறகு, Nifty-ன் 50-day moving average — crash-ன் போது அதன் 200-day moving average-க்கு கீழ நல்லா விழுந்திருந்தது — longer-term average-ஐ விட வேகமா recover ஆக ஆரம்பிச்சு, அந்த வருடம் பிறகு அதன் மேல திரும்ப cross ஆச்சு. Technical analysts இதை Golden Cross-ன்னு சொல்வாங்க, ஒரு strengthening longer-term uptrend-ன் signal-ஆ widely watch பண்ணப்படுது, 2020-ன் மீதி காலம் முழுக்க market-ன் continued recovery- உடன் இது closely align ஆச்சு — market-ன் broader trend-ஐ படிக்க moving averages பயன்படுத்தப்படுவதற்கான ஒரு real, well-documented example."
    },
    "body": {
      "en": "What a Moving Average Does A Moving Average (MA) smooths out short-term price noise by plotting the average closing price over a set number of past periods (e.g., 50 days or 200 days), continuously updating as new days are added and old ones drop off.\n\nSimple vs Exponential Moving Average • Simple Moving Average (SMA): Gives every day in the period equal weight. • Exponential Moving Average (EMA): Gives more weight to recent days, making it react faster to new price changes.\n\nGolden Cross and Death Cross A Golden Cross (shorter-term MA crossing above a longer-term MA) is watched as a bullish signal; the opposite, a Death Cross, is watched as a bearish one. Neither guarantees what happens next — they're widely-followed signals, not certainties.\n\nA shorter-term average crossing above a longer-term one — a ‘Golden Cross’ — is a classic trend-change signal.",
      "hi": "एक Moving Average क्या करता है एक Moving Average (MA) past periods की एक set संख्या (जैसे, 50 दिन या 200 दिन) की average closing price plot करके short-term price noise को smooth करता है, नए दिन जुड़ ने और पुराने दिन गिरने के साथ लगातार update होता रहता है।\n\nSimple vs Exponential Moving Average • Simple Moving Average (SMA): period के हर दिन को equal weight देता है।\n\n• Exponential Moving Average (EMA): recent दिनों को ज़्यादा weight देता है, जिससे ये नए price changes पर तेज़ी से react करता है।\n\nGolden Cross और Death Cross एक Golden Cross (shorter-term MA का longer-term MA के ऊपर cross करना) एक bullish signal के तौर पर देखा जाता है; इसका उल्टा, एक Death Cross, एक bearish signal के तौर पर देखा जाता है। दोनों में से कोई भी ये guarantee नहीं करता कि आगे क्या होगा — ये widely-followed signals हैं, certainties नहीं।\n\nएक longer-term average के ऊपर cross करता एक shorter-term average — एक 'Golden Cross' — एक classic trend-change signal।",
      "ta": "ஒரு Moving Average என்ன பண்ணும் ஒரு Moving Average (MA), past periods-ன் ஒரு set number-க்கு (உ.தா., 50 நாள் அல்லது 200 நாள்) average closing price-ஐ plot பண்ணி short-term price noise-ஐ smooth பண்ணும், புது நாட்கள் add ஆகி பழையவை drop ஆகும்போது continuously update ஆகும்.\n\nSimple vs Exponential Moving Average • Simple Moving Average (SMA): Period-ல இருக்கிற ஒவ்வொரு நாளுக்கும் equal weight கொடுக்கும்.\n\n• Exponential Moving Average (EMA): Recent நாட்களுக்கு அதிக weight கொடுக்கும், புது price changes-க்கு அது வேகமா react பண்ண வைக்கும்.\n\nGolden Cross மற்றும் Death Cross ஒரு Golden Cross (shorter-term MA, longer-term MA-க்கு மேல cross ஆகுறது) ஒரு bullish signal-ஆ watch பண்ணப்படும்; opposite-ஆ, ஒரு Death Cross, bearish-ஆ watch பண்ணப்படும். இரண்டுமே அடுத்து என்ன நடக்கும்னு guarantee பண்ணாது — அவை widely-followed signals, certainties இல்ல.\n\nLonger-term average-க்கு மேல cross ஆகுற ஒரு shorter-term average — ஒரு ‘Golden Cross’ — ஒரு classic trend-change signal."
    },
    "keyTakeaway": {
      "en": "Moving averages turn noisy daily price action into a readable trend line. The 2020 Golden",
      "hi": "Moving averages जंपी daily price action को एक पढ़ ने लायक trend line में बदल देते हैं। 2020 का Golden Cross दिखाता है कि real market participants इन signals को असल में कितनी बारीकी से देखते हैं — useful context, भले ही कोई signal कभी guarantee नहीं होता।",
      "ta": "Moving averages noisy daily price action-ஐ ஒரு readable trend line-ஆ மாற்றும். இந்த signals-ஐ real market participants எவ்ளோ widely watch பண்றாங்கனு 2020 Golden Cross காட்டுது — எந்த signal-உம் ஒரு guarantee இல்லைனாலும், useful context."
    },
    "quiz": [
      {
        "question": {
          "en": "What is the main purpose of a moving average?",
          "hi": "Moving average का मुख्य purpose क्या है?",
          "ta": "ஒரு moving average-ன் main purpose என்ன?"
        },
        "options": {
          "en": [
            "To predict a company's next dividend",
            "To smooth out short-term price noise and reveal the underlying trend",
            "To calculate a company's P/E ratio",
            "To set the market's trading hours"
          ],
          "hi": [
            "कं पनी के अगले dividend की prediction करना",
            "Short-term price noise को smooth करना और underlying trend दिखाना",
            "कं पनी का P/E ratio calculate करना",
            "Market के trading hours set करना"
          ],
          "ta": [
            "நிறுவனத்தின் அடுத்த dividend-ஐ predict பண்ண",
            "Short-term price noise-ஐ smooth பண்ணி underlying trend-ஐ reveal பண்ண",
            "நிறுவனத்தின் P/E ratio-ஐ calculate பண்ண",
            "Market-ன் trading hours-ஐ set பண்ண"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "By averaging price over a set period, day-to-day jumpiness is smoothed into a clearer trend line.",
          "hi": "एक set period में price को average करके, day-to-day जंपीनेस एक clearer trend line में smooth हो जाती है।",
          "ta": "ஒரு set period-ல price-ஐ average பண்றதால், day-to-day jumpiness ஒரு clearer trend line-ஆ smooth ஆகும்."
        }
      },
      {
        "question": {
          "en": "What is the key difference between an SMA and an EMA?",
          "hi": "SMA और EMA के बीच key difference क्या है?",
          "ta": "SMA-க்கும் EMA-க்கும் இடையே key difference என்ன?"
        },
        "options": {
          "en": [
            "There is no difference",
            "EMA gives more weight to recent days, reacting faster to new price changes than SMA",
            "SMA only works for large-cap stocks",
            "EMA ignores recent price data entirely"
          ],
          "hi": [
            "कोई फर्क नहीं है",
            "EMA recent दिनों को ज़्यादा weight देता है, जिससे ये SMA से तेज़ी से नए price changes पर react करता है",
            "SMA सिर्फ large-cap stocks के लिए काम करता है",
            "EMA recent price data को पूरी तरह ignore करता है"
          ],
          "ta": [
            "எந்த வித்தியாசமும் இல்ல",
            "EMA recent நாட்களுக்கு அதிக weight கொடுக்கும், SMA-ஐ விட புது price changes-க்கு வேகமா react பண்ணும்",
            "SMA large-cap stocks-க்கு மட்டும் தான் வேலை செய்யும்",
            "EMA recent price data-வை முழுசா ignore பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "SMA weighs all days in the period equally, while EMA emphasizes more recent price action.",
          "hi": "SMA period के सभी दिनों को equal weight देता है, जबकि EMA ज़्यादा recent price action पर ज़ोर देता है।",
          "ta": "SMA period-ல எல்லா நாட்களையும் equal-ஆ weigh பண்ணும், EMA-வோ recent price action-ஐ emphasize பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What is a 'Golden Cross'?",
          "hi": "'Golden Cross' क्या है?",
          "ta": "‘Golden Cross’ என்றால் என்ன?"
        },
        "options": {
          "en": [
            "A shorter-term moving average crossing above a longer-term one, watched as a bullish signal",
            "A stock hitting its all-time low",
            "A type of stop-loss order",
            "A government bond auction"
          ],
          "hi": [
            "एक shorter-term moving average का longer-term वाले के ऊपर cross करना, जिसे bullish signal माना जाता है",
            "किसी stock का अपने all-time low पर पहुँचना",
            "एक तरह का stop-loss order",
            "एक government bond auction"
          ],
          "ta": [
            "Longer-term MA-க்கு மேல cross ஆகுற ஒரு shorter-term moving average, bullish signal-ஆ watch பண்ணப்படும்",
            "ஒரு stock அதன் all-time low-ஐ தொடுறது",
            "ஒரு வகை stop-loss order",
            "ஒரு government bond auction"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "It's a widely-followed technical signal suggesting strengthening upward momentum.",
          "hi": "ये एक widely-followed technical signal है जो strengthening upward momentum का सुझाव देता है।",
          "ta": "Strengthening upward momentum-ஐ suggest பண்ற ஒரு widely-followed technical signal இது."
        }
      },
      {
        "question": {
          "en": "What happened with Nifty's moving averages after the March 2020 crash, according to the story?",
          "hi": "Story के अनुसार, मार्च 2020 crash के बाद Nifty के moving averages के साथ क्या हुआ?",
          "ta": "கதையின் படி, March 2020 crash-க்கு பிறகு Nifty-ன் moving averages-க்கு என்ன ஆச்சு?"
        },
        "options": {
          "en": [
            "The 50-day MA crossed back above the 200-day MA, a Golden Cross, aligning with market recovery",
            "The market never recovered",
            "Moving averages disappeared from use",
            "A Death Cross occurred and stayed permanently"
          ],
          "hi": [
            "50-day MA वापस 200-day MA के ऊपर cross कर गया, एक Golden Cross, जो market recovery के साथ मेल खाता था",
            "Market कभी recover नहीं हुआ",
            "Moving averages इस्तेमाल से गायब हो गए",
            "एक Death Cross हुआ और permanently बना रहा"
          ],
          "ta": [
            "50-day MA, 200-day MA-க்கு மேல மறுபடியும் cross ஆச்சு, ஒரு Golden Cross, market recovery-உடன் align ஆச்சு",
            "Market ஒருபோதும் recover ஆகல",
            "Moving averages பயன்படுத்துறதிலிருந்து மறைஞ்சிடுச்சு",
            "ஒரு Death Cross நிரந்தரமா நடந்துச்சு"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "This real, well-documented crossover lined up with the market's broader recovery through 2020.",
          "hi": "ये real, well-documented crossover 2020 के बाकी समय में market की broader recovery के साथ मेल खाता था।",
          "ta": "இந்த real, well-documented crossover 2020-ன் மீதி காலம் முழுக்க market-ன் broader recovery-உடன் align ஆச்சு."
        }
      },
      {
        "question": {
          "en": "Does a Golden Cross or Death Cross guarantee future price movement?",
          "hi": "क्या Golden Cross या Death Cross future price movement की guarantee देते हैं?",
          "ta": "Golden Cross அல்லது Death Cross future price movement-ஐ guarantee பண்ணுமா?"
        },
        "options": {
          "en": [
            "Yes, always with 100% accuracy",
            "No, they are widely-watched signals, not certainties",
            "Only Death Crosses are guaranteed",
            "They only apply to bonds"
          ],
          "hi": [
            "हाँ, हमेशा 100% accuracy के साथ",
            "नहीं, ये widely-watched signals हैं, certainties नहीं",
            "सिर्फ Death Crosses guaranteed होते हैं",
            "ये सिर्फ bonds पर लागू होते हैं"
          ],
          "ta": [
            "ஆமா, எப்போதும் 100% accuracy-உடன்",
            "இல்ல, அவை widely-watched signals, certainties இல்ல",
            "Death Crosses மட்டும் தான் guaranteed",
            "அவை bonds-க்கு மட்டும் தான் apply ஆகும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Like all technical signals, they indicate tendencies and are widely followed, but never guarantee an outcome. 28. Sectors and Sector Rotation",
          "hi": "बाकी सभी technical signals की तरह, ये tendencies बताते हैं और widely followed होते हैं, लेकिन किसी outcome की कभी guarantee नहीं देते।",
          "ta": "மற்ற technical signals மாதிரியே, அவை tendencies-ஐக் குறிக்கும், widely followed ஆகும், ஆனா எந்த outcome-ஐயும் ஒருபோதும் guarantee பண்ணாது."
        }
      }
    ]
  },
  {
    "id": 28,
    "tier": "Intermediate",
    "title": {
      "en": "Sectors and Sector Rotation",
      "hi": "Sectors और Sector Rotation",
      "ta": "Sectors மற்றும் Sector Rotation"
    },
    "opener": {
      "en": "Meera noticed her IT stocks had done wonderfully in 2020 and 2021, then gone quiet — while banking stocks she'd ignored started climbing instead. “Did I pick badly?” she asked. “No,” Paati said, “you just watched sector rotation happen in real time.”",
      "hi": "मीरा ने notice किया कि उसके IT stocks ने 2020 और 2021 में शानदार प्रदर्शन किया, फिर शांत हो गए — जबकि banking stocks जिन्हें उसने ignore किया था, उनकी बजाय चढ़ ने लगे। “क्या मैंने गलत pick किया?” उसने पूछा। “नहीं,” पाटी ने कहा, “तुमने बस sector rotation को real time में होते देखा।”",
      "ta": "மீராவின் IT stocks 2020, 2021-ல அற்புதமா செய்திருக்கிறது கவனிச்சாள், பிறகு அமைதியா ஆயிடுச்சு — அவள் ignore பண்ணின banking stocks அதற்கு பதிலா ஏற ஆரம்பிச்சுச்சு. “நான் தப்பா pick பண்ணேனா?” என்று கேட்டாள். “இல்ல,” பாட்டி சொன்னார், “நீ real time-ல sector rotation நடக்கிறதை watch பண்ணே அவ்வளவு தான்.”"
    },
    "realStorySubtitle": {
      "en": "From Work-From-Home Winners to Reopening Winners",
      "hi": "Work-From-Home Winners से Reopening Winners तक",
      "ta": "Work-From-Home Winners-லிருந்து Reopening Winners வரை"
    },
    "realStoryBody": {
      "en": "During COVID-19 lockdowns in 2020-21, Indian IT services companies saw a surge in global demand as businesses everywhere rushed to digitise, and IT stocks significantly outperformed the broader market through that period.\n\nAs the economy reopened through 2021-22 and interest rates began rising, investor attention rotated toward banking, financial, and other 'cyclical' stocks tied more directly to everyday economic activity — a clear, widely observed real example of money moving from one sector's story to another's as conditions changed.",
      "hi": "2020-21 के COVID-19 lockdowns के दौरान, Indian IT services companies ने global demand में उछाल देखी क्योंकि हर जगह businesses digitise करने की जल्दी में थे, और उस दौर में IT stocks ने broader market से काफी बेहतर प्रदर्शन किया।\n\nजैसे-जैसे 2021-22 में economy reopen हुई और interest rates बढ़ ने लगे, investor attention banking, financial, और अन्य 'cyclical' stocks की तरफ rotate हुई जो everyday economic activity से ज़्यादा directly जुड़े थे — एक साफ, widely observed real example कि कै से conditions बदलने पर पैसा एक sector की story से दूसरे की तरफ move करता है।",
      "ta": "2020-21-ல COVID-19 lockdowns-ன் போது, businesses எல்லோரும் digitise பண்ண rush ஆனதால் Indian IT services நிறுவனங்கள் global demand-ல ஒரு surge-ஐ பார்த்தாங்க, அந்த காலகட்டத்தில் IT stocks broader market-ஐ விட significantly outperform பண்ணுச்சு. 2021-22 முழுக்க economy reopen ஆகி, interest rates ஏற ஆரம்பிச்சப்போ, investor attention banking, financial, மற்ற ‘cyclical’ stocks-க்கு rotate ஆச்சு, everyday economic activity-உடன் directly tied ஆனவை — conditions மாறும்போது ஒரு sector-ன் story-லிருந்து இன்னொண்ணுக்கு பணம் move ஆகுறதற்கான ஒரு clear, widely observed real example."
    },
    "body": {
      "en": "What a 'Sector' Is A sector groups companies by the type of business they're in — IT, banking, pharmaceuticals, auto, FMCG (consumer goods), energy, and more. Companies in the same sector tend to be affected by similar forces (a rate hike affects most banks; a rupee movement affects most IT exporters similarly).\n\nWhat Sector Rotation Means Sector rotation is the tendency of investor money to shift between sectors as the economic cycle changes — favouring defensive sectors (FMCG, pharma) when growth looks uncertain, and cyclical sectors (banking, auto, industrials) when growth looks strong.",
      "hi": "'Sector' क्या होता है एक sector companies को उनके business के type के अनुसार group करता है — IT, banking, pharmaceuticals, auto, FMCG (consumer goods), energy, और भी बहुत कु छ। एक ही sector की companies समान forces से affected होती हैं (एक rate hike ज़्यादातर banks को affect करता है; एक rupee movement ज़्यादातर IT exporters को एक जैसा affect करता है)।\n\nSector Rotation का मतलब क्या है Sector rotation investor money की उस प्रवृत्ति को कहते हैं जिसमें economic cycle बदलने के साथ वो sectors के बीच shift होता है — growth uncertain दिखने पर defensive sectors (FMCG, pharma) को favour करना, और growth strong दिखने पर cyclical sectors (banking, auto, industrials) को।",
      "ta": "‘Sector’ என்றால் என்ன ஒரு sector, நிறுவனங்கள் இருக்கிற business type-ஐ பொறுத்து group பண்ணும் — IT, banking, pharmaceuticals, auto, FMCG (consumer goods), energy, இன்னும் நிறைய. அதே sector-ல இருக்கிற நிறுவனங்கள் similar forces-ஆல affect ஆக tend ஆகும் (ஒரு rate hike பெரும்பாலான banks-ஐ affect பண்ணும்; ஒரு rupee movement பெரும்பாலான IT exporters-ஐ similarly affect பண்ணும்).\n\nSector Rotation என்றால் என்ன Economic cycle மாறும்போது investor பணம் sectors-க்கு இடையே shift ஆக tend ஆகுறது தான் Sector rotation — growth uncertain-ஆ தெரியும்போது defensive sectors-ஐ (FMCG, pharma) favour பண்ணுது, growth strong-ஆ தெரியும்போது cyclical sectors-ஐ (banking, auto, industrials)."
    },
    "keyTakeaway": {
      "en": "No single sector leads forever — the WFH-to-reopening shift is a clean, recent example of rotation happening in plain sight. Understanding which sectors tend to do well in which economic conditions helps explain returns that have nothing to do with any single company's own mistakes.",
      "hi": "कोई एक sector हमेशा के लिए lead नहीं करता — WFH-to-reopening shift खुले में हो रहे rotation का एक clean, recent example है। किन economic conditions में कौन से sectors अच्छा perform करते हैं ये समझना उन returns को समझाने में मदद करता है जिनका किसी एक कं पनी की अपनी गलतियों से कोई लेना-देना नहीं होता।",
      "ta": "ஒரே ஒரு sector-உம் forever lead பண்ணாது — WFH-லிருந்து reopening-க்கு shift ஆனது, plain sight-ல rotation நடப்பதற்கான ஒரு clean, recent example. எந்த economic conditions-ல எந்த sectors நல்லா செய்யும்னு புரிஞ்சுக்குறது, எந்த single நிறுவனத்தின் சொந்த mistakes-உடனும் relation இல்லாத returns-ஐ explain பண்ண உதவும்."
    },
    "quiz": [
      {
        "question": {
          "en": "What does the term 'sector' refer to in investing?",
          "hi": "Investing में 'sector' term किसे refer करता है?",
          "ta": "Investing-ல ‘sector’ என்ற term எதைக் குறிக்கும்?"
        },
        "options": {
          "en": [
            "A single company's stock price",
            "A group of companies in the same type of business, like IT or banking",
            "A type of stock order",
            "A government tax bracket"
          ],
          "hi": [
            "किसी एक कं पनी का stock price",
            "एक ही तरह के business, जैसे IT या banking, की companies का एक group",
            "एक तरह का stock order",
            "एक government tax bracket"
          ],
          "ta": [
            "ஒரே ஒரு நிறுவனத்தின் stock price",
            "IT அல்லது banking மாதிரி அதே business type-ல இருக்கிற நிறுவனங்களின் ஒரு group",
            "ஒரு வகை stock order",
            "ஒரு government tax bracket"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Sectors group companies facing similar business forces and economic sensitivities.",
          "hi": "Sectors समान business forces और economic sensitivities का सामना करने वाली companies को group करते हैं।",
          "ta": "Similar business forces-ஐயும் economic sensitivities-ஐயும் face பண்ற நிறுவனங்களை sectors group பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What is 'sector rotation'?",
          "hi": "'Sector rotation' क्या है?",
          "ta": "‘Sector rotation’ என்றால் என்ன?"
        },
        "options": {
          "en": [
            "A company changing its business permanently",
            "The tendency of investor money to shift between sectors as economic conditions change",
            "A type of stock split",
            "A rule requiring investors to sell after one year"
          ],
          "hi": [
            "किसी कं पनी का permanently business बदलना",
            "Economic conditions बदलने के साथ investor money की sectors के बीच shift होने की प्रवृत्ति",
            "एक तरह का stock split",
            "एक साल बाद बेचने की ज़ रूरत वाला investors के लिए rule"
          ],
          "ta": [
            "ஒரு நிறுவனம் அதன் business-ஐ நிரந்தரமா மாத்துறது",
            "Economic conditions மாறும்போது investor பணம் sectors-க்கு இடையே shift ஆகும் tendency",
            "ஒரு வகை stock split",
            "ஒரு வருடத்திற்கு பிறகு விக்கணும்னு investors-ஐ require பண்ற ஒரு rule"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Investors reallocate between sectors as growth expectations, interest rates, and the economic cycle shift.",
          "hi": "Investors growth expectations, interest rates, और economic cycle बदलने पर sectors के बीच reallocate करते हैं।",
          "ta": "Growth expectations, interest rates, economic cycle மாறும்போது investors sectors-க்கு இடையே reallocate பண்றாங்க."
        }
      },
      {
        "question": {
          "en": "Why did IT stocks outperform during 2020-21 lockdowns, according to the story?",
          "hi": "Story के अनुसार, 2020-21 के lockdowns के दौरान IT stocks ने बेहतर प्रदर्शन क्यों किया?",
          "ta": "கதையின் படி, 2020-21 lockdowns-ல IT stocks ஏன் outperform பண்ணுச்சு?"
        },
        "options": {
          "en": [
            "Interest rates fell to zero permanently",
            "Global demand for digitisation surged as businesses adapted to remote work",
            "IT companies stopped paying tax",
            "The government banned other sectors"
          ],
          "hi": [
            "Interest rates permanently zero पर गिर गए",
            "Businesses के remote work adapt करने के साथ digitisation की global demand बढ़ी",
            "IT companies ने tax देना बंद कर दिया",
            "Government ने बाकी sectors को ban कर दिया"
          ],
          "ta": [
            "Interest rates நிரந்தரமா zero-க்கு விழுந்துச்சு",
            "Businesses remote work-க்கு adapt ஆனதால் digitisation-க்கான global demand surge ஆச்சு",
            "IT நிறுவனங்கள் tax pay பண்றதை நிறுத்திடுச்சு",
            "அரசு மற்ற sectors-ஐ ban பண்ணுச்சு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The pandemic-driven shift to remote work and digital services directly boosted IT sector demand.",
          "hi": "Pandemic की वजह से remote work और digital services की तरफ हुए shift ने सीधे IT sector की demand को बढ़ाया।",
          "ta": "Pandemic-driven remote work, digital services-க்கு shift ஆனது IT sector demand-ஐ directly boost பண்ணுச்சு."
        }
      },
      {
        "question": {
          "en": "What tends to happen to investor attention as an economy reopens and grows more confidently, based on the lesson?",
          "hi": "लेसन के अनुसार, जैसे-जैसे economy reopen होती है और ज़्यादा confidently grow करती है, investor attention का क्या रुझान होता है?",
          "ta": "Lesson-ன் படி, economy reopen ஆகி more confidently grow ஆகும்போது investor attention-க்கு என்ன ஆக tend ஆகும்?"
        },
        "options": {
          "en": [
            "It stays fixed on the same sector forever",
            "It often rotates toward cyclical sectors like banking and auto tied to everyday economic activity",
            "All sectors perform identically at all times",
            "Investors stop investing entirely"
          ],
          "hi": [
            "वो हमेशा के लिए एक ही sector पर टिका रहता है",
            "वो अक्सर banking और auto जैसे cyclical sectors की तरफ rotate हो जाता है जो everyday economic activity से जुड़े हैं",
            "सभी sectors हर समय बिल्कुल एक जैसा प्रदर्शन करते हैं",
            "Investors ने investing पूरी तरह बंद कर दी"
          ],
          "ta": [
            "அது அதே sector-லேயே forever fix ஆகி இருக்கும்",
            "Everyday economic activity-உடன் tied banking, auto மாதிரி cyclical sectors-க்கு அது பெரும்பாலும் rotate ஆகும்",
            "எல்லா sectors-உம் எல்லா நேரமும் identically perform பண்ணும்",
            "Investors முழுசா invest பண்றதை நிறுத்திடுவாங்க"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "As growth conditions improve, cyclical sectors tend to attract more investor interest.",
          "hi": "जैसे-जैसे growth conditions बेहतर होती हैं, cyclical sectors ज़्यादा investor interest attract करते हैं।",
          "ta": "Growth conditions improve ஆகும்போது, cyclical sectors அதிக investor interest-ஐ attract பண்ண tend ஆகும்."
        }
      },
      {
        "question": {
          "en": "What is the main lesson from the IT-to-banking rotation example?",
          "hi": "IT-to-banking rotation example से मुख्य सीख क्या है?",
          "ta": "IT-லிருந்து banking rotation example-லிருந்து main lesson என்ன?"
        },
        "options": {
          "en": [
            "IT stocks are permanently bad investments",
            "No single sector leads forever — performance often shifts as conditions change",
            "Sector performance is completely random with no pattern",
            "Banking stocks always outperform IT stocks"
          ],
          "hi": [
            "IT stocks permanently बुरे investments हैं",
            "कोई एक sector हमेशा के लिए lead नहीं करता — conditions बदलने पर performance अक्सर shift होती है",
            "Sector performance पूरी तरह random है, इसमें कोई pattern नहीं",
            "Banking stocks हमेशा IT stocks से बेहतर प्रदर्शन करते हैं"
          ],
          "ta": [
            "IT stocks நிரந்தரமா bad investments",
            "ஒரே ஒரு sector-உம் forever lead பண்ணாது — conditions மாறும்போது performance-உம் பெரும்பாலும் shift ஆகும்",
            "Sector performance எந்த pattern-உம் இல்லாம completely random",
            "Banking stocks எப்போதும் IT stocks-ஐ outperform பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This real rotation shows how sector leadership can shift with changing economic conditions, not company-specific failure. 29. Inflation & Interest Rates vs Markets",
          "hi": "ये real rotation दिखाता है कि sector leadership बदलती economic conditions के साथ कै से shift हो सकती है, किसी company- specific failure से नहीं।",
          "ta": "Company-specific failure இல்ல, changing economic conditions-உடன் sector leadership எப்படி shift ஆகும்னு இந்த real rotation காட்டுது."
        }
      }
    ]
  },
  {
    "id": 29,
    "tier": "Intermediate",
    "title": {
      "en": "Inflation & Interest Rates vs Markets",
      "hi": "Inflation और Interest Rates vs Markets",
      "ta": "Inflation & Interest Rates vs Markets"
    },
    "opener": {
      "en": "The news kept repeating “RBI hikes rates” through 2022, and Meera watched her portfolio dip every time it happened — even on stocks with genuinely good results that quarter. “Why does an interest rate announcement move my stocks at all?” she asked.",
      "hi": "2022 में news बार-बार “RBI hikes rates” repeat करती रही, और मीरा ने देखा कि जब भी ये होता, उसका portfolio dip करता — यहाँ तक कि उन stocks पर भी जिनके genuinely अच्छे results उस quarter में थे। “एक interest rate announcement मेरे stocks को असल में move क्यों करता है?” उसने पूछा।",
      "ta": "2022 முழுக்க news-ல “RBI hikes rates”-ன்னு திரும்ப திரும்ப வந்துச்சு, ஒவ்வொரு தடவை அது நடக்கும்போதும் மீரா தன் portfolio dip ஆகுறதை பார்த்தாள் — அந்த quarter-ல genuinely நல்ல results இருந்த stocks-லகூட. “ஒரு interest rate announcement, என் stocks-ஐ ஏன்மொத்தமா move பண்ணும்?” என்று கேட்டாள்."
    },
    "realStorySubtitle": {
      "en": "2022: When Rate Hikes Rattled Markets Worldwide",
      "hi": "2022: जब Rate Hikes ने पूरी दुनिया के Markets को हिला दिया",
      "ta": "2022: Rate Hikes உலகம் முழுக்க Markets-ஐ Rattle பண்ணின நேரம்"
    },
    "realStoryBody": {
      "en": "Following a sharp rise in global inflation in 2022 — worsened by the Russia-Ukraine war's effect on energy and food prices — the RBI and central banks around the world raised interest rates repeatedly and aggressively through the year to try to bring inflation under control.\n\nStock markets, including Indian indices, saw significant volatility through this period, as higher rates made borrowing more expensive for companies and made safer fixed-income options relatively more attractive compared to stocks — a textbook real-world case of the inflation-rates-markets relationship playing out together.",
      "hi": "2022 में global inflation में तेज़ वृद्धि के बाद — जिसे Russia-Ukraine war के energy और food prices पर असर से और बिगाड़ दिया गया — RBI और दुनियाभर के central banks ने साल भर बार-बार और aggressively interest rates बढ़ाईं ताकि inflation को control में लाया जा सके।\n\nStock markets, Indian indices समेत, इस दौरान काफी volatility से गुज़ रे, क्योंकि higher rates से companies के लिए borrowing महंगा हो गया और safer fixed-income options, stocks के मुकाबले relatively ज़्यादा attractive हो गए — inflation-rates-markets relationship का साथ में सामने आने का एक textbook real-world case।",
      "ta": "2022-ல global inflation-ல ஒரு sharp rise-ஐ followed பண்ணி — Russia-Ukraine war energy, food prices-ல ஏற்படுத்தின effect-ஆல worsen ஆச்சு — RBI-உம் உலகம் முழுக்க இருக்கிற central banks- உம், inflation-ஐ control-க்குள் கொண்டு வர அந்த வருடம் முழுக்க திரும்ப திரும்ப, aggressive-ஆ interest rates-ஐ raise பண்ணாங்க.\n\nIndian indices உட்பட, stock markets இந்தக் காலகட்டத்தில் significant volatility-ஐ பார்த்தாங்க, higher rates நிறுவனங்களுக்கு borrowing-ஐ expensive ஆக்கிச்சு, stocks-உடன் compare பண்ணும்போது safer fixed-income options relatively attractive ஆக்கிச்சு — inflation-rates-markets relationship சேர்ந்து play ஆகுற ஒரு textbook real-world case."
    },
    "body": {
      "en": "How Inflation Affects Markets Rising inflation (general price increases) can squeeze company profit margins if they can't fully pass higher costs on to customers, and erodes the real value of future profits — both tend to weigh on stock valuations.\n\nHow Interest Rates Affect Markets • Higher rates increase companies' borrowing costs, can slow economic growth, and make bonds/FDs relatively more attractive versus stocks. • Lower rates generally do the opposite — cheaper borrowing and less attractive fixed-income alternatives tend to support stock prices.\n\nThe RBI's Role The Reserve Bank of India (RBI) sets India's key policy interest rate primarily to manage inflation, not to manage stock prices directly — but because of the relationships above, its decisions ripple through the stock market regardless.",
      "hi": "Inflation Markets को कै से Affect करता है बढ़ ती inflation (general price increases) company profit margins को squeeze कर सकती है अगर वो higher costs पूरी तरह customers पर pass नहीं कर पातीं, और future profits की real value को erode कर देती है — दोनों stock valuations पर weigh करते हैं।\n\nInterest Rates Markets को कै से Affect करते हैं • Higher rates companies की borrowing costs बढ़ा देते हैं, economic growth को धीमा कर सकते हैं, और stocks के मुकाबले bonds/FDs को relatively ज़्यादा attractive बना देते हैं।\n\n• Lower rates आमतौर पर इसका उल्टा करते हैं — सस्ती borrowing और कम attractive fixed-income alternatives stock prices को support करते हैं।\n\nRBI का Role Reserve Bank of India (RBI) India का key policy interest rate मुख्य रूप से inflation manage करने के लिए set करता है, सीधे stock prices manage करने के लिए नहीं — लेकिन ऊपर बताए गए relationships की वजह से, इसके decisions फिर भी stock market में ripple करते हैं।",
      "ta": "Inflation Markets-ஐ எப்படி Affect பண்ணும் அதிகரிக்கிற costs-ஐ முழுசா customers-க்கு pass பண்ண முடியலைனா, rising inflation (general price increases) நிறுவனத்தின் profit margins-ஐ squeeze பண்ணும், future profits-ன் real value-ஐயும் erode பண்ணும் — இரண்டும் stock valuations-ஐ weigh பண்ண tend ஆகும்.\n\nInterest Rates Markets-ஐ எப்படி Affect பண்ணும் • Higher rates நிறுவனங்களின் borrowing costs-ஐ அதிகரிக்கும், economic growth-ஐ slow பண்ணலாம், stocks-உடன் compare பண்ணும்போது bonds/FDs-ஐ relatively attractive ஆக்கும்.\n\n• Lower rates generally opposite-ஐ பண்ணும் — cheaper borrowing-உம் குறைவா attractive fixed- income alternatives-உம் stock prices-ஐ support பண்ண tend ஆகும்.\n\nRBI-ன் Role Reserve Bank of India (RBI), inflation-ஐ manage பண்ணவே primarily India-ன் key policy interest rate-ஐ set பண்ணும், stock prices-ஐ directly manage பண்ண இல்ல — ஆனா மேலே இருக்கிற relationships-ஆல, அதன் decisions எப்படியும் stock market முழுக்க ripple ஆகும்."
    },
    "keyTakeaway": {
      "en": "Interest rate and inflation news can move markets even when nothing about any specific company has changed. 2022's global rate-hike cycle is a clean, recent, real example of this economy-wide force overriding individual stock stories for a while.",
      "hi": "Interest rate और inflation की news markets को हिला सकती है, तब भी जब किसी specific कं पनी के बारे में कुछ भी नहीं बदला हो। 2022 का global rate-hike cycle इस बात का एक clean, recent, real example है कि कै से ये economy-wide force कुछ समय के लिए individual stock stories पर हावी हो जाती है।",
      "ta": "எந்த specific நிறுவனத்திலும் ஒன்றும் மாறாம இருந்தாலும் கூட interest rate, inflation news markets-ஐ move பண்ணலாம். 2022-ன் global rate-hike cycle, இந்த economy-wide force individual stock stories-ஐ சில நேரம் override பண்றதற்கான ஒரு clean, recent, real example."
    },
    "quiz": [
      {
        "question": {
          "en": "What is the primary reason the RBI raises interest rates?",
          "hi": "RBI interest rates बढ़ाने की मुख्य वजह क्या है?",
          "ta": "RBI interest rates-ஐ raise பண்றதற்கான primary reason என்ன?"
        },
        "options": {
          "en": [
            "To directly control stock prices",
            "To manage inflation",
            "To reward IPO investors",
            "To set trading hours"
          ],
          "hi": [
            "सीधे stock prices को control करना",
            "Inflation manage करना",
            "IPO investors को reward देना",
            "Trading hours set करना"
          ],
          "ta": [
            "Stock prices-ஐ directly control பண்ண",
            "Inflation-ஐ manage பண்ண",
            "IPO investors-க்கு reward கொடுக்க",
            "Trading hours-ஐ set பண்ண"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The RBI's key policy rate decisions primarily target inflation, though they have ripple effects on markets too.",
          "hi": "RBI के key policy rate decisions मुख्य रूप से inflation को target करते हैं, भले ही उनके markets पर भी ripple effects हों।",
          "ta": "RBI-ன் key policy rate decisions primarily inflation-ஐ target பண்ணும், markets-ல ripple effects இருந்தாலும் கூட."
        }
      },
      {
        "question": {
          "en": "How do higher interest rates generally affect stock markets?",
          "hi": "Higher interest rates आमतौर पर stock markets को कै से affect करते हैं?",
          "ta": "Higher interest rates generally stock markets-ஐ எப்படி affect பண்ணும்?"
        },
        "options": {
          "en": [
            "They have no effect on stocks",
            "They tend to weigh on stocks by raising borrowing costs and making bonds/FDs relatively more attractive",
            "They always immediately raise stock prices",
            "They only affect foreign markets"
          ],
          "hi": [
            "उनका stocks पर कोई असर नहीं पड़ ता",
            "वो borrowing costs बढ़ाकर और bonds/FDs को relatively ज़्यादा attractive बनाकर stocks पर weigh करते हैं",
            "वो हमेशा तुरंत stock prices बढ़ा देते हैं",
            "वो सिर्फ foreign markets को affect करते हैं"
          ],
          "ta": [
            "அவற்றுக்கு stocks-ல எந்த effect-உம் இல்ல",
            "Borrowing costs-ஐ raise பண்ணி, bonds/FDs-ஐ relatively attractive ஆக்கி stocks-ஐ weigh பண்ண tend ஆகும்",
            "அவை எப்போதும் உடனடியா stock prices-ஐ ஏத்தும்",
            "அவை foreign markets-ஐ மட்டும் தான் affect பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Higher rates increase costs for companies and make safer fixed-income alternatives more appealing versus stocks.",
          "hi": "Higher rates companies के लिए costs बढ़ाते हैं और safer fixed-income alternatives को stocks के मुकाबले ज़्यादा appealing बनाते हैं।",
          "ta": "Higher rates நிறுவனங்களுக்கு costs-ஐ அதிகரிக்கும், stocks-உடன் compare பண்ணும்போது safer fixed-income alternatives-ஐ அதிக appealing ஆக்கும்."
        }
      },
      {
        "question": {
          "en": "What global event worsened inflation in 2022, according to the lesson?",
          "hi": "Lesson के अनुसार, 2022 में किस global event ने inflation को और बिगाड़ा?",
          "ta": "Lesson-ன் படி, 2022-ல inflation-ஐ எந்த global event worsen பண்ணுச்சு?"
        },
        "options": {
          "en": [
            "A stock market holiday",
            "The Russia-Ukraine war's effect on energy and food prices",
            "A new Indian IPO",
            "A change in SEBI regulations"
          ],
          "hi": [
            "एक stock market holiday",
            "Russia-Ukraine war का energy और food prices पर असर",
            "एक नया Indian IPO",
            "SEBI regulations में एक बदलाव"
          ],
          "ta": [
            "ஒரு stock market holiday",
            "Russia-Ukraine war, energy, food prices-ல ஏற்படுத்தின effect",
            "ஒரு புது Indian IPO",
            "SEBI regulations-ல ஒரு மாற்றம்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The war significantly disrupted global energy and food supplies, worsening inflation worldwide, including in India.",
          "hi": "उस war ने global energy और food supplies को काफी हद तक disrupt किया, जिससे India समेत पूरी दुनिया में inflation और बिगड़ी।",
          "ta": "War global energy, food supplies-ஐ significantly disrupt பண்ணுச்சு, இந்தியா உட்பட உலகம் முழுக்க inflation-ஐ worsen பண்ணுச்சு."
        }
      },
      {
        "question": {
          "en": "How can rising inflation directly hurt company profits?",
          "hi": "बढ़ ती inflation सीधे company profits को कै से नुकसान पहुँचा सकती है?",
          "ta": "Rising inflation நிறுவன profits-ஐ directly எப்படி hurt பண்ணலாம்?"
        },
        "options": {
          "en": [
            "It never affects profits",
            "It can squeeze margins if companies can't fully pass higher costs on to customers",
            "It only affects government companies",
            "Inflation always increases profits"
          ],
          "hi": [
            "ये profits को कभी affect नहीं करती",
            "अगर companies higher costs पूरी तरह customers पर pass नहीं कर पातीं तो ये margins को squeeze कर सकती है",
            "ये सिर्फ government companies को affect करती है",
            "Inflation हमेशा profits बढ़ाती है"
          ],
          "ta": [
            "அது profits-ஐ ஒருபோதும் affect பண்ணாது",
            "அதிகரிக்கிற costs-ஐ முழுசா customers-க்கு pass பண்ண முடியலைனா margins-ஐ squeeze பண்ணலாம்",
            "அது government நிறுவனங்களை மட்டும் தான் affect பண்ணும்",
            "Inflation எப்போதும் profits-ஐ அதிகரிக்கும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Rising costs that can't be passed on directly reduce a company's profit margins.",
          "hi": "Costs बढ़ ने पर जिन्हें pass on नहीं किया जा सकता, वो सीधे कं पनी के profit margins को कम कर देते हैं।",
          "ta": "Pass பண்ண முடியாத rising costs நேரடியா நிறுவனத்தின் profit margins-ஐ குறைக்கும்."
        }
      },
      {
        "question": {
          "en": "What does the 2022 rate-hike example mainly illustrate?",
          "hi": "2022 के rate-hike example से मुख्य रूप से क्या पता चलता है?",
          "ta": "2022 rate-hike example முக்கியமா என்ன illustrate பண்ணுது?"
        },
        "options": {
          "en": [
            "Individual company news is the only thing that ever moves markets",
            "Economy-wide forces like interest rates can move markets broadly, regardless of individual company performance",
            "Interest rates have no connection to stock markets",
            "The RBI directly sets stock prices"
          ],
          "hi": [
            "सिर्फ individual company news ही हमेशा markets को move करती है",
            "Interest rates जैसी economy-wide forces individual company performance की परवाह किए बिना markets को व्यापक रूप से move कर सकती हैं",
            "Interest rates का stock markets से कोई connection नहीं है",
            "RBI सीधे stock prices set करता है"
          ],
          "ta": [
            "Markets-ஐ move பண்ண individual company news மட்டும் தான் இருக்கிற ஒரே விஷயம்",
            "Interest rates மாதிரி economy-wide forces, individual company performance-ஐ பொறுத்தில்லாம markets- ஐ broadly move பண்ணலாம்",
            "Interest rates-க்கு stock markets-உடன் எந்த connection-உம் இல்ல",
            "RBI directly stock prices-ஐ set பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Even companies with good results saw stock declines during this period, showing the power of macro forces. 30. Diversification: Beyond One Basket",
          "hi": "इस दौर में अच्छे results वाली companies के stocks में भी गिरावट देखी गई, जो macro forces की ताकत दिखाता है।",
          "ta": "Good results பார்த்த நிறுவனங்கள் கூட இந்தக் காலகட்டத்தில் stock declines-ஐ பார்த்தாங்க, macro forces-ன் power-ஐ காட்டுது."
        }
      }
    ]
  },
  {
    "id": 30,
    "tier": "Intermediate",
    "title": {
      "en": "Diversification: Beyond One Basket",
      "hi": "Diversification: एक Basket से आगे",
      "ta": "Diversification: ஒரு Basket-ஐ தாண்டி"
    },
    "opener": {
      "en": "Meera remembered Kingfisher Airlines from Lesson 13 and had since spread her money across ten different stocks, feeling proud of her diversification. Paati looked at the list and pointed out that all ten were, in some way, tied to the Indian banking and finance sector.\n\n“That's not really diversification, kanna. That's ten baskets sitting on the same shaky table.”",
      "hi": "मीरा को Lesson 13 का Kingfisher Airlines याद था और तब से उसने अपना पैसा दस अलग-अलग stocks में फै ला दिया था, अपनी diversification पर गर्व महसूस करते हुए। पाटी ने list देखी और बताया कि सारी दस, किसी ना किसी तरह, Indian banking और finance sector से जुड़ी हुई थीं।\n\n“ये असल में diversification नहीं है, कन्ना। ये एक ही डगमगाती table पर बैठी दस baskets हैं।”",
      "ta": "மீரா Lesson 13-லிருந்து Kingfisher Airlines-ஐ நினைவு வச்சிருந்தாள், அதிலிருந்து தன் பணத்தை பத்து வெவ்வேறு stocks-க்கு spread பண்ணி, தன் diversification-ஐ பத்தி proud-ஆ feel பண்ணினாள். பாட்டி அந்த list-ஐ பார்த்து, பத்துமே, ஏதோ ஒரு வழியில், Indian banking, finance sector-உடன் tied-ஆ இருக்கிறதை point பண்ணினார்.\n\n“அது real-ஆ diversification இல்ல கண்ணா. அது அதே அசைஞ்சு கொண்டிருக்கிற table-ல இருக்கிற பத்து baskets.”"
    },
    "realStorySubtitle": {
      "en": "2008: When 'Different' Investments Weren't Different Enough",
      "hi": "2008: जब 'अलग-अलग' Investments इतनी अलग नहीं थीं",
      "ta": "2008: ‘Different’ Investments Different போதுமா இல்லாத நேரம்"
    },
    "realStoryBody": {
      "en": "During the 2008 Global Financial Crisis, investors who believed they were diversified — holding many different stocks across many countries — often discovered that nearly everything fell together, because the crisis originated in the global financial and banking system that touched almost every sector and market at once.\n\nInvestors who also held genuinely different asset types — government bonds, gold, and cash — alongside stocks generally weathered that period far better than those diversified only within stocks. It remains one of the strongest real-world lessons in what true diversification actually requires.",
      "hi": "2008 के Global Financial Crisis के दौरान, जिन investors को लगता था कि वो diversified हैं — कई देशों में कई अलग- अलग stocks रखते हुए — उन्हें अक्सर पता चला कि लगभग सब कुछ एक साथ गिरा, क्योंकि ये crisis global financial और banking system से शुरू हुई थी जिसने लगभग हर sector और market को एक साथ छु आ।\n\nजिन investors के पास stocks के साथ-साथ genuinely अलग asset types भी थे — government bonds, gold, और cash — वो आमतौर पर उन investors से कहीं बेहतर तरीके से उस दौर से गुज़ रे जो सिर्फ stocks के अंदर ही diversified थे। ये असली diversification को असल में क्या चाहिए, इसका आज भी सबसे मज़ बूत real-world lessons में से एक बना हुआ है।",
      "ta": "2008 Global Financial Crisis-ன் போது, தாங்க diversified-ஆ இருக்குனு நம்பின investors — நிறைய நாடுகளில் நிறைய வெவ்வேறு stocks வச்சிருந்தவங்க — கிட்டத்தட்ட எல்லாமே சேர்ந்தே விழுறதை பெரும்பாலும் கண்டுபிடிச்சாங்க, ஏன்னா crisis global financial, banking system-லிருந்து origin ஆனது, அது ஒரே நேரத்தில் கிட்டத்தட்ட ஒவ்வொரு sector-ஐயும் market-ஐயும் touch பண்ணுச்சு. Stocks-உடன் சேர்த்து genuinely வெவ்வேறு asset types-ஐயும் — government bonds, gold, cash — வச்சிருந்த investors, stocks-க்குள் மட்டும் diversify பண்ணினவங்களை விட generally அந்த காலகட்டத்தை ரொம்ப நல்லா weather பண்ணாங்க. True diversification உண்மையில் என்ன தேவைப்படுதுனு காட்ட இது இன்னும் மிக strong-ஆன real-world lessons-ல ஒண்ணா இருக்கு."
    },
    "body": {
      "en": "Diversifying Within Stocks • Across different sectors (not just different company names in the same sector). • Across different market-cap sizes (large, mid, small). • Sometimes across different geographies, if that option is available to you.\n\nDiversifying Beyond Stocks True diversification often includes other asset classes entirely — bonds/fixed deposits, gold, and cash — which don't always move in the same direction as stocks, especially during a systemic shock like 2008 that hits the whole stock market at once.\n\nTen stocks in one sector still means one risk. Spreading across sectors and asset types spreads the risk too.",
      "hi": "Stocks के अंदर Diversify करना • अलग-अलग sectors में (सिर्फ same sector में अलग-अलग company names नहीं)।\n\n• अलग-अलग market-cap sizes में (large, mid, small)।\n\n• कभी-कभी अलग-अलग geographies में, अगर वो option आपके लिए उपलब्ध हो।\n\nStocks से आगे Diversify करना असली diversification में अक्सर पूरी तरह अलग asset classes भी शामिल होती हैं — bonds/fixed deposits, gold, और cash — जो हमेशा stocks की same direction में move नहीं होतीं, खासकर 2008 जैसे किसी systemic shock के दौरान जो पूरे stock market को एक साथ hit करता है।\n\nएक ही sector में दस stocks रखने पर भी, वो अभी भी एक ही risk है। Sectors और asset types में फै लाना risk को भी फै ला देता है।",
      "ta": "Stocks-க்குள்ளேயே Diversify பண்றது • வெவ்வேறு sectors-க்கு இடையே (அதே sector-ல வெவ்வேறு company names மட்டும் இல்லாம). • வெவ்வேறு market-cap sizes-க்கு இடையே (large, mid, small).\n\n• அந்த option உங்களுக்கு available-ஆ இருந்தா, சில நேரம் வெவ்வேறு geographies-க்கு இடையே.\n\nStocks-ஐ தாண்டி Diversify பண்றது True diversification-ல பெரும்பாலும் முற்றிலும் வேற asset classes-உம் include ஆகும் — bonds/fixed deposits, gold, cash — ஒரே திசையில் stocks அளவே move ஆகாதவை, குறிப்பா 2008 மாதிரி முழு stock market-ஐயும் ஒரே நேரத்தில் அடிக்கிற ஒரு systemic shock-ன் போது.\n\nஒரே sector-ல பத்து stocks வச்சிருந்தாலும், அது இன்னும் ஒரே risk தான். Sectors, asset types முழுக்க spread பண்றது risk-ஐயும் spread பண்ணும்."
    },
    "keyTakeaway": {
      "en": "Owning many stocks isn't automatically diversification if they're all exposed to the same",
      "hi": "कई stocks own करना automatically diversification नहीं है अगर वो सब same underlying risk के exposed हों। 2008 के crisis ने दिखाया कि real protection के लिए अक्सर genuinely अलग asset classes में फै लना चाहिए, ना कि सिर्फ अलग company names में।",
      "ta": "நிறைய stocks வச்சிருப்பது, அவை எல்லாம் அதே underlying risk-க்கு exposed-ஆ இருந்தா automatic-ஆ diversification ஆகாது. வெவ்வேறு company names மட்டும் இல்லாம, genuinely வேற asset classes-க்கு இடையே spread பண்ணுறது தான் பெரும்பாலும் real protection- க்கு தேவைன்னு 2008 crisis காட்டுச்சு."
    },
    "quiz": [
      {
        "question": {
          "en": "Why wasn't Meera's portfolio of ten stocks truly diversified, according to the lesson?",
          "hi": "Lesson के अनुसार, मीरा के दस stocks का portfolio truly diversified क्यों नहीं था?",
          "ta": "Lesson-ன் படி, மீராவின் பத்து stocks portfolio ஏன் truly diversified இல்ல?"
        },
        "options": {
          "en": [
            "She owned too few stocks",
            "All ten stocks were tied to the same underlying sector (banking and finance)",
            "She only owned large-cap stocks",
            "Ten stocks is always too many"
          ],
          "hi": [
            "उसके पास बहुत कम stocks थे",
            "सारी दस stocks एक ही underlying sector (banking और finance) से जुड़ी थीं",
            "उसके पास सिर्फ large-cap stocks थे",
            "दस stocks हमेशा बहुत ज़्यादा होते हैं"
          ],
          "ta": [
            "அவள் ரொம்ப குறைவான stocks வச்சிருந்தாள்",
            "பத்து stocks-உமே அதே underlying sector-உடன் (banking, finance) tied-ஆ இருந்தது",
            "அவள் large-cap stocks மட்டும் தான் வச்சிருந்தாள்",
            "பத்து stocks எப்போதும் ரொம்ப அதிகம்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "True diversification requires spreading across genuinely different exposures, not just different company names in the same sector.",
          "hi": "असली diversification के लिए genuinely अलग exposures में फै लना ज़ रूरी है, ना कि सिर्फ same sector में अलग company names में।",
          "ta": "அதே sector-ல வெவ்வேறு company names மட்டும் இல்லாம, genuinely வேற exposures-க்கு இடையே spread பண்றது தான் true diversification-க்கு தேவை."
        }
      },
      {
        "question": {
          "en": "What happened to many 'diversified' stock portfolios during the 2008 Global Financial Crisis?",
          "hi": "2008 के Global Financial Crisis के दौरान कई 'diversified' stock portfolios का क्या हुआ?",
          "ta": "2008 Global Financial Crisis-ன் போது நிறைய ‘diversified’ stock portfolios-க்கு என்ன ஆச்சு?"
        },
        "options": {
          "en": [
            "They were completely unaffected",
            "Nearly everything fell together, since the crisis hit the global financial system broadly",
            "Only Indian stocks fell",
            "All portfolios gained value"
          ],
          "hi": [
            "वो पूरी तरह unaffected रहे",
            "लगभग सब कुछ एक साथ गिर गया, क्योंकि crisis ने global financial system को व्यापक रूप से hit किया",
            "सिर्फ Indian stocks गिरे",
            "सारे portfolios की value बढ़ी"
          ],
          "ta": [
            "அவை முழுசா unaffected-ஆ இருந்துச்சு",
            "கிட்டத்தட்ட எல்லாமே சேர்ந்தே விழுந்துச்சு, crisis global financial system-ஐ broadly அடிச்சதால்",
            "Indian stocks மட்டும் தான் விழுந்துச்சு",
            "எல்லா portfolios-உம் value gain பண்ணுச்சு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A systemic shock like 2008 affected almost every sector and market simultaneously, exposing shallow diversification.",
          "hi": "2008 जैसे systemic shock ने लगभग हर sector और market को एक साथ affect किया, जिससे shallow diversification उजागर हो गई।",
          "ta": "2008 மாதிரி ஒரு systemic shock, கிட்டத்தட்ட ஒவ்வொரு sector-ஐயும் market-ஐயும் ஒரே நேரத்தில் affect பண்ணுச்சு, shallow diversification-ஐ expose பண்ணுச்சு."
        }
      },
      {
        "question": {
          "en": "According to the lesson, what helped investors weather the 2008 crisis better?",
          "hi": "Lesson के अनुसार, 2008 के crisis को बेहतर तरीके से झेलने में investors की क्या मदद हुई?",
          "ta": "Lesson-ன் படி, 2008 crisis-ஐ investors better-ஆ weather பண்ண எது உதவுச்சு?"
        },
        "options": {
          "en": [
            "Holding only one large stock",
            "Also holding other asset classes like bonds, gold, and cash alongside stocks",
            "Avoiding all forms of investment",
            "Only investing in IT stocks"
          ],
          "hi": [
            "सिर्फ एक बड़ा stock रखना",
            "Stocks के साथ-साथ bonds, gold, और cash जैसी दूसरी asset classes भी रखना",
            "हर तरह के investment से बचना",
            "सिर्फ IT stocks में invest करना"
          ],
          "ta": [
            "ஒரே ஒரு பெரிய stock வைத்திருந்தது",
            "Stocks-உடன் சேர்த்து bonds, gold, cash மாதிரி மற்ற asset classes-ஐயும் வைத்திருந்தது",
            "எல்லா வகை investment-ஐயும் avoid பண்ணுறது",
            "IT stocks-ல மட்டும் invest பண்றது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "These other asset classes don't always move in the same direction as stocks during a systemic shock.",
          "hi": "ये दूसरी asset classes किसी systemic shock के दौरान हमेशा stocks की same direction में move नहीं होतीं।",
          "ta": "ஒரு systemic shock-ன் போது, இந்த மற்ற asset classes stocks அளவே ஒரே திசையில் எப்போதும் move ஆகாது."
        }
      },
      {
        "question": {
          "en": "Which of these is an example of diversifying 'within stocks'?",
          "hi": "इनमें से कौन सा 'stocks के अंदर' diversify करने का एक example है?",
          "ta": "‘Stocks-க்குள்ளேயே’ diversify பண்றதற்கு இது ஒரு example எது?"
        },
        "options": {
          "en": [
            "Buying gold instead of stocks",
            "Spreading investments across different sectors and market-cap sizes",
            "Keeping all money in a savings account",
            "Buying only government bonds"
          ],
          "hi": [
            "Stocks की बजाय gold खरीदना",
            "अलग-अलग sectors और market-cap sizes में investments फै लाना",
            "सारा पैसा एक savings account में रखना",
            "सिर्फ government bonds खरीदना"
          ],
          "ta": [
            "Stocks-க்கு பதிலா gold வாங்குறது",
            "வெவ்வேறு sectors-க்கும் market-cap sizes-க்கும் investments-ஐ spread பண்றது",
            "எல்லா பணத்தையும் ஒரு savings account-ல வைக்குறது",
            "Government bonds மட்டும் தான் வாங்குறது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This is diversification within the stock asset class itself, as opposed to diversifying across asset classes.",
          "hi": "ये asset classes के बीच diversify करने के उलट, खुद stock asset class के अंदर diversification है।",
          "ta": "Asset classes-க்கு இடையே diversify பண்றதுக்கு பதிலா, stock asset class-க்குள்ளேயே இருக்கிற diversification இது."
        }
      },
      {
        "question": {
          "en": "What is the key takeaway about diversification from this lesson?",
          "hi": "इस lesson से diversification के बारे में मुख्य सीख क्या है?",
          "ta": "இந்த lesson-லிருந்து diversification-ஐ பத்தின key takeaway என்ன?"
        },
        "options": {
          "en": [
            "Owning many stocks is always sufficient diversification",
            "Real diversification requires spreading across genuinely different exposures and asset classes, not just company names",
            "Diversification guarantees no losses ever",
            "Only large-cap investors need to diversify"
          ],
          "hi": [
            "कई stocks own करना हमेशा पर्याप्त diversification होता है",
            "असली diversification के लिए genuinely अलग exposures और asset classes में फै लना ज़ रूरी है, ना कि सिर्फ company names में",
            "Diversification हमेशा कोई नुकसान ना होने की guarantee देती है",
            "सिर्फ large-cap investors को diversify करने की ज़ रूरत है"
          ],
          "ta": [
            "நிறைய stocks வைத்திருப்பது எப்போதும் sufficient diversification",
            "Real diversification-க்கு company names மட்டும் இல்லாம, genuinely வேற exposures-க்கும் asset classes- க்கும் இடையே spread பண்றது தேவை",
            "Diversification எந்த losses-ஐயும் ஒருபோதும் guarantee பண்ணும்",
            "Large-cap investors மட்டும் தான் diversify பண்ண வேண்டும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The 2008 crisis proved that shallow diversification within one asset class can fail when systemic risk hits everything at once. 31. Building a Simple Portfolio Structure",
          "hi": "2008 के crisis ने साबित किया कि एक asset class के अंदर shallow diversification तब fail हो सकती है जब systemic risk सब कुछ एक साथ hit करता है।",
          "ta": "ஒரே asset class-க்குள் இருக்கிற shallow diversification, systemic risk எல்லாத்தையும் ஒரே நேரத்தில் அடிக்கும்போது fail ஆகலாம்னு 2008 crisis prove பண்ணுச்சு."
        }
      }
    ]
  },
  {
    "id": 31,
    "tier": "Intermediate",
    "title": {
      "en": "Building a Simple Portfolio Structure",
      "hi": "एक Simple Portfolio Structure बनाना",
      "ta": "ஒரு Simple Portfolio Structure கட்டுறது"
    },
    "opener": {
      "en": "Armed with everything so far, Meera sat down to actually restructure her holdings properly for the first time — not stock by stock, but as one deliberate whole. “Where do I even begin,” she asked, “now that I finally understand all the pieces?”\n\n“You begin with your goals and your time horizon, not with a stock tip,” Paati said. “The structure comes first. The individual picks come after.”\n\nStep 1 — Start With Your Goals and Time Horizon Money needed in 2 years (a wedding, a down payment) belongs mostly in safer instruments; money you won't touch for 15+ years (retirement) can reasonably carry more equity risk, since there's time to ride out downturns.\n\nStep 2 — Decide a Broad Asset Split A common simple starting framework is splitting money across equity (stocks/equity mutual funds), debt (bonds/fixed deposits), and a small allocation to gold or cash for stability — the exact mix depends entirely on your own goals and risk comfort from Lesson 13.\n\nStep 3 — Diversify Within Each Bucket Within your equity allocation, spread across sectors and market caps (Lessons 8 and 28-30). Within debt, consider varying maturities and issuers. No single stock or fund should be large enough that its failure alone derails your plan.\n\nStep 4 — Review, Don't Constantly Tinker A sensible portfolio structure is reviewed periodically (say, every 6-12 months) to rebalance back to your target mix — not adjusted daily based on headlines or short-term price swings.\n\nKey takeaway: A portfolio is a structure built around your own goals and time horizon first — individual stock selection is just one layer inside that larger structure, not a replacement for it.\n\nQUICK QUIZ · TEST YOURSELF (5 QUESTIONS)\n\n1. What should determine a portfolio's structure, according to the lesson, before picking individual stocks? A) The most popular stock tip that week B) Your own goals and time horizon C) The stock with the lowest price D) Random selection Correct: B) Your own goals and time horizon Why: Portfolio structure should be built around when you'll need the money and what you're investing for.\n\n2. Why might money needed in 2 years belong mostly in safer instruments? A) Safer instruments always earn more B) There's less time to recover from a downturn before the money is needed C) Equity is illegal for short-term goals D) It doesn't matter how soon you need the money Correct: B) There's less time to recover from a downturn before the money is needed Why: A short time horizon leaves little room to ride out a temporary equity downturn.\n\n3. What is a common simple starting framework for asset allocation, per the lesson? A) 100% in one single stock B) Splitting across equity, debt, and a small gold/cash allocation C) Only gold, nothing else D) Only cryptocurrency Correct: B) Splitting across equity, debt, and a small gold/cash allocation Why: This broad-based split, tailored to individual risk comfort, is a common practical starting point.\n\n4. How often does the lesson suggest reviewing and rebalancing a portfolio? A) Every single day B) Periodically, such as every 6-12 months C) Only once, at the very start D) Never review it at all Correct: B) Periodically, such as every 6-12 months Why: Periodic review avoids both neglect and the pitfalls of reacting to every daily headline.\n\n5. What is the main point of 'Step 3 — Diversify Within Each Bucket'? A) Put all equity money into one single stock B) No single stock or fund should be large enough that its failure alone derails your plan C) Only diversify the debt portion D) Diversification within a bucket is unnecessary Correct: B) No single stock or fund should be large enough that its failure alone derails your plan Why: Even within an asset class, spreading risk protects against any single holding's failure.\n\n32. Dividends: How Companies Share Profits",
      "hi": "अब तक सीखी हर चीज़ के साथ, मीरा पहली बार अपने holdings को सही तरीके से restructure करने बैठी — stock by stock नहीं, बल्कि एक deliberate whole के तौर पर। “मैं कहाँ से शुरू करूँ,” उसने पूछा, “अब जब मुझे आखिरकार सारे pieces समझ आ गए हैं?”\n\n“तुम अपने goals और time horizon से शुरू करती हो, किसी stock tip से नहीं,” पाटी ने कहा। “structure पहले आता है। individual picks बाद में आते हैं।”\n\nStep 1 — अपने Goals और Time Horizon से शुरू करें 2 साल में चाहिए पैसा (एक शादी, एक down payment) ज़्यादातर safer instruments में होना चाहिए; जिस पैसे को आप 15+ साल तक नहीं छु एंगी (retirement) वो reasonably ज़्यादा equity risk उठा सकता है, क्योंकि downturns से उबरने के लिए समय होता है।\n\nStep 2 — एक Broad Asset Split Decide करें एक common simple starting framework पैसे को equity (stocks/equity mutual funds), debt (bonds/fixed deposits), और stability के लिए gold या cash की एक छोटी allocation में split करना है — exact mix पूरी तरह Lesson 13 से आपके अपने goals और risk comfort पर depend करता है।\n\nStep 3 — हर Bucket के अंदर Diversify करें अपनी equity allocation के अंदर, sectors और market caps में फै लाएं (Lessons 8 और 28-30)। Debt के अंदर, अलग-अलग maturities और issuers पर विचार करें। कोई भी एक stock या fund इतना बड़ा नहीं होना चाहिए कि सिर्फ उसका fail होना आपके पूरे plan को derail कर दे।\n\nStep 4 — Review करें, लगातार Tinker ना करें एक sensible portfolio structure को periodically (जैसे, हर 6-12 महीने) review किया जाता है ताकि आपके target mix पर वापस rebalance हो सके — headlines या short-term price swings के आधार पर daily adjust नहीं किया जाता।\n\nमुख्य सीख: एक portfolio एक structure है जो पहले आपके अपने goals और time horizon के आसपास बनाया जाता है — individual stock selection उस बड़े structure के अंदर सिर्फ एक layer है, उसका replacement नहीं।\n\nक्विक क्विज़ · खुद को टेस्ट करें (5 सवाल)\n\n1. Lesson के अनुसार, individual stocks चुनने से पहले किसी portfolio की structure क्या decide करनी चाहिए? A) उस हफ्ते का सबसे popular stock tip B) आपके अपने goals और time horizon C) सबसे कम price वाला stock D) Random selection सही जवाब: B) आपके अपने goals और time horizon क्यों: Portfolio structure इस आधार पर बनना चाहिए कि आपको पैसा कब चाहिए और आप किसलिए invest कर रहे हैं।\n\n2. 2 साल में चाहिए पैसा ज़्यादातर safer instruments में क्यों होना चाहिए? A) Safer instruments हमेशा ज़्यादा कमाते हैं B) पैसे की ज़ रूरत पड़ ने से पहले downturn से recover होने के लिए कम समय होता है C) Short-term goals के लिए equity illegal है D) आपको पैसे की ज़ रूरत कितनी जल्दी है, इससे कोई फर्क नहीं पड़ ता सही जवाब: B) पैसे की ज़ रूरत पड़ ने से पहले downturn से recover होने के लिए कम समय होता है क्यों: एक short time horizon में एक temporary equity downturn से उबरने के लिए बहुत कम जगह बचती है।\n\n3. Lesson के अनुसार, asset allocation के लिए एक common simple starting framework क्या है? A) एक ही stock में 100% B) Equity, debt, और एक छोटी gold/cash allocation में split करना C) सिर्फ gold, कुछ और नहीं D) सिर्फ cryptocurrency सही जवाब: B) Equity, debt, और एक छोटी gold/cash allocation में split करना क्यों: individual risk comfort के हिसाब से tailored ये broad-based split एक common practical starting point है।\n\n4. Lesson एक portfolio को कितनी बार review और rebalance करने का सुझाव देता है? A) रोज़ाना B) Periodically, जैसे हर 6-12 महीने C) सिर्फ एक बार, बिल्कुल शुरुआत में D) कभी review ना करें सही जवाब: B) Periodically, जैसे हर 6-12 महीने क्यों: Periodic review, neglect और हर daily headline पर react करने की pitfalls दोनों से बचाता है।\n\n5. 'Step 3 — हर Bucket के अंदर Diversify करें' का मुख्य point क्या है? A) पूरा equity पैसा एक ही stock में लगाएं B) कोई भी एक stock या fund इतना बड़ा नहीं होना चाहिए कि सिर्फ उसका fail होना आपके plan को derail कर दे C) सिर्फ debt portion को diversify करें D) एक bucket के अंदर diversification unnecessary है सही जवाब: B) कोई भी एक stock या fund इतना बड़ा नहीं होना चाहिए कि सिर्फ उसका fail होना आपके plan को derail कर दे क्यों: एक asset class के अंदर भी, risk फै लाना किसी एक holding के fail होने से बचाता है।",
      "ta": "இது வரைக்கும் கத்துக்கிட்ட எல்லாத்தையும் வச்சு, மீரா முதன்முறையா தன் holdings-ஐ properly restructure பண்ண உட்கார்ந்தாள் — stock by stock இல்லாம, ஒரே deliberate whole-ஆ. “எங்க தொடங்கணும்,” என்று கேட்டாள், “இப்போ finally எல்லா pieces-ஐயும் புரிஞ்சுக்கிட்ட பிறகு?”\n\n“நீ உன் goals-உடனும் time horizon-உடனும் தொடங்கணும், ஒரு stock tip-உடன் இல்ல,” பாட்டி சொன்னார். “Structure முதலில் வரும். Individual picks அதற்கு பிறகு வரும்.”\n\nStep 1 — உங்க Goals, Time Horizon-உடன் தொடங்குங்க 2 வருடத்தில் தேவைப்படும் பணம் (ஒரு கல்யாணம், ஒரு down payment) பெரும்பாலும் safer instruments- ல இருக்கணும்; 15+ வருடங்கள் தொடாத பணம் (retirement) reasonable-ஆ அதிக equity risk carry பண்ணலாம், downturns-ஐ ride out பண்ண நேரம் இருக்குறதால.\n\nStep 2 — ஒரு Broad Asset Split Decide பண்ணுங்க பணத்தை equity-க்கும் (stocks/equity mutual funds), debt-க்கும் (bonds/fixed deposits), stability-க்கு சின்ன gold அல்லது cash allocation-க்கும் split பண்றது ஒரு common simple starting framework — exact mix, Lesson 13-லிருந்து உங்க சொந்த goals-ஐயும் risk comfort-ஐயும் முழுசா depend பண்ணுது.\n\nStep 3 — ஒவ்வொரு Bucket-க்குள்ளும் Diversify பண்ணுங்க உங்க equity allocation-க்குள், sectors-க்கும் market caps-க்கும் இடையே spread பண்ணுங்க (Lessons 8, 28-30). Debt-க்குள், varying maturities-ஐயும் issuers-ஐயும் consider பண்ணுங்க. அதன் failure மட்டும் உங்க plan-ஐ derail பண்ணும் அளவுக்கு, ஒரே ஒரு stock அல்லது fund-உம் பெரிதா இருக்கக்கூடாது.\n\nStep 4 — Review பண்ணுங்க, தொடர்ந்து Tinker பண்ணாதீங்க உங்க target mix-க்கு rebalance ஆக, ஒரு sensible portfolio structure periodically (சொல்லப்போனா, 6-12 மாசத்திற்கு ஒரு தடவை) review பண்ணப்படும் — headlines அல்லது short-term price swings-ஐ வச்சு தினமும் adjust பண்ணப்படாது.\n\nமுக்கிய பாடம்: ஒரு portfolio, முதலில் உங்க சொந்த goals-ஐயும் time horizon-ஐயும் சுற்றி கட்டப்பட்ட ஒரு structure — Individual stock selection, அந்த பெரிய structure-க்குள் இருக்கிற ஒரே ஒரு layer மட்டும் தான், அதற்கு பதிலா இல்ல.\n\nவினாடி வினா · சுயபரிசோதனை (5 கேள்விகள்)\n\n1. Lesson-ன் படி, individual stocks pick பண்றதுக்கு முன், portfolio-ன் structure-ஐ என்ன தீர்மானிக்கணும்? A) அந்த வாரம் மிக popular stock tip B) உங்க சொந்த goals, time horizon C) மிகக் குறைந்த விலையில் இருக்கிற stock D) Random selection சரியான பதில்:B) உங்க சொந்த goals, time horizon ஏன்:நீங்க எப்போ பணம் தேவைப்படும், எதற்காக invest பண்றீங்கனு சுற்றி portfolio structure கட்டப்படணும்.\n\n2. 2 வருடத்தில் தேவைப்படும் பணம் ஏன் பெரும்பாலும் safer instruments-ல இருக்கணும்? A) Safer instruments எப்போதும் அதிகமா சம்பாதிக்கும் B) பணம் தேவைப்படுறதுக்கு முன் ஒரு downturn-லிருந்து recover ஆக குறைவான நேரம் தான் இருக்கும் C) Short-term goals-க்கு equity illegal D) பணம் எவ்வளவு சீக்கிரம் தேவைன்னது matter பண்ணாது சரியான பதில்:B) பணம் தேவைப்படுறதுக்கு முன் ஒரு downturn-லிருந்து recover ஆக குறைவான நேரம் தான் இருக்கும் ஏன்:ஒரு short time horizon, ஒரு temporary equity downturn-ஐ ride out பண்ண குறைவான room-ஐ விட்டுடும்.\n\n3. Lesson-ன் படி, asset allocation-க்கு common simple starting framework என்ன? A) 100% ஒரே ஒரு stock-ல B) Equity, debt, சின்ன gold/cash allocation-க்கு இடையே split பண்றது C) Gold மட்டும், வேற ஒன்றும் இல்ல D) Cryptocurrency மட்டும் சரியான பதில்:B) Equity, debt, சின்ன gold/cash allocation-க்கு இடையே split பண்றது ஏன்:Individual risk comfort-க்கு tailor பண்ணப்பட்ட இந்த broad-based split, ஒரு common practical starting point.\n\n4. ஒரு portfolio-ஐ review, rebalance பண்ண lesson எவ்வளவு அடிக்கடி suggest பண்ணுது? A) தினமும் B) Periodically, உ.தா., ஒவ்வொரு 6-12 மாசத்திற்கும் C) ஒரே ஒரு தடவை, ஆரம்பத்தில் மட்டும் D) ஒருபோதும் review பண்ண வேண்டாம் சரியான பதில்:B) Periodically, உ.தா., ஒவ்வொரு 6-12 மாசத்திற்கும் ஏன்:Periodic review, neglect-ஐயும், ஒவ்வொரு daily headline-க்கும் react பண்ற pitfalls-ஐயும் avoid பண்ணும்.\n\n5. ‘Step 3 — ஒவ்வொரு Bucket-க்குள்ளும் Diversify பண்ணுங்க’-ன் main point என்ன? A) எல்லா equity பணத்தையும் ஒரே ஒரு stock-ல போடுறது B) அதன் failure மட்டும் உங்க plan-ஐ derail பண்ணும் அளவுக்கு, ஒரே ஒரு stock அல்லது fund-உம் பெரிதா இருக்கக்கூடாது C) Debt portion-ஐ மட்டும் diversify பண்ணுங்க D) ஒரு bucket-க்குள் diversification தேவையில்ல சரியான பதில்:B) அதன் failure மட்டும் உங்க plan-ஐ derail பண்ணும் அளவுக்கு, ஒரே ஒரு stock அல்லது fund-உம் பெரிதா இருக்கக்கூடாது ஏன்:ஒரு asset class-க்குள்ளே கூட, risk-ஐ spread பண்றது ஒரே ஒரு holding-ன் failure-லிருந்து பாதுகாக்கும்."
    },
    "body": {
      "en": "Armed with everything so far, Meera sat down to actually restructure her holdings properly for the first time — not stock by stock, but as one deliberate whole. “Where do I even begin,” she asked, “now that I finally understand all the pieces?”\n\n“You begin with your goals and your time horizon, not with a stock tip,” Paati said. “The structure comes first. The individual picks come after.”\n\nStep 1 — Start With Your Goals and Time Horizon Money needed in 2 years (a wedding, a down payment) belongs mostly in safer instruments; money you won't touch for 15+ years (retirement) can reasonably carry more equity risk, since there's time to ride out downturns.\n\nStep 2 — Decide a Broad Asset Split A common simple starting framework is splitting money across equity (stocks/equity mutual funds), debt (bonds/fixed deposits), and a small allocation to gold or cash for stability — the exact mix depends entirely on your own goals and risk comfort from Lesson 13.\n\nStep 3 — Diversify Within Each Bucket Within your equity allocation, spread across sectors and market caps (Lessons 8 and 28-30). Within debt, consider varying maturities and issuers. No single stock or fund should be large enough that its failure alone derails your plan.\n\nStep 4 — Review, Don't Constantly Tinker A sensible portfolio structure is reviewed periodically (say, every 6-12 months) to rebalance back to your target mix — not adjusted daily based on headlines or short-term price swings.",
      "hi": "अब तक सीखी हर चीज़ के साथ, मीरा पहली बार अपने holdings को सही तरीके से restructure करने बैठी — stock by stock नहीं, बल्कि एक deliberate whole के तौर पर। “मैं कहाँ से शुरू करूँ,” उसने पूछा, “अब जब मुझे आखिरकार सारे pieces समझ आ गए हैं?”\n\n“तुम अपने goals और time horizon से शुरू करती हो, किसी stock tip से नहीं,” पाटी ने कहा। “structure पहले आता है। individual picks बाद में आते हैं।”\n\nStep 1 — अपने Goals और Time Horizon से शुरू करें 2 साल में चाहिए पैसा (एक शादी, एक down payment) ज़्यादातर safer instruments में होना चाहिए; जिस पैसे को आप 15+ साल तक नहीं छु एंगी (retirement) वो reasonably ज़्यादा equity risk उठा सकता है, क्योंकि downturns से उबरने के लिए समय होता है।\n\nStep 2 — एक Broad Asset Split Decide करें एक common simple starting framework पैसे को equity (stocks/equity mutual funds), debt (bonds/fixed deposits), और stability के लिए gold या cash की एक छोटी allocation में split करना है — exact mix पूरी तरह Lesson 13 से आपके अपने goals और risk comfort पर depend करता है।\n\nStep 3 — हर Bucket के अंदर Diversify करें अपनी equity allocation के अंदर, sectors और market caps में फै लाएं (Lessons 8 और 28-30)। Debt के अंदर, अलग-अलग maturities और issuers पर विचार करें। कोई भी एक stock या fund इतना बड़ा नहीं होना चाहिए कि सिर्फ उसका fail होना आपके पूरे plan को derail कर दे।\n\nStep 4 — Review करें, लगातार Tinker ना करें एक sensible portfolio structure को periodically (जैसे, हर 6-12 महीने) review किया जाता है ताकि आपके target mix पर वापस rebalance हो सके — headlines या short-term price swings के आधार पर daily adjust नहीं किया जाता।",
      "ta": "இது வரைக்கும் கத்துக்கிட்ட எல்லாத்தையும் வச்சு, மீரா முதன்முறையா தன் holdings-ஐ properly restructure பண்ண உட்கார்ந்தாள் — stock by stock இல்லாம, ஒரே deliberate whole-ஆ. “எங்க தொடங்கணும்,” என்று கேட்டாள், “இப்போ finally எல்லா pieces-ஐயும் புரிஞ்சுக்கிட்ட பிறகு?”\n\n“நீ உன் goals-உடனும் time horizon-உடனும் தொடங்கணும், ஒரு stock tip-உடன் இல்ல,” பாட்டி சொன்னார். “Structure முதலில் வரும். Individual picks அதற்கு பிறகு வரும்.”\n\nStep 1 — உங்க Goals, Time Horizon-உடன் தொடங்குங்க 2 வருடத்தில் தேவைப்படும் பணம் (ஒரு கல்யாணம், ஒரு down payment) பெரும்பாலும் safer instruments- ல இருக்கணும்; 15+ வருடங்கள் தொடாத பணம் (retirement) reasonable-ஆ அதிக equity risk carry பண்ணலாம், downturns-ஐ ride out பண்ண நேரம் இருக்குறதால.\n\nStep 2 — ஒரு Broad Asset Split Decide பண்ணுங்க பணத்தை equity-க்கும் (stocks/equity mutual funds), debt-க்கும் (bonds/fixed deposits), stability-க்கு சின்ன gold அல்லது cash allocation-க்கும் split பண்றது ஒரு common simple starting framework — exact mix, Lesson 13-லிருந்து உங்க சொந்த goals-ஐயும் risk comfort-ஐயும் முழுசா depend பண்ணுது.\n\nStep 3 — ஒவ்வொரு Bucket-க்குள்ளும் Diversify பண்ணுங்க உங்க equity allocation-க்குள், sectors-க்கும் market caps-க்கும் இடையே spread பண்ணுங்க (Lessons 8, 28-30). Debt-க்குள், varying maturities-ஐயும் issuers-ஐயும் consider பண்ணுங்க. அதன் failure மட்டும் உங்க plan-ஐ derail பண்ணும் அளவுக்கு, ஒரே ஒரு stock அல்லது fund-உம் பெரிதா இருக்கக்கூடாது.\n\nStep 4 — Review பண்ணுங்க, தொடர்ந்து Tinker பண்ணாதீங்க உங்க target mix-க்கு rebalance ஆக, ஒரு sensible portfolio structure periodically (சொல்லப்போனா, 6-12 மாசத்திற்கு ஒரு தடவை) review பண்ணப்படும் — headlines அல்லது short-term price swings-ஐ வச்சு தினமும் adjust பண்ணப்படாது."
    },
    "keyTakeaway": {
      "en": "A portfolio is a structure built around your own goals and time horizon first — individual stock selection is just one layer inside that larger structure, not a replacement for it.",
      "hi": "एक portfolio एक structure है जो पहले आपके अपने goals और time horizon के आसपास बनाया जाता है — individual stock selection उस बड़े structure के अंदर सिर्फ एक layer है, उसका replacement नहीं।",
      "ta": "ஒரு portfolio, முதலில் உங்க சொந்த goals-ஐயும் time horizon-ஐயும் சுற்றி கட்டப்பட்ட ஒரு structure — Individual stock selection, அந்த பெரிய structure-க்குள் இருக்கிற ஒரே ஒரு layer மட்டும் தான், அதற்கு பதிலா இல்ல."
    },
    "quiz": [
      {
        "question": {
          "en": "What should determine a portfolio's structure, according to the lesson, before picking individual stocks?",
          "hi": "Lesson के अनुसार, individual stocks चुनने से पहले किसी portfolio की structure क्या decide करनी चाहिए?",
          "ta": "Lesson-ன் படி, individual stocks pick பண்றதுக்கு முன், portfolio-ன் structure-ஐ என்ன தீர்மானிக்கணும்?"
        },
        "options": {
          "en": [
            "The most popular stock tip that week",
            "Your own goals and time horizon",
            "The stock with the lowest price",
            "Random selection"
          ],
          "hi": [
            "उस हफ्ते का सबसे popular stock tip",
            "आपके अपने goals और time horizon",
            "सबसे कम price वाला stock",
            "Random selection"
          ],
          "ta": [
            "அந்த வாரம் மிக popular stock tip",
            "உங்க சொந்த goals, time horizon",
            "மிகக் குறைந்த விலையில் இருக்கிற stock",
            "Random selection"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Portfolio structure should be built around when you'll need the money and what you're investing for.",
          "hi": "Portfolio structure इस आधार पर बनना चाहिए कि आपको पैसा कब चाहिए और आप किसलिए invest कर रहे हैं।",
          "ta": "நீங்க எப்போ பணம் தேவைப்படும், எதற்காக invest பண்றீங்கனு சுற்றி portfolio structure கட்டப்படணும்."
        }
      },
      {
        "question": {
          "en": "Why might money needed in 2 years belong mostly in safer instruments?",
          "hi": "2 साल में चाहिए पैसा ज़्यादातर safer instruments में क्यों होना चाहिए?",
          "ta": "2 வருடத்தில் தேவைப்படும் பணம் ஏன் பெரும்பாலும் safer instruments-ல இருக்கணும்?"
        },
        "options": {
          "en": [
            "Safer instruments always earn more",
            "There's less time to recover from a downturn before the money is needed",
            "Equity is illegal for short-term goals",
            "It doesn't matter how soon you need the money"
          ],
          "hi": [
            "Safer instruments हमेशा ज़्यादा कमाते हैं",
            "पैसे की ज़ रूरत पड़ ने से पहले downturn से recover होने के लिए कम समय होता है",
            "Short-term goals के लिए equity illegal है",
            "आपको पैसे की ज़ रूरत कितनी जल्दी है, इससे कोई फर्क नहीं पड़ ता"
          ],
          "ta": [
            "Safer instruments எப்போதும் அதிகமா சம்பாதிக்கும்",
            "பணம் தேவைப்படுறதுக்கு முன் ஒரு downturn-லிருந்து recover ஆக குறைவான நேரம் தான் இருக்கும்",
            "Short-term goals-க்கு equity illegal",
            "பணம் எவ்வளவு சீக்கிரம் தேவைன்னது matter பண்ணாது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A short time horizon leaves little room to ride out a temporary equity downturn.",
          "hi": "एक short time horizon में एक temporary equity downturn से उबरने के लिए बहुत कम जगह बचती है।",
          "ta": "ஒரு short time horizon, ஒரு temporary equity downturn-ஐ ride out பண்ண குறைவான room-ஐ விட்டுடும்."
        }
      },
      {
        "question": {
          "en": "What is a common simple starting framework for asset allocation, per the lesson?",
          "hi": "Lesson के अनुसार, asset allocation के लिए एक common simple starting framework क्या है?",
          "ta": "Lesson-ன் படி, asset allocation-க்கு common simple starting framework என்ன?"
        },
        "options": {
          "en": [
            "100% in one single stock",
            "Splitting across equity, debt, and a small gold/cash allocation",
            "Only gold, nothing else",
            "Only cryptocurrency"
          ],
          "hi": [
            "एक ही stock में 100%",
            "Equity, debt, और एक छोटी gold/cash allocation में split करना",
            "सिर्फ gold, कुछ और नहीं",
            "सिर्फ cryptocurrency"
          ],
          "ta": [
            "100% ஒரே ஒரு stock-ல",
            "Equity, debt, சின்ன gold/cash allocation-க்கு இடையே split பண்றது",
            "Gold மட்டும், வேற ஒன்றும் இல்ல",
            "Cryptocurrency மட்டும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This broad-based split, tailored to individual risk comfort, is a common practical starting point.",
          "hi": "individual risk comfort के हिसाब से tailored ये broad-based split एक common practical starting point है।",
          "ta": "Individual risk comfort-க்கு tailor பண்ணப்பட்ட இந்த broad-based split, ஒரு common practical starting point."
        }
      },
      {
        "question": {
          "en": "How often does the lesson suggest reviewing and rebalancing a portfolio?",
          "hi": "Lesson एक portfolio को कितनी बार review और rebalance करने का सुझाव देता है?",
          "ta": "ஒரு portfolio-ஐ review, rebalance பண்ண lesson எவ்வளவு அடிக்கடி suggest பண்ணுது?"
        },
        "options": {
          "en": [
            "Every single day",
            "Periodically, such as every 6-12 months",
            "Only once, at the very start",
            "Never review it at all"
          ],
          "hi": [
            "रोज़ाना",
            "Periodically, जैसे हर 6-12 महीने",
            "सिर्फ एक बार, बिल्कुल शुरुआत में",
            "कभी review ना करें"
          ],
          "ta": [
            "தினமும்",
            "Periodically, உ.தா., ஒவ்வொரு 6-12 மாசத்திற்கும்",
            "ஒரே ஒரு தடவை, ஆரம்பத்தில் மட்டும்",
            "ஒருபோதும் review பண்ண வேண்டாம்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Periodic review avoids both neglect and the pitfalls of reacting to every daily headline.",
          "hi": "Periodic review, neglect और हर daily headline पर react करने की pitfalls दोनों से बचाता है।",
          "ta": "Periodic review, neglect-ஐயும், ஒவ்வொரு daily headline-க்கும் react பண்ற pitfalls-ஐயும் avoid பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What is the main point of 'Step 3 — Diversify Within Each Bucket'?",
          "hi": "'Step 3 — हर Bucket के अंदर Diversify करें' का मुख्य point क्या है?",
          "ta": "‘Step 3 — ஒவ்வொரு Bucket-க்குள்ளும் Diversify பண்ணுங்க’-ன் main point என்ன?"
        },
        "options": {
          "en": [
            "Put all equity money into one single stock",
            "No single stock or fund should be large enough that its failure alone derails your plan",
            "Only diversify the debt portion",
            "Diversification within a bucket is unnecessary"
          ],
          "hi": [
            "पूरा equity पैसा एक ही stock में लगाएं",
            "कोई भी एक stock या fund इतना बड़ा नहीं होना चाहिए कि सिर्फ उसका fail होना आपके plan को derail कर दे",
            "सिर्फ debt portion को diversify करें",
            "एक bucket के अंदर diversification unnecessary है"
          ],
          "ta": [
            "எல்லா equity பணத்தையும் ஒரே ஒரு stock-ல போடுறது",
            "அதன் failure மட்டும் உங்க plan-ஐ derail பண்ணும் அளவுக்கு, ஒரே ஒரு stock அல்லது fund-உம் பெரிதா இருக்கக்கூடாது",
            "Debt portion-ஐ மட்டும் diversify பண்ணுங்க",
            "ஒரு bucket-க்குள் diversification தேவையில்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Even within an asset class, spreading risk protects against any single holding's failure. 32. Dividends: How Companies Share Profits",
          "hi": "एक asset class के अंदर भी, risk फै लाना किसी एक holding के fail होने से बचाता है।",
          "ta": "ஒரு asset class-க்குள்ளே கூட, risk-ஐ spread பண்றது ஒரே ஒரு holding-ன் failure-லிருந்து பாதுகாக்கும்."
        }
      }
    ]
  },
  {
    "id": 32,
    "tier": "Intermediate",
    "title": {
      "en": "Dividends: How Companies Share Profits",
      "hi": "Dividends: कं पनियाँ Profit कै से बाँ टती हैं",
      "ta": "Dividends: நிறுவனங்கள் Profits-ஐ எப்படி Share"
    },
    "opener": {
      "en": "Meera noticed a small credit in her account labelled “dividend” from a company she'd nearly forgotten she owned. “Free money?” she asked, delighted. “Not quite free,” Paati smiled, “but one of the oldest ways a company says thank you to its owners.”",
      "hi": "मीरा ने अपने account में एक छोटा credit notice किया जिसे “dividend” लेबल किया गया था, एक ऐसी कं पनी से जिसे वो own करना लगभग भूल चुकी थी। “Free पैसा?” उसने खुश होकर पूछा। “बिल्कुल free नहीं,” पाटी मुस्कु राई, “लेकिन एक कं पनी के अपने owners को thank you कहने के सबसे पुराने तरीकों में से एक।”",
      "ta": "பண்ணும்\n\nதான் சொந்தமாக்கியிருந்ததே கிட்டத்தட்ட மறந்துப் போன ஒரு நிறுவனத்திலிருந்து “dividend”-ன்னு label பண்ணப்பட்ட ஒரு சின்ன credit தன் account-ல மீரா கவனிச்சாள். “Free money?” என்று delighted-ஆ கேட்டாள். “Quite free இல்ல,” பாட்டி புன்னகைச்சார், “ஆனா ஒரு நிறுவனம் தன் owners-க்கு thank you சொல்ற மிக பழைய வழிகளில் ஒண்ணு.”"
    },
    "realStorySubtitle": {
      "en": "The Company That Never Stopped Paying",
      "hi": "वो कं पनी जिसने कभी Pay करना बंद नहीं किया",
      "ta": "Pay பண்றதை ஒருபோதும் நிறுத்தாத நிறுவனம்"
    },
    "realStoryBody": {
      "en": "ITC, one of India's oldest listed companies, has paid dividends to shareholders consistently for decades, across very different economic environments, making it one of the country's most cited examples of a reliable, long-term dividend-paying stock.\n\nInvestors who held such steady dividend-payers over long periods received a regular stream of cash regardless of short-term price swings — a very different experience from chasing pure price appreciation, and a reminder that returns can come from more than one direction at once.",
      "hi": "ITC, India की सबसे पुरानी listed companies में से एक, ने दशकों तक, बहुत अलग-अलग economic environments में, shareholders को लगातार dividends दिए हैं, जिससे ये देश के एक reliable, long-term dividend-paying stock के सबसे cited examples में से एक बन गई है।\n\nजिन investors ने ऐसे steady dividend-payers को लंबे समय तक hold किया, उन्हें short-term price swings की परवाह किए बिना cash की एक regular stream मिली — pure price appreciation पीछे भागने से बिल्कुल अलग experience, और एक reminder कि returns एक साथ एक से ज़्यादा direction से आ सकते हैं।",
      "ta": "இந்தியாவின் மிகப் பழைய listed நிறுவனங்களில் ஒண்ணான ITC, decades-கணக்கா, ரொம்ப வெவ்வேறு economic environments முழுக்க consistently shareholders-க்கு dividends pay பண்ணிக்கிட்டிருக்கு, ஒரு reliable, long-term dividend-paying stock-க்கான நாட்டின் மிக cited examples-ல அது ஒண்ணா மாறியிருக்கு.\n\nஇப்படி steady dividend-payers-ஐ நீண்ட காலம் hold பண்ணின investors, short-term price swings எப்படி இருந்தாலும், regular cash stream-ஐ receive பண்ணாங்க — pure price appreciation-ஐ chase பண்றதுக்கு முற்றிலும் வேற ஒரு experience, returns ஒரே நேரத்தில் ஒண்ணுக்கு மேற்பட்ட directions- லிருந்து வரலாம்னு ஒரு நினைவூட்டல்."
    },
    "body": {
      "en": "What a Dividend Actually Is A dividend is a portion of a company's profit distributed directly to shareholders, usually per share (e.g., ₹5 per share). Companies aren't obligated to pay dividends — many growth-focused companies reinvest all profit back into the business instead.\n\nKey Dividend Terms • Dividend Yield: Annual dividend per share ÷ share price, expressed as a percentage — how much cash income you're earning relative to what you paid. • Record Date: You must own the share by this date to qualify for that dividend. • Ex-Dividend Date: The share typically trades slightly lower from this date onward, reflecting the cash paid out.",
      "hi": "एक Dividend असल में क्या है एक dividend कं पनी के profit का वो हिस्सा है जो सीधे shareholders को distribute किया जाता है, आमतौर पर per share (जैसे, ₹5 per share)। Companies dividends pay करने के लिए obligated नहीं हैं — कई growth-focused companies इसकी बजाय पूरा profit वापस business में reinvest कर देती हैं।\n\nKey Dividend Terms • Dividend Yield: Annual dividend per share ÷ share price, percentage के रूप में express किया जाता है — आपने जो चुकाया उसके relative कितनी cash income कमा रहे हैं।\n\n• Record Date: उस dividend के लिए qualify करने के लिए आपके पास इस date तक share होना चाहिए।\n\n• Ex-Dividend Date: इस date से आगे share आमतौर पर थोड़ा कम price पर trade करता है, जो paid out हुई cash को reflect करता है।",
      "ta": "Dividend உண்மையில் என்ன ஒரு dividend, நிறுவனத்தின் profit-ன் ஒரு பகுதி, usually per share (உ.தா., share-க்கு ₹5) shareholders- க்கு directly distribute பண்ணப்படுது. Dividends pay பண்ணணும்னு நிறுவனங்களுக்கு கட்டாயம் இல்ல — நிறைய growth-focused நிறுவனங்கள் அதற்கு பதிலா முழு profit-ஐயும் business-க்குள்ளேயே reinvest பண்ணும்.\n\nKey Dividend Terms • Dividend Yield: Annual dividend per share ÷ share price, ஒரு percentage-ஆ express பண்ணப்படும் — நீங்க pay பண்ணினதை பொறுத்து எவ்வளவு cash income சம்பாதிக்கிறீங்கனு.\n\n• Record Date: அந்த dividend-க்கு qualify ஆக, இந்த date-க்குள் நீங்க அந்த share-ஐ சொந்தமாக்கியிருக்கணும்.\n\n• Ex-Dividend Date: இந்த date-லிருந்து, pay பண்ணப்பட்ட cash-ஐ reflect பண்ணி, share typically கொஞ்சம் குறைவா trade ஆகும்."
    },
    "keyTakeaway": {
      "en": "Dividends are a company literally sharing its profit with you as an owner, distinct from any gain or loss in share price. ITC's decades-long consistency shows why reliable dividend-payers are valued for steady income, not just growth-focused investors chasing price appreciation.",
      "hi": "Dividends एक कं पनी का literally अपना profit आपके साथ एक owner के तौर पर share करना है, share price में किसी भी gain या loss से अलग। ITC की दशकों लंबी consistency दिखाती है कि reliable dividend-payers steady income के लिए क्यों value किए जाते हैं, ना सिर्फ price appreciation पीछे भागने वाले growth-focused investors के लिए।",
      "ta": "Share price-ல வரும் எந்த gain அல்லது loss-லிருந்தும் தனியா, Dividends என்பது நிறுவனம் literally தன் profit-ஐ ஒரு owner-ஆ உங்களுடன் share பண்றது. Reliable dividend- payers, price appreciation-ஐ மட்டும் chase பண்ற growth-focused investors மட்டும் இல்லாம, steady income-க்காகவும் ஏன் value பண்ணப்படுறாங்கனு ITC-ன் decades-long consistency காட்டுது."
    },
    "quiz": [
      {
        "question": {
          "en": "What is a dividend?",
          "hi": "Dividend क्या होता है?",
          "ta": "ஒரு dividend என்றால் என்ன?"
        },
        "options": {
          "en": [
            "A loan the company takes from shareholders",
            "A portion of a company's profit distributed directly to shareholders",
            "A mandatory government tax",
            "A type of stock order"
          ],
          "hi": [
            "एक loan जो कं पनी shareholders से लेती है",
            "कं पनी के profit का वो हिस्सा जो सीधे shareholders को distribute किया जाता है",
            "एक mandatory government tax",
            "एक तरह का stock order"
          ],
          "ta": [
            "Shareholders-லிருந்து நிறுவனம் வாங்குற ஒரு loan",
            "Shareholders-க்கு directly distribute பண்ணப்படும் நிறுவனத்தின் profit-ன் ஒரு பகுதி",
            "ஒரு mandatory government tax",
            "ஒரு வகை stock order"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Dividends are the company sharing its profit directly with its owners, the shareholders.",
          "hi": "Dividends कं पनी का अपना profit सीधे अपने owners, यानी shareholders, के साथ share करना है।",
          "ta": "Dividends என்பது நிறுவனம் தன் profit-ஐ directly அதன் owners-ஆன shareholders-உடன் share பண்றது."
        }
      },
      {
        "question": {
          "en": "Are companies legally required to pay dividends?",
          "hi": "क्या companies को legally dividends pay करने ज़ रूरी हैं?",
          "ta": "Dividends pay பண்றது நிறுவனங்களுக்கு legally required-ஆ?"
        },
        "options": {
          "en": [
            "Yes, always",
            "No — many companies choose to reinvest all profit into the business instead",
            "Only IPO companies must pay dividends",
            "Only banks are required to pay dividends"
          ],
          "hi": [
            "हाँ, हमेशा",
            "नहीं — कई companies इसकी बजाय पूरा profit business में reinvest करना चुनती हैं",
            "सिर्फ IPO companies को dividends pay करने ज़ रूरी हैं",
            "सिर्फ banks को dividends pay करने ज़ रूरी हैं"
          ],
          "ta": [
            "ஆமா, எப்போதும்",
            "இல்ல — நிறைய நிறுவனங்கள் முழு profit-ஐயும் business-க்குள்ளேயே reinvest பண்ண தேர்ந்தெடுக்கும்",
            "IPO நிறுவனங்கள் மட்டும் தான் dividends pay பண்ணணும்",
            "Banks மட்டும் தான் dividends pay பண்ண required"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Dividend payment is a company choice, not a legal obligation — growth-focused firms often reinvest profits instead.",
          "hi": "Dividend payment एक company choice है, कोई legal obligation नहीं — growth-focused firms अक्सर profits reinvest कर देती हैं।",
          "ta": "Dividend payment ஒரு நிறுவனத்தின் choice, ஒரு legal obligation இல்ல — growth-focused firms பெரும்பாலும் profits-ஐ reinvest பண்ணும்."
        }
      },
      {
        "question": {
          "en": "How is Dividend Yield calculated?",
          "hi": "Dividend Yield कै से calculate होता है?",
          "ta": "Dividend Yield எப்படி calculate பண்ணப்படும்?"
        },
        "options": {
          "en": [
            "Share price ÷ Net profit",
            "Annual dividend per share ÷ Share price",
            "Total dividend paid × number of shareholders",
            "Net profit ÷ Total assets"
          ],
          "hi": [
            "Share price ÷ Net profit",
            "Annual dividend per share ÷ Share price",
            "कुल दिया गया dividend × shareholders की संख्या",
            "Net profit ÷ Total assets"
          ],
          "ta": [
            "Share price ÷ Net profit",
            "Annual dividend per share ÷ Share price",
            "Total dividend paid × shareholders-ன் எண்ணிக்கை",
            "Net profit ÷ Total assets"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Dividend yield measures dividend income as a percentage of what you paid for the share.",
          "hi": "Dividend yield, आपने share के लिए जो चुकाया उसके percentage के तौर पर dividend income को measure करता है।",
          "ta": "நீங்க அந்த share-க்கு pay பண்ணினதை percentage-ஆ, dividend income-ஐ dividend yield measure பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What must you do to qualify for a company's dividend, based on the Record Date?",
          "hi": "Record Date के आधार पर, कं पनी के dividend के लिए qualify करने के लिए आपको क्या करना चाहिए?",
          "ta": "Record Date-ன் அடிப்படையில், ஒரு நிறுவனத்தின் dividend-க்கு qualify ஆக நீங்க என்ன பண்ணணும்?"
        },
        "options": {
          "en": [
            "Sell your shares before the record date",
            "Own the shares by the record date",
            "Never sell the shares at all",
            "Buy the shares after the dividend is paid"
          ],
          "hi": [
            "Record date से पहले अपने shares बेच दें",
            "Record date तक shares own करें",
            "कभी भी shares बिल्कुल ना बेचें",
            "Dividend pay होने के बाद shares खरीदें"
          ],
          "ta": [
            "Record date-க்கு முன் உங்க shares-ஐ விற்குங்க",
            "Record date-க்குள் shares-ஐ சொந்தமாக்கியிருங்க",
            "Shares-ஐ ஒருபோதும் விக்காதீங்க",
            "Dividend pay ஆன பிறகு shares வாங்குங்க"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "You must be a shareholder of record by that specific date to receive the declared dividend.",
          "hi": "Declared dividend पाने के लिए आपको उस specific date तक record में shareholder होना ज़ रूरी है।",
          "ta": "Declare பண்ணப்பட்ட dividend-ஐ receive பண்ண, அந்த specific date-க்குள் ஒரு record shareholder-ஆ இருக்கணும்."
        }
      },
      {
        "question": {
          "en": "What does ITC's decades-long dividend history illustrate, according to the lesson?",
          "hi": "Lesson के अनुसार, ITC की दशकों लंबी dividend history क्या दिखाती है?",
          "ta": "Lesson-ன் படி, ITC-ன் decades-long dividend history என்ன illustrate பண்ணுது?"
        },
        "options": {
          "en": [
            "All companies pay dividends reliably",
            "Some companies can be reliable, long-term sources of steady dividend income across different economic environments",
            "Dividends are always guaranteed by SEBI",
            "Dividend-paying companies never grow"
          ],
          "hi": [
            "सभी companies reliably dividends pay करती हैं",
            "कुछ companies अलग-अलग economic environments में steady dividend income के reliable, long-term sources हो सकती हैं",
            "Dividends हमेशा SEBI द्वारा guaranteed होते हैं",
            "Dividend-paying companies कभी grow नहीं करतीं"
          ],
          "ta": [
            "எல்லா நிறுவனங்களும் reliably dividends pay பண்ணும்",
            "வெவ்வேறு economic environments முழுக்க, சில நிறுவனங்கள் steady dividend income-க்கு reliable, long- term sources-ஆ இருக்கலாம்",
            "Dividends எப்போதும் SEBI-ஆல guarantee பண்ணப்படும்",
            "Dividend-paying நிறுவனங்கள் ஒருபோதும் grow ஆகாது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "ITC is a widely cited real example of long-term dividend consistency through varied economic conditions. 33. Splits, Bonus Shares & Buybacks",
          "hi": "ITC अलग-अलग economic conditions में long-term dividend consistency का एक widely cited real example है।",
          "ta": "வெவ்வேறு economic conditions முழுக்க long-term dividend consistency-க்கு ITC ஒரு widely cited real example."
        }
      }
    ]
  },
  {
    "id": 33,
    "tier": "Intermediate",
    "title": {
      "en": "Splits, Bonus Shares & Buybacks",
      "hi": "Splits, Bonus Shares और Buybacks",
      "ta": "Splits, Bonus Shares & Buybacks"
    },
    "opener": {
      "en": "Meera woke up one day to find she suddenly owned twice as many shares of one company as before — with the price exactly halved. “Did I get robbed or did I get lucky?” she asked, only half joking. “Neither,” Paati laughed. “You just experienced your first stock split.”",
      "hi": "मीरा एक दिन उठी और पाया कि अब उसके पास पहले से दोगुने shares हैं एक कं पनी के — price exactly आधी हो गई थी। “क्या मेरे साथ ठगी हुई या मैं lucky हूँ?” उसने पूछा, सिर्फ आधा मज़ाक करते हुए। “दोनों नहीं,” पाटी हँसी। “तुमने अभी अपना पहला stock split experience किया।”",
      "ta": "ஒரு நாள் எழுந்தபோது, ஒரு நிறுவனத்தின் shares முன்னாடி இருந்ததை விட திடீரென்று இரண்டு மடங்கு தனக்கு சொந்தமா இருக்கிறதை மீரா கண்டுபிடிச்சாள் — price exact-ஆ half ஆகி. “என்னை ஏமாத்திடாங்களா, இல்ல luck-ஆ கிடைச்சுதா?” என்று பாதி joking-ஆ கேட்டாள். “இரண்டுமே இல்ல,” பாட்டி சிரிச்சார். “நீ உன் முதல் stock split-ஐ experience பண்ணே அவ்வளவு தான்.”"
    },
    "realStorySubtitle": {
      "en": "The Stock That Refuses to Split — And the Ones That Do",
      "hi": "वो Stock जो Split होने से मना करता है — और वो जो करते हैं",
      "ta": "Split ஆக Refuse பண்ற Stock — Split ஆகுறவையும்"
    },
    "realStoryBody": {
      "en": "MRF, the Indian tyre maker, is famous for having one of the highest share prices on the Indian stock market — well over ₹1 lakh per share for years — because it has never split its stock, unlike most large Indian companies.\n\nBy contrast, companies like Infosys have carried out multiple bonus share issues over the years (increasing the number of shares given to existing holders at no extra cost), keeping their per-share price more accessible to a broader base of retail investors. Neither approach is 'better' — they're simply different philosophies about share price accessibility.",
      "hi": "MRF, Indian tyre maker, Indian stock market के सबसे highest share prices में से एक रखने के लिए famous है — सालों तक per share ₹1 lakh से भी ऊपर — क्योंकि इसने कभी अपना stock split नहीं किया, ज़्यादातर बड़ी Indian companies के उलट।\n\nइसके contrast में, Infosys जैसी companies ने सालों में कई bonus share issues की हैं (existing holders को बिना extra cost के दिए गए shares की संख्या बढ़ाते हुए), अपनी per-share price को retail investors के एक बड़े base के लिए ज़्यादा accessible बनाए रखते हुए। कोई भी approach 'बेहतर' नहीं है — ये share price accessibility के बारे में बस अलग-अलग philosophies हैं।",
      "ta": "Indian tyre maker MRF, Indian stock market-ல மிக அதிக share prices-ல ஒண்ணா இருப்பதற்கு famous — வருடங்களா share-க்கு ₹1 லட்சத்திற்கும் மேல் — ஏன்னா பெரும்பாலான large Indian நிறுவனங்களை போல் இல்லாம, அது ஒருபோதும் அதன் stock-ஐ split பண்ணல. நேர்மாறா, Infosys மாதிரி நிறுவனங்கள் வருடங்களா multiple bonus share issues பண்ணியிருக்காங்க (existing holders-க்கு extra cost இல்லாம கொடுக்கப்படும் shares-ன் எண்ணிக்கையை அதிகரிச்சு), broader retail investors base-க்கு அவற்றின் per-share price-ஐ more accessible-ஆ வைச்சிருக்காங்க. இரண்டு approach-உம் ‘better’ இல்ல — share price accessibility-ஐ பத்தின வெறும் வெவ்வேறு philosophies."
    },
    "body": {
      "en": "Stock Split A company divides each existing share into multiple shares (e.g., a 1:2 split turns 1 share into 2), proportionally reducing the price per share while your total investment value stays the same. It's typically done to make shares more affordable and improve trading liquidity.\n\nBonus Shares The company issues additional free shares to existing shareholders in a fixed ratio (e.g., a 1:1 bonus gives you one extra free share for every one you own), funded from the company's reserves. Like a split, your total value is unchanged — you simply hold more shares, each worth proportionally less.\n\nBuyback The company repurchases its own shares from shareholders, reducing the total number of shares outstanding. This can boost per-share metrics like EPS (Lesson 21) since the same profit is now divided among fewer shares, and is often used by mature, cash-rich companies to return value to shareholders.",
      "hi": "Stock Split एक कं पनी हर existing share को कई shares में divide करती है (जैसे, एक 1:2 split 1 share को 2 में बदल देता है), price per share को proportionally कम करते हुए जबकि आपकी total investment value same रहती है। ये आमतौर पर shares को ज़्यादा affordable बनाने और trading liquidity बेहतर करने के लिए किया जाता है।\n\nBonus Shares कं पनी existing shareholders को एक fixed ratio में additional free shares issue करती है (जैसे, एक 1:1 bonus आपको हर एक share के लिए एक extra free share देता है जो आप own करते हैं), जो कं पनी के reserves से funded होता है। एक split की तरह, आपकी total value unchanged रहती है — आप बस ज़्यादा shares hold करते हैं, हर एक proportionally कम worth का।\n\nBuyback कं पनी shareholders से अपने खुद के shares वापस खरीदती है, जिससे outstanding shares की total संख्या कम हो जाती है। ये EPS (Lesson 21) जैसी per-share metrics को boost कर सकता है क्योंकि same profit अब कम shares में divide हो रहा है, और अक्सर mature, cash-rich companies द्वारा shareholders को value लौटाने के लिए इस्तेमाल किया जाता है।",
      "ta": "Stock Split Existing ஒவ்வொரு share-ஐயும் நிறுவனம் multiple shares-ஆ divide பண்ணும் (உ.தா., ஒரு 1:2 split, 1 share-ஐ 2-ஆ மாத்தும்), உங்க total investment value அப்படியே இருக்கும்போது per-share price-ஐ proportionally குறைக்கும். Shares-ஐ more affordable ஆக்கவும் trading liquidity-ஐ improve பண்ணவும் typically இது பண்ணப்படும்.\n\nBonus Shares நிறுவனத்தின் reserves-லிருந்து fund பண்ணப்பட்டு, existing shareholders-க்கு ஒரு fixed ratio-ல (உ.தா., ஒரு 1:1 bonus, நீங்க வைத்திருக்கிற ஒவ்வொண்ணுக்கும் ஒரு extra free share தரும்) நிறுவனம் additional free shares issue பண்ணும். ஒரு split மாதிரியே, உங்க total value மாறாது — நீங்க வெறுமனே அதிக shares வைத்திருப்பீங்க, ஒவ்வொண்ணும் proportionally குறைவா worth-ஆ இருக்கும்.\n\nBuyback நிறுவனம் shareholders-லிருந்து தன் சொந்த shares-ஐ repurchase பண்ணும், total outstanding shares-ன் எண்ணிக்கையை குறைக்கும். இப்போ அதே profit குறைவான shares-க்கு இடையே divide ஆகுறதால், EPS (Lesson 21) மாதிரி per-share metrics-ஐ இது boost பண்ணலாம், shareholders-க்கு value return பண்ண mature, cash-rich நிறுவனங்கள் இதை பெரும்பாலும் பயன்படுத்துவாங்க."
    },
    "keyTakeaway": {
      "en": "Splits, bonus issues, and buybacks all change the number of shares outstanding without changing the company's fundamental value — but understanding which one happened, and why, prevents you from being confused (or falsely excited) by the resulting share count or price change.",
      "hi": "Splits, bonus issues, और buybacks सब outstanding shares की संख्या बदलते हैं बिना कं पनी की fundamental value बदले — लेकिन ये समझना कि इनमें से क्या हुआ, और क्यों, आपको resulting share count या price change से confused (या falsely excited) होने से बचाता है।",
      "ta": "Splits, bonus issues, buybacks எல்லாமே நிறுவனத்தின் fundamental value மாறாம outstanding shares-ன் எண்ணிக்கையை மாற்றும் — ஆனா எது நடந்துச்சு, ஏன்னு புரிஞ்சுக்குறது, resulting share count அல்லது price change-ஆல நீங்க confuse ஆகுறதையோ (அல்லது falsely excite ஆகுறதையோ) தடுக்கும்."
    },
    "quiz": [
      {
        "question": {
          "en": "What happens to your total investment value in a stock split?",
          "hi": "Stock split में आपकी total investment value का क्या होता है?",
          "ta": "ஒரு stock split-ல உங்க total investment value-க்கு என்ன ஆகும்?"
        },
        "options": {
          "en": [
            "It doubles automatically",
            "It stays the same — you hold more shares at a proportionally lower price each",
            "It is reduced to zero",
            "It becomes impossible to calculate"
          ],
          "hi": [
            "ये automatically double हो जाती है",
            "ये same रहती है — आप हर एक proportionally कम price पर ज़्यादा shares hold करते हैं",
            "ये zero हो जाती है",
            "इसे calculate करना impossible हो जाता है"
          ],
          "ta": [
            "அது automatic-ஆ double ஆகும்",
            "அது அப்படியே இருக்கும் — நீங்க ஒவ்வொண்ணும் proportionally குறைவான விலையில் அதிக shares வைத்திருப்பீங்க",
            "அது zero-க்கு குறைக்கப்படும்",
            "அதை calculate பண்ண முடியாம ஆகும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "A split changes the share count and price proportionally, leaving total value unchanged.",
          "hi": "एक split share count और price को proportionally बदल देता है, total value unchanged छोड़ ते हुए।",
          "ta": "ஒரு split share count-ஐயும் price-ஐயும் proportionally மாற்றும், total value மாறாம."
        }
      },
      {
        "question": {
          "en": "What are bonus shares?",
          "hi": "Bonus shares क्या होते हैं?",
          "ta": "Bonus shares என்றால் என்ன?"
        },
        "options": {
          "en": [
            "Shares you must pay extra for",
            "Additional free shares issued to existing shareholders in a fixed ratio",
            "A type of dividend paid in cash",
            "A penalty for late payment"
          ],
          "hi": [
            "Shares जिनके लिए आपको extra pay करना पड़ ता है",
            "Existing shareholders को एक fixed ratio में issue किए गए additional free shares",
            "Cash में pay किया गया एक तरह का dividend",
            "देरी से payment के लिए एक penalty"
          ],
          "ta": [
            "நீங்க extra pay பண்ண வேண்டிய shares",
            "Existing shareholders-க்கு ஒரு fixed ratio-ல issue பண்ணப்படும் additional free shares",
            "Cash-ல pay பண்ணப்படும் ஒரு வகை dividend",
            "தாமதமான payment-க்கான ஒரு penalty"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Bonus shares are issued for free from company reserves, proportionally to existing holdings.",
          "hi": "Bonus shares company reserves से existing holdings के proportion में free issue किए जाते हैं।",
          "ta": "Bonus shares, existing holdings-க்கு proportionally, நிறுவன reserves-லிருந்து free-ஆ issue பண்ணப்படும்."
        }
      },
      {
        "question": {
          "en": "What is a share buyback?",
          "hi": "Share buyback क्या है?",
          "ta": "ஒரு share buyback என்றால் என்ன?"
        },
        "options": {
          "en": [
            "The company issuing new shares to the public",
            "The company repurchasing its own shares, reducing total shares outstanding",
            "A shareholder selling shares back to another shareholder",
            "A type of stock split"
          ],
          "hi": [
            "कं पनी का public को नए shares issue करना",
            "कं पनी का अपने खुद के shares repurchase करना, जिससे outstanding shares कम हो जाते हैं",
            "एक shareholder का दूसरे shareholder को shares वापस बेचना",
            "एक तरह का stock split"
          ],
          "ta": [
            "பொதுமக்களுக்கு புது shares issue பண்றது",
            "நிறுவனம் தன் சொந்த shares-ஐ repurchase பண்றது, total outstanding shares-ஐ குறைக்கும்",
            "ஒரு shareholder இன்னொரு shareholder-க்கு shares-ஐ திரும்ப விக்குறது",
            "ஒரு வகை stock split"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Buybacks reduce the share count, often boosting per-share metrics like EPS.",
          "hi": "Buybacks share count कम करते हैं, अक्सर EPS जैसी per-share metrics को boost करते हुए।",
          "ta": "Buybacks share count-ஐ குறைக்கும், பெரும்பாலும் EPS மாதிரி per-share metrics-ஐ boost பண்ணும்."
        }
      },
      {
        "question": {
          "en": "Why has MRF's share price remained extremely high compared to most Indian large-caps?",
          "hi": "ज़्यादातर Indian large-caps के मुकाबले MRF की share price इतनी ज़्यादा क्यों बनी हुई है?",
          "ta": "பெரும்பாலான Indian large-caps-உடன் compare பண்ணும்போது MRF-ன் share price ஏன் extremely high-ஆ இருக்கு?"
        },
        "options": {
          "en": [
            "It has done many stock splits",
            "It has never split its stock, unlike most other large companies",
            "It is not a real company",
            "Its shares cannot be traded"
          ],
          "hi": [
            "इसने कई stock splits किए हैं",
            "इसने कभी अपना stock split नहीं किया, ज़्यादातर बड़ी companies के उलट",
            "ये एक असली कं पनी नहीं है",
            "इसके shares trade नहीं किए जा सकते"
          ],
          "ta": [
            "அது நிறைய stock splits பண்ணியிருக்கு",
            "மற்ற பெரிய நிறுவனங்களை போல் இல்லாம, அது ஒருபோதும் அதன் stock-ஐ split பண்ணல",
            "அது ஒரு real நிறுவனம் இல்ல",
            "அதன் shares-ஐ trade பண்ண முடியாது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Unlike peers who split shares for affordability, MRF has kept a single, very high share price.",
          "hi": "उन peers के उलट जिन्होंने affordability के लिए shares split किए, MRF ने एक single, बहुत high share price बनाए रखी है।",
          "ta": "Affordability-க்காக shares-ஐ split பண்ண peers-ஐ போல் இல்லாம, MRF ஒரே, மிக high-ஆன share price-ஐ வச்சிருந்துச்சு."
        }
      },
      {
        "question": {
          "en": "Do stock splits, bonus issues, and buybacks change a company's fundamental underlying value?",
          "hi": "क्या stock splits, bonus issues, और buybacks किसी कं पनी की fundamental underlying value बदल देते हैं?",
          "ta": "Stock splits, bonus issues, buybacks நிறுவனத்தின் fundamental underlying value-ஐ மாற்றுமா?"
        },
        "options": {
          "en": [
            "Yes, they always increase value",
            "No — they change the share count and/or price, not the fundamental value",
            "Yes, they always decrease value",
            "Only buybacks change fundamental value"
          ],
          "hi": [
            "हाँ, वो हमेशा value बढ़ा देते हैं",
            "नहीं — वो share count और/या price बदलते हैं, fundamental value नहीं",
            "हाँ, वो हमेशा value घटा देते हैं",
            "सिर्फ buybacks fundamental value बदलते हैं"
          ],
          "ta": [
            "ஆமா, அவை எப்போதும் value-ஐ அதிகரிக்கும்",
            "இல்ல — அவை share count-ஐயும்/அல்லது price-ஐயும் மாற்றும், fundamental value-ஐ இல்ல",
            "ஆமா, அவை எப்போதும் value-ஐ குறைக்கும்",
            "Buybacks மட்டும் தான் fundamental value-ஐ மாற்றும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "These corporate actions are mechanical changes to share structure, not changes to the business's actual worth. 34. Mutual Funds vs Direct Stock Investing",
          "hi": "ये corporate actions share structure में mechanical बदलाव हैं, business की actual worth में बदलाव नहीं।",
          "ta": "இந்த corporate actions share structure-க்கு mechanical changes, business-ன் actual worth-க்கு changes இல்ல."
        }
      }
    ]
  },
  {
    "id": 34,
    "tier": "Intermediate",
    "title": {
      "en": "Mutual Funds vs Direct Stock Investing",
      "hi": "Mutual Funds vs Direct Stock Investing",
      "ta": "Mutual Funds vs Direct Stock Investing"
    },
    "opener": {
      "en": "Meera's cousin asked her a question she hadn't fully settled for herself yet: “You know all this now — so why not just pick stocks directly instead of paying a mutual fund manager to do it for you?”\n\nPaati's answer surprised her. “Because even professionals who do this full-time often don't beat a simple index. That's not opinion, kanna — it's something studied and measured every single year.”",
      "hi": "मीरा के cousin ने उससे एक सवाल पूछा जो उसने अभी तक पूरी तरह खुद के लिए settle नहीं किया था: “अब तो तुम्हें ये सब पता है — तो सीधे stocks खुद क्यों नहीं चुनती, इसकी बजाय एक mutual fund manager को अपनी तरफ से ये करने के लिए pay करने की?”\n\nपाटी के जवाब ने उसे surprise किया। “क्योंकि जो professionals ये full-time करते हैं वो भी अक्सर एक simple index को beat नहीं कर पाते। ये opinion नहीं है, कन्ना — ये कुछ ऐसा है जो हर साल study और measure किया जाता है।”",
      "ta": "மீராவின் cousin, அவளே இன்னும் fully settle பண்ணிக்காத ஒரு கேள்வியை கேட்டாள்: “இப்போ இதெல்லாம் தெரியுமே — அப்போ ஒரு mutual fund manager-க்கு pay பண்ணுறதுக்கு பதிலா, direct-ஆ ஏன் stocks pick பண்ணக்கூடாது?”\n\nபாட்டியோட answer அவளை ஆச்சர்யப்படுத்துச்சு. “ஏன்னா இதை full-time பண்ற professionals கூட பெரும்பாலும் ஒரு simple index-ஐ beat பண்ண மாட்டாங்க. இது opinion இல்ல கண்ணா — ஒவ்வொரு வருடமும் study பண்ணப்பட்டு measure பண்ணப்படுற ஒண்ணு.”"
    },
    "realStorySubtitle": {
      "en": "What Happens When You Actually Measure Fund Managers",
      "hi": "जब आप actually Fund Managers को Measure करते हैं तो क्या होता है",
      "ta": "Fund Managers-ஐ Actual-ஆ Measure பண்ணும்போது என்ன ஆகும்"
    },
    "realStoryBody": {
      "en": "SPIVA India, a well-known annual study, regularly compares actively managed Indian equity mutual funds against their benchmark indices (like the Nifty). Year after year, a significant majority of actively managed large-cap funds have failed to beat their benchmark index over longer periods, despite employing full-time professional analysts.\n\nThis doesn't mean active management never works — some funds and fund managers do outperform over long stretches. But it's a widely cited, data-backed reason many investors choose low-cost index funds or ETFs for at least part of their portfolio, rather than assuming a paid professional will automatically beat a simple market average.",
      "hi": "SPIVA India, एक well-known annual study, regularly actively managed Indian equity mutual funds को उनके benchmark indices (जैसे Nifty) के मुकाबले compare करती है। साल दर साल, actively managed large-cap funds का एक significant majority full-time professional analysts रखने के बावजूद longer periods में अपने benchmark index को beat करने में fail रहा है। इसका मतलब ये नहीं कि active management कभी काम नहीं करता — कुछ funds और fund managers लंबे stretches में outperform करते हैं। लेकिन ये एक widely cited, data-backed वजह है जिसके लिए कई investors अपने portfolio के कम से कम एक हिस्से के लिए low-cost index funds या ETFs चुनते हैं, बजाय ये मान लेने के कि एक paid professional automatically एक simple market average को beat कर देगा।",
      "ta": "Well-known ஒரு annual study SPIVA India, actively managed Indian equity mutual funds-ஐ அவற்றின் benchmark indices-உடன் (Nifty மாதிரி) regularly compare பண்ணும். வருடத்திற்கு வருடம், full-time professional analysts-ஐ employ பண்ணியும், longer periods-ல actively managed large-cap funds-ல significant majority அவற்றின் benchmark index-ஐ beat பண்ண fail ஆயிருக்காங்க. இதுக்கு அர்த்தம் active management ஒருபோதும் work ஆகாதுனு இல்ல — சில funds-உம் fund managers-உம் long stretches-ல outperform பண்ணுவாங்க. ஆனா, ஒரு paid professional automatic- ஆ ஒரு simple market average-ஐ beat பண்ணுவார்னு assume பண்றதுக்கு பதிலா, நிறைய investors தங்க portfolio-ன் குறைந்தது ஒரு பகுதிக்கு low-cost index funds அல்லது ETFs தேர்ந்தெடுக்கிற widely cited, data-backed காரணம் இது."
    },
    "body": {
      "en": "Direct Stock Investing • Pros: Full control, no fund management fees, direct ownership of exactly the businesses you choose. • Cons: Requires real time, knowledge, and discipline (Lessons 16-31) — and concentrated mistakes hurt more without built-in diversification.\n\nMutual Funds • Pros: Professional management, built-in diversification across many stocks, far less day-to-day effort required from you. • Cons: Management fees (the 'expense ratio') reduce returns over time, and as the SPIVA data shows, many funds still don't beat a simple index.",
      "hi": "Direct Stock Investing • Pros: Full control, कोई fund management fees नहीं, exactly उन businesses का direct ownership जिन्हें आप चुनते हैं।\n\n• Cons: असली time, knowledge, और discipline चाहिए (Lessons 16-31) — और built-in diversification के बिना concentrated mistakes ज़्यादा नुकसान करती हैं।\n\nMutual Funds • Pros: Professional management, कई stocks में built-in diversification, आपसे बहुत कम day-to-day effort चाहिए। • Cons: Management fees ('expense ratio') समय के साथ returns कम करती हैं, और जैसा SPIVA data दिखाता है, कई funds अभी भी एक simple index को beat नहीं कर पाते।",
      "ta": "Direct Stock Investing • Pros: Full control, fund management fees இல்ல, நீங்க தேர்ந்தெடுக்கும் businesses-ஐ exactly direct ownership.\n\n• Cons: Real நேரமும் knowledge-உம் discipline-உம் தேவை (Lessons 16-31) — built-in diversification இல்லாம concentrated mistakes அதிகமா hurt பண்ணும்.\n\nMutual Funds • Pros: Professional management, நிறைய stocks முழுக்க built-in diversification, உங்களிடமிருந்து ரொம்ப குறைவான day-to-day effort தேவை.\n\n• Cons: Management fees (‘expense ratio’) நேரம் ஆக returns-ஐ குறைக்கும், SPIVA data காட்டுற மாதிரி, நிறைய funds இன்னும் ஒரு simple index-ஐ beat பண்ணுறதில்ல."
    },
    "keyTakeaway": {
      "en": "Direct stocks offer control at the cost of your own time and discipline; mutual funds offer convenience at the cost of fees that studies show don't always buy outperformance. Many experienced investors use both — direct stocks for companies they've genuinely researched, funds for broad, low-effort diversification.",
      "hi": "Direct stocks आपके खुद के time और discipline की कीमत पर control देते हैं; mutual funds fees की कीमत पर convenience देते हैं जो studies के अनुसार हमेशा outperformance नहीं खरीदतीं। कई experienced investors दोनों इस्तेमाल करते हैं — genuinely research की हुई companies के लिए direct stocks, broad, low- effort diversification के लिए funds।",
      "ta": "Direct stocks, உங்க சொந்த நேரத்திற்கும் discipline-க்கும் cost-ல control தரும்; Mutual funds, studies காட்டுற மாதிரி எப்போதும் outperformance-ஐ வாங்காத fees-க்கு cost-ல convenience தரும். நிறைய experienced investors இரண்டையும் பயன்படுத்துவாங்க — genuinely research பண்ணின நிறுவனங்களுக்கு direct stocks, broad, low-effort diversification-க்கு funds."
    },
    "quiz": [
      {
        "question": {
          "en": "What does the SPIVA India study regularly compare?",
          "hi": "SPIVA India study regularly किसे compare करती है?",
          "ta": "SPIVA India study regularly எதை compare பண்ணும்?"
        },
        "options": {
          "en": [
            "Bank interest rates over time",
            "Actively managed Indian equity mutual funds against their benchmark indices",
            "Gold prices versus silver prices",
            "IPO listing gains"
          ],
          "hi": [
            "समय के साथ bank interest rates को",
            "Actively managed Indian equity mutual funds को उनके benchmark indices के मुकाबले",
            "Gold prices को silver prices के मुकाबले",
            "IPO listing gains को"
          ],
          "ta": [
            "நேரத்தில் bank interest rates",
            "Actively managed Indian equity mutual funds-ஐ அவற்றின் benchmark indices-உடன்",
            "Gold prices-ஐ silver prices-உடன்",
            "IPO listing gains"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "SPIVA India tracks how well professionally managed funds perform relative to simple benchmark indices like the Nifty.",
          "hi": "SPIVA India track करती है कि professionally managed funds, Nifty जैसे simple benchmark indices के मुकाबले कितना अच्छा perform करते हैं।",
          "ta": "Professionally managed funds, Nifty மாதிரி simple benchmark indices-உடன் relative-ஆ எவ்வளவு நல்லா perform பண்றாங்கனு SPIVA India track பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What has the SPIVA India study generally found about actively managed large-cap funds?",
          "hi": "SPIVA India study ने actively managed large-cap funds के बारे में आमतौर पर क्या पाया है?",
          "ta": "Actively managed large-cap funds-ஐ பத்தி SPIVA India study generally என்ன கண்டுபிடிச்சுச்சு?"
        },
        "options": {
          "en": [
            "Nearly all of them consistently beat their benchmark index",
            "A significant majority have failed to beat their benchmark index over longer periods",
            "Active funds always charge zero fees",
            "The study found no meaningful difference ever"
          ],
          "hi": [
            "लगभग सभी consistently अपने benchmark index को beat करते हैं",
            "एक significant majority longer periods में अपने benchmark index को beat करने में fail रहा है",
            "Active funds हमेशा zero fees charge करते हैं",
            "Study को कभी कोई meaningful difference नहीं मिला"
          ],
          "ta": [
            "அவை கிட்டத்தட்ட எல்லாமே consistently அவற்றின் benchmark index-ஐ beat பண்ணும்",
            "Longer periods-ல significant majority அவற்றின் benchmark index-ஐ beat பண்ண fail ஆயிருக்காங்க",
            "Active funds எப்போதும் zero fees charge பண்ணும்",
            "Study எந்த meaningful difference-ஐயும் ஒருபோதும் கண்டுபிடிக்கல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This is a well-documented, data-backed finding that has shaped many investors' preference for index funds.",
          "hi": "ये एक well-documented, data-backed finding है जिसने कई investors की index funds के लिए preference को shape किया है।",
          "ta": "நிறைய investors-ன் index funds-க்கான preference-ஐ shape பண்ண இது ஒரு well-documented, data-backed finding."
        }
      },
      {
        "question": {
          "en": "What is a key advantage of direct stock investing over mutual funds?",
          "hi": "Mutual funds के मुकाबले direct stock investing का एक key advantage क्या है?",
          "ta": "Mutual funds-ஐ விட direct stock investing-ன் key advantage என்ன?"
        },
        "options": {
          "en": [
            "Guaranteed higher returns",
            "Full control and no fund management fees",
            "Zero effort required",
            "Automatic diversification"
          ],
          "hi": [
            "Guaranteed higher returns",
            "Full control और कोई fund management fees नहीं",
            "Zero effort चाहिए",
            "Automatic diversification"
          ],
          "ta": [
            "Guaranteed higher returns",
            "Full control, fund management fees இல்ல",
            "Zero effort தேவை",
            "Automatic diversification"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Direct investing avoids expense ratios and gives the investor full control over stock selection.",
          "hi": "Direct investing expense ratios avoid करता है और investor को stock selection पर full control देता है।",
          "ta": "Direct investing expense ratios-ஐ avoid பண்ணும், stock selection-ல investor-க்கு full control தரும்."
        }
      },
      {
        "question": {
          "en": "What is the 'expense ratio' in the context of mutual funds?",
          "hi": "Mutual funds के context में 'expense ratio' क्या है?",
          "ta": "Mutual funds context-ல ‘expense ratio’ என்றால் என்ன?"
        },
        "options": {
          "en": [
            "A one-time IPO fee",
            "The ongoing management fee that reduces mutual fund returns over time",
            "A government tax on dividends",
            "The fund's minimum investment amount"
          ],
          "hi": [
            "एक one-time IPO fee",
            "वो ongoing management fee जो समय के साथ mutual fund returns कम करती है",
            "Dividends पर एक government tax",
            "Fund की minimum investment amount"
          ],
          "ta": [
            "ஒரு one-time IPO fee",
            "நேரம் ஆக mutual fund returns-ஐ குறைக்கும் ongoing management fee",
            "Dividends-ல ஒரு government tax",
            "Fund-ன் minimum investment amount"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This fee is deducted regularly and can meaningfully affect long-term returns.",
          "hi": "ये fee regularly deduct होती है और long-term returns को meaningfully affect कर सकती है।",
          "ta": "இந்த fee regularly deduct பண்ணப்படும், long-term returns-ஐ meaningfully affect பண்ணலாம்."
        }
      },
      {
        "question": {
          "en": "According to the lesson, how do many experienced investors combine both approaches?",
          "hi": "Lesson के अनुसार, कई experienced investors दोनों approaches को कै से combine करते हैं?",
          "ta": "Lesson-ன் படி, நிறைய experienced investors இரண்டு approaches-ஐயும் எப்படி combine பண்றாங்க?"
        },
        "options": {
          "en": [
            "They only ever use one exclusively",
            "Direct stocks for researched companies, mutual funds for broad, low-effort diversification",
            "Mutual funds only for very short-term trading",
            "They avoid both entirely"
          ],
          "hi": [
            "वो सिर्फ एक ही exclusively इस्तेमाल करते हैं",
            "Research की हुई companies के लिए direct stocks, broad, low-effort diversification के लिए mutual funds",
            "सिर्फ बहुत short-term trading के लिए mutual funds",
            "वो दोनों से पूरी तरह बचते हैं"
          ],
          "ta": [
            "அவங்க ஒண்ணை மட்டும் exclusively பயன்படுத்துவாங்க",
            "Research பண்ணின நிறுவனங்களுக்கு direct stocks, broad, low-effort diversification-க்கு mutual funds",
            "Very short-term trading-க்கு மட்டும் mutual funds",
            "இரண்டையும் முழுசா avoid பண்றாங்க"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This blended approach leverages the strengths of both direct investing and professionally managed diversification. 35. Introduction to ETFs",
          "hi": "ये blended approach direct investing और professionally managed diversification दोनों की strengths का इस्तेमाल करता है।",
          "ta": "Direct investing-ன் strengths-ஐயும் professionally managed diversification-ஐயும் இந்த blended approach leverage பண்ணும்."
        }
      }
    ]
  },
  {
    "id": 35,
    "tier": "Intermediate",
    "title": {
      "en": "Introduction to ETFs",
      "hi": "ETFs का परिचय",
      "ta": "ETFs அறிமுகம்"
    },
    "opener": {
      "en": "“Is there something that combines the diversification of a mutual fund with the ease of just buying a stock?” Meera asked, half-expecting the answer to be no. “There is,” Paati said. “And it's been quietly around in India for over two decades.”",
      "hi": "“क्या कोई ऐसी चीज़ है जो एक mutual fund की diversification को बस एक stock खरीदने जितनी आसानी के साथ combine करती है?” मीरा ने पूछा, आधा-आधा उम्मीद करते हुए कि जवाब ना होगा। “है,” पाटी ने कहा। “और ये India में दो दशकों से भी ज़्यादा समय से चुपचाप मौजूद है।”",
      "ta": "“ஒரு mutual fund-ன் diversification-ஐயும், வெறுமனே ஒரு stock வாங்குற ease-ஐயும் combine பண்ற ஏதாவது இருக்கா?” இல்லைன்னு answer வரும்னு பாதி எதிர்பார்த்து மீரா கேட்டாள். “இருக்கு,” பாட்டி சொன்னார். “இரண்டு decades-க்கும் மேலா இந்தியாவில் அமைதியா இருக்கு.”"
    },
    "realStorySubtitle": {
      "en": "India's First ETF, Long Before ETFs Were Trendy",
      "hi": "India का पहला ETF, ETFs के Trendy बनने से बहुत पहले",
      "ta": "ETFs Trendy ஆகுறதற்கு நிறைய முன்னாடியே, இந்தியாவின் முதல் ETF"
    },
    "realStoryBody": {
      "en": "Nifty BeES, launched in India in the early 2000s, was the country's first Exchange-Traded Fund (ETF) — designed to track the Nifty 50 index and be bought or sold on the stock exchange just like an ordinary share, well before ETFs became a mainstream topic among retail investors.\n\nIn the years since, the range of Indian ETFs has expanded well beyond just Nifty and Sensex trackers to include gold ETFs, sector-specific ETFs, and international-index ETFs — giving ordinary retail investors exchange-traded access to entire baskets of assets with a single buy order.",
      "hi": "Nifty BeES, जो 2000s की शुरुआत में India में launch हुआ, देश का पहला Exchange-Traded Fund (ETF) था — Nifty 50 index को track करने के लिए design किया गया और exchange पर बिल्कुल एक ordinary share की तरह खरीदा या बेचा जा सकता था, ETFs के retail investors के बीच mainstream topic बनने से काफी पहले।\n\nउसके बाद के सालों में, Indian ETFs की range सिर्फ Nifty और Sensex trackers से कहीं आगे बढ़ कर gold ETFs, sector- specific ETFs, और international-index ETFs को शामिल करने लगी — ordinary retail investors को एक ही buy order से पूरी asset baskets तक exchange-traded access देते हुए।",
      "ta": "2000-களின் ஆரம்பத்தில் இந்தியாவில் launch ஆன Nifty BeES, நாட்டின் முதல் Exchange-Traded Fund (ETF) — Nifty 50 index-ஐ track பண்ணவும், ஒரு ordinary share மாதிரியே stock exchange- ல வாங்கவும் விக்கவும் design பண்ணப்பட்டது, retail investors-க்கு இடையே ETFs ஒரு mainstream topic ஆகுறதுக்கு நிறைய முன்னாடியே.\n\nஅதற்குப் பிறகு வருடங்களில், Indian ETFs-ன் range வெறும் Nifty, Sensex trackers-ஐ தாண்டி, gold ETFs, sector-specific ETFs, international-index ETFs-ஐ include பண்ணி expand ஆயிருக்கு — ordinary retail investors-க்கு ஒரே ஒரு buy order-உடன், முழு asset baskets-க்கும் exchange-traded access தந்திருக்கு."
    },
    "body": {
      "en": "What an ETF Actually Is An Exchange-Traded Fund (ETF) holds a basket of assets (like all 50 Nifty stocks, or gold) but trades on the stock exchange throughout the day exactly like an individual share — combining a mutual fund's built-in diversification with a stock's trading flexibility.\n\nHow ETFs Differ From Regular Mutual Funds • Trading: ETFs trade continuously during market hours at live prices; mutual funds are bought/sold once a day at a single end-of-day price (the NAV). • Cost: Most ETFs (especially index-tracking ones) tend to have lower expense ratios than actively managed mutual funds. • Management style: Most ETFs are passive (simply tracking an index), unlike many mutual funds which are actively managed.",
      "hi": "ETF असल में क्या है एक Exchange-Traded Fund (ETF) assets की एक basket hold करता है (जैसे सभी 50 Nifty stocks, या gold) लेकिन stock exchange पर दिन भर बिल्कुल एक individual share की तरह trade करता है — एक mutual fund की built-in diversification को एक stock की trading flexibility के साथ combine करते हुए।\n\nETFs Regular Mutual Funds से कै से अलग हैं • Trading: ETFs market hours के दौरान continuously live prices पर trade करते हैं; mutual funds दिन में एक बार single end-of-day price (NAV) पर खरीदे/बेचे जाते हैं।\n\n• Cost: ज़्यादातर ETFs (खासकर index-tracking वाले) में actively managed mutual funds से कम expense ratios होते हैं।\n\n• Management style: ज़्यादातर ETFs passive होते हैं (बस एक index को track करते हुए), कई mutual funds के उलट जो actively managed होते हैं।",
      "ta": "ETF உண்மையில் என்ன ஒரு Exchange-Traded Fund (ETF), ஒரு asset basket-ஐ (எல்லா 50 Nifty stocks மாதிரி, அல்லது gold) hold பண்ணும், ஆனா நாள் முழுக்க ஒரு individual share மாதிரியே stock exchange-ல trade ஆகும் — ஒரு mutual fund-ன் built-in diversification-ஐயும், ஒரு stock-ன் trading flexibility-ஐயும் combine பண்ணி.\n\nETFs Regular Mutual Funds-லிருந்து எப்படி வித்தியாசம் • Trading: ETFs market hours முழுக்க live prices-ல continuously trade ஆகும்; mutual funds ஒரு நாளைக்கு ஒரே ஒரு தடவை, day-end price-ல (NAV) வாங்கப்பட்டு/விக்கப்படும்.\n\n• Cost: பெரும்பாலான ETFs (குறிப்பா index-tracking ones) actively managed mutual funds-ஐ விட குறைவான expense ratios கொண்டிருக்க tend ஆகும்.\n\n• Management style: நிறைய mutual funds actively managed-ஆ இருக்கும் மாதிரி இல்லாம, பெரும்பாலான ETFs passive (வெறுமனே ஒரு index-ஐ track பண்ணும்)."
    },
    "keyTakeaway": {
      "en": "ETFs give you a diversified basket in one exchange-traded unit, often at a lower cost than active mutual funds — a natural next step once you understand indices (Lesson 5), diversification (Lesson 30), and the active-vs-passive debate (Lesson 34). Nifty BeES shows this isn't a new fad; it's a two-decade-old, proven part of the Indian market.",
      "hi": "ETFs आपको एक diversified basket एक exchange-traded unit में देते हैं, अक्सर active mutual funds से कम cost पर — एक natural next step एक बार जब आप indices (Lesson 5), diversification (Lesson 30), और active-vs-passive debate (Lesson 34) समझ लें। Nifty BeES दिखाता है कि ये कोई नया fad नहीं है; ये Indian market का दो दशक पुराना, proven हिस्सा है।",
      "ta": "ETFs, ஒரு exchange-traded unit-ல ஒரு diversified basket-ஐ தரும், பெரும்பாலும் active mutual funds-ஐ விட குறைவான cost-ல — indices-ஐயும் (Lesson 5), diversification-ஐயும் (Lesson 30), active-vs-passive debate-ஐயும் (Lesson 34) புரிஞ்சுக்கிட்ட பிறகு ஒரு natural next step. இது ஒரு புது fad இல்லைனு Nifty BeES காட்டுது; Indian market-ல இது ஒரு two-decade-old, proven part."
    },
    "quiz": [
      {
        "question": {
          "en": "What is an ETF (Exchange-Traded Fund)?",
          "hi": "ETF (Exchange-Traded Fund) क्या है?",
          "ta": "ஒரு ETF (Exchange-Traded Fund) என்றால் என்ன?"
        },
        "options": {
          "en": [
            "A single individual stock",
            "A fund holding a basket of assets that trades on the exchange like a regular share",
            "A type of bank fixed deposit",
            "A government bond"
          ],
          "hi": [
            "एक single individual stock",
            "एक fund जो assets की एक basket hold करता है और exchange पर एक regular share की तरह trade करता है",
            "एक तरह का bank fixed deposit",
            "एक government bond"
          ],
          "ta": [
            "ஒரே ஒரு individual stock",
            "ஒரு regular share மாதிரி exchange-ல trade ஆகும், asset basket-ஐ hold பண்ற ஒரு fund",
            "ஒரு வகை bank fixed deposit",
            "ஒரு government bond"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "ETFs combine diversified holdings with the trading flexibility of an individual stock.",
          "hi": "ETFs diversified holdings को एक individual stock की trading flexibility के साथ combine करते हैं।",
          "ta": "ETFs, diversified holdings-ஐயும் ஒரு individual stock-ன் trading flexibility-ஐயும் combine பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What was Nifty BeES, mentioned in the story?",
          "hi": "Story में mentioned Nifty BeES क्या था?",
          "ta": "கதையில் mention பண்ணப்பட்ட Nifty BeES என்ன?"
        },
        "options": {
          "en": [
            "A recently launched cryptocurrency",
            "India's first ETF, launched in the early 2000s to track the Nifty 50",
            "A type of mutual fund fee",
            "A government savings scheme"
          ],
          "hi": [
            "एक हाल ही में launch हुई cryptocurrency",
            "India का पहला ETF, जो 2000s की शुरुआत में Nifty 50 को track करने के लिए launch हुआ",
            "एक तरह की mutual fund fee",
            "एक government savings scheme"
          ],
          "ta": [
            "Recently launch ஆன ஒரு cryptocurrency",
            "Nifty 50-ஐ track பண்ண 2000-களின் ஆரம்பத்தில் launch ஆன இந்தியாவின் முதல் ETF",
            "ஒரு mutual fund fee-ன் வகை",
            "ஒரு government savings scheme"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "It was a pioneering Indian ETF, showing this investment type has existed in India for over two decades.",
          "hi": "ये एक pioneering Indian ETF था, जो दिखाता है कि ये investment type India में दो दशकों से भी ज़्यादा समय से मौजूद है।",
          "ta": "இது ஒரு pioneering Indian ETF, இந்த investment type இந்தியாவில் இரண்டு decades-க்கும் மேலா இருக்குனு காட்டுது."
        }
      },
      {
        "question": {
          "en": "How does ETF trading differ from regular mutual fund trading?",
          "hi": "ETF trading, regular mutual fund trading से कै से अलग है?",
          "ta": "Regular mutual fund trading-லிருந்து ETF trading எப்படி வித்தியாசம்?"
        },
        "options": {
          "en": [
            "They trade identically in every way",
            "ETFs trade continuously during market hours at live prices; mutual funds trade once a day at end-of-day NAV",
            "Mutual funds trade continuously, ETFs trade once a day",
            "Neither can be bought or sold by retail investors"
          ],
          "hi": [
            "दोनों हर तरह से बिल्कुल identical trade करते हैं",
            "ETFs market hours के दौरान continuously live prices पर trade करते हैं; mutual funds दिन में एक बार end-of-day NAV पर trade करते हैं",
            "Mutual funds continuously trade करते हैं, ETFs दिन में एक बार",
            "दोनों में से किसी को भी retail investors खरीद या बेच नहीं सकते"
          ],
          "ta": [
            "அவை ஒவ்வொரு வழியிலும் identical-ஆ trade ஆகும்",
            "ETFs market hours முழுக்க live prices-ல continuously trade ஆகும்; mutual funds ஒரு நாளைக்கு ஒரு தடவை end-of-day NAV-ல trade ஆகும்",
            "Mutual funds continuously trade ஆகும், ETFs ஒரு நாளைக்கு ஒரு தடவை trade ஆகும்",
            "இரண்டையுமே retail investors வாங்கவோ விக்கவோ முடியாது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This is a key structural difference — ETFs offer intraday trading flexibility unlike traditional mutual funds.",
          "hi": "ये एक key structural difference है — ETFs, traditional mutual funds के उलट intraday trading flexibility देते हैं।",
          "ta": "Traditional mutual funds-ஐ போல் இல்லாம, ETFs intraday trading flexibility தரும் — இது ஒரு key structural difference."
        }
      },
      {
        "question": {
          "en": "How do most ETF expense ratios generally compare to actively managed mutual funds?",
          "hi": "ज़्यादातर ETF expense ratios actively managed mutual funds के मुकाबले आमतौर पर कै से होते हैं?",
          "ta": "பெரும்பாலான ETF expense ratios, generally actively managed mutual funds-உடன் எப்படி compare ஆகும்?"
        },
        "options": {
          "en": [
            "ETFs are always more expensive",
            "Most ETFs, especially index-tracking ones, tend to have lower expense ratios",
            "There is no difference in cost",
            "ETFs charge no fees of any kind"
          ],
          "hi": [
            "ETFs हमेशा ज़्यादा expensive होते हैं",
            "ज़्यादातर ETFs, खासकर index-tracking वाले, में कम expense ratios होते हैं",
            "Cost में कोई फर्क नहीं है",
            "ETFs किसी भी तरह की fees charge नहीं करते"
          ],
          "ta": [
            "ETFs எப்போதும் அதிக expensive",
            "பெரும்பாலான ETFs, குறிப்பா index-tracking ones, குறைவான expense ratios கொண்டிருக்க tend ஆகும்",
            "Cost-ல எந்த வித்தியாசமும் இல்ல",
            "ETFs எந்த வகை fees-உம் charge பண்ணாது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Passive index-tracking generally costs less to manage than active stock-picking, reflected in lower fees.",
          "hi": "Passive index-tracking को manage करना active stock-picking से आमतौर पर सस्ता पड़ ता है, जो कम fees में reflect होता है।",
          "ta": "Passive index-tracking generally active stock-picking-ஐ விட manage பண்ண குறைவா cost ஆகும், குறைவான fees-ல இது reflect ஆகும்."
        }
      },
      {
        "question": {
          "en": "What kinds of assets can Indian ETFs track today, beyond just Nifty/Sensex?",
          "hi": "आज Indian ETFs सिर्फ Nifty/Sensex से आगे किस तरह के assets को track कर सकते हैं?",
          "ta": "இன்று Nifty/Sensex-ஐ தாண்டி, Indian ETFs என்ன வகை assets-ஐ track பண்ணும்?"
        },
        "options": {
          "en": [
            "Only foreign currencies",
            "Gold, specific sectors, and international indices, among others",
            "Only government bonds",
            "ETFs can only track a single stock"
          ],
          "hi": [
            "सिर्फ foreign currencies",
            "Gold, specific sectors, और international indices, और भी बहुत कुछ",
            "सिर्फ government bonds",
            "ETFs सिर्फ एक single stock को track कर सकते हैं"
          ],
          "ta": [
            "Foreign currencies மட்டும்",
            "Gold, specific sectors, international indices, மற்றும் இன்னும் பல",
            "Government bonds மட்டும்",
            "ETFs ஒரே ஒரு stock-ஐ மட்டும் தான் track பண்ண முடியும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The Indian ETF market has expanded well beyond simple broad-index trackers to cover many asset types. ADVANCED 36. Chart Patterns: Head & Shoulders, Triangles",
          "hi": "Indian ETF market simple broad-index trackers से कहीं आगे बढ़ कर कई asset types तक फैल गया है।",
          "ta": "Simple broad-index trackers-ஐ தாண்டி, நிறைய asset types-ஐ cover பண்ண Indian ETF market expand ஆயிருக்கு."
        }
      }
    ]
  },
  {
    "id": 36,
    "tier": "Advanced",
    "title": {
      "en": "Chart Patterns: Head & Shoulders, Triangles",
      "hi": "Chart Patterns: Head & Shoulders, Triangles",
      "ta": "Chart Patterns: Head & Shoulders, Triangles"
    },
    "opener": {
      "en": "Arjun's charts now showed shapes with names — “head and shoulders,” “triangles” — that he swore could hint at what came next. “This isn't some new internet theory,” he told Meera. “People were writing this down before either of our grandparents were born.”",
      "hi": "अर्जुन के charts अब नामों वाले shapes दिखाते थे — “head and shoulders,” “triangles” — जिनकी कसम खाकर वो कहता था कि ये आगे क्या होगा इसका hint दे सकते हैं। “ये कोई नई internet theory नहीं है,” उसने मीरा से कहा। “लोग इसे तब लिख रहे थे जब हम दोनों के grandparents भी पैदा नहीं हुए थे।”",
      "ta": "அர்ஜுனின் charts இப்போ பெயர்களுடன் shapes-ஐ காட்டுச்சு — “head and shoulders,” “triangles” — அடுத்து என்ன வரும்னு hint பண்ணும்னு அவன் swear பண்ணினான். “இது ஏதோ புது internet theory இல்ல,” மீராவிடம் சொன்னான். “நம்ம grandparents பிறக்கிறதுக்கு முன்னாடியே மக்கள் இதை எழுதி வைச்சிருக்காங்க.”"
    },
    "realStorySubtitle": {
      "en": "A Century-Old Idea, Still on Every Trading Screen",
      "hi": "एक Century पुराना Idea, आज भी हर Trading Screen पर",
      "ta": "ஒரு Century-Old Idea, இன்னும் ஒவ்வொரு Trading Screen-லும்"
    },
    "realStoryBody": {
      "en": "Much of modern chart-pattern reading traces back to Richard Schabacker and later Robert Edwards and John Magee, whose 1948 book “Technical Analysis of Stock Trends” formally catalogued patterns like Head & Shoulders and Triangles — built on even earlier ideas from Charles Dow's writings in the late 1800s.\n\nNearly a century later, the same named patterns are drawn automatically by modern trading apps worldwide, including in India — a reminder that much of technical analysis is a long-running, collectively observed body of pattern behaviour, not a recent invention.",
      "hi": "modern chart-pattern reading का ज़्यादातर हिस्सा Richard Schabacker और बाद में Robert Edwards और John Magee तक जाता है, जिनकी 1948 की किताब “Technical Analysis of Stock Trends” ने Head & Shoulders और Triangles जैसे patterns को formally catalogue किया — जो Charles Dow के 1800s के आखिर के writings के और भी पुराने ideas पर बनी थी।\n\nलगभग एक सदी बाद, वही नामों वाले patterns आज दुनिया भर में, India समेत, modern trading apps द्वारा automatically draw किए जाते हैं — एक reminder कि technical analysis का ज़्यादातर हिस्सा एक लंबे समय से चलता आ रहा, collectively observed pattern behaviour का body है, कोई हाल की invention नहीं।",
      "ta": "நிறைய modern chart-pattern reading, Richard Schabacker-க்கும் பிறகு Robert Edwards-க்கும் John Magee-க்கும் trace ஆகும், அவங்க 1948 புத்தகம் “Technical Analysis of Stock Trends,” Head & Shoulders, Triangles மாதிரி patterns-ஐ formally catalog பண்ணுச்சு — 1800-களின் பிற்பகுதியில் Charles Dow-ன் writings-லிருந்து இன்னும் ஆரம்ப ideas-ன் மேல கட்டப்பட்டது.\n\nகிட்டத்தட்ட ஒரு century கழித்து, இந்தியாவை உட்பட உலகம் முழுக்க இருக்கிற modern trading apps- ஆல, அதே பெயருடைய patterns automatic-ஆ draw பண்ணப்படுது — technical analysis-ல பெரும்பாலானது ஒரு long-running, collectively observed pattern behaviour-ன் body தான், ஒரு recent invention இல்லைனு ஒரு நினைவூட்டல்."
    },
    "body": {
      "en": "Head & Shoulders — A Reversal Pattern Three peaks, with the middle one (the 'head') higher than the two surrounding 'shoulders.' It's watched as a signal that an uptrend may be running out of steam and reversing downward, especially once the 'neckline' connecting the pattern's lows is broken.\n\nTriangles — Continuation Patterns Price movements that narrow into a triangular shape as buyers and sellers compress into a tighter range, often watched as a sign that the existing trend may resume once price finally breaks out of the narrowing range, in either direction.\n\nHead & Shoulders: a classic reversal pattern — two smaller peaks framing one larger peak, with a neckline.\n\nA narrowing triangle: highs compress lower, lows compress higher, until price breaks out of the squeeze.",
      "hi": "Head & Shoulders — एक Reversal Pattern तीन peaks, जिसमें बीच वाला ('head') दोनों आसपास के 'shoulders' से ऊँ चा होता है। इसे इस signal के तौर पर देखा जाता है कि एक uptrend शायद अपनी दम खो रहा है और नीचे की तरफ reverse हो रहा है, खासकर एक बार जब pattern के lows को जोड़ ने वाली 'neckline' टूट जाए।\n\nTriangles — Continuation Patterns Price movements जो एक triangular shape में narrow हो जाते हैं जैसे buyers और sellers एक tighter range में compress होते हैं, अक्सर इस signal के तौर पर देखा जाता है कि existing trend शायद resume हो सकता है एक बार जब price आखिरकार narrowing range से किसी भी direction में break out कर जाए।\n\nHead & Shoulders: एक classic reversal pattern — एक बड़े peak को frame करती दो छोटी peaks, एक neckline के साथ।\n\nNarrow होता एक triangle: highs नीचे compress होते हैं, lows ऊपर compress होते हैं, जब तक price squeeze से break out ना हो जाए।",
      "ta": "Head & Shoulders — ஒரு Reversal Pattern மூணு peaks, middle ஒண்ணு (‘head’) இரண்டு சுற்றியிருக்கிற ‘shoulders’-ஐ விட உயரமா. ஒரு uptrend steam-ல run out ஆகி downward reverse ஆகலாம்னு ஒரு signal-ஆ இது watch பண்ணப்படும், pattern- ன் lows-ஐ connect பண்ற ‘neckline’ break ஆன பிறகு குறிப்பா.\n\nTriangles — Continuation Patterns Buyers, sellers ஒரு tighter range-க்குள் compress ஆகும்போது ஒரு triangular shape-க்குள் narrow ஆகும் price movements, price finally narrowing range-லிருந்து ஏதோ ஒரு direction-ல break out ஆனதும் existing trend resume ஆகலாம்னு பெரும்பாலும் ஒரு sign-ஆ watch பண்ணப்படும்.\n\nHead & Shoulders: ஒரு classic reversal pattern — ஒரு பெரிய peak-ஐ frame பண்ற இரண்டு சின்ன peaks, ஒரு neckline-உடன்.\n\nNarrow ஆகும் ஒரு triangle: highs கீழ compress ஆகும், lows மேல compress ஆகும், price squeeze-லிருந்து break out ஆகும் வரைக்கும்."
    },
    "keyTakeaway": {
      "en": "Chart patterns are named, widely recognised shapes formed by collective buyer-seller",
      "hi": "Chart patterns collective buyer-seller behaviour से बने नामों वाले, widely recognised shapes हैं, जिन्हें लगभग एक सदी से catalogue किया गया है। वो tendencies सुझाते हैं, certainties नहीं — इस book के हर technical tool की तरह, sound risk management के साथ इस्तेमाल करना सबसे अच्छा है, कभी अके ले नहीं।",
      "ta": "Chart patterns, collective buyer-seller behaviour-ஆல form ஆகி, கிட்டத்தட்ட"
    },
    "quiz": [
      {
        "question": {
          "en": "What does a Head & Shoulders pattern typically signal?",
          "hi": "एक Head & Shoulders pattern आमतौर पर क्या signal देता है?",
          "ta": "ஒரு Head & Shoulders pattern typically என்ன signal பண்ணும்?"
        },
        "options": {
          "en": [
            "A guaranteed price doubling",
            "A possible reversal of the current uptrend",
            "A dividend announcement",
            "A stock split"
          ],
          "hi": [
            "एक guaranteed price doubling",
            "current uptrend का एक possible reversal",
            "एक dividend announcement",
            "एक stock split"
          ],
          "ta": [
            "ஒரு guaranteed price doubling",
            "Current uptrend-ன் possible reversal",
            "ஒரு dividend announcement",
            "ஒரு stock split"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The pattern is watched as an early warning that upward momentum may be fading and reversing.",
          "hi": "इस pattern को एक early warning के तौर पर देखा जाता है कि upward momentum शायद कम हो रहा है और reverse हो रहा है।",
          "ta": "Upward momentum fade ஆகி reverse ஆகலாம்னு ஒரு early warning-ஆ இந்த pattern watch பண்ணப்படும்."
        }
      },
      {
        "question": {
          "en": "What generally happens with a Triangle pattern?",
          "hi": "एक Triangle pattern के साथ आमतौर पर क्या होता है?",
          "ta": "ஒரு Triangle pattern-உடன் generally என்ன ஆகும்?"
        },
        "options": {
          "en": [
            "Price always crashes to zero",
            "Price narrows into a tighter range before often continuing its prior trend on breakout",
            "It only appears once per stock ever",
            "It guarantees a bullish outcome"
          ],
          "hi": [
            "Price हमेशा zero तक crash हो जाती है",
            "Price एक tighter range में narrow हो जाती है इससे पहले कि वो breakout पर अक्सर अपने पिछले trend को continue करे",
            "ये किसी stock में सिर्फ एक बार दिखता है",
            "ये एक bullish outcome guarantee करता है"
          ],
          "ta": [
            "Price எப்போதும் zero-க்கு crash ஆகும்",
            "Breakout-ல பெரும்பாலும் prior trend-ஐ continue பண்றதுக்கு முன், price ஒரு tighter range-க்குள் narrow ஆகும்",
            "அது ஒரு stock-க்கு ஒரே ஒரு தடவை தான் appear ஆகும்",
            "அது ஒரு bullish outcome-ஐ guarantee பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Triangles are typically viewed as continuation patterns, with a breakout suggesting the prior trend may resume.",
          "hi": "Triangles को आमतौर पर continuation patterns के तौर पर देखा जाता है, एक breakout के साथ ये सुझाव कि पिछला trend resume हो सकता है।",
          "ta": "Triangles typically continuation patterns-ஆ view பண்ணப்படும், ஒரு breakout prior trend resume ஆகலாம்னு suggest பண்ணும்."
        }
      },
      {
        "question": {
          "en": "Who formally catalogued patterns like Head & Shoulders in their influential 1948 book?",
          "hi": "अपनी influential 1948 की किताब में Head & Shoulders जैसे patterns को किसने formally catalogue किया?",
          "ta": "அவங்க influential 1948 புத்தகத்தில் Head & Shoulders மாதிரி patterns-ஐ யார் formally catalog பண்ணாங்க?"
        },
        "options": {
          "en": [
            "Robert Edwards and John Magee",
            "Warren Buffett",
            "SEBI",
            "Benjamin Graham"
          ],
          "hi": [
            "Robert Edwards और John Magee",
            "Warren Buffett",
            "SEBI",
            "Benjamin Graham"
          ],
          "ta": [
            "Robert Edwards மற்றும் John Magee",
            "Warren Buffett",
            "SEBI",
            "Benjamin Graham"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "Their book 'Technical Analysis of Stock Trends' remains a foundational, widely cited reference for chart pattern analysis.",
          "hi": "उनकी किताब 'Technical Analysis of Stock Trends' chart pattern analysis के लिए एक foundational, widely cited reference बनी हुई है।",
          "ta": "அவங்க புத்தகம் ‘Technical Analysis of Stock Trends’, chart pattern analysis-க்கு ஒரு foundational, widely cited reference-ஆ இன்னும் இருக்கு."
        }
      },
      {
        "question": {
          "en": "Roughly how old are the ideas behind modern chart pattern analysis, according to the lesson?",
          "hi": "Lesson के अनुसार, modern chart pattern analysis के पीछे के ideas लगभग कितने पुराने हैं?",
          "ta": "Lesson-ன் படி, modern chart pattern analysis-க்கு பின்னால் இருக்கிற ideas roughly எவ்ளோ பழையது?"
        },
        "options": {
          "en": [
            "Invented in the last five years",
            "Rooted in ideas dating back to the late 1800s and formally catalogued by 1948",
            "Created specifically for Indian markets in 2020",
            "They have no historical origin"
          ],
          "hi": [
            "पिछले पाँच सालों में invent हुए",
            "1800s के आखिर तक जाने वाले ideas में rooted, और 1948 तक formally catalogued",
            "2020 में specifically Indian markets के लिए बनाए गए",
            "इनका कोई historical origin नहीं है"
          ],
          "ta": [
            "கடந்த ஐந்து வருடங்களில் invent பண்ணப்பட்டது",
            "1800-களின் பிற்பகுதியில் ideas-ல rooted, 1948-க்குள் formally catalog பண்ணப்பட்டது",
            "2020-ல Indian markets-க்காக specific-ஆ create பண்ணப்பட்டது",
            "அவற்றுக்கு எந்த historical origin-உம் இல்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The lesson traces the lineage from Charles Dow through Schabacker, Edwards, and Magee.",
          "hi": "Lesson lineage को Charles Dow से Schabacker, Edwards, और Magee तक trace करता है।",
          "ta": "Charles Dow-லிருந்து Schabacker, Edwards, Magee வரைக்கும் lineage-ஐ lesson trace பண்ணுது."
        }
      },
      {
        "question": {
          "en": "What is the key takeaway about using chart patterns?",
          "hi": "Chart patterns इस्तेमाल करने के बारे में मुख्य takeaway क्या है?",
          "ta": "Chart patterns பயன்படுத்துறதைப் பத்தின key takeaway என்ன?"
        },
        "options": {
          "en": [
            "They guarantee a specific future price with certainty",
            "They suggest tendencies based on collective behaviour, best used alongside risk management, not alone",
            "They should replace all fundamental analysis",
            "Only professional traders are allowed to use them"
          ],
          "hi": [
            "वो certainty के साथ एक specific future price की guarantee देते हैं",
            "वो collective behaviour पर आधारित tendencies सुझाते हैं, risk management के साथ इस्तेमाल करना सबसे अच्छा है, अके ले नहीं",
            "उन्हें सभी fundamental analysis की जगह ले लेनी चाहिए",
            "सिर्फ professional traders को इनका इस्तेमाल करने की permission है"
          ],
          "ta": [
            "அவை certainty-உடன் ஒரு specific future price-ஐ guarantee பண்ணும்",
            "அவை collective behaviour-ஐ அடிப்படையாக்கி tendencies-ஐ suggest பண்ணும், risk management-உடன் சேர்ந்து best use பண்ணப்படணும், தனியா இல்ல",
            "அவை எல்லா fundamental analysis-ஐயும் replace பண்ணணும்",
            "Professional traders மட்டும் தான் அவற்றை பயன்படுத்த அனுமதி"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Like all technical tools in this course, patterns indicate probabilities, not certainties. 37. RSI Indicator Explained",
          "hi": "इस course के बाकी सभी technical tools की तरह, patterns probabilities बताते हैं, certainties नहीं।",
          "ta": "இந்த course-ல இருக்கிற எல்லா technical tools மாதிரியே, patterns probabilities-ஐக் குறிக்கும், certainties இல்ல."
        }
      }
    ]
  },
  {
    "id": 37,
    "tier": "Advanced",
    "title": {
      "en": "RSI Indicator Explained",
      "hi": "RSI Indicator समझाया गया",
      "ta": "RSI Indicator விளக்கம்"
    },
    "opener": {
      "en": "“How do you know when a stock's gone ‘too far, too fast’ in either direction?” Meera asked. Arjun pointed to a single line oscillating between 0 and 100 beneath his price chart. “This tool was built to answer exactly that question, back in the 1970s.”",
      "hi": "“तुम्हें कै से पता चलता है कि कोई stock किसी भी direction में 'बहुत दूर, बहुत तेज़ ' चला गया है?” मीरा ने पूछा। अर्जुन ने अपने price chart के नीचे 0 और 100 के बीच oscillate करती एक single line की तरफ इशारा किया। “ये tool इसी सवाल का जवाब देने के लिए बनाया गया था, 1970s में।”",
      "ta": "“ஒரு stock ஏதோ ஒரு direction-ல ‘too far, too fast’ போச்சுனு எப்படி தெரிஞ்சுக்குவீங்க?” மீரா கேட்டாள். அர்ஜுன் தன் price chart-க்கு கீழ 0-க்கும் 100-க்கும் இடையே oscillate ஆகுற ஒரே ஒரு line-ஐ point பண்ணினான். “இந்த tool, 1970-களில், exact-ஆ அந்தக் கேள்விக்கு answer பண்ணவே கட்டப்பட்டது.”"
    },
    "realStorySubtitle": {
      "en": "The Engineer Who Built a Tool Still Used Worldwide",
      "hi": "वो Engineer जिसने एक ऐसा Tool बनाया जो आज भी दुनियाभर में इस्तेमाल होता है",
      "ta": "உலகம் முழுக்க இன்னும் பயன்படுத்தப்படும் ஒரு Tool-ஐ கட்டின Engineer"
    },
    "realStoryBody": {
      "en": "J. Welles Wilder Jr., a mechanical engineer turned technical analyst, introduced the Relative Strength Index (RSI) in his 1978 book “New Concepts in Technical Trading Systems.” It quickly became one of the most widely adopted momentum indicators across global markets.\n\nNearly five decades later, RSI remains a default indicator on virtually every charting platform used by Indian traders today — a rare example of a single individual's 1970s research still shaping daily trading decisions worldwide.",
      "hi": "J. Welles Wilder Jr., एक mechanical engineer जो technical analyst बना, ने अपनी 1978 की किताब “New Concepts in Technical Trading Systems” में Relative Strength Index (RSI) introduce किया। ये जल्द ही global markets में सबसे widely adopted momentum indicators में से एक बन गया।\n\nलगभग पाँच दशकों बाद, RSI आज इस्तेमाल होने वाले लगभग हर charting platform पर एक default indicator बना हुआ है जो Indian traders इस्तेमाल करते हैं — एक rare example कि एक अके ले व्यक्ति की 1970s की research आज भी दुनियाभर में daily trading decisions को कै से shape करती है।",
      "ta": "J. Welles Wilder Jr., ஒரு mechanical engineer-ல technical analyst-ஆ மாறினவர், தன் 1978 புத்தகம் “New Concepts in Technical Trading Systems”-ல Relative Strength Index (RSI)-ஐ introduce பண்ணார். Global markets முழுக்க மிக widely adopted momentum indicators-ல ஒண்ணா அது வேகமா ஆயிடுச்சு.\n\nகிட்டத்தட்ட ஐந்து decades கழித்து, இன்று Indian traders பயன்படுத்துற கிட்டத்தட்ட ஒவ்வொரு charting platform-லும் RSI ஒரு default indicator-ஆ இருக்கு — ஒரு single individual-ன் 1970s research, இன்னும் உலகம் முழுக்க daily trading decisions-ஐ shape பண்றதற்கான ஒரு rare example."
    },
    "body": {
      "en": "What RSI Measures RSI (Relative Strength Index) is a momentum indicator, scaled 0 to 100, measuring the speed and size of recent price changes to judge whether a stock has moved unusually far, too fast.\n\nReading the RSI Scale • Above 70: Often considered 'overbought' — the stock may have risen sharply and could be due for a pause or pullback. • Below 30: Often considered 'oversold' — the stock may have fallen sharply and could be due for a bounce. • Between 30-70: Considered a more neutral zone.\n\nRSI oscillates between 0 and 100 — readings above 70 flag ‘overbought’, below 30 flag ‘oversold’.",
      "hi": "RSI क्या Measure करता है RSI (Relative Strength Index) एक momentum indicator है, जो 0 से 100 तक scaled है, जो recent price changes की speed और size को measure करता है ये judge करने के लिए कि क्या कोई stock असामान्य रूप से बहुत दूर, बहुत तेज़ move हुआ है।\n\nRSI Scale पढ़ ना • 70 से ऊपर: अक्सर 'overbought' माना जाता है — stock शायद तेज़ी से बढ़ा है और एक pause या pullback के लिए due हो सकता है।\n\n• 30 से नीचे: अक्सर 'oversold' माना जाता है — stock शायद तेज़ी से गिरा है और एक bounce के लिए due हो सकता है।\n\n• 30-70 के बीच: एक ज़्यादा neutral zone माना जाता है।\n\nRSI 0 और 100 के बीच oscillate करता है — 70 से ऊपर readings 'overbought' को, और 30 से नीचे 'oversold' को flag करती हैं।",
      "ta": "RSI என்ன Measure பண்ணும் RSI (Relative Strength Index) ஒரு momentum indicator, 0 முதல் 100 வரை scale பண்ணப்பட்டது, ஒரு stock unusually far, too fast move ஆயிருக்கானு judge பண்ண, recent price changes-ன் speed-ஐயும் size-ஐயும் measure பண்ணும்.\n\nRSI Scale-ஐ படிக்குறது • 70-க்கு மேல: பெரும்பாலும் ‘overbought’-ஆ கருதப்படும் — stock sharply ஏறியிருக்கலாம், ஒரு pause அல்லது pullback-க்கு due ஆயிருக்கலாம்.\n\n• 30-க்கு கீழ்: பெரும்பாலும் ‘oversold’-ஆ கருதப்படும் — stock sharply விழுந்திருக்கலாம், ஒரு bounce-க்கு due ஆயிருக்கலாம்.\n\n• 30-70 இடையே: ஒரு more neutral zone-ஆ கருதப்படும்.\n\nRSI 0-க்கும் 100-க்கும் இடையே oscillate ஆகும் — 70-க்கு மேல் readings ‘overbought’-ஐயும், 30-க்கு கீழ் ‘oversold’-ஐயும் flag பண்ணும்."
    },
    "keyTakeaway": {
      "en": "RSI helps gauge whether a move has become stretched, not whether a stock is",
      "hi": "RSI ये judge करने में मदद करता है कि कोई move stretched हो गई है या नहीं, ये नहीं कि कोई stock fundamentally अच्छा है या बुरा। एक 'overbought' reading एक strong trend में फिर भी climb करना जारी रख सकती है — RSI कई inputs में से एक है, बिल्कुल वैसे ही जैसे Wilder ने खुद हमेशा इसका इरादा रखा था।",
      "ta": "ஒரு move stretched ஆயிடுச்சான்னு RSI gauge பண்ண உதவும், ஒரு stock fundamentally நல்லது இல்ல கெட்டதுனு இல்ல. ஒரு strong trend-ல ஒரு ‘overbought’ reading இன்னும் ஏற தொடரலாம் — Wilder அவரே எப்போதுமே intend பண்ணின மாதிரி, RSI நிறைய inputs-ல ஒண்ணு."
    },
    "quiz": [
      {
        "question": {
          "en": "Who introduced the RSI indicator, and when?",
          "hi": "RSI indicator किसने introduce किया, और कब?",
          "ta": "RSI indicator-ஐ யார், எப்போ introduce பண்ணார்?"
        },
        "options": {
          "en": [
            "J. Welles Wilder Jr., in 1978",
            "SEBI, in 2010",
            "Warren Buffett, in 1965",
            "John Bollinger, in 1985"
          ],
          "hi": [
            "J. Welles Wilder Jr., 1978 में",
            "SEBI, 2010 में",
            "Warren Buffett, 1965 में",
            "John Bollinger, 1985 में"
          ],
          "ta": [
            "J. Welles Wilder Jr., 1978-ல",
            "SEBI, 2010-ல",
            "Warren Buffett, 1965-ல",
            "John Bollinger, 1985-ல"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "Wilder introduced RSI in his book 'New Concepts in Technical Trading Systems,' and it remains widely used today.",
          "hi": "Wilder ने अपनी किताब 'New Concepts in Technical Trading Systems' में RSI introduce किया, और ये आज भी widely इस्तेमाल होता है।",
          "ta": "Wilder தன் புத்தகம் ‘New Concepts in Technical Trading Systems’-ல RSI-ஐ introduce பண்ணார், இன்னும் அது widely பயன்படுத்தப்படுது."
        }
      },
      {
        "question": {
          "en": "What scale does RSI use?",
          "hi": "RSI कौन सा scale इस्तेमाल करता है?",
          "ta": "RSI எந்த scale பயன்படுத்தும்?"
        },
        "options": {
          "en": [
            "0 to 10",
            "0 to 100",
            "-100 to 100",
            "1 to 5"
          ],
          "hi": [
            "0 से 10",
            "0 से 100",
            "-100 से 100",
            "1 से 5"
          ],
          "ta": [
            "0 முதல் 10",
            "0 முதல் 100",
            "-100 முதல் 100",
            "1 முதல் 5"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "RSI is a bounded oscillator scaled from 0 to 100, unlike unbounded price-based indicators.",
          "hi": "RSI एक bounded oscillator है जो 0 से 100 तक scaled है, ज़्यादातर unbounded price-based indicators के उलट।",
          "ta": "Unbounded price-based indicators-ஐ போல் இல்லாம, RSI 0-லிருந்து 100 வரை scale பண்ணப்பட்ட ஒரு bounded oscillator."
        }
      },
      {
        "question": {
          "en": "What does an RSI reading above 70 often suggest?",
          "hi": "70 से ऊपर की एक RSI reading अक्सर क्या सुझाती है?",
          "ta": "70-க்கு மேல் ஒரு RSI reading பெரும்பாலும் என்ன suggest பண்ணும்?"
        },
        "options": {
          "en": [
            "The stock is guaranteed to crash",
            "The stock may be 'overbought' and due for a possible pause or pullback",
            "The company is bankrupt",
            "The stock has no trading volume"
          ],
          "hi": [
            "Stock का crash होना guaranteed है",
            "Stock शायद 'overbought' है और एक possible pause या pullback के लिए due है",
            "कं पनी bankrupt है",
            "Stock में कोई trading volume नहीं है"
          ],
          "ta": [
            "Stock guaranteed-ஆ crash ஆகும்",
            "Stock ‘overbought’-ஆ இருக்கலாம், ஒரு possible pause அல்லது pullback-க்கு due ஆயிருக்கலாம்",
            "நிறுவனம் bankrupt",
            "Stock-க்கு trading volume இல்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "High RSI readings suggest a stretched, possibly unsustainable recent price move, though not a guaranteed reversal.",
          "hi": "High RSI readings एक stretched, शायद unsustainable recent price move सुझाती हैं, हालांकि कोई guaranteed reversal नहीं।",
          "ta": "High RSI readings guaranteed reversal இல்லைனாலும், ஒரு stretched, possibly unsustainable recent price move-ஐ suggest பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What does an RSI reading below 30 often suggest?",
          "hi": "30 से नीचे की एक RSI reading अक्सर क्या सुझाती है?",
          "ta": "30-க்கு கீழ் ஒரு RSI reading பெரும்பாலும் என்ன suggest பண்ணும்?"
        },
        "options": {
          "en": [
            "The stock may be 'oversold' and due for a possible bounce",
            "The stock is about to be delisted",
            "The stock has doubled in price",
            "The company has stopped operations"
          ],
          "hi": [
            "Stock शायद 'oversold' है और एक possible bounce के लिए due है",
            "Stock को delist होने वाला है",
            "Stock का price double हो गया है",
            "कं पनी ने operations बंद कर दिए हैं"
          ],
          "ta": [
            "Stock ‘oversold’-ஆ இருக்கலாம், ஒரு possible bounce-க்கு due ஆயிருக்கலாம்",
            "Stock delist ஆகப்போகுது",
            "Stock price double ஆயிடுச்சு",
            "நிறுவனம் operations-ஐ நிறுத்திடுச்சு"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "Low RSI readings suggest the price may have fallen unusually sharply relative to recent history.",
          "hi": "Low RSI readings सुझाती हैं कि price शायद recent history के मुकाबले असामान्य रूप से तेज़ी से गिरा है।",
          "ta": "Recent history-உடன் relative-ஆ price unusually sharply விழுந்திருக்கலாம்னு low RSI readings suggest பண்ணும்."
        }
      },
      {
        "question": {
          "en": "Can a stock with an 'overbought' RSI reading continue rising further?",
          "hi": "क्या एक 'overbought' RSI reading वाला stock आगे भी बढ़ ना जारी रख सकता है?",
          "ta": "ஒரு ‘overbought’ RSI reading-உடன் இருக்கிற ஒரு stock இன்னும் ஏற தொடரலாமா?"
        },
        "options": {
          "en": [
            "No, it's mathematically impossible",
            "Yes — RSI indicates a stretched move, not a guaranteed reversal, especially in a strong trend",
            "Only on weekends",
            "Only if the company pays a dividend"
          ],
          "hi": [
            "नहीं, ये mathematically impossible है",
            "हाँ — RSI एक stretched move indicate करता है, कोई guaranteed reversal नहीं, खासकर एक strong trend में",
            "सिर्फ weekends पर",
            "सिर्फ अगर कं पनी dividend pay करे"
          ],
          "ta": [
            "இல்ல, அது mathematically impossible",
            "ஆமா — RSI ஒரு stretched move-ஐக் குறிக்கும், ஒரு guaranteed reversal இல்ல, குறிப்பா ஒரு strong trend-ல",
            "Weekends-ல மட்டும்",
            "நிறுவனம் ஒரு dividend pay பண்ணினால் மட்டும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "RSI is one input among many — an overbought reading can persist through a genuinely strong trend. 38. MACD Indicator Explained",
          "hi": "RSI कई inputs में से एक है — एक overbought reading एक genuinely strong trend के दौरान बनी रह सकती है।",
          "ta": "RSI நிறைய inputs-ல ஒண்ணு — ஒரு genuinely strong trend-ல ஒரு overbought reading தொடரலாம்."
        }
      }
    ]
  },
  {
    "id": 38,
    "tier": "Advanced",
    "title": {
      "en": "MACD Indicator Explained",
      "hi": "MACD Indicator समझाया गया",
      "ta": "MACD Indicator விளக்கம்"
    },
    "opener": {
      "en": "Arjun's screen now showed two wavy lines crossing back and forth beneath the price chart, with little bars rising and falling between them. “Meet MACD,” he said. “It's basically two moving averages from Lesson 27, having a conversation with each other.”",
      "hi": "अर्जुन की screen पर अब price chart के नीचे दो wavy lines आगे-पीछे cross करती दिख रही थीं, जिनके बीच छोटे bars ऊपर-नीचे हो रहे थे। “मिलो MACD से,” उसने कहा। “ये basically Lesson 27 के दो moving averages हैं, जो एक-दूसरे से बात कर रहे हैं।”",
      "ta": "அர்ஜுனின் screen இப்போ price chart-க்கு கீழ back and forth cross ஆகுற இரண்டு wavy lines-ஐ காட்டுச்சு, அவற்றுக்கு இடையே ஏறி இறங்குற சின்ன bars-உடன். “MACD-ஐ சந்தியுங்க,” என்றான். “Basically Lesson 27-லிருந்து இரண்டு moving averages, ஒண்ணுக்கொண்ணு பேசிக்கிட்டிருக்குது.”"
    },
    "realStorySubtitle": {
      "en": "A Trend-Following Tool from the Late 1970s",
      "hi": "1970s के आखिर का एक Trend-Following Tool",
      "ta": "1970s-ன் பிற்பகுதியிலிருந்து ஒரு Trend-Following Tool"
    },
    "realStoryBody": {
      "en": "Gerald Appel, an American analyst, developed the Moving Average Convergence Divergence (MACD) indicator in the late 1970s as a way to spot changes in a trend's strength, direction, and momentum using the relationship between two moving averages.\n\nLike RSI, MACD has become one of the small handful of 'default' indicators loaded onto nearly every charting platform used by Indian retail traders today, decades after it was first developed for a very different, pre-internet trading environment.",
      "hi": "Gerald Appel, एक American analyst, ने 1970s के आखिर में Moving Average Convergence Divergence (MACD) indicator develop किया, दो moving averages के बीच relationship इस्तेमाल करते हुए किसी trend की strength, direction, और momentum में बदलाव spot करने के एक तरीके के रूप में।\n\nRSI की तरह, MACD आज Indian retail traders द्वारा इस्तेमाल किए जाने वाले लगभग हर charting platform पर load किए गए 'default' indicators के एक छोटे handful में से एक बन गया है, इसे पहली बार एक बिल्कुल अलग, pre-internet trading environment के लिए develop किए जाने के दशकों बाद।",
      "ta": "American analyst Gerald Appel, இரண்டு moving averages-க்கு இடையே relationship-ஐ பயன்படுத்தி ஒரு trend-ன் strength, direction, momentum-ல மாற்றங்களை spot பண்ண, 1970s-ன் பிற்பகுதியில் Moving Average Convergence Divergence (MACD) indicator-ஐ develop பண்ணார்.\n\nRSI மாதிரியே, ஒரு very different, pre-internet trading environment-க்காக முதலில் develop பண்ணப்பட்டு decades கழித்து, இன்று Indian retail traders பயன்படுத்துற கிட்டத்தட்ட ஒவ்வொரு charting platform-லும் load ஆகும் ‘default’ indicators-ன் சின்ன handful-ல MACD-உம் ஒண்ணா மாறியிருக்கு."
    },
    "body": {
      "en": "The Three Parts of MACD • MACD Line: The difference between a shorter-term and a longer-term exponential moving average (EMA). • Signal Line: A moving average of the MACD line itself, used as a trigger reference. • Histogram: Bars showing the gap between the MACD line and the signal line — widening bars suggest strengthening momentum.\n\nHow Traders Read It When the MACD line crosses above the signal line, it's often read as a bullish signal; crossing below is often read as bearish — conceptually similar to the Golden Cross/Death Cross idea from Lesson 27, just using faster-reacting EMAs instead of simple daily price averages.\n\nMACD tracks the gap between two moving averages — the histogram shows that gap widening and narrowing.",
      "hi": "MACD के तीन Parts • MACD Line: एक shorter-term और एक longer-term exponential moving average (EMA) के बीच का difference।\n\n• Signal Line: खुद MACD line का एक moving average, जो एक trigger reference के तौर पर इस्तेमाल होता है।\n\n• Histogram: Bars जो MACD line और signal line के बीच का gap दिखाते हैं — चौड़े होते bars strengthening momentum सुझाते हैं।\n\nTraders इसे कै से पढ़ ते हैं जब MACD line signal line के ऊपर cross करती है, तो इसे अक्सर एक bullish signal के तौर पर पढ़ा जाता है; नीचे cross करना अक्सर bearish माना जाता है — Lesson 27 के Golden Cross/Death Cross idea जैसा ही concept, बस simple daily price averages की बजाय तेज़ी से react करने वाले EMAs इस्तेमाल करते हुए।\n\nMACD दो moving averages के बीच के gap को track करता है — histogram दिखाता है वो gap कब wide और narrow होता है।",
      "ta": "MACD-ன் மூன்று Parts • MACD Line: ஒரு shorter-term-க்கும் ஒரு longer-term exponential moving average (EMA)-க்கும் இடையேயான difference.\n\n• Signal Line: MACD line-ன் சொந்த moving average, ஒரு trigger reference-ஆ பயன்படுத்தப்படும்.\n\n• Histogram: MACD line-க்கும் signal line-க்கும் இடையேயான gap-ஐ காட்டுற bars — widen ஆகும் bars strengthening momentum-ஐ suggest பண்ணும்.\n\nTraders இதை எப்படி படிப்பாங்க MACD line, signal line-க்கு மேல cross ஆகும்போது, அது பெரும்பாலும் ஒரு bullish signal-ஆ read பண்ணப்படும்; கீழ cross ஆகுறது பெரும்பாலும் bearish-ஆ read பண்ணப்படும் — Lesson 27-லிருந்து Golden Cross/Death Cross idea-உடன் conceptually similar, simple daily price averages-க்கு பதிலா faster-reacting EMAs பயன்படுத்துறது மட்டும் தான் வித்தியாசம்.\n\nMACD இரண்டு moving averages-க்கு இடையேயான gap-ஐ track பண்ணும் — அந்த gap wide, narrow ஆகுறதை histogram காட்டும்."
    },
    "keyTakeaway": {
      "en": "MACD is essentially a refined, faster-reacting cousin of the moving-average crossover",
      "hi": "MACD basically Lesson 27 के moving-average crossover concept का एक refined, तेज़ी से react करने वाला cousin है, जो specifically momentum में बदलाव highlight करने के लिए बनाया गया है। ये एक ऐसा signal है जिसे दूसरों के साथ weigh करना चाहिए, बिल्कुल RSI की तरह — कभी भी एक standalone decision-maker नहीं।",
      "ta": "MACD basically Lesson 27-ன் moving-average crossover concept-ன் ஒரு refined, faster-reacting cousin, momentum-ல மாற்றங்களை highlight பண்ணவே specific-ஆ கட்டப்பட்டது. RSI மாதிரியே, மற்றவற்றுடன் சேர்த்து weigh பண்ண வேண்டிய ஒரு signal இது — ஒருபோதும் standalone decision-maker இல்ல."
    },
    "quiz": [
      {
        "question": {
          "en": "Who developed the MACD indicator?",
          "hi": "MACD indicator किसने develop किया?",
          "ta": "MACD indicator-ஐ யார் develop பண்ணார்?"
        },
        "options": {
          "en": [
            "Gerald Appel, in the late 1970s",
            "SEBI, in 2005",
            "Munehisa Homma, in the 18th century",
            "J. Welles Wilder Jr."
          ],
          "hi": [
            "Gerald Appel, 1970s के आखिर में",
            "SEBI, 2005 में",
            "Munehisa Homma, 18वीं सदी में",
            "J. Welles Wilder Jr."
          ],
          "ta": [
            "Gerald Appel, 1970s-ன் பிற்பகுதியில்",
            "SEBI, 2005-ல",
            "Munehisa Homma, 18th century-ல",
            "J. Welles Wilder Jr."
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "Appel designed MACD to track trend strength and momentum using two moving averages.",
          "hi": "Appel ने दो moving averages इस्तेमाल करते हुए trend strength और momentum track करने के लिए MACD design किया।",
          "ta": "இரண்டு moving averages பயன்படுத்தி trend strength-ஐயும் momentum-ஐயும் track பண்ண Appel MACD-ஐ design பண்ணார்."
        }
      },
      {
        "question": {
          "en": "What does the MACD 'histogram' show?",
          "hi": "MACD का 'histogram' क्या दिखाता है?",
          "ta": "MACD-ன் ‘histogram’ எதை காட்டும்?"
        },
        "options": {
          "en": [
            "The company's dividend history",
            "The gap between the MACD line and the signal line",
            "The stock's total trading volume",
            "The company's P/E ratio"
          ],
          "hi": [
            "कं पनी की dividend history",
            "MACD line और signal line के बीच का gap",
            "Stock का total trading volume",
            "कं पनी का P/E ratio"
          ],
          "ta": [
            "நிறுவனத்தின் dividend history",
            "MACD line-க்கும் signal line-க்கும் இடையேயான gap",
            "Stock-ன் total trading volume",
            "நிறுவனத்தின் P/E ratio"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The histogram visualizes the distance between these two lines, with widening bars suggesting strengthening momentum.",
          "hi": "Histogram इन दो lines के बीच की distance को visualize करता है, चौड़े होते bars strengthening momentum सुझाते हैं।",
          "ta": "இந்த இரண்டு lines-க்கும் இடையேயான distance-ஐ histogram visualize பண்ணும், widen ஆகும் bars strengthening momentum-ஐ suggest பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What is generally considered a bullish MACD signal?",
          "hi": "आमतौर पर एक bullish MACD signal क्या माना जाता है?",
          "ta": "Generally ஒரு bullish MACD signal-ஆ கருதப்படுவது எது?"
        },
        "options": {
          "en": [
            "The MACD line crossing below the signal line",
            "The MACD line crossing above the signal line",
            "The histogram disappearing completely",
            "The stock price reaching zero"
          ],
          "hi": [
            "MACD line का signal line के नीचे cross करना",
            "MACD line का signal line के ऊपर cross करना",
            "Histogram का पूरी तरह गायब हो जाना",
            "Stock price का zero तक पहुँचना"
          ],
          "ta": [
            "MACD line, signal line-க்கு கீழ cross ஆகுறது",
            "MACD line, signal line-க்கு மேல cross ஆகுறது",
            "Histogram முழுசா மறைஞ்சுடுறது",
            "Stock price zero-ஐ reach பண்றது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This crossover is commonly read as a signal of strengthening upward momentum.",
          "hi": "इस crossover को आमतौर पर strengthening upward momentum के एक signal के तौर पर पढ़ा जाता है।",
          "ta": "Strengthening upward momentum-ன் signal-ஆ இந்த crossover commonly read பண்ணப்படும்."
        }
      },
      {
        "question": {
          "en": "How is MACD conceptually related to the Golden Cross/Death Cross idea from Lesson 27?",
          "hi": "MACD, Lesson 27 के Golden Cross/Death Cross idea से conceptually कै से related है?",
          "ta": "Lesson 27-லிருந்து Golden Cross/Death Cross idea-உடன் MACD conceptually எப்படி related?"
        },
        "options": {
          "en": [
            "They are completely unrelated concepts",
            "Both are based on the relationship between moving averages crossing each other",
            "MACD has nothing to do with moving averages",
            "Golden Cross only applies to bonds"
          ],
          "hi": [
            "दोनों पूरी तरह unrelated concepts हैं",
            "दोनों moving averages के एक-दूसरे को cross करने वाले relationship पर आधारित हैं",
            "MACD का moving averages से कोई लेना-देना नहीं है",
            "Golden Cross सिर्फ bonds पर लागू होता है"
          ],
          "ta": [
            "அவை completely unrelated concepts",
            "இரண்டும், ஒண்ணுக்கொண்ணு cross ஆகுற moving averages-க்கு இடையேயான relationship-ஐ அடிப்படையாக் கொண்டது",
            "MACD-க்கு moving averages-உடன் எந்த சம்பந்தமும் இல்ல",
            "Golden Cross bonds-க்கு மட்டும் தான் apply ஆகும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "MACD extends the moving-average crossover idea using faster-reacting exponential moving averages.",
          "hi": "MACD moving-average crossover idea को तेज़ी से react करने वाले exponential moving averages इस्तेमाल करते हुए extend करता है।",
          "ta": "Faster-reacting exponential moving averages பயன்படுத்தி MACD moving-average crossover idea-ஐ extend பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What is the key takeaway about using MACD?",
          "hi": "MACD इस्तेमाल करने के बारे में मुख्य takeaway क्या है?",
          "ta": "MACD பயன்படுத்துறதைப் பத்தின key takeaway என்ன?"
        },
        "options": {
          "en": [
            "It should be used as the sole basis for every trading decision",
            "It's a signal to weigh alongside other tools, not a standalone decision-maker",
            "It guarantees future price direction with certainty",
            "It only works for gold ETFs"
          ],
          "hi": [
            "इसे हर trading decision के लिए sole basis के तौर पर इस्तेमाल करना चाहिए",
            "ये एक ऐसा signal है जिसे दूसरे tools के साथ weigh करना चाहिए, कोई standalone decision-maker नहीं",
            "ये certainty के साथ future price direction की guarantee देता है",
            "ये सिर्फ gold ETFs के लिए काम करता है"
          ],
          "ta": [
            "ஒவ்வொரு trading decision-க்கும் sole basis-ஆ இது பயன்படுத்தப்படணும்",
            "மற்ற tools-உடன் சேர்த்து weigh பண்ண வேண்டிய ஒரு signal இது, standalone decision-maker இல்ல",
            "அது future price direction-ஐ certainty-உடன் guarantee பண்ணும்",
            "அது gold ETFs-க்கு மட்டும் தான் வேலை செய்யும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Like RSI, MACD is best used as one input within a broader, well-rounded analysis. 39. Bollinger Bands & Volatility",
          "hi": "RSI की तरह, MACD को एक broader, well-rounded analysis के अंदर एक input के तौर पर इस्तेमाल करना सबसे अच्छा है।",
          "ta": "RSI மாதிரியே, ஒரு broader, well-rounded analysis-க்குள் ஒரு input-ஆ MACD best used ஆகும்."
        }
      }
    ]
  },
  {
    "id": 39,
    "tier": "Advanced",
    "title": {
      "en": "Bollinger Bands & Volatility",
      "hi": "Bollinger Bands और Volatility",
      "ta": "Bollinger Bands & Volatility"
    },
    "opener": {
      "en": "The next chart Arjun pulled up had a price line squeezed between two curving bands, like a river between its banks — sometimes tight, sometimes wide. “This one measures something different,” he said. “Not direction. How calm or wild the water actually is.”",
      "hi": "अर्जुन ने जो अगला chart खोला उसमें price line दो curving bands के बीच squeeze हुई थी, जैसे एक नदी अपने किनारों के बीच — कभी tight, कभी wide। “ये कुछ अलग measure करता है,” उसने कहा। “Direction नहीं। पानी असल में कितना शांत या wild है।”",
      "ta": "அர்ஜுன் pull up பண்ண அடுத்த chart-ல, இரண்டு curving bands-க்கு இடையே squeeze ஆன ஒரு price line இருந்துச்சு, அதன் banks-க்கு இடையே ஒரு river மாதிரி — சில நேரம் tight, சில நேரம் wide. “இது வேற ஏதோ measure பண்ணுது,” என்றான். “Direction இல்ல. Water actual-ஆ எவ்ளோ calm-ஆ இருக்கு wild-ஆ இருக்குனு.”"
    },
    "realStorySubtitle": {
      "en": "A 1980s Tool Built Specifically for Volatility",
      "hi": "1980s का एक Tool जो Specifically Volatility के लिए बनाया गया",
      "ta": "Volatility-க்கு Specific-ஆ கட்டப்பட்ட ஒரு 1980s Tool"
    },
    "realStoryBody": {
      "en": "John Bollinger, an American financial analyst, developed Bollinger Bands in the early 1980s to visually capture a stock's volatility — how much its price is fluctuating — rather than just its direction, which most other indicators focus on.\n\nThe bands automatically widen during volatile periods and narrow during calmer ones, and Indian trading platforms display them just as commonly today as they do RSI and MACD — a genuinely different lens (volatility) alongside the momentum-focused tools from the last two lessons.",
      "hi": "John Bollinger, एक American financial analyst, ने 1980s की शुरुआत में Bollinger Bands develop किए ताकि किसी stock की volatility — उसकी price कितनी fluctuate कर रही है — को visually capture किया जा सके, ना कि सिर्फ उसकी direction, जिस पर ज़्यादातर बाकी indicators focus करते हैं। ये bands volatile periods के दौरान automatically चौड़ी हो जाती हैं और शांत periods के दौरान narrow हो जाती हैं, और Indian trading platforms आज इन्हें उतनी ही आम तौर पर दिखाते हैं जितना RSI और MACD को — पिछले दो lessons के momentum-focused tools के साथ एक genuinely अलग lens (volatility)।",
      "ta": "American financial analyst John Bollinger, ஒரு stock-ன் volatility-ஐ — அதன் price எவ்வளவு fluctuate ஆகுதுனு — visually capture பண்ண, மற்ற பெரும்பாலான indicators focus பண்றது போல் direction-ஐ மட்டும் இல்லாம, 1980-களின் ஆரம்பத்தில் Bollinger Bands-ஐ develop பண்ணார். Volatile periods-ல bands automatic-ஆ wide ஆகும், calmer periods-ல narrow ஆகும், Indian trading platforms RSI, MACD-ஐ காட்டுவது போலவே இன்று அவற்றையும் commonly காட்டும் — கடந்த இரண்டு lessons-லிருந்து momentum-focused tools-உடன் சேர்ந்து, genuinely வேற ஒரு lens (volatility)."
    },
    "body": {
      "en": "How Bollinger Bands Are Built A middle band (typically a 20-day moving average) with an upper band and lower band plotted a set statistical distance above and below it, based on recent volatility. The bands widen automatically when volatility rises, and narrow when it falls.\n\nWhat Traders Watch For • Band 'squeeze': Narrowing bands can suggest low volatility that has often preceded a sharp move in either direction. • Price touching a band: Doesn't automatically mean 'buy' or 'sell' — it simply shows price is statistically stretched relative to its recent range.\n\nBollinger Bands widen when volatility rises and ‘squeeze’ tight when it falls — often just before a big move.",
      "hi": "Bollinger Bands कै से बनाई जाती हैं एक middle band (आमतौर पर एक 20-day moving average) के साथ एक upper band और lower band recent volatility के आधार पर उसके ऊपर और नीचे एक set statistical distance पर plot की जाती हैं। जब volatility बढ़ ती है तो bands automatically चौड़ी हो जाती हैं, और जब volatility गिरती है तो narrow हो जाती हैं।\n\nTraders क्या देखते हैं • Band 'squeeze': Narrowing bands low volatility सुझा सकती हैं जो अक्सर किसी भी direction में एक sharp move से पहले आई है।\n\n• Price का किसी band को touch करना: automatically 'buy' या 'sell' का मतलब नहीं होता — ये बस दिखाता है कि price अपनी recent range के मुकाबले statistically stretched है।\n\nVolatility बढ़ ने पर Bollinger Bands wide हो जाती हैं, और कम होने पर tight होकर 'squeeze' हो जाती हैं — अक्सर एक बड़े move से ठीक पहले।",
      "ta": "Bollinger Bands எப்படி கட்டப்படும் ஒரு middle band (typically ஒரு 20-day moving average), அதற்கு மேலும் கீழும் recent volatility-ஐ அடிப்படையாக் கொண்டு ஒரு set statistical distance-ல plot பண்ணப்படும் ஒரு upper band-உம் lower band-உம். Volatility ஏறும்போது bands automatic-ஆ wide ஆகும், அது குறையும்போது narrow ஆகும்.\n\nTraders என்ன Watch பண்றாங்க • Band ‘squeeze’: Narrow ஆகும் bands, பெரும்பாலும் ஏதோ ஒரு direction-ல ஒரு sharp move-ஐ precede பண்ண low volatility-ஐ suggest பண்ணலாம்.\n\n• Price ஒரு band-ஐ தொடுறது: Automatic-ஆ ‘buy’ அல்லது ‘sell’ அர்த்தம் இல்ல — அதன் recent range-உடன் relative-ஆ price statistically stretched-ஆ இருக்குனு அது வெறுமனே காட்டும்.\n\nVolatility ஏறும்போது Bollinger Bands wide ஆகும், அது குறையும்போது tight-ஆ ‘squeeze’ ஆகும் — பெரும்பாலும் ஒரு big move-க்கு சரியா முன்னாடி."
    },
    "keyTakeaway": {
      "en": "Bollinger Bands measure volatility, a genuinely different dimension from the momentum",
      "hi": "Bollinger Bands volatility measure करती हैं, जो RSI और MACD के momentum focus से एक genuinely अलग dimension है। एक volatility view को एक momentum view के साथ combine करना किसी भी अके ले indicator के मुकाबले काफी हद तक ज़्यादा पूरी technical picture देता है।",
      "ta": "Bollinger Bands volatility-ஐ measure பண்ணும், RSI, MACD-ன் momentum focus-லிருந்து genuinely வேற dimension. ஒரு volatility view-ஐ ஒரு momentum view-உடன் combine பண்றது, ஏதேனும் ஒரே ஒரு indicator-ஐ விட noticeably fuller ஒரு technical picture-ஐ தரும்."
    },
    "quiz": [
      {
        "question": {
          "en": "What do Bollinger Bands primarily measure?",
          "hi": "Bollinger Bands मुख्य रूप से क्या measure करती हैं?",
          "ta": "Bollinger Bands primarily எதை measure பண்ணும்?"
        },
        "options": {
          "en": [
            "A company's dividend yield",
            "A stock's volatility",
            "A company's total debt",
            "The market's trading hours"
          ],
          "hi": [
            "कं पनी का dividend yield",
            "किसी stock की volatility",
            "कं पनी का total debt",
            "Market के trading hours"
          ],
          "ta": [
            "நிறுவனத்தின் dividend yield",
            "ஒரு stock-ன் volatility",
            "நிறுவனத்தின் total debt",
            "Market-ன் trading hours"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Unlike RSI or MACD, Bollinger Bands are specifically designed to visualize volatility, not just direction.",
          "hi": "RSI या MACD के उलट, Bollinger Bands specifically volatility visualize करने के लिए design की गई हैं, सिर्फ direction नहीं।",
          "ta": "RSI அல்லது MACD-ஐ போல் இல்லாம, Bollinger Bands volatility-ஐ visualize பண்ணவே specific-ஆ design பண்ணப்பட்டது, direction-ஐ மட்டும் இல்ல."
        }
      },
      {
        "question": {
          "en": "What happens to Bollinger Bands during a volatile period?",
          "hi": "एक volatile period के दौरान Bollinger Bands के साथ क्या होता है?",
          "ta": "ஒரு volatile period-ல Bollinger Bands-க்கு என்ன ஆகும்?"
        },
        "options": {
          "en": [
            "They disappear completely",
            "They widen",
            "They always turn red",
            "They narrow"
          ],
          "hi": [
            "वो पूरी तरह गायब हो जाती हैं",
            "वो चौड़ी हो जाती हैं",
            "वो हमेशा red हो जाती हैं",
            "वो narrow हो जाती हैं"
          ],
          "ta": [
            "அவை முழுசா மறைஞ்சுடும்",
            "அவை wide ஆகும்",
            "அவை எப்போதும் red-ஆ மாறும்",
            "அவை narrow ஆகும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The bands are built to expand automatically as recent price volatility increases.",
          "hi": "ये bands recent price volatility बढ़ ने के साथ automatically expand होने के लिए बनाई गई हैं।",
          "ta": "Recent price volatility அதிகரிக்கும்போது automatic-ஆ expand ஆகும்படி bands கட்டப்பட்டிருக்கு."
        }
      },
      {
        "question": {
          "en": "What does a Bollinger Band 'squeeze' (narrowing bands) often suggest?",
          "hi": "एक Bollinger Band 'squeeze' (narrowing bands) अक्सर क्या सुझाता है?",
          "ta": "ஒரு Bollinger Band ‘squeeze’ (narrow ஆகும் bands) பெரும்பாலும் என்ன suggest பண்ணும்?"
        },
        "options": {
          "en": [
            "The company is about to be delisted",
            "A period of unusually low volatility that has often preceded a sharp price move",
            "The stock will definitely rise",
            "The indicator is broken"
          ],
          "hi": [
            "कं पनी को delist होने वाला है",
            "असामान्य रूप से कम volatility का एक period जो अक्सर एक sharp price move से पहले आया है",
            "Stock definitely बढ़ेगा",
            "Indicator टूटा हुआ है"
          ],
          "ta": [
            "நிறுவனம் delist ஆகப்போகுது",
            "பெரும்பாலும் ஒரு sharp price move-ஐ precede பண்ணும் unusually low volatility-ன் ஒரு period",
            "Stock definitely ஏறும்",
            "Indicator broken ஆயிடுச்சு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Low volatility periods are often watched as a precursor to a bigger move, in either direction.",
          "hi": "Low volatility periods को अक्सर एक बड़े move का precursor माना जाता है, किसी भी direction में।",
          "ta": "ஏதோ ஒரு direction-ல ஒரு பெரிய move-க்கு ஒரு precursor-ஆ low volatility periods பெரும்பாலும் watch பண்ணப்படும்."
        }
      },
      {
        "question": {
          "en": "Who developed Bollinger Bands?",
          "hi": "Bollinger Bands किसने develop की?",
          "ta": "Bollinger Bands-ஐ யார் develop பண்ணார்?"
        },
        "options": {
          "en": [
            "John Bollinger, in the early 1980s",
            "Gerald Appel",
            "J. Welles Wilder Jr.",
            "Charles Dow"
          ],
          "hi": [
            "John Bollinger, 1980s की शुरुआत में",
            "Gerald Appel",
            "J. Welles Wilder Jr.",
            "Charles Dow"
          ],
          "ta": [
            "John Bollinger, 1980-களின் ஆரம்பத்தில்",
            "Gerald Appel",
            "J. Welles Wilder Jr.",
            "Charles Dow"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "Bollinger created this tool specifically to visualize volatility around a moving average.",
          "hi": "Bollinger ने specifically एक moving average के आसपास volatility visualize करने के लिए ये tool बनाया।",
          "ta": "ஒரு moving average-ஐ சுற்றி volatility-ஐ visualize பண்ணவே specific-ஆ Bollinger இந்த tool-ஐ create பண்ணார்."
        }
      },
      {
        "question": {
          "en": "Why is combining Bollinger Bands with RSI or MACD useful, per the lesson?",
          "hi": "Lesson के अनुसार, Bollinger Bands को RSI या MACD के साथ combine करना क्यों useful है?",
          "ta": "Lesson-ன் படி, Bollinger Bands-ஐ RSI அல்லது MACD-உடன் combine பண்றது ஏன் useful?"
        },
        "options": {
          "en": [
            "It isn't useful, only one indicator should ever be used",
            "It combines a volatility view with a momentum view for a fuller technical picture",
            "Bollinger Bands and MACD measure the exact same thing",
            "It guarantees profitable trades"
          ],
          "hi": [
            "ये useful नहीं है, सिर्फ एक ही indicator कभी इस्तेमाल करना चाहिए",
            "ये एक fuller technical picture के लिए एक volatility view को एक momentum view के साथ combine करता है",
            "Bollinger Bands और MACD बिल्कुल same चीज़ measure करते हैं",
            "ये profitable trades guarantee करता है"
          ],
          "ta": [
            "இது useful இல்ல, ஒரே ஒரு indicator மட்டும் தான் எப்போதும் பயன்படுத்தப்படணும்",
            "ஒரு fuller technical picture-க்கு அது ஒரு volatility view-ஐ ஒரு momentum view-உடன் combine பண்ணும்",
            "Bollinger Bands-உம் MACD-உம் exact அதே விஷயத்தை measure பண்ணும்",
            "அது profitable trades-ஐ guarantee பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Each indicator captures a different dimension of price behaviour, and combining them gives more complete context. 40. Introduction to Options: Calls & Puts",
          "hi": "हर indicator price behaviour का एक अलग dimension capture करता है, और उन्हें combine करना ज़्यादा पूरा context देता है।",
          "ta": "ஒவ்வொரு indicator-உம் price behaviour-ன் வேற dimension-ஐ capture பண்ணும், அவற்றை combine பண்றது more complete context தரும்."
        }
      }
    ]
  },
  {
    "id": 40,
    "tier": "Advanced",
    "title": {
      "en": "Introduction to Options: Calls & Puts",
      "hi": "Options का परिचय: Calls और Puts",
      "ta": "Options அறிமுகம்: Calls & Puts"
    },
    "opener": {
      "en": "Meera's college WhatsApp group was now full of “option chain” screenshots. She remembered Lesson 12's SEBI statistic and approached this lesson far more cautiously than the others. “Explain it to me,” she told Paati, “but don't sugar-coat the risk.”",
      "hi": "मीरा का college WhatsApp group अब “option chain” screenshots से भरा हुआ था। उसे Lesson 12 का SEBI statistic याद आया और उसने इस lesson को बाकियों से कहीं ज़्यादा सावधानी से approach किया। “मुझे ये समझाओ,” उसने पाटी से कहा, “लेकिन risk को sugar-coat मत करना।”",
      "ta": "மீராவின் college WhatsApp group இப்போ “option chain” screenshots-ஆல நிறைஞ்சிருந்துச்சு. Lesson 12- ன் SEBI statistic-ஐ அவள் நினைவு வச்சு, மற்ற lessons-ஐ விட இந்த lesson-ஐ ரொம்ப cautiously approach பண்ணினாள். “எனக்கு விளக்குங்க,” பாட்டியிடம் சொன்னாள், “ஆனா risk-ஐ sugar-coat பண்ணாதீங்க.”"
    },
    "realStorySubtitle": {
      "en": "A Market That Grew Faster Than Most Retail Understanding Of It",
      "hi": "एक Market जो अपनी Retail Understanding से कहीं तेज़ी से बढ़ा",
      "ta": "பெரும்பாலான Retail Understanding-ஐ விட வேகமா வளர்ந்த ஒரு Market"
    },
    "realStoryBody": {
      "en": "Options trading was formally introduced on Indian exchanges in 2001, starting a market that has since grown into one of the largest options trading ecosystems in the world by contract volume, with enormous participation from Indian retail traders in particular.\n\nThat same growth is exactly the backdrop to the SEBI finding from Lesson 12 — roughly 9 out of 10 individual F&O traders losing money overall. Options can be powerful, precise tools in experienced hands, but the data shows most retail participants have entered this fast-growing market without fully understanding what they're trading.",
      "hi": "Options trading Indian exchanges पर formally 2001 में introduce हुई, एक ऐसे market की शुरुआत करते हुए जो तब से contract volume के हिसाब से दुनिया के सबसे बड़े options trading ecosystems में से एक बन गया है, खासकर Indian retail traders की enormous participation के साथ।\n\nवही growth बिल्कुल वही backdrop है जो Lesson 12 की SEBI finding का है — लगभग 10 में से 9 individual F&O traders overall पैसा गंवा रहे हैं। Options experienced हाथों में powerful, precise tools हो सकते हैं, लेकिन data दिखाता है कि ज़्यादातर retail participants इस तेज़ी से बढ़ ते market में बिना पूरी तरह समझे घुसे हैं कि वो क्या trade कर रहे हैं।",
      "ta": "2001-ல Indian exchanges-ல Options trading formally introduce பண்ணப்பட்டது, contract volume-ல அது தற்போது உலகின் மிகப்பெரிய options trading ecosystems-ல ஒண்ணா வளர்ந்திருக்கு, குறிப்பா Indian retail traders-லிருந்து enormous participation-உடன்.\n\nஅதே growth தான் Lesson 12-லிருந்து SEBI finding-ன் backdrop — சுமார் 10-ல் 9 individual F&O traders overall-ஆ பணத்தை இழக்காங்க. Experienced hands-ல Options powerful, precise tools-ஆ இருக்கலாம், ஆனா அவங்க trade பண்றது என்ன-னு முழுசா புரிஞ்சுக்காம பெரும்பாலான retail participants இந்த fast-growing market-க்குள் நுழைஞ்சிருக்காங்கனு data காட்டுது."
    },
    "body": {
      "en": "What an Option Actually Is An Option is a contract giving the buyer the right, but not the obligation, to buy or sell a stock (or index) at a fixed price (the strike price) before a set expiry date, in exchange for a fee called the premium.\n\nCall vs Put — The Two Basic Types • Call Option: The right to buy at the strike price — buyers typically expect the price to rise. • Put Option: The right to sell at the strike price — buyers typically expect the price to fall.\n\nWhy This Is 'Concepts Only' Options carry complex risk (an option seller's potential loss can be very large) and their pricing involves multiple additional factors beyond just the stock price. This lesson introduces the vocabulary; genuine options trading requires substantially deeper study and capital discipline than is covered here.\n\nAn option buyer's loss is always capped at the premium paid — but gains (call) or the drop to zero (put) can be large.",
      "hi": "एक Option असल में क्या है एक Option एक contract है जो buyer को एक fixed price (strike price) पर एक set expiry date से पहले किसी stock (या index) को खरीदने या बेचने का right देता है, obligation नहीं, इसके बदले premium नाम की एक fee ली जाती है।\n\nCall vs Put — दो Basic Types • Call Option: Strike price पर खरीदने का right — buyers आमतौर पर उम्मीद करते हैं कि price बढ़ेगी।\n\n• Put Option: Strike price पर बेचने का right — buyers आमतौर पर उम्मीद करते हैं कि price गिरेगी।\n\nये 'सिर्फ Concepts' क्यों है Options में complex risk होता है (एक option seller का potential loss बहुत बड़ा हो सकता है) और इनकी pricing में सिर्फ stock price से आगे कई additional factors शामिल होते हैं। ये lesson सिर्फ vocabulary introduce करता है; genuine options trading के लिए यहाँ cover की गई चीज़ों से कहीं ज़्यादा गहरी study और capital discipline चाहिए।\n\nएक option buyer का loss हमेशा pay किए premium तक capped होता है — लेकिन gains (call) या zero तक drop (put) बड़े हो सकते हैं।",
      "ta": "ஒரு Option உண்மையில் என்ன ஒரு Option என்பது, premium என்ற fee-க்கு பதிலா, ஒரு fixed price-க்கு (strike price) ஒரு set expiry date-க்கு முன், ஒரு stock-ஐ (அல்லது index) வாங்க அல்லது விக்க buyer-க்கு right கொடுக்கும் ஒரு contract, obligation இல்ல.\n\nCall vs Put — இரண்டு Basic Types • Call Option: Strike price-ல வாங்க இருக்கிற right — buyers typically price ஏறும்னு எதிர்பார்ப்பாங்க.\n\n• Put Option: Strike price-ல விக்க இருக்கிற right — buyers typically price விழும்னு எதிர்பார்ப்பாங்க.\n\nஇது ஏன் ‘Concepts Only’ Options complex risk carry பண்ணும் (ஒரு option seller-ன் potential loss ரொம்ப பெரிதா இருக்கலாம்), அவற்றின் pricing stock price-ஐ தாண்டி multiple additional factors-ஐ involve பண்ணும். இந்த lesson vocabulary-ஐ introduce பண்ணும்; genuine options trading, இங்க cover பண்ணப்பட்டதை விட substantially deeper study-ஐயும் capital discipline-ஐயும் require பண்ணும்.\n\nஒரு option buyer-ன் loss எப்போதும் pay பண்ண premium-க்கு cap ஆகும் — ஆனா gains (call) அல்லது zero- க்கு drop (put) பெரிதா இருக்கலாம்."
    },
    "keyTakeaway": {
      "en": "Options give the right, not the obligation, to trade at a fixed price by a set date. Given the",
      "hi": "Options एक fixed price पर एक set date तक trade करने का right देते हैं, obligation नहीं। Retail F&O losses पर SEBI data को देखते हुए, concept को समझना और इसे trade करने के लिए ready होना बिल्कुल अलग-अलग बातें हैं — एक genuinely important line जिसे clear रखना ज़ रूरी है।",
      "ta": "Options, ஒரு set date-க்குள் ஒரு fixed price-ல trade பண்ண right கொடுக்கும், obligation இல்ல. Retail F&O losses-ன் SEBI data-ஐ கொடுத்து, concept-ஐ புரிஞ்சுக்குறது அதை trade பண்ண ready-ஆ இருப்பதிலிருந்து ரொம்ப வித்தியாசம் — தெளிவா வைச்சிருக்க worth-ஆன ஒரு genuinely important line."
    },
    "quiz": [
      {
        "question": {
          "en": "What does buying an Option contract give you?",
          "hi": "एक Option contract खरीदने से आपको क्या मिलता है?",
          "ta": "ஒரு Option contract வாங்குறது உங்களுக்கு என்ன தரும்?"
        },
        "options": {
          "en": [
            "An obligation to buy or sell",
            "The right, but not the obligation, to buy or sell at a fixed price before expiry",
            "Guaranteed ownership of the company",
            "A fixed dividend payment"
          ],
          "hi": [
            "खरीदने या बेचने की एक obligation",
            "Expiry से पहले एक fixed price पर खरीदने या बेचने का right, obligation नहीं",
            "कं पनी का guaranteed ownership",
            "एक fixed dividend payment"
          ],
          "ta": [
            "வாங்க அல்லது விக்க ஒரு obligation",
            "Expiry-க்கு முன், ஒரு fixed price-ல வாங்க அல்லது விக்க right, obligation இல்ல",
            "நிறுவனத்தின் guaranteed ownership",
            "ஒரு fixed dividend payment"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This right-without-obligation feature is the defining characteristic of an options contract.",
          "hi": "ये right-without-obligation feature ही एक options contract की defining characteristic है।",
          "ta": "இந்த right-without-obligation feature தான் ஒரு options contract-ன் defining characteristic."
        }
      },
      {
        "question": {
          "en": "What is a 'Call' option?",
          "hi": "एक 'Call' option क्या है?",
          "ta": "ஒரு ‘Call’ option என்றால் என்ன?"
        },
        "options": {
          "en": [
            "The right to sell at the strike price",
            "The right to buy at the strike price",
            "A guaranteed profit contract",
            "A type of dividend"
          ],
          "hi": [
            "Strike price पर बेचने का right",
            "Strike price पर खरीदने का right",
            "एक guaranteed profit contract",
            "एक तरह का dividend"
          ],
          "ta": [
            "Strike price-ல விக்க இருக்கிற right",
            "Strike price-ல வாங்க இருக்கிற right",
            "ஒரு guaranteed profit contract",
            "ஒரு வகை dividend"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Call buyers generally expect the underlying price to rise above the strike price.",
          "hi": "Call buyers आमतौर पर उम्मीद करते हैं कि underlying price strike price से ऊपर बढ़ेगी।",
          "ta": "Underlying price strike price-க்கு மேல ஏறும்னு call buyers generally எதிர்பார்ப்பாங்க."
        }
      },
      {
        "question": {
          "en": "What is the 'premium' in options trading?",
          "hi": "Options trading में 'premium' क्या है?",
          "ta": "Options trading-ல ‘premium’ என்றால் என்ன?"
        },
        "options": {
          "en": [
            "The company's total profit",
            "The fee paid to buy an options contract",
            "A type of stock split",
            "The exchange's trading hours"
          ],
          "hi": [
            "कं पनी का total profit",
            "एक options contract खरीदने के लिए दी गई fee",
            "एक तरह का stock split",
            "Exchange के trading hours"
          ],
          "ta": [
            "நிறுவனத்தின் total profit",
            "ஒரு options contract வாங்க pay பண்ணப்படும் fee",
            "ஒரு வகை stock split",
            "Exchange-ன் trading hours"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The premium is the cost paid upfront by the option buyer for that contract's rights.",
          "hi": "Premium वो cost है जो option buyer उस contract के rights के लिए upfront pay करता है।",
          "ta": "அந்த contract-ன் rights-க்காக option buyer upfront pay பண்ணும் cost தான் premium."
        }
      },
      {
        "question": {
          "en": "When was options trading formally introduced on Indian exchanges?",
          "hi": "Options trading Indian exchanges पर formally कब introduce हुई?",
          "ta": "Indian exchanges-ல Options trading formally எப்போ introduce பண்ணப்பட்டது?"
        },
        "options": {
          "en": [
            "2001",
            "1875",
            "1992",
            "2020"
          ],
          "hi": [
            "2001",
            "1875",
            "1992",
            "2020"
          ],
          "ta": [
            "2001",
            "1875",
            "1992",
            "2020"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "This launched what has since become one of the world's largest options markets by contract volume.",
          "hi": "इसने वो launch किया जो तब से contract volume के हिसाब से दुनिया के सबसे बड़े options markets में से एक बन गया है।",
          "ta": "Contract volume-ல உலகின் மிகப்பெரிய options markets-ல ஒண்ணா அப்புறம் மாறினதை இது launch பண்ணுச்சு."
        }
      },
      {
        "question": {
          "en": "Why does this lesson emphasize 'concepts only'?",
          "hi": "ये lesson 'सिर्फ concepts' पर zor क्यों देता है?",
          "ta": "இந்த lesson ஏன் ‘concepts only’-ஐ emphasize பண்ணுது?"
        },
        "options": {
          "en": [
            "Options are illegal in India",
            "Options carry complex risk, and SEBI data shows most retail F&O traders lose money overall",
            "Options are guaranteed to be profitable",
            "Only foreign investors can trade options"
          ],
          "hi": [
            "Options India में illegal हैं",
            "Options में complex risk होता है, और SEBI data दिखाता है कि ज़्यादातर retail F&O traders overall पैसा गंवाते हैं",
            "Options profitable होने की guarantee देते हैं",
            "सिर्फ foreign investors options trade कर सकते हैं"
          ],
          "ta": [
            "இந்தியாவில் Options illegal",
            "Options complex risk carry பண்ணும், பெரும்பாலான retail F&O traders overall-ஆ பணத்தை இழக்காங்கனு SEBI data காட்டுது",
            "Options profitable-ஆ இருக்குனு guaranteed",
            "Foreign investors மட்டும் தான் options trade பண்ண முடியும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Understanding the vocabulary is very different from being genuinely prepared to trade options, given the real risk data. 41. Introduction to Futures Contracts",
          "hi": "Vocabulary समझना और genuinely options trade करने के लिए prepared होना, real risk data को देखते हुए, बिल्कुल अलग-अलग बातें हैं।",
          "ta": "Real risk data-ஐ கொடுத்து, vocabulary-ஐ புரிஞ்சுக்குறது, options trade பண்ண genuinely தயார்-ஆ இருப்பதிலிருந்து ரொம்ப வித்தியாசம்."
        }
      }
    ]
  },
  {
    "id": 41,
    "tier": "Advanced",
    "title": {
      "en": "Introduction to Futures Contracts",
      "hi": "Futures Contracts का परिचय",
      "ta": "Futures Contracts அறிமுகம்"
    },
    "opener": {
      "en": "“Futures sound like options,” Meera said, “but everyone talks about them differently.” Arjun nodded. “Similar family, very different obligation. This is the one where you can't just walk away if you change your mind.”",
      "hi": "“Futures options जैसे लगते हैं,” मीरा ने कहा, “लेकिन हर कोई इनके बारे में अलग तरीके से बात करता है।” अर्जुन ने सिर हिलाया। “सेम family, बहुत अलग obligation। ये वो है जहाँ अगर तुम्हारा मन बदल जाए तो तुम बस walk away नहीं कर सकती।”",
      "ta": "“Futures options மாதிரி தான் sound ஆகுது,” மீரா சொன்னாள், “ஆனா எல்லோரும் அவற்றை வித்தியாசமா பேசுறாங்க.” அர்ஜுன் தலையாட்டினான். “Similar family, ரொம்ப வித்யாசமான obligation. உங்க mind மாறினா, வெறுமனே walk away பண்ண முடியாத ஒண்ணு இது.”"
    },
    "realStorySubtitle": {
      "en": "India's First Modern Derivative Product",
      "hi": "India का पहला Modern Derivative Product",
      "ta": "இந்தியாவின் முதல் Modern Derivative Product"
    },
    "realStoryBody": {
      "en": "Index futures were the very first exchange-traded derivative product launched in India, introduced by NSE in June 2000 — even before options arrived the following year — marking the formal start of India's modern derivatives market.\n\nThat market has since grown enormously, and futures remain widely used today by both institutions (for hedging large portfolios) and, increasingly, retail traders — though the same SEBI findings about F&O losses from Lesson 12 and 40 apply here just as directly.",
      "hi": "Index futures India में launch हुआ पहला exchange-traded derivative product था, जिसे NSE ने जून 2000 में introduce किया — अगले साल options आने से भी पहले — जो India के modern derivatives market की formal शुरुआत को mark करता है। वो market तब से बहुत बढ़ा है, और futures आज भी institutions (बड़े portfolios को hedge करने के लिए) द्वारा, और increasingly, retail traders द्वारा widely इस्तेमाल किए जाते हैं — भले ही Lesson 12 और 40 की F&O losses के बारे में वही SEBI findings यहाँ भी उतनी ही directly लागू होती हैं।",
      "ta": "இந்தியாவில் launch ஆன மிக முதல் exchange-traded derivative product Index futures தான், June 2000-ல NSE-ஆல introduce பண்ணப்பட்டது — அடுத்த வருடம் options வருறதுக்கும் முன்னாடியே — இந்தியாவின் modern derivatives market-ன் formal start-ஐ இது mark பண்ணுச்சு.\n\nஅதிலிருந்து அந்த market enormously வளர்ந்திருக்கு, இன்று institutions-உம் (பெரிய portfolios-ஐ hedge பண்ண), increasingly-ஆ retail traders-உம் futures-ஐ widely பயன்படுத்துறாங்க — Lesson 12, 40-லிருந்து F&O losses-ஐ பத்தின அதே SEBI findings இங்கும் equally directly apply ஆகும்."
    },
    "body": {
      "en": "What a Futures Contract Is A Futures Contract is an agreement obligating both the buyer and seller to transact a stock or index at a fixed price on a specific future date — unlike an option, there's no 'walking away'; both sides are committed once the contract is entered.\n\nOptions vs Futures — The Key Difference • Options: Buyer has a right, not an obligation (can let it expire worthless, losing only the premium paid). • Futures: Both sides are obligated to fulfil the contract, which means potential losses (and gains) are not capped at a small premium.\n\nA futures buyer is obligated either way — gains and losses move point-for-point, unlike the capped loss of an option buyer.",
      "hi": "एक Futures Contract क्या है एक Futures Contract एक agreement है जो buyer और seller दोनों को एक specific future date पर एक fixed price पर किसी stock या index को transact करने के लिए obligate करता है — एक option के उलट, यहाँ कोई 'walking away' नहीं है; contract enter होते ही दोनों sides committed होते हैं।\n\nOptions vs Futures — Key Difference • Options: Buyer के पास एक right होता है, obligation नहीं (इसे worthless expire होने दे सकते हैं, सिर्फ pay किया premium गंवाते हुए)।\n\n• Futures: दोनों sides contract fulfil करने के लिए obligated हैं, जिसका मतलब है potential losses (और gains) एक छोटे premium तक capped नहीं होते।\n\nएक futures buyer दोनों तरह से obligated है — एक option buyer के capped loss के उलट, gains और losses दोनों point-for-point move करते हैं।",
      "ta": "ஒரு Futures Contract என்ன ஒரு Futures Contract, ஒரு specific future date-ல ஒரு fixed price-ல ஒரு stock அல்லது index-ஐ transact பண்ண buyer-ஐயும் seller-ஐயும் obligate பண்ற ஒரு agreement — ஒரு option-ஐ போல் இல்லாம, ‘walking away’ பண்ண முடியாது; contract enter ஆனதும் இரண்டு sides-உம் committed ஆயிடும்.\n\nOptions vs Futures — Key Difference • Options: Buyer-க்கு ஒரு right இருக்கு, obligation இல்ல (worthless-ஆ expire ஆக விட்டுடலாம், pay பண்ண premium-ஐ மட்டும் இழக்கலாம்).\n\n• Futures: Contract-ஐ fulfil பண்ண இரண்டு sides-உம் obligated, அதாவது potential losses (gains-உம்) ஒரு சின்ன premium-க்கு cap ஆகாது.\n\nஒரு futures buyer இரண்டு வழியிலும் obligated — ஒரு option buyer-ன் capped loss-ஐ போல் இல்லாம, gains-உம் losses-உம் point-for-point move ஆகும்."
    },
    "keyTakeaway": {
      "en": "The 'right vs obligation' distinction between options and futures is the single most important",
      "hi": "Options और futures के बीच 'right vs obligation' का फर्क सबसे important difference है जिसे याद रखना चाहिए। Futures की uncapped obligation ही वजह है कि उन्हें options से भी ज़्यादा disciplined risk management चाहिए — एक genuinely advanced tool, जिसे यहाँ strictly concept level पर introduce किया गया है।",
      "ta": "Options-க்கும் futures-க்கும் இடையேயான ‘right vs obligation’ distinction தான் hold பண்ண வேண்டிய single most important difference. Futures-ன் uncapped obligation தான், options-ஐ விட இன்னும் disciplined risk management அவை demand பண்றதற்கு காரணம் — இங்க strictly concept level-ல introduce பண்ணப்பட்ட ஒரு genuinely advanced tool."
    },
    "quiz": [
      {
        "question": {
          "en": "What is the key obligation difference between a Futures contract and an Option?",
          "hi": "एक Futures contract और एक Option के बीच key obligation difference क्या है?",
          "ta": "ஒரு Futures contract-க்கும் ஒரு Option-க்கும் இடையேயான key obligation difference என்ன?"
        },
        "options": {
          "en": [
            "There is no difference",
            "In Futures, both buyer and seller are obligated to transact; in Options, the buyer has a right but no obligation",
            "Futures always expire worthless",
            "Options obligate both parties, Futures do not"
          ],
          "hi": [
            "कोई फर्क नहीं है",
            "Futures में, buyer और seller दोनों transact करने के लिए obligated हैं; Options में, buyer के पास एक right है लेकिन कोई obligation नहीं",
            "Futures हमेशा worthless expire हो जाते हैं",
            "Options दोनों parties को obligate करते हैं, Futures नहीं"
          ],
          "ta": [
            "எந்த வித்தியாசமும் இல்ல",
            "Futures-ல, buyer-உம் seller-உம் இரண்டு பேரும் transact பண்ண obligated; Options-ல, buyer-க்கு ஒரு right இருக்கு, obligation இல்ல",
            "Futures எப்போதும் worthless-ஆ expire ஆகும்",
            "Options இரண்டு parties-ஐயும் obligate பண்ணும், Futures பண்ணாது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This obligation distinction is the core structural difference between the two derivative types.",
          "hi": "ये obligation distinction दोनों derivative types के बीच का core structural difference है।",
          "ta": "இரண்டு derivative types-க்கும் இடையேயான core structural difference இந்த obligation distinction தான்."
        }
      },
      {
        "question": {
          "en": "When were index futures introduced in India?",
          "hi": "India में index futures कब introduce किए गए?",
          "ta": "இந்தியாவில் Index futures எப்போ introduce பண்ணப்பட்டது?"
        },
        "options": {
          "en": [
            "June 2000, by NSE",
            "2001, alongside options",
            "1875, with the BSE's founding",
            "2020, during the pandemic"
          ],
          "hi": [
            "जून 2000, NSE द्वारा",
            "2001, options के साथ",
            "1875, BSE की founding के साथ",
            "2020, pandemic के दौरान"
          ],
          "ta": [
            "June 2000, NSE-ஆல",
            "2001, options-உடன் சேர்ந்து",
            "1875, BSE founding-உடன்",
            "2020, pandemic-ன் போது"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "Index futures were India's first exchange-traded derivative product, launched a year before options.",
          "hi": "Index futures India का पहला exchange-traded derivative product था, जो options से एक साल पहले launch हुआ।",
          "ta": "Options வருறதுக்கு ஒரு வருடம் முன்னாடி launch ஆன, இந்தியாவின் முதல் exchange-traded derivative product Index futures தான்."
        }
      },
      {
        "question": {
          "en": "Why can a Futures position carry uncapped potential losses, unlike buying an Option?",
          "hi": "एक Option खरीदने के उलट, एक Futures position uncapped potential losses क्यों carry कर सकती है?",
          "ta": "ஒரு Option வாங்குறதை போல் இல்லாம, ஒரு Futures position ஏன் uncapped potential losses carry பண்ணலாம்?"
        },
        "options": {
          "en": [
            "Futures obligate both parties to the full contract, unlike an option buyer who can simply let it expire",
            "Futures are risk-free investments",
            "Futures are only available to the government",
            "This is not true — Futures losses are always capped"
          ],
          "hi": [
            "Futures दोनों parties को पूरे contract के लिए obligate करते हैं, एक option buyer के उलट जो इसे बस expire होने दे सकता है",
            "Futures risk-free investments हैं",
            "Futures सिर्फ government के लिए उपलब्ध हैं",
            "ये सही नहीं है — Futures losses हमेशा capped होते हैं"
          ],
          "ta": [
            "வெறுமனே expire ஆக விட்டுடக்கூடிய ஒரு option buyer-ஐ போல் இல்லாம, Futures இரண்டு parties-ஐயும் முழு contract-க்கும் obligate பண்ணும்",
            "Futures risk-free investments",
            "Futures அரசுக்கு மட்டும் தான் available",
            "இது true இல்ல — Futures losses எப்போதும் capped"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "An option buyer's maximum loss is the premium paid; a futures position carries no such natural cap.",
          "hi": "एक option buyer का maximum loss paid premium है; एक futures position में ऐसा कोई natural cap नहीं होता।",
          "ta": "ஒரு option buyer-ன் maximum loss pay பண்ண premium தான்; ஒரு futures position-க்கு அப்படி ஒரு natural cap இல்ல."
        }
      },
      {
        "question": {
          "en": "Who commonly uses futures contracts, according to the lesson?",
          "hi": "Lesson के अनुसार, futures contracts आमतौर पर कौन इस्तेमाल करता है?",
          "ta": "Lesson-ன் படி, futures contracts-ஐ பொதுவா யார் பயன்படுத்துவாங்க?"
        },
        "options": {
          "en": [
            "Only the government",
            "Both institutions (for hedging) and increasingly retail traders",
            "Only foreign banks",
            "No one uses them anymore"
          ],
          "hi": [
            "सिर्फ government",
            "दोनों institutions (hedging के लिए) और increasingly retail traders",
            "सिर्फ foreign banks",
            "अब कोई इन्हें इस्तेमाल नहीं करता"
          ],
          "ta": [
            "அரசு மட்டும்",
            "Institutions-உம் (hedging-க்காக) increasingly retail traders-உம்",
            "Foreign banks மட்டும்",
            "இப்போ யாருமே பயன்படுத்தல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Futures serve both institutional hedging needs and retail speculative trading, though with real risk for the latter.",
          "hi": "Futures institutional hedging needs और retail speculative trading दोनों को serve करते हैं, भले ही बाद वाले के लिए real risk हो।",
          "ta": "Institutional hedging needs-க்கும் retail speculative trading-க்கும் futures serve பண்ணும், later-க்கு real risk இருந்தாலும்."
        }
      },
      {
        "question": {
          "en": "Why does the lesson stress disciplined risk management specifically for futures?",
          "hi": "Lesson specifically futures के लिए disciplined risk management पर zor क्यों देता है?",
          "ta": "Lesson futures-க்கு specific-ஆ disciplined risk management-ஐ ஏன் stress பண்ணுது?"
        },
        "options": {
          "en": [
            "Futures have no real risk",
            "Because potential losses are uncapped, unlike an option buyer's premium-limited risk",
            "Futures are illegal for individuals",
            "Risk management doesn't apply to derivatives"
          ],
          "hi": [
            "Futures में कोई real risk नहीं है",
            "क्योंकि potential losses uncapped होते हैं, एक option buyer के premium-limited risk के उलट",
            "Individuals के लिए futures illegal हैं",
            "Risk management derivatives पर लागू नहीं होता"
          ],
          "ta": [
            "Futures-க்கு real risk இல்ல",
            "ஒரு option buyer-ன் premium-limited risk-ஐ போல் இல்லாம, potential losses uncapped ஆனதால்",
            "Individuals-க்கு Futures illegal",
            "Derivatives-க்கு risk management apply ஆகாது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The obligation built into futures contracts means losses can exceed what was initially committed, demanding extra caution. 42. Position Sizing & Risk Management",
          "hi": "Futures contracts में built-in obligation का मतलब है कि losses शुरू में committed की गई राशि से ज़्यादा हो सकते हैं, जिसके लिए extra caution चाहिए।",
          "ta": "Futures contracts-ல கட்டப்பட்ட obligation, initially commit பண்ணினதை losses exceed பண்ணலாம்னு அர்த்தம், extra caution தேவை."
        }
      }
    ]
  },
  {
    "id": 42,
    "tier": "Advanced",
    "title": {
      "en": "Position Sizing & Risk Management",
      "hi": "Position Sizing और Risk Management",
      "ta": "Position Sizing & Risk Management"
    },
    "opener": {
      "en": "“How much of my money should ever go into one single trade?” Meera asked — a question she realised, looking back, she should have asked in Lesson 1. “That question,” Paati said, “has actually brought down some of the smartest people in finance, when they got the answer wrong.”",
      "hi": "“मेरे पैसे का कितना हिस्सा कभी भी एक single trade में जाना चाहिए?” मीरा ने पूछा — एक सवाल जो, पीछे मुड़ कर देखने पर, उसे realize हुआ कि उसे Lesson 1 में ही पूछना चाहिए था। “उस सवाल ने,” पाटी ने कहा, “actually finance के कुछ सबसे smart लोगों को गिरा दिया है, जब उन्होंने इसका जवाब गलत पाया।”",
      "ta": "“என் பணத்துல எவ்வளவு ஒரே ஒரு trade-க்குள் போகணும்?” மீரா கேட்டாள் — திரும்பி பார்க்கும்போது, Lesson 1-லேயே இதை கேக்கணும்னு அவள் realize பண்ணின ஒரு கேள்வி. “அந்த கேள்வி,” பாட்டி சொன்னார், “finance-ல மிக smart ஆன சில பேரையே கீழே தள்ளியிருக்கு, அவங்க answer-ஐ தப்பா வச்சப்போ.”"
    },
    "realStorySubtitle": {
      "en": "When 'Genius' Wasn't Enough: LTCM's 1998 Collapse",
      "hi": "जब 'Genius' काफी नहीं था: LTCM का 1998 Collapse",
      "ta": "‘Genius’ போதாதபோது: LTCM-ன் 1998 Collapse"
    },
    "realStoryBody": {
      "en": "Long-Term Capital Management (LTCM) was a US hedge fund run by Nobel Prize-winning economists and celebrated traders, using highly sophisticated models — yet it took on positions so heavily leveraged relative to its capital that a series of market shocks in 1998 nearly collapsed the fund entirely, requiring a coordinated bailout organised by the US Federal Reserve to prevent wider financial damage.\n\nThe lesson wasn't that their models were wrong — many of their individual trade ideas were later shown to be reasonable. It was that even brilliant analysis can't survive positions sized so large that a single bad stretch wipes out the ability to keep playing at all.",
      "hi": "Long-Term Capital Management (LTCM) एक US hedge fund था जिसे Nobel Prize-winning economists और celebrated traders चलाते थे, highly sophisticated models इस्तेमाल करते हुए — फिर भी इसने अपनी capital के relative इतनी heavily leveraged positions ली कि 1998 में market shocks की एक series ने fund को लगभग पूरी तरह collapse कर दिया, जिससे बड़े financial damage को रोकने के लिए US Federal Reserve द्वारा organise किया गया एक coordinated bailout ज़ रूरी हो गया। सीख ये नहीं थी कि उनके models गलत थे — उनके कई individual trade ideas बाद में reasonable साबित हुए। सीख ये थी कि brilliant analysis भी उन positions से नहीं बच सकता जो इतनी बड़ी sized हों कि एक ही बुरा stretch पूरी तरह खेलते रहने की ability को मिटा दे।",
      "ta": "Long-Term Capital Management (LTCM), Nobel Prize வென்ற economists-உம் celebrated traders- உம் run பண்ண ஒரு US hedge fund, highly sophisticated models பயன்படுத்தி — ஆனாலும் அதன் capital-உடன் relative-ஆ ரொம்ப heavily leveraged positions-ஐ எடுத்துச்சு, 1998-ல வந்த ஒரு series of market shocks கிட்டத்தட்ட முழு fund-ஐயும் collapse பண்ணிடுச்சு, broader financial damage-ஐ தடுக்க US Federal Reserve organise பண்ணின ஒரு coordinated bailout தேவைப்பட்டுச்சு.\n\nஅவங்க models தப்பு-னு இல்ல அந்த lesson — அவங்க individual trade ideas-ல நிறைய பின்னால் reasonable-ஆ இருந்ததா proof ஆச்சு. ஒரே ஒரு bad stretch, தொடர்ந்து play பண்றதற்கான ability- ஐயே முழுசா wipe out பண்ணும் அளவுக்கு பெரிதா position-ஐ size பண்ணா, brilliant analysis கூட survive பண்ண முடியாதுனு தான் அது."
    },
    "body": {
      "en": "What Position Sizing Means Position sizing is deciding how much capital to risk on any single trade or investment, before deciding what to actually buy. It's a discipline entirely separate from picking a good stock or a good indicator reading.\n\nA Simple, Widely-Used Rule Many risk-conscious traders cap the potential loss on any single trade to a small percentage of total capital (commonly cited around 1-2%), using a stop-loss (Lesson 6) to enforce that cap — ensuring no single mistake, however confident you felt going in, can meaningfully damage your overall capital.",
      "hi": "Position Sizing का मतलब क्या है Position sizing ये decide करना है कि किसी भी single trade या investment पर कितनी capital risk करनी है, ये decide करने से पहले कि असल में क्या खरीदना है। ये एक discipline है जो एक अच्छे stock या एक अच्छी indicator reading चुनने से पूरी तरह अलग है।\n\nएक Simple, Widely-Used Rule कई risk-conscious traders किसी भी single trade पर potential loss को total capital के एक छोटे percentage (आमतौर पर लगभग 1-2% cited) तक cap करते हैं, उस cap को enforce करने के लिए एक stop-loss (Lesson 6) इस्तेमाल करते हुए — यह सुनिश्चित करते हुए कि कोई भी एक गलती, चाहे शुरू में आपको कितना भी confident महसूस हुआ हो, आपकी overall capital को meaningfully नुकसान ना पहुँचा सके।",
      "ta": "Position Sizing என்றால் என்ன Actual-ஆ என்ன வாங்கணும்னு decide பண்றதுக்கு முன், ஒரே ஒரு trade அல்லது investment-ல எவ்வளவு capital-ஐ risk பண்ணணும்னு decide பண்றது தான் Position sizing. ஒரு நல்ல stock அல்லது ஒரு நல்ல indicator reading pick பண்றதிலிருந்து முற்றிலும் தனியான ஒரு discipline இது.\n\nஒரு Simple, Widely-Used Rule Risk-conscious traders நிறைய பேர், ஒரே ஒரு trade-ல potential loss-ஐ total capital-ன் ஒரு சின்ன percentage-க்கு (commonly cited சுமார் 1-2%) cap பண்ணுவாங்க, அந்த cap-ஐ enforce பண்ண ஒரு stop- loss (Lesson 6) பயன்படுத்தி — நீங்க போறதுக்கு முன் எவ்வளவு confident-ஆ feel பண்ணினாலும், ஒரே ஒரு mistake உங்க overall capital-ஐ meaningfully damage பண்ண முடியாதுனு உறுதி செய்யும்."
    },
    "keyTakeaway": {
      "en": "LTCM shows that being right about the analysis isn't enough if the position size is wrong — oversized bets turn a normal, survivable loss into a potentially fatal one. Deciding how much to risk deserves at least as much discipline as deciding what to buy.",
      "hi": "LTCM दिखाता है कि analysis के बारे में सही होना काफी नहीं है अगर position size गलत है — oversized bets एक normal, survivable loss को एक potentially fatal loss में बदल देते हैं। कितना risk करना है ये decide करना, कम से कम उतनी ही discipline deserve करता है जितनी क्या खरीदना है ये decide करना।",
      "ta": "Position size தப்பா இருந்தா, analysis-ல correct-ஆ இருப்பது போதாதுனு LTCM காட்டுது — oversized bets ஒரு normal, survivable loss-ஐ ஒரு potentially fatal one-ஆ மாற்றும். எவ்வளவு risk பண்ணணும்னு decide பண்றது, என்ன வாங்கணும்னு decide பண்றது அளவுக்காவது discipline-ஐ deserve பண்ணும்."
    },
    "quiz": [
      {
        "question": {
          "en": "What is 'position sizing'?",
          "hi": "'Position sizing' क्या है?",
          "ta": "‘Position sizing’ என்றால் என்ன?"
        },
        "options": {
          "en": [
            "Choosing which stock to buy",
            "Deciding how much capital to risk on a single trade or investment",
            "Reading a company's balance sheet",
            "Setting the market's trading hours"
          ],
          "hi": [
            "कौन सा stock खरीदना है ये चुनना",
            "एक single trade या investment पर कितनी capital risk करनी है ये decide करना",
            "कं पनी की balance sheet पढ़ ना",
            "Market के trading hours set करना"
          ],
          "ta": [
            "எந்த stock வாங்கணும்னு தேர்ந்தெடுக்குறது",
            "ஒரே ஒரு trade அல்லது investment-ல எவ்வளவு capital-ஐ risk பண்ணணும்னு decide பண்றது",
            "நிறுவனத்தின் balance sheet-ஐ படிக்குறது",
            "Market-ன் trading hours-ஐ set பண்றது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Position sizing is a distinct discipline from stock selection — it's about how much to commit, not what to commit to.",
          "hi": "Position sizing stock selection से एक अलग discipline है — ये इस बारे में है कि कितना commit करना है, किसमें commit करना है इसके बारे में नहीं।",
          "ta": "Position sizing, stock selection-லிருந்து ஒரு distinct discipline — எதற்கு commit பண்ணணும்னு இல்ல, எவ்வளவு commit பண்ணணும்னு பத்தினது."
        }
      },
      {
        "question": {
          "en": "What ultimately went wrong with LTCM in 1998, according to the story?",
          "hi": "Story के अनुसार, 1998 में LTCM के साथ आखिर में क्या गलत हुआ?",
          "ta": "கதையின் படி, 1998-ல LTCM-க்கு இறுதியில் என்ன தப்பு நடந்துச்சு?"
        },
        "options": {
          "en": [
            "Their analytical models were entirely wrong",
            "They took on positions too heavily leveraged relative to their capital, and market shocks nearly collapsed the fund",
            "They refused to use any risk models",
            "They only invested in Indian markets"
          ],
          "hi": [
            "उनके analytical models पूरी तरह गलत थे",
            "उन्होंने अपनी capital के relative इतनी heavily leveraged positions लीं, और market shocks ने fund को लगभग collapse कर दिया",
            "उन्होंने किसी भी risk models इस्तेमाल करने से मना कर दिया",
            "उन्होंने सिर्फ Indian markets में invest किया"
          ],
          "ta": [
            "அவங்க analytical models முழுசா தப்பு",
            "அவங்க capital-உடன் relative-ஆ ரொம்ப heavily leveraged positions எடுத்தாங்க, market shocks fund-ஐ கிட்டத்தட்ட collapse பண்ணிடுச்சு",
            "அவங்க எந்த risk models-ஐயும் பயன்படுத்த refuse பண்ணாங்க",
            "அவங்க Indian markets-ல மட்டும் தான் invest பண்ணாங்க"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Excessive leverage and position sizing, not necessarily bad analysis, drove the near-collapse.",
          "hi": "Excessive leverage और position sizing ने, ज़ रूरी नहीं कि बुरी analysis ने, near-collapse को drive किया।",
          "ta": "Bad analysis இல்ல, excessive leverage-உம் position sizing-உம் தான் near-collapse-ஐ drive பண்ணுச்சு."
        }
      },
      {
        "question": {
          "en": "What percentage of capital do many risk-conscious traders commonly cap a single trade's potential loss at?",
          "hi": "कई risk-conscious traders आमतौर पर एक single trade के potential loss को capital के किस percentage तक cap करते हैं?",
          "ta": "Risk-conscious traders நிறைய பேர் commonly ஒரே ஒரு trade-ன் potential loss-ஐ என்ன percentage-க்கு cap பண்ணுவாங்க?"
        },
        "options": {
          "en": [
            "50-60%",
            "Around 1-2%",
            "100%",
            "There is no common guideline at all"
          ],
          "hi": [
            "50-60%",
            "लगभग 1-2%",
            "100%",
            "कोई common guideline है ही नहीं"
          ],
          "ta": [
            "50-60%",
            "சுமார் 1-2%",
            "100%",
            "எந்த common guideline-உம் இல்லவே இல்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This widely-cited guideline helps ensure no single trade can meaningfully damage overall capital.",
          "hi": "ये widely-cited guideline सुनिश्चित करने में मदद करती है कि कोई एक trade overall capital को meaningfully नुकसान ना पहुँचा सके।",
          "ta": "ஒரே ஒரு trade overall capital-ஐ meaningfully damage பண்ண முடியாதுனு உறுதி செய்ய இந்த widely-cited guideline உதவும்."
        }
      },
      {
        "question": {
          "en": "What tool is commonly used to enforce a position-sizing risk cap?",
          "hi": "Position-sizing risk cap को enforce करने के लिए आमतौर पर कौन सा tool इस्तेमाल किया जाता है?",
          "ta": "Position-sizing risk cap-ஐ enforce பண்ண commonly பயன்படுத்தப்படும் tool எது?"
        },
        "options": {
          "en": [
            "A stop-loss order",
            "A dividend reinvestment plan",
            "A stock split",
            "An IPO application"
          ],
          "hi": [
            "एक stop-loss order",
            "एक dividend reinvestment plan",
            "एक stock split",
            "एक IPO application"
          ],
          "ta": [
            "ஒரு stop-loss order",
            "ஒரு dividend reinvestment plan",
            "ஒரு stock split",
            "ஒரு IPO application"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "Stop-loss orders (Lesson 6) can be set to limit a trade's loss to the pre-decided risk amount.",
          "hi": "Stop-loss orders (Lesson 6) को trade के loss को pre-decided risk amount तक limit करने के लिए set किया जा सकता है।",
          "ta": "Pre-decided risk amount-க்கு ஒரு trade-ன் loss-ஐ limit பண்ண stop-loss orders (Lesson 6) set பண்ணலாம்."
        }
      },
      {
        "question": {
          "en": "What is the main lesson from LTCM's near-collapse, per this lesson?",
          "hi": "इस lesson के अनुसार, LTCM के near-collapse से मुख्य सीख क्या है?",
          "ta": "இந்த lesson-ன் படி, LTCM-ன் near-collapse-லிருந்து main lesson என்ன?"
        },
        "options": {
          "en": [
            "Nobel Prize winners should never trade",
            "Being right about analysis isn't enough if position sizing is wrong",
            "Leverage is always safe for hedge funds",
            "Only Indian markets carry position-sizing risk"
          ],
          "hi": [
            "Nobel Prize winners को कभी trade नहीं करना चाहिए",
            "अगर position sizing गलत है तो analysis के बारे में सही होना काफी नहीं है",
            "Hedge funds के लिए leverage हमेशा safe है",
            "सिर्फ Indian markets position-sizing risk carry करते हैं"
          ],
          "ta": [
            "Nobel Prize winners ஒருபோதும் trade பண்ணக்கூடாது",
            "Position sizing தப்பா இருந்தா, analysis-ல correct-ஆ இருப்பது போதாது",
            "Hedge funds-க்கு Leverage எப்போதும் safe",
            "Indian markets மட்டும் தான் position-sizing risk carry பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Even sound analysis can fail catastrophically if the position size exposes too much capital to a single bad stretch. 43. Trading Psychology: Fear, Greed & Discipline",
          "hi": "अगर position size बहुत ज़्यादा capital को एक बुरे stretch के exposed कर देता है तो sound analysis भी catastrophically fail हो सकती है।",
          "ta": "Position size ஒரே ஒரு bad stretch-க்கு ரொம்ப அதிக capital-ஐ expose பண்ணா, sound analysis கூட catastrophically fail ஆகலாம்."
        }
      }
    ]
  },
  {
    "id": 43,
    "tier": "Advanced",
    "title": {
      "en": "Trading Psychology: Fear, Greed & Discipline",
      "hi": "Trading Psychology: Fear, Greed और Discipline",
      "ta": "Trading Psychology: Fear, Greed & Discipline"
    },
    "opener": {
      "en": "Meera noticed her own hands got shaky before placing a slightly larger trade than usual — even one backed by solid research. “Is that normal?” she asked. “Completely,” Paati said. “In fact, there's literally an index in India that measures that exact feeling, market-wide.”",
      "hi": "मीरा ने notice किया कि हमेशा से थोड़ी बड़ी trade place करने से पहले उसके अपने हाथ काँपने लगे — भले ही वो trade solid research पर based थी। “क्या ये normal है?” उसने पूछा। “बिल्कु ल,” पाटी ने कहा। “actually, India में literally एक index है जो market-wide उसी exact feeling को measure करता है।”",
      "ta": "வழக்கத்தை விட கொஞ்சம் பெரிய ஒரு trade போடுறதற்கு முன், solid research support பண்ணினாலும் கூட, தன் கைகள் shaky-ஆ இருக்கிறதை மீரா கவனிச்சாள். “அது normal-ஆ?” என்று கேட்டாள். “முற்றிலும்,” பாட்டி சொன்னார். “உண்மையில், இந்தியாவில் அந்த exact feeling-ஐ, market-wide-ஆ measure பண்ற ஒரு index-ஏ literally இருக்கு.”"
    },
    "realStorySubtitle": {
      "en": "India's Official 'Fear Gauge'",
      "hi": "India का Official 'Fear Gauge'",
      "ta": "இந்தியாவின் Official ‘Fear Gauge’"
    },
    "realStoryBody": {
      "en": "In 2008, the NSE launched India VIX, an index that measures the market's expectation of near-term volatility based on Nifty options prices — widely nicknamed the market's 'fear gauge,' since it tends to spike sharply during periods of panic and stay low during calm, confident periods.\n\nWatching India VIX over time is a genuinely useful, real way to see collective fear and greed quantified — a reminder that Meera's own shaky hands before a bigger trade are simply an individual-scale version of something the entire market visibly experiences together.",
      "hi": "2008 में, NSE ने India VIX launch किया, एक ऐसा index जो Nifty options prices के आधार पर market की near-term volatility की expectation को measure करता है — जिसे widely market का 'fear gauge' कहा जाता है, क्योंकि ये panic के periods के दौरान तेज़ी से spike करता है और calm, confident periods के दौरान low रहता है।\n\nसमय के साथ India VIX को देखना collective fear और greed को quantified देखने का एक genuinely useful, real तरीका है — एक reminder कि एक बड़ी trade से पहले मीरा के अपने काँपते हाथ बस उसी चीज़ का एक individual-scale version हैं जो पूरा market एक साथ visibly experience करता है।",
      "ta": "2008-ல, NSE India VIX-ஐ launch பண்ணுச்சு, Nifty options prices-ஐ அடிப்படையாக் கொண்டு near- term volatility-க்கான market-ன் expectation-ஐ measure பண்ற ஒரு index — market-ன் ‘fear gauge’-ன்னு widely nickname ஆனது, panic காலங்களில் sharply spike ஆகி, calm, confident காலங்களில் low-ஆ stay ஆக tend ஆகும்.\n\nநேரம் ஆக India VIX-ஐ watch பண்றது, collective fear-ஐயும் greed-ஐயும் quantify பண்ணி பார்க்க ஒரு genuinely useful, real வழி — ஒரு பெரிய trade-க்கு முன் மீராவின் சொந்த shaky hands, முழு market-உம் ஒரே நேரத்தில் visibly experience பண்ற ஒண்ணின individual-scale version தானுன்னு ஒரு நினைவூட்டல்."
    },
    "body": {
      "en": "Fear's Common Trading Costs • Selling in a panic near a market bottom, then missing the recovery. • Refusing to take a well-researched trade at all, out of excessive caution.\n\nGreed's Common Trading Costs • Holding a winning position too long, chasing an even bigger gain, and giving back profits. • Increasing position size impulsively after a winning streak, ignoring position-sizing discipline (Lesson 42).\n\nDiscipline — The Antidote to Both A written plan, decided before emotions are running high (entry price, exit price, stop-loss, position size) is what discipline actually looks like in practice — deciding calmly in advance, then following that decision even when fear or greed shows up in the moment.",
      "hi": "Fear की Common Trading Costs • एक market bottom के पास panic में बेचना, फिर recovery miss करना।\n\n• excessive caution की वजह से एक well-researched trade बिल्कुल भी लेने से मना करना।\n\nGreed की Common Trading Costs • एक winning position को बहुत देर तक hold करना, एक और भी बड़े gain के पीछे भागना, और profits वापस देना।\n\n• एक winning streak के बाद impulsively position size बढ़ाना, position-sizing discipline (Lesson 42) को ignore करते हुए।\n\nDiscipline — दोनों का Antidote emotions high होने से पहले decide किया गया एक written plan (entry price, exit price, stop-loss, position size) असल में practice में discipline कै सा दिखता है, इसका उदाहरण है — पहले से calmly decide करना, फिर उस decision को follow करना भले ही उस moment fear या greed सामने आए।",
      "ta": "Fear-ன் Common Trading Costs • ஒரு market bottom-க்கு அருகில் panic-ல விக்குறது, பிறகு recovery-ஐ miss பண்றது.\n\n• Excessive caution-ஆல, ஒரு well-researched trade-ஐயே எடுக்க refuse பண்றது.\n\nGreed-ன் Common Trading Costs • ஒரு winning position-ஐ ரொம்ப நேரம் hold பண்றது, இன்னும் பெரிய gain-ஐ chase பண்றது, profits-ஐ திரும்ப கொடுக்குறது.\n\n• ஒரு winning streak-க்கு பிறகு impulsively position size-ஐ கூட்டுறது, position-sizing discipline-ஐ (Lesson 42) ignore பண்றது.\n\nDiscipline — இரண்டுக்குமே Antidote Emotions high-ஆ இருக்கும் முன் decide பண்ணின ஒரு written plan (entry price, exit price, stop-loss, position size) தான் discipline practice-ல எப்படி இருக்கும்னு காட்டும் — முன்னாடியே calm-ஆ decide பண்ணி, moment-ல fear அல்லது greed வந்தாலும் அந்த decision-ஐ follow பண்றது."
    },
    "keyTakeaway": {
      "en": "Fear and greed are universal and measurable (literally, via India VIX) — the goal was never to eliminate them, which isn't realistic, but to have a pre-decided plan disciplined enough to override them when it matters most.",
      "hi": "Fear और greed universal और measurable हैं (literally, India VIX के ज़ रिए) — goal कभी इन्हें eliminate करना नहीं था, जो realistic नहीं है, बल्कि एक ऐसा pre-decided plan रखना था जो सबसे ज़ रूरी moment पर इन्हें override करने के लिए काफी disciplined हो।",
      "ta": "Fear-உம் greed-உம் universal-உம் measurable-உம் (literally, India VIX மூலமா) — அவற்றை eliminate பண்றது ஒருபோதும் goal இல்ல, அது realistic இல்ல, ஆனா அது மிக முக்கியமா தேவைப்படும்போது அவற்றை override பண்ற அளவுக்கு disciplined-ஆன ஒரு pre- decided plan இருப்பது தான் goal."
    },
    "quiz": [
      {
        "question": {
          "en": "What is India VIX?",
          "hi": "India VIX क्या है?",
          "ta": "India VIX என்றால் என்ன?"
        },
        "options": {
          "en": [
            "A stock exchange",
            "An index measuring the market's expected near-term volatility, nicknamed the 'fear gauge'",
            "A type of mutual fund",
            "A government bond"
          ],
          "hi": [
            "एक stock exchange",
            "एक index जो market की expected near-term volatility measure करता है, जिसे 'fear gauge' का nickname दिया गया है",
            "एक तरह का mutual fund",
            "एक government bond"
          ],
          "ta": [
            "ஒரு stock exchange",
            "Market-ன் expected near-term volatility-ஐ measure பண்ற, ‘fear gauge’-ன்னு nickname ஆன ஒரு index",
            "ஒரு வகை mutual fund",
            "ஒரு government bond"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Launched by NSE in 2008, India VIX quantifies collective market fear and uncertainty.",
          "hi": "2008 में NSE द्वारा launch किया गया, India VIX collective market fear और uncertainty को quantify करता है।",
          "ta": "2008-ல NSE launch பண்ணின India VIX, collective market fear-ஐயும் uncertainty-ஐயும் quantify பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What tends to happen to India VIX during periods of market panic?",
          "hi": "Market panic के periods के दौरान India VIX के साथ आमतौर पर क्या होता है?",
          "ta": "Market panic காலங்களில் India VIX-க்கு என்ன ஆக tend ஆகும்?"
        },
        "options": {
          "en": [
            "It disappears",
            "It tends to spike sharply",
            "It always falls to zero",
            "It has no relationship to market mood"
          ],
          "hi": [
            "ये गायब हो जाता है",
            "ये तेज़ी से spike करता है",
            "ये हमेशा zero तक गिर जाता है",
            "इसका market mood से कोई relationship नहीं है"
          ],
          "ta": [
            "அது மறைஞ்சுடும்",
            "அது sharply spike ஆக tend ஆகும்",
            "அது எப்போதும் zero-க்கு விழும்",
            "அதற்கு market mood-உடன் எந்த relationship-உம் இல்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Rising fear and uncertainty during panics is exactly what pushes this volatility-expectation index higher.",
          "hi": "Panics के दौरान बढ़ ता fear और uncertainty ही इस volatility-expectation index को ऊपर धके लता है।",
          "ta": "Panics-ன் போது அதிகரிக்கும் fear-உம் uncertainty-உம் தான், இந்த volatility-expectation index-ஐ மேலே தள்ளும்."
        }
      },
      {
        "question": {
          "en": "Which of these is a common trading cost of 'greed'?",
          "hi": "इनमें से कौन सा 'greed' की एक common trading cost है?",
          "ta": "‘Greed’-ன் ஒரு common trading cost எது?"
        },
        "options": {
          "en": [
            "Selling in a panic at the bottom",
            "Holding a winning position too long, chasing an even bigger gain, and giving back profits",
            "Refusing to ever trade",
            "Reading a company's balance sheet"
          ],
          "hi": [
            "Bottom पर panic में बेचना",
            "एक winning position को बहुत देर तक hold करना, एक और भी बड़े gain के पीछे भागना, और profits वापस देना",
            "कभी trade ना करना",
            "कं पनी की balance sheet पढ़ ना"
          ],
          "ta": [
            "Bottom-ல panic-ல விக்குறது",
            "ஒரு winning position-ஐ ரொம்ப நேரம் hold பண்றது, இன்னும் பெரிய gain-ஐ chase பண்றது, profits-ஐ திரும்ப கொடுக்குறது",
            "ஒருபோதும் trade பண்ண refuse பண்றது",
            "நிறுவனத்தின் balance sheet-ஐ படிக்குறது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Greed often shows up as overstaying a winning trade past its logical exit point.",
          "hi": "Greed अक्सर एक winning trade को उसके logical exit point से आगे तक overstay करने के रूप में दिखती है।",
          "ta": "Greed பெரும்பாலும் ஒரு winning trade-ஐ அதன் logical exit point-ஐ தாண்டி overstay பண்றதா காட்டும்."
        }
      },
      {
        "question": {
          "en": "What does genuine trading discipline look like in practice, according to the lesson?",
          "hi": "Lesson के अनुसार, practice में genuine trading discipline कै सी दिखती है?",
          "ta": "Lesson-ன் படி, practice-ல genuine trading discipline எப்படி இருக்கும்?"
        },
        "options": {
          "en": [
            "Deciding trades purely in the emotional heat of the moment",
            "A written plan (entry, exit, stop-loss, position size) decided calmly in advance and then followed",
            "Avoiding all planning entirely",
            "Only trading when feeling extremely confident"
          ],
          "hi": [
            "Trades को purely moment की emotional गर्मी में decide करना",
            "एक written plan (entry, exit, stop-loss, position size) जो पहले से calmly decide किया गया हो और फिर follow किया जाए",
            "पूरी तरह planning से बचना",
            "सिर्फ extremely confident महसूस करते समय trade करना"
          ],
          "ta": [
            "Moment-ன் emotional heat-ல மட்டும் trades-ஐ decide பண்றது",
            "முன்னாடியே calm-ஆ decide பண்ணி பிறகு follow பண்ணப்படும் ஒரு written plan (entry, exit, stop-loss, position size)",
            "Planning-ஐ முழுசா avoid பண்றது",
            "Extremely confident-ஆ feel பண்ணும்போது மட்டும் trade பண்றது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Discipline means pre-deciding key trade parameters before emotions can interfere, then sticking to that plan.",
          "hi": "Discipline का मतलब है emotions के interfere करने से पहले key trade parameters को pre-decide करना, फिर उस plan पर टिके रहना।",
          "ta": "Discipline என்றால், emotions interfere பண்றதுக்கு முன், key trade parameters-ஐ pre-decide பண்ணி, அந்த plan-ஐ stick பண்றது."
        }
      },
      {
        "question": {
          "en": "What is the lesson's overall message about fear and greed?",
          "hi": "Fear और greed के बारे में lesson का overall message क्या है?",
          "ta": "Fear-ஐயும் greed-ஐயும் பத்தி lesson-ன் overall message என்ன?"
        },
        "options": {
          "en": [
            "They can and should be completely eliminated",
            "They are universal and measurable — the goal is a disciplined plan that overrides them, not eliminating them",
            "Only beginners experience fear and greed",
            "They only affect professional traders"
          ],
          "hi": [
            "इन्हें पूरी तरह eliminate किया जा सकता है और करना चाहिए",
            "ये universal और measurable हैं — goal एक disciplined plan है जो इन्हें override करे, इन्हें eliminate करना नहीं",
            "सिर्फ beginners fear और greed experience करते हैं",
            "ये सिर्फ professional traders को affect करते हैं"
          ],
          "ta": [
            "அவற்றை முழுசா eliminate பண்ண முடியும், பண்ணணும்",
            "அவை universal-உம் measurable-உம் — அவற்றை eliminate பண்றது இல்ல, override பண்ற ஒரு disciplined plan தான் goal",
            "Beginners மட்டும் தான் fear-ஐயும் greed-ஐயும் experience பண்ணுவாங்க",
            "அவை professional traders-ஐ மட்டும் தான் affect பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Even the whole market visibly experiences fear and greed (as India VIX shows) — discipline, not elimination, is the realistic goal. 44. Behavioral Biases That Hurt Traders",
          "hi": "पूरा market भी visibly fear और greed experience करता है (जैसा India VIX दिखाता है) — elimination नहीं, discipline ही realistic goal है।",
          "ta": "முழு market-உமே fear-ஐயும் greed-ஐயும் visibly experience பண்ணும் (India VIX காட்டுற மாதிரி) — elimination இல்ல, discipline தான் realistic goal."
        }
      }
    ]
  },
  {
    "id": 44,
    "tier": "Advanced",
    "title": {
      "en": "Behavioral Biases That Hurt Traders",
      "hi": "Behavioral Biases जो Traders को नुकसान पहुंचाते हैं",
      "ta": "Traders-ஐ Hurt பண்ற Behavioral Biases"
    },
    "opener": {
      "en": "“Fear and greed I understand now,” Meera said, “but why do I keep holding onto a losing stock specifically because I don't want to admit I was wrong?” Paati smiled. “That one even has a name — and it won its discoverers a Nobel Prize.”",
      "hi": "“Fear और greed अब मुझे समझ आते हैं,” मीरा ने कहा, “लेकिन मैं एक losing stock को specifically इसलिए क्यों पकड़े रहती हूँ क्योंकि मैं ये मानना नहीं चाहती कि मैं गलत थी?” पाटी मुस्कु राई। “उस चीज़ का तो एक नाम भी है — और इसने अपने discoverers को एक Nobel Prize जितवाया।”",
      "ta": "“Fear-உம் greed-உம் இப்போ புரியுது,” மீரா சொன்னாள், “ஆனா நான் தப்பு பண்ணேன்னு admit பண்ண விரும்பாத ஒரு காரணத்துக்காக மட்டும், ஒரு losing stock-ஐ ஏன் தொடர்ந்து hold பண்றேன்?” பாட்டி புன்னகைச்சார். “அதுக்கு ஒரு பெயரே இருக்கு — அது கண்டுபிடிச்சவங்களுக்கு ஒரு Nobel Prize கூட வென்னு கொடுத்துச்சு.”"
    },
    "realStorySubtitle": {
      "en": "The Research That Changed How We Understand Investors",
      "hi": "वो Research जिसने बदल दिया कि हम Investors को कै से समझते हैं",
      "ta": "Investors-ஐ நாம் புரிஞ்சுக்கிற வழியையே மாத்தின Research"
    },
    "realStoryBody": {
      "en": "Psychologists Daniel Kahneman and Amos Tversky's research on decision-making under uncertainty — particularly their 1979 “Prospect Theory” — showed that people feel the pain of a loss roughly twice as intensely as the pleasure of an equivalent gain, a bias now called loss aversion. Kahneman was awarded the Nobel Memorial Prize in Economic Sciences in 2002 for this body of work.\n\nTheir research reshaped the entire field of behavioural finance and explains, with real academic rigour, exactly the pattern Meera described — investors holding losing positions far longer than winning ones, simply to avoid the discomfort of locking in a loss.",
      "hi": "Psychologists Daniel Kahneman और Amos Tversky की uncertainty के तहत decision-making पर research — खासकर उनकी 1979 की “Prospect Theory” — ने दिखाया कि लोग एक loss का दर्द उतने ही size के gain की खुशी से लगभग दोगुना intensely महसूस करते हैं, एक bias जिसे अब loss aversion कहा जाता है। Kahneman को इस काम के लिए 2002 में Nobel Memorial Prize in Economic Sciences दिया गया।\n\nउनकी research ने behavioural finance के पूरे field को reshape कर दिया और real academic rigour के साथ बिल्कुल वही pattern explain करती है जो मीरा ने describe किया — investors winning positions से कहीं ज़्यादा देर तक losing positions को hold करते हैं, सिर्फ एक loss को lock in करने की असुविधा से बचने के लिए।",
      "ta": "Uncertainty-ன் கீழ் decision-making-ஐ பத்தி Psychologists Daniel Kahneman-உம் Amos Tversky-உம் பண்ண research — குறிப்பா அவங்க 1979 “Prospect Theory” — மக்கள் ஒரு loss-ன் pain-ஐ, அதே அளவு gain-ன் pleasure-ஐ விட roughly இரண்டு மடங்கு intensely feel பண்றாங்கனு காட்டுச்சு, இதற்கு இப்போ loss aversion-னு பெயர். இந்த body of work-க்காக 2002-ல Kahneman-க்கு Nobel Memorial Prize in Economic Sciences கொடுக்கப்பட்டுச்சு.\n\nஅவங்க research behavioural finance-ன் முழு field-ஐயும் reshape பண்ணுச்சு, மீரா describe பண்ணின exact pattern-ஐ real academic rigour-உடன் explain பண்ணுது — investors, ஒரு loss-ஐ lock பண்றதோட discomfort-ஐ avoid பண்ணவே, losing positions-ஐ winning ones-ஐ விட ரொம்ப நேரம் hold பண்றது."
    },
    "body": {
      "en": "Common Biases Worth Recognising in Yourself • Loss Aversion: Holding losers too long to avoid admitting a loss, while selling winners too early to lock in a gain. • Confirmation Bias: Seeking out only news and opinions that support a position you already hold, ignoring contrary evidence. • Herd Mentality: Buying or selling simply because everyone else is (Lesson 12's WhatsApp-tip pattern is a clear real example). • Overconfidence: Overestimating your own skill after a few successful trades, often followed by larger, less careful bets.",
      "hi": "खुद में पहचानने लायक Common Biases • Loss Aversion: एक loss मानने से बचने के लिए losers को बहुत देर तक hold करना, जबकि एक gain lock करने के लिए winners को बहुत जल्दी बेच देना।\n\n• Confirmation Bias: सिर्फ वो news और opinions ढूँढना जो आपके पहले से रखे position को support करते हैं, contrary evidence को ignore करते हुए।\n\n• Herd Mentality: सिर्फ इसलिए खरीदना या बेचना क्योंकि बाकी सब ऐसा कर रहे हैं (Lesson 12 का WhatsApp-tip pattern एक साफ real example है)।\n\n• Overconfidence: कुछ successful trades के बाद अपनी skill को overestimate करना, अक्सर बड़े, कम सावधान bets के साथ आगे बढ़ ते हुए।",
      "ta": "உங்களுக்குள்ளேயே Recognise பண்ண Worth-ஆன Common Biases • Loss Aversion: ஒரு loss-ஐ admit பண்றதை avoid பண்ண losers-ஐ ரொம்ப நேரம் hold பண்றது, ஒரு gain-ஐ lock பண்ண winners-ஐ ரொம்ப சீக்கிரம் விக்குறது.\n\n• Confirmation Bias: ஏற்கனவே உங்களிடம் இருக்கிற ஒரு position-ஐ support பண்ற news-ஐயும் opinions-ஐயும் மட்டும் தேடுறது, contrary evidence-ஐ ignore பண்றது.\n\n• Herd Mentality: மற்றவங்க எல்லோரும் பண்றாங்க என்பதற்காக மட்டும் வாங்குறது அல்லது விக்குறது (Lesson 12-ன் WhatsApp-tip pattern ஒரு தெளிவான real example).\n\n• Overconfidence: சில successful trades-க்கு பிறகு உங்க சொந்த skill-ஐ overestimate பண்றது, பெரும்பாலும் பெரிய, less careful bets-ஐ followed பண்ணும்."
    },
    "keyTakeaway": {
      "en": "These biases are well-documented, Nobel-Prize-backed patterns in ordinary human decision-making, not personal character flaws. Simply recognising them by name — as Meera just did with loss aversion — is often the first real step toward catching yourself before they drive a decision.",
      "hi": "ये biases ordinary human decision-making में well-documented, Nobel-Prize-backed patterns हैं, कोई personal character flaws नहीं। बस इन्हें नाम से पहचान लेना — जैसा मीरा ने अभी loss aversion के साथ किया — अक्सर खुद को किसी decision को drive करने से पहले पकड़ ने की तरफ पहला real step होता है।",
      "ta": "இந்த biases, ordinary human decision-making-ல well-documented, Nobel-Prize- backed patterns, personal character flaws இல்ல. மீரா loss aversion-உடன் இப்போதான் பண்ணின மாதிரி, வெறுமனே அவற்றை பெயரால் recognise பண்றது, ஒரு decision-ஐ அவை drive பண்றதுக்கு முன் catching yourself-க்கான first real step ஆகிடும்."
    },
    "quiz": [
      {
        "question": {
          "en": "What is 'loss aversion'?",
          "hi": "'Loss aversion' क्या है?",
          "ta": "‘Loss aversion’ என்றால் என்ன?"
        },
        "options": {
          "en": [
            "Preferring gains over losses equally",
            "Feeling the pain of a loss more intensely than the pleasure of an equivalent gain",
            "A type of stop-loss order",
            "A government tax on losses"
          ],
          "hi": [
            "Gains को losses के बराबर पसंद करना",
            "एक loss का दर्द equivalent gain की खुशी से ज़्यादा intensely महसूस करना",
            "एक तरह का stop-loss order",
            "Losses पर एक government tax"
          ],
          "ta": [
            "Losses-ஐ விட Gains-ஐ equally prefer பண்றது",
            "அதே அளவு gain-ன் pleasure-ஐ விட ஒரு loss-ன் pain-ஐ intensely-ஆ feel பண்றது",
            "ஒரு வகை stop-loss order",
            "Losses-ன் மேல ஒரு government tax"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Kahneman and Tversky's research found this asymmetry strongly influences investor behaviour, like holding losers too long.",
          "hi": "Kahneman और Tversky की research ने पाया कि ये asymmetry investor behaviour को strongly influence करती है, जैसे losers को बहुत देर तक hold करना।",
          "ta": "Kahneman-உம் Tversky-ன் research, losers-ஐ ரொம்ப நேரம் hold பண்றது மாதிரி investor behaviour-ஐ இந்த asymmetry strongly influence பண்ணுதுனு கண்டுபிடிச்சுச்சு."
        }
      },
      {
        "question": {
          "en": "Who won a Nobel Prize partly for research underlying loss aversion and prospect theory?",
          "hi": "Loss aversion और prospect theory के पीछे की research के लिए किसे partly Nobel Prize मिला?",
          "ta": "Loss aversion-க்கும் prospect theory-க்கும் underlying research-க்காக யாருக்கு பகுதியா Nobel Prize கிடைச்சுச்சு?"
        },
        "options": {
          "en": [
            "Daniel Kahneman",
            "Warren Buffett",
            "John Bollinger",
            "Gerald Appel"
          ],
          "hi": [
            "Daniel Kahneman",
            "Warren Buffett",
            "John Bollinger",
            "Gerald Appel"
          ],
          "ta": [
            "Daniel Kahneman",
            "Warren Buffett",
            "John Bollinger",
            "Gerald Appel"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "Kahneman received the 2002 Nobel Memorial Prize in Economic Sciences for this behavioural decision-making research.",
          "hi": "Kahneman को इस behavioural decision-making research के लिए 2002 का Nobel Memorial Prize in Economic Sciences मिला।",
          "ta": "இந்த behavioural decision-making research-க்காக 2002-ல Kahneman-க்கு Nobel Memorial Prize in Economic Sciences கிடைச்சுச்சு."
        }
      },
      {
        "question": {
          "en": "What is 'confirmation bias'?",
          "hi": "'Confirmation bias' क्या है?",
          "ta": "‘Confirmation bias’ என்றால் என்ன?"
        },
        "options": {
          "en": [
            "Always seeking opposing viewpoints",
            "Seeking out only information that supports a position you already hold",
            "A type of technical indicator",
            "A rule about position sizing"
          ],
          "hi": [
            "हमेशा opposing viewpoints ढूँढना",
            "सिर्फ वो information ढूँढना जो आपके पहले से रखे position को support करती है",
            "एक तरह का technical indicator",
            "Position sizing के बारे में एक rule"
          ],
          "ta": [
            "எப்போதும் opposing viewpoints-ஐ தேடுறது",
            "ஏற்கனவே உங்களிடம் இருக்கிற ஒரு position-ஐ support பண்ற information-ஐ மட்டும் தேடுறது",
            "ஒரு வகை technical indicator",
            "Position sizing-ஐ பத்தின ஒரு rule"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This bias leads investors to ignore evidence that contradicts their existing beliefs about a trade.",
          "hi": "ये bias investors को उस evidence को ignore करने पर ले जाता है जो किसी trade के बारे में उनकी existing beliefs को contradict करता है।",
          "ta": "ஒரு trade-ஐ பத்தின அவங்க existing beliefs-ஐ contradict பண்ற evidence-ஐ ignore பண்ண இந்த bias investors-ஐ lead பண்ணும்."
        }
      },
      {
        "question": {
          "en": "Which earlier lesson's WhatsApp-tip example illustrates 'herd mentality'?",
          "hi": "पहले की कौन सी lesson का WhatsApp-tip example 'herd mentality' को illustrate करता है?",
          "ta": "‘Herd mentality’-ஐ எந்த earlier lesson-ன் WhatsApp-tip example illustrate பண்ணும்?"
        },
        "options": {
          "en": [
            "Lesson 5",
            "Lesson 12",
            "Lesson 20",
            "Lesson 30"
          ],
          "hi": [
            "Lesson 5",
            "Lesson 12",
            "Lesson 20",
            "Lesson 30"
          ],
          "ta": [
            "Lesson 5",
            "Lesson 12",
            "Lesson 20",
            "Lesson 30"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Common Beginner Mistakes (Lesson 12) described trading on tips and following the crowd, a clear herd-mentality example.",
          "hi": "Common Beginner Mistakes (Lesson 12) ने tips पर trade करने और crowd को follow करने का वर्णन किया, एक साफ herd- mentality example।",
          "ta": "Common Beginner Mistakes (Lesson 12), tips-ல trade பண்றதையும் crowd-ஐ follow பண்றதையும் describe பண்ணுச்சு, ஒரு தெளிவான herd-mentality example."
        }
      },
      {
        "question": {
          "en": "According to the lesson, what is often the first step to overcoming these biases?",
          "hi": "Lesson के अनुसार, इन biases को overcome करने का पहला step अक्सर क्या होता है?",
          "ta": "Lesson-ன் படி, இந்த biases-ஐ overcome பண்ண first step பெரும்பாலும் என்ன?"
        },
        "options": {
          "en": [
            "Ignoring them entirely",
            "Simply recognising and naming the bias as it happens",
            "Trading more frequently",
            "Avoiding the stock market completely"
          ],
          "hi": [
            "इन्हें पूरी तरह ignore करना",
            "जैसे ही bias हो, बस उसे पहचानना और नाम देना",
            "ज़्यादा frequently trade करना",
            "Stock market से पूरी तरह बचना"
          ],
          "ta": [
            "அவற்றை முழுசா ignore பண்றது",
            "அது நடக்கும்போதே அந்த bias-ஐ வெறுமனே recognise பண்ணி பெயர் வைக்குறது",
            "அதிக frequently trade பண்றது",
            "Stock market-ஐ முழுசா avoid பண்றது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Awareness of a specific, well-documented bias is often what allows a trader to catch themselves before acting on it. 45. Using Your Trading Journal to Spot Patterns",
          "hi": "एक specific, well-documented bias के बारे में awareness अक्सर वही है जो एक trader को उस पर act करने से पहले खुद को पकड़ ने देता है।",
          "ta": "ஒரு specific, well-documented bias-ஐ பத்தின awareness, பெரும்பாலும் அதன் மேல act பண்றதுக்கு முன், ஒரு trader தன்னை catch பண்ண அனுமதிக்கும்."
        }
      }
    ]
  },
  {
    "id": 45,
    "tier": "Advanced",
    "title": {
      "en": "Using Your Trading Journal to Spot Patterns",
      "hi": "अपने Trading Journal से Patterns पहचानना",
      "ta": "Patterns Spot பண்ண உங்க Trading Journal-ஐ"
    },
    "opener": {
      "en": "Meera had kept a simple trading journal since Lesson 14, mostly out of habit. Sitting down to actually reread months of entries for the first time, she noticed something she'd never have spotted trade by trade: nearly every one of her losing trades had been made on a Friday afternoon, rushed before the weekend.\n\n“That's not a coincidence you'd ever catch in the moment,” Paati said. “That's exactly what a journal is for — it shows you patterns about yourself, not just the stock.”\n\nWhat to Actually Record • What you bought or sold, and the exact price and date. • Why you made the trade — the specific reasoning, fundamental or technical. • How you felt going in (calm, rushed, excited, anxious) — this is the part most beginners skip, and the most revealing. • What actually happened, and what you'd do differently next time.\n\nWhat Patterns to Look For Review your journal periodically (monthly is a reasonable habit) looking specifically for repeated mistakes — a particular time of day, a particular emotional state, a particular type of stock, or ignoring your own stop-loss rule (Lesson 6) more often than you'd like to admit.\n\nKey takeaway: A trading journal's real value isn't the individual entries — it's the pattern that only becomes visible looking back across many of them, exactly like Meera's Friday-afternoon discovery. It turns vague self-awareness into specific, actionable evidence about your own behaviour.\n\nQUICK QUIZ · TEST YOURSELF (5 QUESTIONS)\n\n1. What did Meera discover by rereading months of her trading journal? A) She only traded IT stocks B) Nearly all her losing trades happened on rushed Friday afternoons C) She never made any losing trades D) Her journal had no useful information Correct: B) Nearly all her losing trades happened on rushed Friday afternoons Why: This pattern was only visible by reviewing many entries together, not from any single trade.\n\n2. What part of a trading journal entry does the lesson say most beginners skip, despite it being the most revealing? A) The stock's ticker symbol B) How they felt emotionally going into the trade C) The purchase price D) The date of the trade Correct: B) How they felt emotionally going into the trade Why: Emotional context often reveals the real behavioural pattern behind a trading mistake.\n\n3. How often does the lesson suggest reviewing a trading journal for patterns? A) Never B) Periodically, such as monthly C) Only once, at the very end of your investing life D) Every minute during market hours Correct: B) Periodically, such as monthly Why: Regular review is what allows recurring patterns to surface and be addressed.\n\n4. What is the main value of a trading journal, according to the lesson? A) It guarantees future profits B) It reveals patterns in your own behaviour that aren't visible from any single trade C) It replaces the need for research entirely D) It only matters for tax purposes Correct: B) It reveals patterns in your own behaviour that aren't visible from any single trade Why: The journal's power comes from reviewing many entries together, surfacing patterns invisible in the moment.\n\n5. Which earlier lesson's rule did the lesson suggest checking your journal against (e.g., 'ignoring it more often than you'd like')? A) Lesson 6's stop-loss rule B) Lesson 35's ETF lesson C) Lesson 20's ratio lesson D) Lesson 2's IPO lesson Correct: A) Lesson 6's stop-loss rule Why: Checking whether you've been ignoring your own stop-loss discipline is a specific, useful pattern to look for.\n\n46. Sector Deep-Dive: Banking & Financials",
      "hi": "मीरा ने Lesson 14 से एक simple trading journal रखा था, ज़्यादातर habit की वजह से। पहली बार बैठकर महीनों की entries को actually दोबारा पढ़ ते हुए, उसे कुछ ऐसा notice हुआ जो उसने trade by trade कभी नहीं पकड़ा होता: उसकी लगभग हर losing trade एक Friday afternoon को की गई थी, weekend से पहले जल्दबाज़ी में।\n\n“वो कोई coincidence नहीं है जिसे तुम उस moment में कभी पकड़ पातीं,” पाटी ने कहा। “Journal बिल्कुल इसी के लिए है — ये तुम्हें खुद के बारे में patterns दिखाता है, सिर्फ stock के बारे में नहीं।”\n\nअसल में क्या Record करें • आपने क्या खरीदा या बेचा, और exact price और date।\n\n• आपने trade क्यों की — specific reasoning, fundamental या technical। • जाते समय आपको कै सा महसूस हुआ (calm, rushed, excited, anxious) — ये वो हिस्सा है जो ज़्यादातर beginners skip करते हैं, और सबसे revealing हिस्सा है।\n\n• असल में क्या हुआ, और अगली बार आप क्या अलग करेंगे।\n\nकौन से Patterns देखें अपने journal को periodically review करें (monthly एक reasonable habit है) specifically repeated mistakes ढूँढते हुए — दिन का कोई particular time, कोई particular emotional state, किसी particular type का stock, या आप जितना मानना चाहती हैं उससे ज़्यादा बार अपने खुद के stop-loss rule (Lesson 6) को ignore करना।\n\nमुख्य सीख: एक trading journal की real value individual entries नहीं है — ये वो pattern है जो सिर्फ उनमें से कई को पीछे मुड़ कर देखने पर visible होता है, बिल्कुल मीरा की Friday-afternoon discovery की तरह। ये vague self- awareness को अपने खुद के behaviour के बारे में specific, actionable evidence में बदल देता है।\n\nक्विक क्विज़ · खुद को टेस्ट करें (5 सवाल)\n\n1. अपने trading journal की महीनों की entries दोबारा पढ़ ते हुए मीरा ने क्या discover किया? A) उसने सिर्फ IT stocks trade किए B) उसकी लगभग सारी losing trades rushed Friday afternoons को हुईं C) उसने कभी कोई losing trade नहीं की D) उसके journal में कोई useful information नहीं थी सही जवाब: B) उसकी लगभग सारी losing trades rushed Friday afternoons को हुईं क्यों: ये pattern सिर्फ कई entries को साथ में review करने पर ही visible था, किसी एक trade से नहीं।\n\n2. Lesson कहता है कि trading journal entry का कौन सा हिस्सा ज़्यादातर beginners skip करते हैं, भले ही वो सबसे revealing हो? A) Stock का ticker symbol B) Trade में जाते समय उन्हें emotionally कै सा महसूस हुआ C) Purchase price D) Trade की date सही जवाब: B) Trade में जाते समय उन्हें emotionally कै सा महसूस हुआ क्यों: Emotional context अक्सर किसी trading mistake के पीछे के real behavioural pattern को reveal करता है।\n\n3. Lesson patterns के लिए trading journal review करने का कितनी बार सुझाव देता है? A) कभी नहीं B) Periodically, जैसे monthly C) सिर्फ एक बार, आपके investing life के बिल्कुल आखिर में D) Market hours के दौरान हर मिनट सही जवाब: B) Periodically, जैसे monthly क्यों: Regular review ही recurring patterns को सामने आने और address होने देता है।\n\n4. Lesson के अनुसार, trading journal की main value क्या है? A) ये future profits guarantee करता है B) ये आपके खुद के behaviour में patterns reveal करता है जो किसी एक trade से visible नहीं होते C) ये research की ज़ रूरत को पूरी तरह replace कर देता है D) ये सिर्फ tax purposes के लिए matter करता है सही जवाब: B) ये आपके खुद के behaviour में patterns reveal करता है जो किसी एक trade से visible नहीं होते क्यों: Journal की power कई entries को साथ में review करने से आती है, जो patterns को उजागर करती है जो moment में invisible होते हैं।\n\n5. Lesson ने अपने journal के against check करने के लिए पहले की किस lesson का rule सुझाया (जैसे 'जितना आप मानना चाहेंगे उससे ज़्यादा बार इसे ignore करना')? A) Lesson 6 का stop-loss rule B) Lesson 35 का ETF lesson C) Lesson 20 का ratio lesson D) Lesson 2 का IPO lesson सही जवाब: A) Lesson 6 का stop-loss rule क्यों: ये check करना कि क्या आप अपनी खुद की stop-loss discipline को ignore करते रहे हैं, देखने लायक एक specific, useful pattern है।",
      "ta": "பயன்படுத்துறது\n\nLesson 14-லிருந்து மீரா ஒரு simple trading journal வச்சிருந்தாள், பெரும்பாலும் habit-ஆ. முதன்முறையா, மாசக்கணக்கான entries-ஐ actual-ஆ திரும்ப படிக்க உட்கார்ந்தபோது, trade by trade spot பண்ண ஒருபோதும் முடியாத ஒண்ணை கவனிச்சாள்: அவளோட losing trades-ல கிட்டத்தட்ட ஒவ்வொண்ணும், weekend-க்கு முன், rushed-ஆ, ஒரு Friday afternoon-ல பண்ணப்பட்டிருந்துச்சு.\n\n“அது moment-ல நீங்க ஒருபோதும் catch பண்ண முடியாத ஒரு coincidence இல்ல,” பாட்டி சொன்னார். “அதுக்குத் தான் ஒரு journal — Stock-ஐ மட்டும் இல்ல, உங்களைப் பத்தின patterns-ஐயும் அது காட்டும்.”\n\nActual-ஆ என்ன Record பண்ணணும் • நீங்க என்ன வாங்கினீங்க அல்லது விற்றீங்க, exact விலையும் date-உம்.\n\n• நீங்க ஏன் அந்த trade பண்ணீங்க — specific reasoning, fundamental அல்லது technical. • போற நேரம் நீங்க எப்படி feel பண்ணீங்க (calm, rushed, excited, anxious) — பெரும்பாலான beginners skip பண்ற part இதுதான், மிகவும் revealing-ஆனதும் இதுதான்.\n\n• Actual-ஆ என்ன நடந்துச்சு, அடுத்த தடவை நீங்க என்ன differently பண்ணுவீங்க.\n\nஎந்த Patterns-ஐ தேடணும் உங்க journal-ஐ periodically (monthly ஒரு reasonable habit) review பண்ணுங்க, repeated mistakes-ஐ specific-ஆ தேடுங்க — ஒரு particular நேரம், ஒரு particular emotional state, ஒரு particular வகை stock, அல்லது admit பண்ண விரும்புறதை விட அதிகமா உங்க சொந்த stop-loss rule-ஐ (Lesson 6) ignore பண்றது.\n\nமுக்கிய பாடம்: ஒரு trading journal-ன் real value individual entries இல்ல — அவற்றில் நிறைய entries-ஐ திரும்பி பார்க்கும்போது மட்டும் visible ஆகுற pattern தான், மீராவின் Friday-afternoon discovery மாதிரியே exact-ஆ. Vague self-awareness-ஐ, உங்க சொந்த behaviour-ஐ பத்தின specific, actionable evidence-ஆ இது மாற்றும்.\n\nவினாடி வினா · சுயபரிசோதனை (5 கேள்விகள்)\n\n1. மாசக்கணக்கான journal-ஐ திரும்ப படிச்சு மீரா என்ன கண்டுபிடிச்சாள்? A) அவள் IT stocks மட்டும் தான் trade பண்ணினாள் B) அவளோட losing trades கிட்டத்தட்ட எல்லாமே rushed Friday afternoons-ல நடந்திருந்துச்சு C) அவள் ஒரு losing trade-ஐயும் ஒருபோதும் பண்ணல D) அவளோட journal-ல எந்த useful information-உம் இல்ல சரியான பதில்:B) அவளோட losing trades கிட்டத்தட்ட எல்லாமே rushed Friday afternoons-ல நடந்திருந்துச்சு ஏன்:எந்த ஒரு single trade-லிருந்தும் இல்லாம, நிறைய entries-ஐ சேர்த்து review பண்ணும்போது மட்டும் தான் இந்த pattern visible-ஆ இருந்துச்சு.\n\n2. Trading journal entry-ன் எந்த part-ஐ, மிகவும் revealing-ஆ இருந்தும், பெரும்பாலான beginners skip பண்றாங்கனு lesson சொல்லுது? A) Stock-ன் ticker symbol B) Trade-க்குள் போறபோது அவங்க emotionally எப்படி feel பண்ணினாங்கனுறது C) Purchase price D) Trade-ன் date சரியான பதில்:B) Trade-க்குள் போறபோது அவங்க emotionally எப்படி feel பண்ணினாங்கனுறது ஏன்:Emotional context, பெரும்பாலும் ஒரு trading mistake-க்கு பின்னால் இருக்கிற real behavioural pattern-ஐ reveal பண்ணும்.\n\n3. Patterns-க்காக ஒரு trading journal-ஐ எவ்வளவு அடிக்கடி review பண்ணணும்னு lesson suggest பண்ணுது? A) ஒருபோதும் இல்ல B) Periodically, உ.தா., monthly C) ஒரே ஒரு தடவை, உங்க investing life முடிவில் மட்டும் D) Market hours-ல ஒவ்வொரு நிமிடமும் சரியான பதில்:B) Periodically, உ.தா., monthly ஏன்:Recurring patterns surface ஆகவும் address ஆகவும் regular review தான் அனுமதிக்கும்.\n\n4. Lesson-ன் படி, ஒரு trading journal-ன் main value என்ன? A) அது future profits-ஐ guarantee பண்ணும் B) எந்த ஒரு single trade-லும் visible-ஆ இல்லாத, உங்க சொந்த behaviour-ல patterns-ஐ அது reveal பண்ணும் C) அது research தேவையை முழுசா replace பண்ணும் D) அது tax purposes-க்கு மட்டும் matter பண்ணும் சரியான பதில்:B) எந்த ஒரு single trade-லும் visible-ஆ இல்லாத, உங்க சொந்த behaviour-ல patterns-ஐ அது reveal பண்ணும் ஏன்:Journal-ன் power, நிறைய entries-ஐ சேர்த்து review பண்றதிலிருந்து வரும், moment-ல invisible-ஆ இருக்கிற patterns-ஐ surface பண்ணும்.\n\n5. உங்க journal-ஐ எந்த earlier lesson-ன் rule-க்கு எதிரா check பண்ணணும்னு lesson suggest பண்ணுது (உ.தா., ‘admit பண்ண விரும்புறதை விட அதிகமா ignore பண்றது’)? A) Lesson 6-ன் stop-loss rule B) Lesson 35-ன் ETF lesson C) Lesson 20-ன் ratio lesson D) Lesson 2-ன் IPO lesson சரியான பதில்:A) Lesson 6-ன் stop-loss rule ஏன்:உங்க சொந்த stop-loss discipline-ஐ நீங்க ignore பண்ணிக்கிட்டிருக்கீங்களானு check பண்றது, தேட வேண்டிய ஒரு specific, useful pattern."
    },
    "body": {
      "en": "Meera had kept a simple trading journal since Lesson 14, mostly out of habit. Sitting down to actually reread months of entries for the first time, she noticed something she'd never have spotted trade by trade: nearly every one of her losing trades had been made on a Friday afternoon, rushed before the weekend.\n\n“That's not a coincidence you'd ever catch in the moment,” Paati said. “That's exactly what a journal is for — it shows you patterns about yourself, not just the stock.”\n\nWhat to Actually Record • What you bought or sold, and the exact price and date. • Why you made the trade — the specific reasoning, fundamental or technical. • How you felt going in (calm, rushed, excited, anxious) — this is the part most beginners skip, and the most revealing. • What actually happened, and what you'd do differently next time.\n\nWhat Patterns to Look For Review your journal periodically (monthly is a reasonable habit) looking specifically for repeated mistakes — a particular time of day, a particular emotional state, a particular type of stock, or ignoring your own stop-loss rule (Lesson 6) more often than you'd like to admit.",
      "hi": "मीरा ने Lesson 14 से एक simple trading journal रखा था, ज़्यादातर habit की वजह से। पहली बार बैठकर महीनों की entries को actually दोबारा पढ़ ते हुए, उसे कुछ ऐसा notice हुआ जो उसने trade by trade कभी नहीं पकड़ा होता: उसकी लगभग हर losing trade एक Friday afternoon को की गई थी, weekend से पहले जल्दबाज़ी में।\n\n“वो कोई coincidence नहीं है जिसे तुम उस moment में कभी पकड़ पातीं,” पाटी ने कहा। “Journal बिल्कुल इसी के लिए है — ये तुम्हें खुद के बारे में patterns दिखाता है, सिर्फ stock के बारे में नहीं।”\n\nअसल में क्या Record करें • आपने क्या खरीदा या बेचा, और exact price और date।\n\n• आपने trade क्यों की — specific reasoning, fundamental या technical। • जाते समय आपको कै सा महसूस हुआ (calm, rushed, excited, anxious) — ये वो हिस्सा है जो ज़्यादातर beginners skip करते हैं, और सबसे revealing हिस्सा है।\n\n• असल में क्या हुआ, और अगली बार आप क्या अलग करेंगे।\n\nकौन से Patterns देखें अपने journal को periodically review करें (monthly एक reasonable habit है) specifically repeated mistakes ढूँढते हुए — दिन का कोई particular time, कोई particular emotional state, किसी particular type का stock, या आप जितना मानना चाहती हैं उससे ज़्यादा बार अपने खुद के stop-loss rule (Lesson 6) को ignore करना।",
      "ta": "பயன்படுத்துறது\n\nLesson 14-லிருந்து மீரா ஒரு simple trading journal வச்சிருந்தாள், பெரும்பாலும் habit-ஆ. முதன்முறையா, மாசக்கணக்கான entries-ஐ actual-ஆ திரும்ப படிக்க உட்கார்ந்தபோது, trade by trade spot பண்ண ஒருபோதும் முடியாத ஒண்ணை கவனிச்சாள்: அவளோட losing trades-ல கிட்டத்தட்ட ஒவ்வொண்ணும், weekend-க்கு முன், rushed-ஆ, ஒரு Friday afternoon-ல பண்ணப்பட்டிருந்துச்சு.\n\n“அது moment-ல நீங்க ஒருபோதும் catch பண்ண முடியாத ஒரு coincidence இல்ல,” பாட்டி சொன்னார். “அதுக்குத் தான் ஒரு journal — Stock-ஐ மட்டும் இல்ல, உங்களைப் பத்தின patterns-ஐயும் அது காட்டும்.”\n\nActual-ஆ என்ன Record பண்ணணும் • நீங்க என்ன வாங்கினீங்க அல்லது விற்றீங்க, exact விலையும் date-உம்.\n\n• நீங்க ஏன் அந்த trade பண்ணீங்க — specific reasoning, fundamental அல்லது technical. • போற நேரம் நீங்க எப்படி feel பண்ணீங்க (calm, rushed, excited, anxious) — பெரும்பாலான beginners skip பண்ற part இதுதான், மிகவும் revealing-ஆனதும் இதுதான்.\n\n• Actual-ஆ என்ன நடந்துச்சு, அடுத்த தடவை நீங்க என்ன differently பண்ணுவீங்க.\n\nஎந்த Patterns-ஐ தேடணும் உங்க journal-ஐ periodically (monthly ஒரு reasonable habit) review பண்ணுங்க, repeated mistakes-ஐ specific-ஆ தேடுங்க — ஒரு particular நேரம், ஒரு particular emotional state, ஒரு particular வகை stock, அல்லது admit பண்ண விரும்புறதை விட அதிகமா உங்க சொந்த stop-loss rule-ஐ (Lesson 6) ignore பண்றது."
    },
    "keyTakeaway": {
      "en": "A trading journal's real value isn't the individual entries — it's the pattern that only becomes visible looking back across many of them, exactly like Meera's Friday-afternoon discovery. It turns vague self-awareness into specific, actionable evidence about your own behaviour.",
      "hi": "एक trading journal की real value individual entries नहीं है — ये वो pattern है जो सिर्फ उनमें से कई को पीछे मुड़ कर देखने पर visible होता है, बिल्कुल मीरा की Friday-afternoon discovery की तरह। ये vague self- awareness को अपने खुद के behaviour के बारे में specific, actionable evidence में बदल देता है।",
      "ta": "ஒரு trading journal-ன் real value individual entries இல்ல — அவற்றில் நிறைய entries-ஐ திரும்பி பார்க்கும்போது மட்டும் visible ஆகுற pattern தான், மீராவின் Friday-afternoon discovery மாதிரியே exact-ஆ. Vague self-awareness-ஐ, உங்க சொந்த behaviour-ஐ பத்தின specific, actionable evidence-ஆ இது மாற்றும்."
    },
    "quiz": [
      {
        "question": {
          "en": "What did Meera discover by rereading months of her trading journal?",
          "hi": "अपने trading journal की महीनों की entries दोबारा पढ़ ते हुए मीरा ने क्या discover किया?",
          "ta": "மாசக்கணக்கான journal-ஐ திரும்ப படிச்சு மீரா என்ன கண்டுபிடிச்சாள்?"
        },
        "options": {
          "en": [
            "She only traded IT stocks",
            "Nearly all her losing trades happened on rushed Friday afternoons",
            "She never made any losing trades",
            "Her journal had no useful information"
          ],
          "hi": [
            "उसने सिर्फ IT stocks trade किए",
            "उसकी लगभग सारी losing trades rushed Friday afternoons को हुईं",
            "उसने कभी कोई losing trade नहीं की",
            "उसके journal में कोई useful information नहीं थी"
          ],
          "ta": [
            "அவள் IT stocks மட்டும் தான் trade பண்ணினாள்",
            "அவளோட losing trades கிட்டத்தட்ட எல்லாமே rushed Friday afternoons-ல நடந்திருந்துச்சு",
            "அவள் ஒரு losing trade-ஐயும் ஒருபோதும் பண்ணல",
            "அவளோட journal-ல எந்த useful information-உம் இல்ல"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This pattern was only visible by reviewing many entries together, not from any single trade.",
          "hi": "ये pattern सिर्फ कई entries को साथ में review करने पर ही visible था, किसी एक trade से नहीं।",
          "ta": "எந்த ஒரு single trade-லிருந்தும் இல்லாம, நிறைய entries-ஐ சேர்த்து review பண்ணும்போது மட்டும் தான் இந்த pattern visible-ஆ இருந்துச்சு."
        }
      },
      {
        "question": {
          "en": "What part of a trading journal entry does the lesson say most beginners skip, despite it being the most revealing?",
          "hi": "Lesson कहता है कि trading journal entry का कौन सा हिस्सा ज़्यादातर beginners skip करते हैं, भले ही वो सबसे revealing हो?",
          "ta": "Trading journal entry-ன் எந்த part-ஐ, மிகவும் revealing-ஆ இருந்தும், பெரும்பாலான beginners skip பண்றாங்கனு lesson சொல்லுது?"
        },
        "options": {
          "en": [
            "The stock's ticker symbol",
            "How they felt emotionally going into the trade",
            "The purchase price",
            "The date of the trade"
          ],
          "hi": [
            "Stock का ticker symbol",
            "Trade में जाते समय उन्हें emotionally कै सा महसूस हुआ",
            "Purchase price",
            "Trade की date"
          ],
          "ta": [
            "Stock-ன் ticker symbol",
            "Trade-க்குள் போறபோது அவங்க emotionally எப்படி feel பண்ணினாங்கனுறது",
            "Purchase price",
            "Trade-ன் date"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Emotional context often reveals the real behavioural pattern behind a trading mistake.",
          "hi": "Emotional context अक्सर किसी trading mistake के पीछे के real behavioural pattern को reveal करता है।",
          "ta": "Emotional context, பெரும்பாலும் ஒரு trading mistake-க்கு பின்னால் இருக்கிற real behavioural pattern-ஐ reveal பண்ணும்."
        }
      },
      {
        "question": {
          "en": "How often does the lesson suggest reviewing a trading journal for patterns?",
          "hi": "Lesson patterns के लिए trading journal review करने का कितनी बार सुझाव देता है?",
          "ta": "Patterns-க்காக ஒரு trading journal-ஐ எவ்வளவு அடிக்கடி review பண்ணணும்னு lesson suggest பண்ணுது?"
        },
        "options": {
          "en": [
            "Never",
            "Periodically, such as monthly",
            "Only once, at the very end of your investing life",
            "Every minute during market hours"
          ],
          "hi": [
            "कभी नहीं",
            "Periodically, जैसे monthly",
            "सिर्फ एक बार, आपके investing life के बिल्कुल आखिर में",
            "Market hours के दौरान हर मिनट"
          ],
          "ta": [
            "ஒருபோதும் இல்ல",
            "Periodically, உ.தா., monthly",
            "ஒரே ஒரு தடவை, உங்க investing life முடிவில் மட்டும்",
            "Market hours-ல ஒவ்வொரு நிமிடமும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Regular review is what allows recurring patterns to surface and be addressed.",
          "hi": "Regular review ही recurring patterns को सामने आने और address होने देता है।",
          "ta": "Recurring patterns surface ஆகவும் address ஆகவும் regular review தான் அனுமதிக்கும்."
        }
      },
      {
        "question": {
          "en": "What is the main value of a trading journal, according to the lesson?",
          "hi": "Lesson के अनुसार, trading journal की main value क्या है?",
          "ta": "Lesson-ன் படி, ஒரு trading journal-ன் main value என்ன?"
        },
        "options": {
          "en": [
            "It guarantees future profits",
            "It reveals patterns in your own behaviour that aren't visible from any single trade",
            "It replaces the need for research entirely",
            "It only matters for tax purposes"
          ],
          "hi": [
            "ये future profits guarantee करता है",
            "ये आपके खुद के behaviour में patterns reveal करता है जो किसी एक trade से visible नहीं होते",
            "ये research की ज़ रूरत को पूरी तरह replace कर देता है",
            "ये सिर्फ tax purposes के लिए matter करता है"
          ],
          "ta": [
            "அது future profits-ஐ guarantee பண்ணும்",
            "எந்த ஒரு single trade-லும் visible-ஆ இல்லாத, உங்க சொந்த behaviour-ல patterns-ஐ அது reveal பண்ணும்",
            "அது research தேவையை முழுசா replace பண்ணும்",
            "அது tax purposes-க்கு மட்டும் matter பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "The journal's power comes from reviewing many entries together, surfacing patterns invisible in the moment.",
          "hi": "Journal की power कई entries को साथ में review करने से आती है, जो patterns को उजागर करती है जो moment में invisible होते हैं।",
          "ta": "Journal-ன் power, நிறைய entries-ஐ சேர்த்து review பண்றதிலிருந்து வரும், moment-ல invisible-ஆ இருக்கிற patterns-ஐ surface பண்ணும்."
        }
      },
      {
        "question": {
          "en": "Which earlier lesson's rule did the lesson suggest checking your journal against (e.g., 'ignoring it more often than you'd like')?",
          "hi": "Lesson ने अपने journal के against check करने के लिए पहले की किस lesson का rule सुझाया (जैसे 'जितना आप मानना चाहेंगे उससे ज़्यादा बार इसे ignore करना')?",
          "ta": "உங்க journal-ஐ எந்த earlier lesson-ன் rule-க்கு எதிரா check பண்ணணும்னு lesson suggest பண்ணுது (உ.தா., ‘admit பண்ண விரும்புறதை விட அதிகமா ignore பண்றது’)?"
        },
        "options": {
          "en": [
            "Lesson 6's stop-loss rule",
            "Lesson 35's ETF lesson",
            "Lesson 20's ratio lesson",
            "Lesson 2's IPO lesson"
          ],
          "hi": [
            "Lesson 6 का stop-loss rule",
            "Lesson 35 का ETF lesson",
            "Lesson 20 का ratio lesson",
            "Lesson 2 का IPO lesson"
          ],
          "ta": [
            "Lesson 6-ன் stop-loss rule",
            "Lesson 35-ன் ETF lesson",
            "Lesson 20-ன் ratio lesson",
            "Lesson 2-ன் IPO lesson"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "Checking whether you've been ignoring your own stop-loss discipline is a specific, useful pattern to look for. 46. Sector Deep-Dive: Banking & Financials",
          "hi": "ये check करना कि क्या आप अपनी खुद की stop-loss discipline को ignore करते रहे हैं, देखने लायक एक specific, useful pattern है।",
          "ta": "உங்க சொந்த stop-loss discipline-ஐ நீங்க ignore பண்ணிக்கிட்டிருக்கீங்களானு check பண்றது, தேட வேண்டிய ஒரு specific, useful pattern."
        }
      }
    ]
  },
  {
    "id": 46,
    "tier": "Advanced",
    "title": {
      "en": "Sector Deep-Dive: Banking & Financials",
      "hi": "Sector Deep-Dive: Banking और Financials",
      "ta": "Sector Deep-Dive: Banking & Financials"
    },
    "opener": {
      "en": "For her final investment-club assignment, Meera was asked to specialise: pick one sector and understand it more deeply than any single stock. She chose banking — the same sector from Lessons 16, 20, and 30's real stories.\n\nBanks, NBFCs, and Small Finance Banks • Banks (public and private sector) take deposits and lend, tightly regulated by the RBI, including strict capital-adequacy rules. • NBFCs (Non-Banking Finance Companies): Lend money but cannot take public deposits the way banks do — IL&FS (Lesson 16) was a large NBFC. • Small Finance Banks: A newer category focused on underserved segments like small businesses and rural borrowers.\n\nWhat Moves Banking Stocks Specifically • Interest rate changes (Lesson 29) directly affect a bank's lending margins. • Asset quality (NPAs — bad loans): The single biggest banking-specific risk, as Lesson 20's PSU bank story showed. • Credit growth: How fast the overall economy is borrowing and spending.\n\nKey takeaway: Banking is arguably the sector most sensitive to the very macro forces covered throughout this course — rates, NPAs, and credit growth — making it one of the clearest places to see fundamental analysis (Lesson 22) and economy-wide forces (Lesson 29) meet in a single sector.\n\nQUICK QUIZ · TEST YOURSELF (5 QUESTIONS)\n\n1. What is a key difference between a Bank and an NBFC? A) There is no difference at all B) Banks can take public deposits; NBFCs generally cannot C) NBFCs are regulated more strictly than banks D) Only NBFCs are allowed to lend money Correct: B) Banks can take public deposits; NBFCs generally cannot Why: This is a core regulatory distinction between the two types of financial institutions, as seen with IL&FS in Lesson 16.\n\n2. What is considered the single biggest banking-specific risk, per the lesson? A) Company logos B) Asset quality — bad loans (NPAs) C) Office locations D) Stock split frequency Correct: B) Asset quality — bad loans (NPAs) Why: NPAs directly hit a bank's profitability and capital, as illustrated by Lesson 20's PSU bank example.\n\n3. How do interest rate changes typically affect banking stocks? A) They have no effect on banks specifically B) They directly affect a bank's lending margins C) They only affect IT companies D) They only matter for insurance companies Correct: B) They directly affect a bank's lending margins Why: Banks earn a spread between what they pay depositors and charge borrowers, which rate changes directly influence.\n\n4. What are Small Finance Banks, according to the lesson? A) Foreign investment banks B) A newer bank category focused on underserved segments like small businesses and rural borrowers C) A type of NBFC that cannot lend D) The same thing as NSE and BSE Correct: B) A newer bank category focused on underserved segments like small businesses and rural borrowers Why: They represent a distinct, more recently created category within India's banking system.\n\n5. Why does the lesson call banking a sector where multiple course concepts 'meet'? A) Banking has no connection to any other lesson B) It's highly sensitive to rates, NPAs, and credit growth — combining fundamental analysis and macro forces from earlier lessons C) Banking stocks never move in price D) Only technical analysis applies to banks Correct: B) It's highly sensitive to rates, NPAs, and credit growth — combining fundamental analysis and macro forces from earlier lessons Why: Banking sits at the intersection of company-specific fundamentals and broad macroeconomic forces covered throughout the course.\n\n47. Sector Deep-Dive: IT & Pharma",
      "hi": "अपने final investment-club assignment के लिए, मीरा को specialise करने को कहा गया: एक sector चुनो और उसे किसी भी एक stock से कहीं ज़्यादा गहराई से समझो। उसने banking चुना — Lessons 16, 20, और 30 की real stories वाला वही sector।\n\nBanks, NBFCs, और Small Finance Banks • Banks (public और private sector) deposits लेते हैं और lend करते हैं, RBI द्वारा strictly regulated, जिसमें strict capital-adequacy rules शामिल हैं।\n\n• NBFCs (Non-Banking Finance Companies): पैसा lend करते हैं लेकिन banks की तरह public deposits नहीं ले सकते — IL&FS (Lesson 16) एक बड़ी NBFC थी।\n\n• Small Finance Banks: एक नई category जो small businesses और rural borrowers जैसे underserved segments पर focus करती है।\n\nBanking Stocks को Specifically क्या Move करता है • Interest rate changes (Lesson 29) सीधे एक bank के lending margins को affect करते हैं।\n\n• Asset quality (NPAs — bad loans): सबसे बड़ा banking-specific risk, जैसा Lesson 20 की PSU bank story ने दिखाया।\n\n• Credit growth: overall economy कितनी तेज़ी से borrow और spend कर रही है।\n\nमुख्य सीख: Banking शायद इस course में cover किए गए बहुत macro forces के लिए सबसे sensitive sector है — rates, NPAs, और credit growth — जो इसे उन सबसे साफ जगहों में से एक बनाता है जहाँ fundamental analysis (Lesson 22) और economy-wide forces (Lesson 29) एक ही sector में मिलते हुए देखे जा सकते हैं।\n\nक्विक क्विज़ · खुद को टेस्ट करें (5 सवाल)\n\n1. एक Bank और एक NBFC के बीच एक key difference क्या है? A) कोई फर्क नहीं है B) Banks public deposits ले सकते हैं; NBFCs आमतौर पर नहीं ले सकते C) NBFCs banks से ज़्यादा strictly regulated हैं D) सिर्फ NBFCs को पैसा lend करने की permission है सही जवाब: B) Banks public deposits ले सकते हैं; NBFCs आमतौर पर नहीं ले सकते क्यों: ये दो तरह की financial institutions के बीच एक core regulatory distinction है, जैसा Lesson 16 में IL&FS के साथ देखा गया।\n\n2. Lesson के अनुसार, सबसे बड़ा banking-specific risk क्या माना जाता है? A) Company logos B) Asset quality — bad loans (NPAs) C) Office locations D) Stock split frequency सही जवाब: B) Asset quality — bad loans (NPAs) क्यों: NPAs सीधे किसी bank की profitability और capital को hit करते हैं, जैसा Lesson 20 के PSU bank example ने दिखाया।\n\n3. Interest rate changes आमतौर पर banking stocks को कै से affect करते हैं? A) Banks पर specifically इनका कोई असर नहीं पड़ ता B) वो सीधे किसी bank के lending margins को affect करते हैं C) वो सिर्फ IT companies को affect करते हैं D) वो सिर्फ insurance companies के लिए matter करते हैं सही जवाब: B) वो सीधे किसी bank के lending margins को affect करते हैं क्यों: Banks depositors को pay करने और borrowers से charge करने के बीच एक spread कमाते हैं, जिसे rate changes सीधे influence करते हैं।\n\n4. Lesson के अनुसार, Small Finance Banks क्या हैं? A) Foreign investment banks B) small businesses और rural borrowers जैसे underserved segments पर focus करने वाली एक नई bank category C) एक तरह की NBFC जो lend नहीं कर सकती D) NSE और BSE जैसी ही चीज़ सही जवाब: B) small businesses और rural borrowers जैसे underserved segments पर focus करने वाली एक नई bank category क्यों: वो Indian banking system के अंदर एक अलग, हाल ही में बनाई गई category represent करते हैं।\n\n5. Lesson banking को एक ऐसा sector क्यों कहता है जहाँ कई course concepts 'मिलते' हैं? A) Banking का किसी और lesson से कोई connection नहीं है B) ये rates, NPAs, और credit growth के प्रति highly sensitive है — पहले की lessons से fundamental analysis और macro forces को combine करते हुए C) Banking stocks price में कभी move नहीं करते D) Banks पर सिर्फ technical analysis लागू होता है सही जवाब: B) ये rates, NPAs, और credit growth के प्रति highly sensitive है — पहले की lessons से fundamental analysis और macro forces को combine करते हुए क्यों: Banking, इस course में cover किए गए company-specific fundamentals और broad macroeconomic forces के intersection पर बैठता है।",
      "ta": "தன் இறுதி investment-club assignment-க்கு, specialise பண்ணும்படி மீராவை கேட்டுக்கிட்டாங்க: ஒரு sector- ஐ pick பண்ணி, எந்த ஒரு single stock-ஐ விடவும் அதை deep-ஆ புரிஞ்சுக்கணும். அவள் banking-ஐ தேர்ந்தெடுத்தாள் — Lessons 16, 20, 30-ன் real stories-ல இருந்த அதே sector.\n\nBanks, NBFCs, Small Finance Banks • Banks (public, private sector) deposits எடுத்து lend பண்ணும், strict capital-adequacy rules உட்பட RBI-ஆல tightly regulate பண்ணப்படும்.\n\n• NBFCs (Non-Banking Finance Companies): பணத்தை lend பண்ணும், ஆனா banks மாதிரி public deposits எடுக்க முடியாது — IL&FS (Lesson 16) ஒரு பெரிய NBFC தான்.\n\n• Small Finance Banks: Small businesses, rural borrowers மாதிரி underserved segments-ஐ focus பண்ற ஒரு newer category.\n\nBanking Stocks-ஐ Specific-ஆ என்ன Move பண்ணும் • Interest rate changes (Lesson 29) ஒரு bank-ன் lending margins-ஐ directly affect பண்ணும்.\n\n• Asset quality (NPAs — bad loans): Single biggest banking-specific risk, Lesson 20-ன் PSU bank கதை காட்டின மாதிரி.\n\n• Credit growth: Overall economy எவ்வளவு வேகமா borrow பண்ணி spend பண்றது.\n\nமுக்கிய பாடம்: இந்த course முழுக்க cover பண்ணப்பட்ட அதே macro forces-க்கு — rates, NPAs, credit growth — arguably banking தான் மிகவும் sensitive-ஆன sector, fundamental analysis-ஐயும் (Lesson 22) economy-wide forces-ஐயும் (Lesson 29) ஒரே sector-ல சந்திக்கும் clearest இடங்களில் ஒண்ணா அதை ஆக்குது.\n\nவினாடி வினா · சுயபரிசோதனை (5 கேள்விகள்)\n\n1. ஒரு Bank-க்கும் ஒரு NBFC-க்கும் இடையேயான key difference என்ன? A) எந்த வித்தியாசமும் இல்லவே இல்ல B) Banks public deposits எடுக்க முடியும்; NBFCs generally முடியாது C) NBFCs, banks-ஐ விட strictly regulate பண்ணப்படும் D) NBFCs மட்டும் தான் பணத்தை lend பண்ண அனுமதி சரியான பதில்:B) Banks public deposits எடுக்க முடியும்; NBFCs generally முடியாது ஏன்:Lesson 16-ல IL&FS-உடன் பார்த்த மாதிரி, இரண்டு வகை financial institutions-க்கு இடையேயான ஒரு core regulatory distinction இது.\n\n2. Lesson-ன் படி, single biggest banking-specific risk-ஆ கருதப்படுவது எது? A) Company logos B) Asset quality — bad loans (NPAs) C) Office locations D) Stock split frequency சரியான பதில்:B) Asset quality — bad loans (NPAs) ஏன்:Lesson 20-ன் PSU bank example illustrate பண்ணின மாதிரி, NPAs ஒரு bank-ன் profitability-ஐயும் capital- ஐயும் directly hit பண்ணும்.\n\n3. Interest rate changes typically banking stocks-ஐ எப்படி affect பண்ணும்? A) அவற்றுக்கு banks-ல specific-ஆ எந்த effect-உம் இல்ல B) அவை ஒரு bank-ன் lending margins-ஐ directly affect பண்ணும் C) அவை IT நிறுவனங்களை மட்டும் தான் affect பண்ணும் D) அவை insurance நிறுவனங்களுக்கு மட்டும் தான் matter பண்ணும் சரியான பதில்:B) அவை ஒரு bank-ன் lending margins-ஐ directly affect பண்ணும் ஏன்:Depositors-க்கு pay பண்றதுக்கும் borrowers-க்கு charge பண்றதுக்கும் இடையே banks ஒரு spread சம்பாதிக்கும், rate changes அதை directly influence பண்ணும்.\n\n4. Lesson-ன் படி, Small Finance Banks என்றால் என்ன? A) Foreign investment banks B) Small businesses, rural borrowers மாதிரி underserved segments-ஐ focus பண்ற ஒரு newer bank category C) Lend பண்ண முடியாத ஒரு வகை NBFC D) NSE, BSE-க்கு அதே விஷயம் சரியான பதில்:B) Small businesses, rural borrowers மாதிரி underserved segments-ஐ focus பண்ற ஒரு newer bank category ஏன்:இந்தியாவின் banking system-க்குள் அவை ஒரு distinct, recently created category-ஐ represent பண்ணும்.\n\n5. Multiple course concepts ‘meet’ ஆகுற ஒரு sector-ஆ lesson banking-ஐ ஏன் சொல்லுது? A) வேற எந்த lesson-உடனும் banking-க்கு எந்த connection-உம் இல்ல B) Rates, NPAs, credit growth-க்கு அது highly sensitive — earlier lessons-லிருந்து fundamental analysis- ஐயும் macro forces-ஐயும் combine பண்ணும் C) Banking stocks price-ல ஒருபோதும் move ஆகாது D) Technical analysis மட்டும் தான் banks-க்கு apply ஆகும் சரியான பதில்:B) Rates, NPAs, credit growth-க்கு அது highly sensitive — earlier lessons-லிருந்து fundamental analysis-ஐயும் macro forces-ஐயும் combine பண்ணும் ஏன்:Company-specific fundamentals-க்கும் இந்த course முழுக்க cover பண்ணப்பட்ட broad macroeconomic forces-க்கும் இடையேயான intersection-ல banking இருக்கு."
    },
    "body": {
      "en": "For her final investment-club assignment, Meera was asked to specialise: pick one sector and understand it more deeply than any single stock. She chose banking — the same sector from Lessons 16, 20, and 30's real stories.\n\nBanks, NBFCs, and Small Finance Banks • Banks (public and private sector) take deposits and lend, tightly regulated by the RBI, including strict capital-adequacy rules. • NBFCs (Non-Banking Finance Companies): Lend money but cannot take public deposits the way banks do — IL&FS (Lesson 16) was a large NBFC. • Small Finance Banks: A newer category focused on underserved segments like small businesses and rural borrowers.\n\nWhat Moves Banking Stocks Specifically • Interest rate changes (Lesson 29) directly affect a bank's lending margins. • Asset quality (NPAs — bad loans): The single biggest banking-specific risk, as Lesson 20's PSU bank story showed. • Credit growth: How fast the overall economy is borrowing and spending.",
      "hi": "अपने final investment-club assignment के लिए, मीरा को specialise करने को कहा गया: एक sector चुनो और उसे किसी भी एक stock से कहीं ज़्यादा गहराई से समझो। उसने banking चुना — Lessons 16, 20, और 30 की real stories वाला वही sector।\n\nBanks, NBFCs, और Small Finance Banks • Banks (public और private sector) deposits लेते हैं और lend करते हैं, RBI द्वारा strictly regulated, जिसमें strict capital-adequacy rules शामिल हैं।\n\n• NBFCs (Non-Banking Finance Companies): पैसा lend करते हैं लेकिन banks की तरह public deposits नहीं ले सकते — IL&FS (Lesson 16) एक बड़ी NBFC थी।\n\n• Small Finance Banks: एक नई category जो small businesses और rural borrowers जैसे underserved segments पर focus करती है।\n\nBanking Stocks को Specifically क्या Move करता है • Interest rate changes (Lesson 29) सीधे एक bank के lending margins को affect करते हैं।\n\n• Asset quality (NPAs — bad loans): सबसे बड़ा banking-specific risk, जैसा Lesson 20 की PSU bank story ने दिखाया।\n\n• Credit growth: overall economy कितनी तेज़ी से borrow और spend कर रही है।",
      "ta": "தன் இறுதி investment-club assignment-க்கு, specialise பண்ணும்படி மீராவை கேட்டுக்கிட்டாங்க: ஒரு sector- ஐ pick பண்ணி, எந்த ஒரு single stock-ஐ விடவும் அதை deep-ஆ புரிஞ்சுக்கணும். அவள் banking-ஐ தேர்ந்தெடுத்தாள் — Lessons 16, 20, 30-ன் real stories-ல இருந்த அதே sector.\n\nBanks, NBFCs, Small Finance Banks • Banks (public, private sector) deposits எடுத்து lend பண்ணும், strict capital-adequacy rules உட்பட RBI-ஆல tightly regulate பண்ணப்படும்.\n\n• NBFCs (Non-Banking Finance Companies): பணத்தை lend பண்ணும், ஆனா banks மாதிரி public deposits எடுக்க முடியாது — IL&FS (Lesson 16) ஒரு பெரிய NBFC தான்.\n\n• Small Finance Banks: Small businesses, rural borrowers மாதிரி underserved segments-ஐ focus பண்ற ஒரு newer category.\n\nBanking Stocks-ஐ Specific-ஆ என்ன Move பண்ணும் • Interest rate changes (Lesson 29) ஒரு bank-ன் lending margins-ஐ directly affect பண்ணும்.\n\n• Asset quality (NPAs — bad loans): Single biggest banking-specific risk, Lesson 20-ன் PSU bank கதை காட்டின மாதிரி.\n\n• Credit growth: Overall economy எவ்வளவு வேகமா borrow பண்ணி spend பண்றது."
    },
    "keyTakeaway": {
      "en": "Banking is arguably the sector most sensitive to the very macro forces covered throughout this course — rates, NPAs, and credit growth — making it one of the clearest places to see fundamental analysis (Lesson 22) and economy-wide forces (Lesson 29) meet in a single sector.",
      "hi": "Banking शायद इस course में cover किए गए बहुत macro forces के लिए सबसे sensitive sector है — rates, NPAs, और credit growth — जो इसे उन सबसे साफ जगहों में से एक बनाता है जहाँ fundamental analysis (Lesson 22) और economy-wide forces (Lesson 29) एक ही sector में मिलते हुए देखे जा सकते हैं।",
      "ta": "இந்த course முழுக்க cover பண்ணப்பட்ட அதே macro forces-க்கு — rates, NPAs, credit growth — arguably banking தான் மிகவும் sensitive-ஆன sector, fundamental analysis-ஐயும் (Lesson 22) economy-wide forces-ஐயும் (Lesson 29) ஒரே sector-ல சந்திக்கும் clearest இடங்களில் ஒண்ணா அதை ஆக்குது."
    },
    "quiz": [
      {
        "question": {
          "en": "What is a key difference between a Bank and an NBFC?",
          "hi": "एक Bank और एक NBFC के बीच एक key difference क्या है?",
          "ta": "ஒரு Bank-க்கும் ஒரு NBFC-க்கும் இடையேயான key difference என்ன?"
        },
        "options": {
          "en": [
            "There is no difference at all",
            "Banks can take public deposits; NBFCs generally cannot",
            "NBFCs are regulated more strictly than banks",
            "Only NBFCs are allowed to lend money"
          ],
          "hi": [
            "कोई फर्क नहीं है",
            "Banks public deposits ले सकते हैं; NBFCs आमतौर पर नहीं ले सकते",
            "NBFCs banks से ज़्यादा strictly regulated हैं",
            "सिर्फ NBFCs को पैसा lend करने की permission है"
          ],
          "ta": [
            "எந்த வித்தியாசமும் இல்லவே இல்ல",
            "Banks public deposits எடுக்க முடியும்; NBFCs generally முடியாது",
            "NBFCs, banks-ஐ விட strictly regulate பண்ணப்படும்",
            "NBFCs மட்டும் தான் பணத்தை lend பண்ண அனுமதி"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This is a core regulatory distinction between the two types of financial institutions, as seen with IL&FS in Lesson 16.",
          "hi": "ये दो तरह की financial institutions के बीच एक core regulatory distinction है, जैसा Lesson 16 में IL&FS के साथ देखा गया।",
          "ta": "Lesson 16-ல IL&FS-உடன் பார்த்த மாதிரி, இரண்டு வகை financial institutions-க்கு இடையேயான ஒரு core regulatory distinction இது."
        }
      },
      {
        "question": {
          "en": "What is considered the single biggest banking-specific risk, per the lesson?",
          "hi": "Lesson के अनुसार, सबसे बड़ा banking-specific risk क्या माना जाता है?",
          "ta": "Lesson-ன் படி, single biggest banking-specific risk-ஆ கருதப்படுவது எது?"
        },
        "options": {
          "en": [
            "Company logos",
            "Asset quality — bad loans (NPAs)",
            "Office locations",
            "Stock split frequency"
          ],
          "hi": [
            "Company logos",
            "Asset quality — bad loans (NPAs)",
            "Office locations",
            "Stock split frequency"
          ],
          "ta": [
            "Company logos",
            "Asset quality — bad loans (NPAs)",
            "Office locations",
            "Stock split frequency"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "NPAs directly hit a bank's profitability and capital, as illustrated by Lesson 20's PSU bank example.",
          "hi": "NPAs सीधे किसी bank की profitability और capital को hit करते हैं, जैसा Lesson 20 के PSU bank example ने दिखाया।",
          "ta": "Lesson 20-ன் PSU bank example illustrate பண்ணின மாதிரி, NPAs ஒரு bank-ன் profitability-ஐயும் capital- ஐயும் directly hit பண்ணும்."
        }
      },
      {
        "question": {
          "en": "How do interest rate changes typically affect banking stocks?",
          "hi": "Interest rate changes आमतौर पर banking stocks को कै से affect करते हैं?",
          "ta": "Interest rate changes typically banking stocks-ஐ எப்படி affect பண்ணும்?"
        },
        "options": {
          "en": [
            "They have no effect on banks specifically",
            "They directly affect a bank's lending margins",
            "They only affect IT companies",
            "They only matter for insurance companies"
          ],
          "hi": [
            "Banks पर specifically इनका कोई असर नहीं पड़ ता",
            "वो सीधे किसी bank के lending margins को affect करते हैं",
            "वो सिर्फ IT companies को affect करते हैं",
            "वो सिर्फ insurance companies के लिए matter करते हैं"
          ],
          "ta": [
            "அவற்றுக்கு banks-ல specific-ஆ எந்த effect-உம் இல்ல",
            "அவை ஒரு bank-ன் lending margins-ஐ directly affect பண்ணும்",
            "அவை IT நிறுவனங்களை மட்டும் தான் affect பண்ணும்",
            "அவை insurance நிறுவனங்களுக்கு மட்டும் தான் matter பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Banks earn a spread between what they pay depositors and charge borrowers, which rate changes directly influence.",
          "hi": "Banks depositors को pay करने और borrowers से charge करने के बीच एक spread कमाते हैं, जिसे rate changes सीधे influence करते हैं।",
          "ta": "Depositors-க்கு pay பண்றதுக்கும் borrowers-க்கு charge பண்றதுக்கும் இடையே banks ஒரு spread சம்பாதிக்கும், rate changes அதை directly influence பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What are Small Finance Banks, according to the lesson?",
          "hi": "Lesson के अनुसार, Small Finance Banks क्या हैं?",
          "ta": "Lesson-ன் படி, Small Finance Banks என்றால் என்ன?"
        },
        "options": {
          "en": [
            "Foreign investment banks",
            "A newer bank category focused on underserved segments like small businesses and rural borrowers",
            "A type of NBFC that cannot lend",
            "The same thing as NSE and BSE"
          ],
          "hi": [
            "Foreign investment banks",
            "small businesses और rural borrowers जैसे underserved segments पर focus करने वाली एक नई bank category",
            "एक तरह की NBFC जो lend नहीं कर सकती",
            "NSE और BSE जैसी ही चीज़"
          ],
          "ta": [
            "Foreign investment banks",
            "Small businesses, rural borrowers மாதிரி underserved segments-ஐ focus பண்ற ஒரு newer bank category",
            "Lend பண்ண முடியாத ஒரு வகை NBFC",
            "NSE, BSE-க்கு அதே விஷயம்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "They represent a distinct, more recently created category within India's banking system.",
          "hi": "वो Indian banking system के अंदर एक अलग, हाल ही में बनाई गई category represent करते हैं।",
          "ta": "இந்தியாவின் banking system-க்குள் அவை ஒரு distinct, recently created category-ஐ represent பண்ணும்."
        }
      },
      {
        "question": {
          "en": "Why does the lesson call banking a sector where multiple course concepts 'meet'?",
          "hi": "Lesson banking को एक ऐसा sector क्यों कहता है जहाँ कई course concepts 'मिलते' हैं?",
          "ta": "Multiple course concepts ‘meet’ ஆகுற ஒரு sector-ஆ lesson banking-ஐ ஏன் சொல்லுது?"
        },
        "options": {
          "en": [
            "Banking has no connection to any other lesson",
            "It's highly sensitive to rates, NPAs, and credit growth — combining fundamental analysis and macro forces from earlier lessons",
            "Banking stocks never move in price",
            "Only technical analysis applies to banks"
          ],
          "hi": [
            "Banking का किसी और lesson से कोई connection नहीं है",
            "ये rates, NPAs, और credit growth के प्रति highly sensitive है — पहले की lessons से fundamental analysis और macro forces को combine करते हुए",
            "Banking stocks price में कभी move नहीं करते",
            "Banks पर सिर्फ technical analysis लागू होता है"
          ],
          "ta": [
            "வேற எந்த lesson-உடனும் banking-க்கு எந்த connection-உம் இல்ல",
            "Rates, NPAs, credit growth-க்கு அது highly sensitive — earlier lessons-லிருந்து fundamental analysis- ஐயும் macro forces-ஐயும் combine பண்ணும்",
            "Banking stocks price-ல ஒருபோதும் move ஆகாது",
            "Technical analysis மட்டும் தான் banks-க்கு apply ஆகும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Banking sits at the intersection of company-specific fundamentals and broad macroeconomic forces covered throughout the course. 47. Sector Deep-Dive: IT & Pharma",
          "hi": "Banking, इस course में cover किए गए company-specific fundamentals और broad macroeconomic forces के intersection पर बैठता है।",
          "ta": "Company-specific fundamentals-க்கும் இந்த course முழுக்க cover பண்ணப்பட்ட broad macroeconomic forces-க்கும் இடையேயான intersection-ல banking இருக்கு."
        }
      }
    ]
  },
  {
    "id": 47,
    "tier": "Advanced",
    "title": {
      "en": "Sector Deep-Dive: IT & Pharma",
      "hi": "Sector Deep-Dive: IT और Pharma",
      "ta": "Sector Deep-Dive: IT & Pharma"
    },
    "opener": {
      "en": "Meera's classmate specialised in a different pair of sectors for the same assignment: IT and pharma — two of India's biggest export-driven industries, and, she discovered, surprisingly similar in one specific way.\n\nIT Services — A Rupee-Sensitive, Global Business Indian IT companies earn a large share of revenue in US dollars and other foreign currencies while paying most costs in rupees — so a weaker rupee generally helps IT company margins, and a stronger rupee generally hurts them, regardless of how well the business itself is run day to day.\n\nPharma — A Regulation-Sensitive, Global Business India is often called the “pharmacy of the world,” supplying a very large share of the world's generic medicines. Indian pharma companies' fortunes are heavily tied to regulatory approvals — particularly from the US FDA — meaning a single inspection finding at one manufacturing plant can move a pharma stock sharply, independent of its overall business quality.\n\nKey takeaway: Both IT and pharma are major Indian export sectors, but each carries a distinct, sector-specific risk factor worth understanding on its own: currency movement for IT, regulatory approval risk for pharma. Sector-specific homework like this is exactly what deepens fundamental analysis (Lesson 22) beyond generic ratios.\n\nQUICK QUIZ · TEST YOURSELF (5 QUESTIONS)\n\n1. How does a weaker rupee generally affect Indian IT company margins? A) It generally hurts their margins B) It generally helps their margins, since they earn largely in foreign currency but pay costs in rupees C) It has no effect at all D) It only affects pharma companies Correct: B) It generally helps their margins, since they earn largely in foreign currency but pay costs in rupees Why: Foreign currency revenue converts to more rupees when the rupee weakens, boosting reported margins.\n\n2. Why is India sometimes called the 'pharmacy of the world'? A) It invented the most new drugs globally B) It supplies a very large share of the world's generic medicines C) It only sells medicines domestically D) It has the world's largest hospitals Correct: B) It supplies a very large share of the world's generic medicines Why: India's generic drug manufacturing and export scale has earned it this widely used nickname.\n\n3. What can significantly move an Indian pharma stock, largely independent of its overall business quality? A) A stock split B) A single US FDA inspection finding at one manufacturing plant C) A change in the company's logo D) A public holiday Correct: B) A single US FDA inspection finding at one manufacturing plant Why: Regulatory approval risk, especially from the US FDA, is a distinct and significant risk factor for pharma exporters.\n\n4. What sector-specific risk factor is most emphasized for IT companies in this lesson? A) Regulatory approval risk B) Currency (rupee) movement C) Weather patterns D) Trading volume Correct: B) Currency (rupee) movement Why: IT companies' dollar-heavy revenue makes currency fluctuation a defining sector-specific risk.\n\n5. What is the broader point of doing a 'sector deep-dive' like this, according to the lesson? A) It's purely academic with no practical use B) It deepens fundamental analysis beyond generic ratios by understanding sector-specific risk factors C) It replaces the need to read financial statements D) Only professional analysts benefit from this Correct: B) It deepens fundamental analysis beyond generic ratios by understanding sector-specific risk factors Why: Understanding what specifically drives each sector adds a layer of insight beyond one-size-fits-all ratios.\n\n48. How Global Markets Affect Indian Stocks",
      "hi": "मीरा के classmate ने उसी assignment के लिए sectors की एक अलग जोड़ी पर specialise किया: IT और pharma — India की दो सबसे बड़ी export-driven industries, और, उसने discover किया, एक specific तरीके से surprisingly similar।\n\nIT Services — एक Rupee-Sensitive, Global Business Indian IT companies अपनी revenue का एक बड़ा हिस्सा US dollars और दूसरी foreign currencies में कमाती हैं जबकि ज़्यादातर costs rupees में pay करती हैं — तो एक कमज़ोर rupee आमतौर पर IT company margins की मदद करता है, और एक मज़ बूत rupee आमतौर पर उन्हें नुकसान पहुँचाता है, चाहे business खुद day to day कितना भी अच्छा चलाया जाए।\n\nPharma — एक Regulation-Sensitive, Global Business India को अक्सर “pharmacy of the world” कहा जाता है, जो दुनिया की generic medicines का एक बहुत बड़ा हिस्सा supply करता है। Indian pharma companies की fortunes regulatory approvals से heavily जुड़ी होती हैं — खासकर US FDA से — जिसका मतलब है कि एक manufacturing plant पर एक single inspection finding एक pharma stock को sharply move कर सकती है, उसकी overall business quality से independent।\n\nमुख्य सीख: IT और pharma दोनों major Indian export sectors हैं, लेकिन हर एक अपना distinct, sector-specific risk factor carry करता है जिसे अलग से समझना ज़ रूरी है: IT के लिए currency movement, pharma के लिए regulatory approval risk। इस तरह का sector-specific homework exactly वही है जो fundamental analysis (Lesson 22) को generic ratios से आगे deepen करता है।\n\nक्विक क्विज़ · खुद को टेस्ट करें (5 सवाल)\n\n1. एक कमज़ोर rupee आमतौर पर Indian IT company margins को कै से affect करता है? A) ये आमतौर पर उनके margins को नुकसान पहुँचाता है B) ये आमतौर पर उनके margins की मदद करता है, क्योंकि वो ज़्यादातर foreign currency में कमाती हैं लेकिन costs rupees में pay करती हैं C) इसका बिल्कुल कोई असर नहीं पड़ ता D) ये सिर्फ pharma companies को affect करता है सही जवाब: B) ये आमतौर पर उनके margins की मदद करता है, क्योंकि वो ज़्यादातर foreign currency में कमाती हैं लेकिन costs rupees में pay करती हैं क्यों: Foreign currency revenue rupee कमज़ोर होने पर ज़्यादा rupees में convert होती है, जिससे reported margins बढ़ जाते हैं।\n\n2. India को कभी-कभी 'pharmacy of the world' क्यों कहा जाता है? A) इसने globally सबसे ज़्यादा नई दवाइयाँ invent कीं B) ये दुनिया की generic medicines का एक बहुत बड़ा हिस्सा supply करता है C) ये सिर्फ medicines domestically बेचता है D) इसके पास दुनिया के सबसे बड़े hospitals हैं सही जवाब: B) ये दुनिया की generic medicines का एक बहुत बड़ा हिस्सा supply करता है क्यों: India के generic drug manufacturing और export scale ने इसे ये widely इस्तेमाल होने वाला nickname दिलाया।\n\n3. एक Indian pharma stock को क्या significantly move कर सकता है, largely उसकी overall business quality से independent? A) एक stock split B) एक manufacturing plant पर एक single US FDA inspection finding C) कं पनी के logo में एक बदलाव D) एक public holiday सही जवाब: B) एक manufacturing plant पर एक single US FDA inspection finding क्यों: Regulatory approval risk, खासकर US FDA से, pharma exporters के लिए एक distinct और significant risk factor है।\n\n4. इस lesson में IT companies के लिए किस sector-specific risk factor पर सबसे ज़्यादा zor दिया गया है? A) Regulatory approval risk B) Currency (rupee) movement C) Weather patterns D) Trading volume सही जवाब: B) Currency (rupee) movement क्यों: IT companies का dollar-heavy revenue currency fluctuation को एक defining sector-specific risk बनाता है।\n\n5. Lesson के अनुसार, इस तरह का 'sector deep-dive' करने का broader point क्या है? A) ये purely academic है, इसका कोई practical use नहीं B) ये sector-specific risk factors समझकर fundamental analysis को generic ratios से आगे deepen करता है C) ये financial statements पढ़ ने की ज़ रूरत को replace कर देता है D) सिर्फ professional analysts को इससे फायदा होता है सही जवाब: B) ये sector-specific risk factors समझकर fundamental analysis को generic ratios से आगे deepen करता है क्यों: ये समझना कि हर sector को specifically क्या drive करता है, one-size-fits-all ratios से आगे एक insight की layer जोड़ ता है।",
      "ta": "மீராவின் classmate, அதே assignment-க்கு வேறு ஒரு sectors pair-ஐ specialise பண்ணினாள்: IT-உம் pharma-உம் — இந்தியாவின் மிகப்பெரிய export-driven industries-ல இரண்டு, ஒரு specific விஷயத்தில் ஆச்சர்யமா similar-ஆ இருக்குதுனு அவள் கண்டுபிடிச்சாள்.\n\nIT Services — ஒரு Rupee-Sensitive, Global Business Indian IT நிறுவனங்கள் தங்க revenue-ல ஒரு பெரிய share-ஐ US dollars-லும் மற்ற foreign currencies- லும் சம்பாதிச்சு, பெரும்பாலான costs-ஐ rupees-ல pay பண்ணும் — அதனால், business அதே தினமும் எவ்வளவு நல்லா run ஆனாலும், ஒரு weaker rupee generally IT company margins-க்கு உதவும், ஒரு stronger rupee generally அவற்றை hurt பண்ணும்.\n\nPharma — ஒரு Regulation-Sensitive, Global Business இந்தியா பெரும்பாலும் “pharmacy of the world”-ன்னு அழைக்கப்படும், உலகின் generic medicines-ல ரொம்ப பெரிய share-ஐ supply பண்ணும். Indian pharma நிறுவனங்களின் fortunes, regulatory approvals- உடன் heavily tied-ஆ இருக்கு — குறிப்பா US FDA-லிருந்து — அதாவது ஒரே ஒரு manufacturing plant-ல ஒரே ஒரு inspection finding, அதன் overall business quality-ஐ பொறுத்தில்லாம, ஒரு pharma stock-ஐ sharply move பண்ணலாம்.\n\nமுக்கிய பாடம்: IT-உம் pharma-உம் இரண்டும் major Indian export sectors, ஆனா ஒவ்வொண்ணும் தனியா புரிஞ்சுக்க worth-ஆன ஒரு distinct, sector-specific risk factor carry பண்ணும்: IT-க்கு currency movement, pharma-க்கு regulatory approval risk. Generic ratios-ஐ தாண்டி fundamental analysis-ஐ (Lesson 22) deepen பண்றது இது மாதிரி sector-specific homework தான்.\n\nவினாடி வினா · சுயபரிசோதனை (5 கேள்விகள்)\n\n1. ஒரு weaker rupee, generally Indian IT company margins-ஐ எப்படி affect பண்ணும்? A) Generally அவற்றின் margins-ஐ hurt பண்ணும் B) Generally அவற்றின் margins-க்கு உதவும், foreign currency-ல largely சம்பாதிச்சு rupees-ல costs pay பண்றதால் C) அதற்கு எந்த effect-உம் இல்லவே இல்ல D) அது pharma நிறுவனங்களை மட்டும் தான் affect பண்ணும் சரியான பதில்:B) Generally அவற்றின் margins-க்கு உதவும், foreign currency-ல largely சம்பாதிச்சு rupees-ல costs pay பண்றதால் ஏன்:Rupee weaken ஆகும்போது foreign currency revenue அதிக rupees-ஆ convert ஆகும், reported margins- ஐ boost பண்ணும்.\n\n2. இந்தியா சில நேரம் ‘pharmacy of the world’-ன்னு ஏன் அழைக்கப்படுது? A) அது globally மிக அதிக புது drugs-ஐ invent பண்ணுச்சு B) உலகின் generic medicines-ல ரொம்ப பெரிய share-ஐ அது supply பண்ணும் C) அது domestically மட்டும் தான் medicines விக்கும் D) அதற்கு உலகின் மிகப்பெரிய hospitals இருக்கு சரியான பதில்:B) உலகின் generic medicines-ல ரொம்ப பெரிய share-ஐ அது supply பண்ணும் ஏன்:இந்தியாவின் generic drug manufacturing, export scale தான் இந்த widely used nickname-ஐ அதற்கு தேடி கொடுத்திருக்கு.\n\n3. Overall business quality-ஐ பொறுத்தில்லாம, ஒரு Indian pharma stock-ஐ significantly எது move பண்ணலாம்? A) ஒரு stock split B) ஒரே ஒரு manufacturing plant-ல ஒரே ஒரு US FDA inspection finding C) நிறுவனத்தின் logo-ல ஒரு மாற்றம் D) ஒரு public holiday சரியான பதில்:B) ஒரே ஒரு manufacturing plant-ல ஒரே ஒரு US FDA inspection finding ஏன்:Regulatory approval risk, குறிப்பா US FDA-லிருந்து, pharma exporters-க்கு ஒரு distinct, significant risk factor.\n\n4. இந்த lesson-ல IT நிறுவனங்களுக்கு எந்த sector-specific risk factor மிகவும் emphasize பண்ணப்படுது? A) Regulatory approval risk B) Currency (rupee) movement C) Weather patterns D) Trading volume சரியான பதில்:B) Currency (rupee) movement ஏன்:IT நிறுவனங்களின் dollar-heavy revenue, currency fluctuation-ஐ ஒரு defining sector-specific risk-ஆ ஆக்குது.\n\n5. Lesson-ன் படி, இது மாதிரி ஒரு ‘sector deep-dive’ பண்றதின் broader point என்ன? A) இது purely academic, practical use இல்ல B) Sector-specific risk factors-ஐ புரிஞ்சுக்குறதால் Generic ratios-ஐ தாண்டி அது fundamental analysis-ஐ deepen பண்ணும் C) Financial statements படிக்கிற தேவையை அது replace பண்ணும் D) Professional analysts மட்டும் தான் இதிலிருந்து benefit பெறுவாங்க சரியான பதில்:B) Sector-specific risk factors-ஐ புரிஞ்சுக்குறதால் Generic ratios-ஐ தாண்டி அது fundamental analysis-ஐ deepen பண்ணும் ஏன்:ஒவ்வொரு sector-ஐயும் specific-ஆ என்ன drive பண்ணுதுனு புரிஞ்சுக்குறது, one-size-fits-all ratios-ஐ தாண்டி ஒரு layer of insight-ஐ add பண்ணும்."
    },
    "body": {
      "en": "Meera's classmate specialised in a different pair of sectors for the same assignment: IT and pharma — two of India's biggest export-driven industries, and, she discovered, surprisingly similar in one specific way.\n\nIT Services — A Rupee-Sensitive, Global Business Indian IT companies earn a large share of revenue in US dollars and other foreign currencies while paying most costs in rupees — so a weaker rupee generally helps IT company margins, and a stronger rupee generally hurts them, regardless of how well the business itself is run day to day.\n\nPharma — A Regulation-Sensitive, Global Business India is often called the “pharmacy of the world,” supplying a very large share of the world's generic medicines. Indian pharma companies' fortunes are heavily tied to regulatory approvals — particularly from the US FDA — meaning a single inspection finding at one manufacturing plant can move a pharma stock sharply, independent of its overall business quality.",
      "hi": "मीरा के classmate ने उसी assignment के लिए sectors की एक अलग जोड़ी पर specialise किया: IT और pharma — India की दो सबसे बड़ी export-driven industries, और, उसने discover किया, एक specific तरीके से surprisingly similar।\n\nIT Services — एक Rupee-Sensitive, Global Business Indian IT companies अपनी revenue का एक बड़ा हिस्सा US dollars और दूसरी foreign currencies में कमाती हैं जबकि ज़्यादातर costs rupees में pay करती हैं — तो एक कमज़ोर rupee आमतौर पर IT company margins की मदद करता है, और एक मज़ बूत rupee आमतौर पर उन्हें नुकसान पहुँचाता है, चाहे business खुद day to day कितना भी अच्छा चलाया जाए।\n\nPharma — एक Regulation-Sensitive, Global Business India को अक्सर “pharmacy of the world” कहा जाता है, जो दुनिया की generic medicines का एक बहुत बड़ा हिस्सा supply करता है। Indian pharma companies की fortunes regulatory approvals से heavily जुड़ी होती हैं — खासकर US FDA से — जिसका मतलब है कि एक manufacturing plant पर एक single inspection finding एक pharma stock को sharply move कर सकती है, उसकी overall business quality से independent।",
      "ta": "மீராவின் classmate, அதே assignment-க்கு வேறு ஒரு sectors pair-ஐ specialise பண்ணினாள்: IT-உம் pharma-உம் — இந்தியாவின் மிகப்பெரிய export-driven industries-ல இரண்டு, ஒரு specific விஷயத்தில் ஆச்சர்யமா similar-ஆ இருக்குதுனு அவள் கண்டுபிடிச்சாள்.\n\nIT Services — ஒரு Rupee-Sensitive, Global Business Indian IT நிறுவனங்கள் தங்க revenue-ல ஒரு பெரிய share-ஐ US dollars-லும் மற்ற foreign currencies- லும் சம்பாதிச்சு, பெரும்பாலான costs-ஐ rupees-ல pay பண்ணும் — அதனால், business அதே தினமும் எவ்வளவு நல்லா run ஆனாலும், ஒரு weaker rupee generally IT company margins-க்கு உதவும், ஒரு stronger rupee generally அவற்றை hurt பண்ணும்.\n\nPharma — ஒரு Regulation-Sensitive, Global Business இந்தியா பெரும்பாலும் “pharmacy of the world”-ன்னு அழைக்கப்படும், உலகின் generic medicines-ல ரொம்ப பெரிய share-ஐ supply பண்ணும். Indian pharma நிறுவனங்களின் fortunes, regulatory approvals- உடன் heavily tied-ஆ இருக்கு — குறிப்பா US FDA-லிருந்து — அதாவது ஒரே ஒரு manufacturing plant-ல ஒரே ஒரு inspection finding, அதன் overall business quality-ஐ பொறுத்தில்லாம, ஒரு pharma stock-ஐ sharply move பண்ணலாம்."
    },
    "keyTakeaway": {
      "en": "Both IT and pharma are major Indian export sectors, but each carries a distinct, sector-specific risk factor worth understanding on its own: currency movement for IT, regulatory approval risk for pharma. Sector-specific homework like this is exactly what deepens fundamental analysis (Lesson 22) beyond generic ratios.",
      "hi": "IT और pharma दोनों major Indian export sectors हैं, लेकिन हर एक अपना distinct, sector-specific risk factor carry करता है जिसे अलग से समझना ज़ रूरी है: IT के लिए currency movement, pharma के लिए regulatory approval risk। इस तरह का sector-specific homework exactly वही है जो fundamental analysis (Lesson 22) को generic ratios से आगे deepen करता है।",
      "ta": "IT-உம் pharma-உம் இரண்டும் major Indian export sectors, ஆனா ஒவ்வொண்ணும் தனியா புரிஞ்சுக்க worth-ஆன ஒரு distinct, sector-specific risk factor carry பண்ணும்: IT-க்கு currency movement, pharma-க்கு regulatory approval risk. Generic ratios-ஐ தாண்டி fundamental analysis-ஐ (Lesson 22) deepen பண்றது இது மாதிரி sector-specific homework தான்."
    },
    "quiz": [
      {
        "question": {
          "en": "How does a weaker rupee generally affect Indian IT company margins?",
          "hi": "एक कमज़ोर rupee आमतौर पर Indian IT company margins को कै से affect करता है?",
          "ta": "ஒரு weaker rupee, generally Indian IT company margins-ஐ எப்படி affect பண்ணும்?"
        },
        "options": {
          "en": [
            "It generally hurts their margins",
            "It generally helps their margins, since they earn largely in foreign currency but pay costs in rupees",
            "It has no effect at all",
            "It only affects pharma companies"
          ],
          "hi": [
            "ये आमतौर पर उनके margins को नुकसान पहुँचाता है",
            "ये आमतौर पर उनके margins की मदद करता है, क्योंकि वो ज़्यादातर foreign currency में कमाती हैं लेकिन costs rupees में pay करती हैं",
            "इसका बिल्कुल कोई असर नहीं पड़ ता",
            "ये सिर्फ pharma companies को affect करता है"
          ],
          "ta": [
            "Generally அவற்றின் margins-ஐ hurt பண்ணும்",
            "Generally அவற்றின் margins-க்கு உதவும், foreign currency-ல largely சம்பாதிச்சு rupees-ல costs pay பண்றதால்",
            "அதற்கு எந்த effect-உம் இல்லவே இல்ல",
            "அது pharma நிறுவனங்களை மட்டும் தான் affect பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Foreign currency revenue converts to more rupees when the rupee weakens, boosting reported margins.",
          "hi": "Foreign currency revenue rupee कमज़ोर होने पर ज़्यादा rupees में convert होती है, जिससे reported margins बढ़ जाते हैं।",
          "ta": "Rupee weaken ஆகும்போது foreign currency revenue அதிக rupees-ஆ convert ஆகும், reported margins- ஐ boost பண்ணும்."
        }
      },
      {
        "question": {
          "en": "Why is India sometimes called the 'pharmacy of the world'?",
          "hi": "India को कभी-कभी 'pharmacy of the world' क्यों कहा जाता है?",
          "ta": "இந்தியா சில நேரம் ‘pharmacy of the world’-ன்னு ஏன் அழைக்கப்படுது?"
        },
        "options": {
          "en": [
            "It invented the most new drugs globally",
            "It supplies a very large share of the world's generic medicines",
            "It only sells medicines domestically",
            "It has the world's largest hospitals"
          ],
          "hi": [
            "इसने globally सबसे ज़्यादा नई दवाइयाँ invent कीं",
            "ये दुनिया की generic medicines का एक बहुत बड़ा हिस्सा supply करता है",
            "ये सिर्फ medicines domestically बेचता है",
            "इसके पास दुनिया के सबसे बड़े hospitals हैं"
          ],
          "ta": [
            "அது globally மிக அதிக புது drugs-ஐ invent பண்ணுச்சு",
            "உலகின் generic medicines-ல ரொம்ப பெரிய share-ஐ அது supply பண்ணும்",
            "அது domestically மட்டும் தான் medicines விக்கும்",
            "அதற்கு உலகின் மிகப்பெரிய hospitals இருக்கு"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "India's generic drug manufacturing and export scale has earned it this widely used nickname.",
          "hi": "India के generic drug manufacturing और export scale ने इसे ये widely इस्तेमाल होने वाला nickname दिलाया।",
          "ta": "இந்தியாவின் generic drug manufacturing, export scale தான் இந்த widely used nickname-ஐ அதற்கு தேடி கொடுத்திருக்கு."
        }
      },
      {
        "question": {
          "en": "What can significantly move an Indian pharma stock, largely independent of its overall business quality?",
          "hi": "एक Indian pharma stock को क्या significantly move कर सकता है, largely उसकी overall business quality से independent?",
          "ta": "Overall business quality-ஐ பொறுத்தில்லாம, ஒரு Indian pharma stock-ஐ significantly எது move பண்ணலாம்?"
        },
        "options": {
          "en": [
            "A stock split",
            "A single US FDA inspection finding at one manufacturing plant",
            "A change in the company's logo",
            "A public holiday"
          ],
          "hi": [
            "एक stock split",
            "एक manufacturing plant पर एक single US FDA inspection finding",
            "कं पनी के logo में एक बदलाव",
            "एक public holiday"
          ],
          "ta": [
            "ஒரு stock split",
            "ஒரே ஒரு manufacturing plant-ல ஒரே ஒரு US FDA inspection finding",
            "நிறுவனத்தின் logo-ல ஒரு மாற்றம்",
            "ஒரு public holiday"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Regulatory approval risk, especially from the US FDA, is a distinct and significant risk factor for pharma exporters.",
          "hi": "Regulatory approval risk, खासकर US FDA से, pharma exporters के लिए एक distinct और significant risk factor है।",
          "ta": "Regulatory approval risk, குறிப்பா US FDA-லிருந்து, pharma exporters-க்கு ஒரு distinct, significant risk factor."
        }
      },
      {
        "question": {
          "en": "What sector-specific risk factor is most emphasized for IT companies in this lesson?",
          "hi": "इस lesson में IT companies के लिए किस sector-specific risk factor पर सबसे ज़्यादा zor दिया गया है?",
          "ta": "இந்த lesson-ல IT நிறுவனங்களுக்கு எந்த sector-specific risk factor மிகவும் emphasize பண்ணப்படுது?"
        },
        "options": {
          "en": [
            "Regulatory approval risk",
            "Currency (rupee) movement",
            "Weather patterns",
            "Trading volume"
          ],
          "hi": [
            "Regulatory approval risk",
            "Currency (rupee) movement",
            "Weather patterns",
            "Trading volume"
          ],
          "ta": [
            "Regulatory approval risk",
            "Currency (rupee) movement",
            "Weather patterns",
            "Trading volume"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "IT companies' dollar-heavy revenue makes currency fluctuation a defining sector-specific risk.",
          "hi": "IT companies का dollar-heavy revenue currency fluctuation को एक defining sector-specific risk बनाता है।",
          "ta": "IT நிறுவனங்களின் dollar-heavy revenue, currency fluctuation-ஐ ஒரு defining sector-specific risk-ஆ ஆக்குது."
        }
      },
      {
        "question": {
          "en": "What is the broader point of doing a 'sector deep-dive' like this, according to the lesson?",
          "hi": "Lesson के अनुसार, इस तरह का 'sector deep-dive' करने का broader point क्या है?",
          "ta": "Lesson-ன் படி, இது மாதிரி ஒரு ‘sector deep-dive’ பண்றதின் broader point என்ன?"
        },
        "options": {
          "en": [
            "It's purely academic with no practical use",
            "It deepens fundamental analysis beyond generic ratios by understanding sector-specific risk factors",
            "It replaces the need to read financial statements",
            "Only professional analysts benefit from this"
          ],
          "hi": [
            "ये purely academic है, इसका कोई practical use नहीं",
            "ये sector-specific risk factors समझकर fundamental analysis को generic ratios से आगे deepen करता है",
            "ये financial statements पढ़ ने की ज़ रूरत को replace कर देता है",
            "सिर्फ professional analysts को इससे फायदा होता है"
          ],
          "ta": [
            "இது purely academic, practical use இல்ல",
            "Sector-specific risk factors-ஐ புரிஞ்சுக்குறதால் Generic ratios-ஐ தாண்டி அது fundamental analysis-ஐ deepen பண்ணும்",
            "Financial statements படிக்கிற தேவையை அது replace பண்ணும்",
            "Professional analysts மட்டும் தான் இதிலிருந்து benefit பெறுவாங்க"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Understanding what specifically drives each sector adds a layer of insight beyond one-size-fits-all ratios. 48. How Global Markets Affect Indian Stocks",
          "hi": "ये समझना कि हर sector को specifically क्या drive करता है, one-size-fits-all ratios से आगे एक insight की layer जोड़ ता है।",
          "ta": "ஒவ்வொரு sector-ஐயும் specific-ஆ என்ன drive பண்ணுதுனு புரிஞ்சுக்குறது, one-size-fits-all ratios-ஐ தாண்டி ஒரு layer of insight-ஐ add பண்ணும்."
        }
      }
    ]
  },
  {
    "id": 48,
    "tier": "Advanced",
    "title": {
      "en": "How Global Markets Affect Indian Stocks",
      "hi": "Global Markets Indian Stocks को कै से Affect करते हैं",
      "ta": "Global Markets Indian Stocks-ஐ எப்படி Affect பண்ணும்"
    },
    "opener": {
      "en": "Meera noticed the app showed a “pre-market indicator” before Indian markets even opened each morning, based on trading happening on the other side of the world while she slept. “How can Indian stocks be affected by a market that isn't even open yet?” she asked.",
      "hi": "मीरा ने notice किया कि app हर सुबह Indian markets खुलने से भी पहले एक “pre-market indicator” दिखाता था, दुनिया के दूसरी तरफ हो रही trading के आधार पर जब वो सो रही होती थी। “Indian stocks एक ऐसे market से कै से affect हो सकते हैं जो अभी खुला भी नहीं है?” उसने पूछा।",
      "ta": "ஒவ்வொரு காலையும் Indian markets open ஆகுறதுக்கு முன்னாடியே, app ஒரு “pre-market indicator”-ஐ காட்டுறதை மீரா கவனிச்சாள், அவள் தூங்கிக்கிட்டிருந்தபோது உலகின் மறு பக்கத்தில் நடந்த trading-ஐ அடிப்படையா வச்சு. “இன்னும் open கூட ஆகாத ஒரு market-ஆல Indian stocks எப்படி affect ஆக முடியும்?” என்று கேட்டாள்."
    },
    "realStorySubtitle": {
      "en": "The Overnight Signal Every Serious Trader Checks",
      "hi": "हर Serious Trader जो Overnight Signal Check करता है",
      "ta": "ஒவ்வொரு Serious Trader-உம் Check பண்ற Overnight Signal"
    },
    "realStoryBody": {
      "en": "GIFT Nifty (formerly known as SGX Nifty), a Nifty-linked contract traded out of Gujarat's GIFT City international exchange with nearly round-the-clock hours, is widely watched by Indian traders each morning as an early signal of how the Nifty is likely to open — reflecting overnight moves in US markets, Asian markets, crude oil prices, and other global cues that occurred while Indian exchanges were closed.\n\nIt's a very practical, real example of how connected Indian markets are to the rest of the world — a bad overnight session on Wall Street regularly shows up in GIFT Nifty within minutes, well before NSE and BSE even open for the day.",
      "hi": "GIFT Nifty (पहले SGX Nifty नाम से जाना जाता था), एक Nifty-linked contract जो Gujarat के GIFT City international exchange से लगभग round-the-clock hours के साथ trade होता है, हर सुबह Indian traders द्वारा widely देखा जाता है ये early signal जानने के लिए कि Nifty कै से खुलने की संभावना है — जो US markets, Asian markets, crude oil prices, और दूसरे global cues के overnight moves को reflect करता है जो तब हुए जब Indian exchanges बंद थे।\n\nये एक बहुत practical, real example है कि Indian markets बाकी दुनिया से कितने connected हैं — Wall Street पर एक बुरा overnight session regularly GIFT Nifty में मिनटों के अंदर दिख जाता है, NSE और BSE के दिन के लिए खुलने से भी बहुत पहले।",
      "ta": "GIFT Nifty (முன்னாடி SGX Nifty-ன்னு தெரிஞ்சது), கிட்டத்தட்ட round-the-clock hours-உடன் Gujarat- ன் GIFT City international exchange-லிருந்து trade ஆகுற ஒரு Nifty-linked contract, Nifty likely எப்படி open ஆகும்னு ஒரு early signal-ஆ ஒவ்வொரு காலையும் Indian traders widely watch பண்றது — Indian exchanges close ஆயிருந்தபோது நடந்த US markets, Asian markets, crude oil prices, மற்ற global cues-ல overnight moves-ஐ reflect பண்ணி.\n\nIndian markets உலகின் மீதி பகுதியுடன் எவ்ளோ connected-ஆ இருக்குனு காட்ட இது ரொம்ப practical, real ஒரு example — Wall Street-ல ஒரு bad overnight session, NSE-உம் BSE-உம் அன்றைக்கு open ஆவதற்கு நிறைய முன்னாடியே, minutes-க்குள் GIFT Nifty-ல regularly தெரியும்."
    },
    "body": {
      "en": "Key Global Cues Indian Traders Watch • US markets (S&P 500, Nasdaq) — overnight moves often set early sentiment for Asian and Indian markets. • Crude oil prices — India imports most of its oil, so price swings affect inflation, the rupee, and company costs broadly. • US Federal Reserve decisions — global interest rate expectations affect FII money flows into or out of India. • Other Asian markets (Japan, Hong Kong, etc.) — often move first each morning, ahead of the Indian session.",
      "hi": "Key Global Cues जो Indian Traders देखते हैं • US markets (S&P 500, Nasdaq) — overnight moves अक्सर Asian और Indian markets के लिए early sentiment set करते हैं।\n\n• Crude oil prices — India अपना ज़्यादातर oil import करता है, तो price swings inflation, rupee, और company costs को broadly affect करते हैं।\n\n• US Federal Reserve decisions — global interest rate expectations India में या बाहर FII money flows को affect करते हैं।\n\n• दूसरे Asian markets (Japan, Hong Kong, आदि) — अक्सर हर सुबह Indian session से पहले सबसे पहले move करते हैं।",
      "ta": "Indian Traders Watch பண்ற Key Global Cues • US markets (S&P 500, Nasdaq) — overnight moves பெரும்பாலும் Asian, Indian markets-க்கு early sentiment-ஐ set பண்ணும்.\n\n• Crude oil prices — இந்தியா அதன் oil-ல பெரும்பாலானதை import பண்ணும், அதனால் price swings inflation-ஐயும், rupee-ஐயும், நிறுவன costs-ஐயும் broadly affect பண்ணும்.\n\n• US Federal Reserve decisions — Global interest rate expectations, India-க்குள் அல்லது வெளியே FII money flows-ஐ affect பண்ணும்.\n\n• மற்ற Asian markets (Japan, Hong Kong, etc.) — Indian session-க்கு முன்னாடியே ஒவ்வொரு காலையும் பெரும்பாலும் முதலில் move ஆகும்."
    },
    "keyTakeaway": {
      "en": "No stock market operates in isolation anymore. GIFT Nifty is the clearest, most immediate real-world proof that Indian markets react to global events overnight — a genuinely useful habit for any serious investor to check each morning, alongside (not instead of) their own research.",
      "hi": "अब कोई भी stock market isolation में operate नहीं करता। GIFT Nifty सबसे साफ, सबसे immediate real-world proof है कि Indian markets overnight global events पर react करते हैं — किसी भी serious investor के लिए हर सुबह check करने की एक genuinely useful habit, अपनी खुद की research के alongside (उसकी बजाय नहीं)।",
      "ta": "இனி எந்த stock market-உம் isolation-ல operate பண்ணாது. Indian markets overnight global events-க்கு react பண்றாங்கனு GIFT Nifty தான் clearest, most immediate real- world proof — ஒவ்வொரு காலையும் check பண்ண எந்த serious investor-க்கும் ஒரு genuinely useful habit, தங்க சொந்த research-க்கு பதிலா இல்ல, அதனுடன் சேர்ந்து."
    },
    "quiz": [
      {
        "question": {
          "en": "What is GIFT Nifty used for, according to the lesson?",
          "hi": "Lesson के अनुसार, GIFT Nifty किसके लिए इस्तेमाल होता है?",
          "ta": "Lesson-ன் படி, GIFT Nifty எதற்கு பயன்படுத்தப்படுது?"
        },
        "options": {
          "en": [
            "Setting India's interest rates",
            "Giving an early signal of how the Nifty is likely to open, based on overnight global cues",
            "Replacing the NSE entirely",
            "Only trading gold"
          ],
          "hi": [
            "India के interest rates set करने के लिए",
            "overnight global cues के आधार पर ये early signal देने के लिए कि Nifty कै से खुलने की संभावना है",
            "NSE को पूरी तरह replace करने के लिए",
            "सिर्फ gold trade करने के लिए"
          ],
          "ta": [
            "இந்தியாவின் interest rates-ஐ set பண்ண",
            "Overnight global cues-ஐ அடிப்படையா வச்சு, Nifty likely எப்படி open ஆகும்னு ஒரு early signal தர",
            "NSE-ஐ முழுசா replace பண்ண",
            "Gold மட்டும் trade பண்ண"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "It trades with extended hours, capturing overnight global market moves before NSE and BSE open.",
          "hi": "ये extended hours के साथ trade करता है, NSE और BSE खुलने से पहले overnight global market moves को capture करते हुए।",
          "ta": "NSE, BSE open ஆவதற்கு முன், extended hours-உடன் அது trade ஆகும், overnight global market moves- ஐ capture பண்ணும்."
        }
      },
      {
        "question": {
          "en": "Why do crude oil prices matter significantly for Indian markets?",
          "hi": "Crude oil prices Indian markets के लिए significantly क्यों matter करती हैं?",
          "ta": "Crude oil prices Indian markets-க்கு ஏன் significantly matter பண்ணும்?"
        },
        "options": {
          "en": [
            "India has no connection to oil prices",
            "India imports most of its oil, affecting inflation, the rupee, and company costs broadly",
            "Oil prices only affect oil companies",
            "Crude oil is traded exclusively in India"
          ],
          "hi": [
            "India का oil prices से कोई connection नहीं है",
            "India अपना ज़्यादातर oil import करता है, जो inflation, rupee, और company costs को broadly affect करता है",
            "Oil prices सिर्फ oil companies को affect करती हैं",
            "Crude oil सिर्फ India में trade होता है"
          ],
          "ta": [
            "Oil prices-உடன் இந்தியாவுக்கு எந்த connection-உம் இல்ல",
            "இந்தியா அதன் oil-ல பெரும்பாலானதை import பண்ணும், inflation-ஐயும் rupee-ஐயும் நிறுவன costs-ஐயும் broadly affect பண்ணும்",
            "Oil prices oil நிறுவனங்களை மட்டும் தான் affect பண்ணும்",
            "Crude oil இந்தியாவில் மட்டும் தான் exclusively trade ஆகும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "As a major oil importer, India's economy is broadly sensitive to crude oil price swings.",
          "hi": "एक बड़े oil importer के तौर पर, India की economy crude oil price swings के प्रति broadly sensitive है।",
          "ta": "ஒரு major oil importer-ஆ, இந்தியாவின் economy crude oil price swings-க்கு broadly sensitive."
        }
      },
      {
        "question": {
          "en": "How do US Federal Reserve decisions typically affect Indian markets?",
          "hi": "US Federal Reserve decisions आमतौर पर Indian markets को कै से affect करते हैं?",
          "ta": "US Federal Reserve decisions typically Indian markets-ஐ எப்படி affect பண்ணும்?"
        },
        "options": {
          "en": [
            "They have no effect on India",
            "They influence global interest rate expectations and FII money flows into or out of India",
            "They only affect US companies listed in India",
            "They directly set India's interest rates"
          ],
          "hi": [
            "उनका India पर कोई असर नहीं पड़ ता",
            "वो global interest rate expectations और India में या बाहर FII money flows को influence करते हैं",
            "वो सिर्फ India में listed US companies को affect करते हैं",
            "वो सीधे India के interest rates set करते हैं"
          ],
          "ta": [
            "இந்தியாவுக்கு அவற்றுக்கு எந்த effect-உம் இல்ல",
            "Global interest rate expectations-ஐயும், India-க்குள் அல்லது வெளியே FII money flows-ஐயும் அவை influence பண்ணும்",
            "இந்தியாவில் list ஆன US நிறுவனங்களை மட்டும் தான் அவை affect பண்ணும்",
            "அவை directly இந்தியாவின் interest rates-ஐ set பண்ணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Fed decisions shape global capital flows, which directly affect FII investment into Indian markets.",
          "hi": "Fed decisions global capital flows को shape करते हैं, जो सीधे Indian markets में FII investment को affect करते हैं।",
          "ta": "Fed decisions global capital flows-ஐ shape பண்ணும், Indian markets-க்குள் FII investment-ஐ directly affect பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What was GIFT Nifty formerly known as?",
          "hi": "GIFT Nifty पहले किस नाम से जाना जाता था?",
          "ta": "GIFT Nifty முன்னாடி எந்த பெயரில் அறியப்பட்டது?"
        },
        "options": {
          "en": [
            "Bombay Nifty",
            "SGX Nifty",
            "Tokyo Nifty",
            "Dubai Nifty"
          ],
          "hi": [
            "Bombay Nifty",
            "SGX Nifty",
            "Tokyo Nifty",
            "Dubai Nifty"
          ],
          "ta": [
            "Bombay Nifty",
            "SGX Nifty",
            "Tokyo Nifty",
            "Dubai Nifty"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "It was previously traded on the Singapore Exchange before relocating to GIFT City.",
          "hi": "ये पहले GIFT City में relocate होने से पहले Singapore Exchange पर trade होता था।",
          "ta": "GIFT City-க்கு relocate ஆவதற்கு முன், அது Singapore Exchange-ல trade பண்ணப்பட்டது."
        }
      },
      {
        "question": {
          "en": "What is the key takeaway about global markets and Indian stocks?",
          "hi": "Global markets और Indian stocks के बारे में मुख्य takeaway क्या है?",
          "ta": "Global markets-ஐயும் Indian stocks-ஐயும் பத்தின key takeaway என்ன?"
        },
        "options": {
          "en": [
            "Indian markets are completely isolated from global events",
            "No market operates in isolation — checking global cues each morning is a useful habit alongside personal research",
            "Global markets have no bearing on Indian retail investors",
            "Only institutional investors need to watch global markets"
          ],
          "hi": [
            "Indian markets global events से पूरी तरह isolated हैं",
            "कोई भी market isolation में operate नहीं करता — हर सुबह global cues check करना personal research के साथ एक useful habit है",
            "Global markets का Indian retail investors पर कोई असर नहीं है",
            "सिर्फ institutional investors को global markets देखने की ज़ रूरत है"
          ],
          "ta": [
            "Indian markets global events-லிருந்து முற்றிலும் isolated",
            "எந்த market-உம் isolation-ல operate பண்ணாது — உங்க personal research-உடன் சேர்ந்து, ஒவ்வொரு காலையும் global cues-ஐ check பண்றது ஒரு useful habit",
            "Global markets-க்கு Indian retail investors-உடன் எந்த bearing-உம் இல்ல",
            "Institutional investors மட்டும் தான் global markets-ஐ watch பண்ணணும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "GIFT Nifty's overnight sensitivity is real, practical proof of how interconnected markets have become. 49. Backtesting a Strategy with Historical Data",
          "hi": "GIFT Nifty की overnight sensitivity real, practical proof है कि markets कितने interconnected हो गए हैं।",
          "ta": "GIFT Nifty-ன் overnight sensitivity, markets எவ்ளோ interconnected ஆயிருக்கானு real, practical proof."
        }
      }
    ]
  },
  {
    "id": 49,
    "tier": "Advanced",
    "title": {
      "en": "Backtesting a Strategy with Historical Data",
      "hi": "Historical Data के साथ एक Strategy को Backtest करना",
      "ta": "Historical Data-உடன் ஒரு Strategy-ஐ Backtest பண்றது"
    },
    "opener": {
      "en": "Before risking real money on a new idea — buying whenever RSI dropped below 30, say — Meera realised she could test it first. “Run it against years of past data before you ever run it with real money,” Paati said. “That's exactly what the app's Paper Trading simulator was built for.”\n\nWhat Backtesting Actually Is Backtesting means applying a trading rule or strategy to historical price data to see how it would have performed in the past — before committing any real capital to it going forward.\n\nBacktesting's Real Limitations • Past performance never guarantees future results — market conditions change, sometimes completely. • Overfitting: A strategy can be tuned so precisely to past data that it fails on new, unseen data — it 'memorised' history instead of finding a genuine, repeatable edge. • Survivorship bias: Testing only on companies that still exist today quietly ignores all the companies that failed along the way, flattering the results.\n\nUsing the App's Simulator This Way The Paper Trading simulator (mentioned since Lesson 14) uses real historical data specifically so you can test an idea's discipline and behaviour across genuinely different market conditions, entirely risk-free, before ever deciding whether it's worth real money.\n\nKey takeaway: Backtesting is a genuinely valuable discipline, but its limitations (overfitting, survivorship bias, and the simple fact that markets evolve) mean a great backtest is a reason to investigate further, never a guarantee — treat it as one serious input, not a crystal ball.\n\nQUICK QUIZ · TEST YOURSELF (5 QUESTIONS)\n\n1. What does 'backtesting' mean? A) Predicting the future with certainty B) Applying a trading rule to historical data to see how it would have performed C) A type of stop-loss order D) Reading a company's balance sheet Correct: B) Applying a trading rule to historical data to see how it would have performed Why: Backtesting evaluates a strategy's historical performance before risking real capital.\n\n2. What is 'overfitting' in the context of backtesting? A) Using too little historical data B) Tuning a strategy so precisely to past data that it fails on new, unseen data C) Testing a strategy on too many stocks D) A type of stock split Correct: B) Tuning a strategy so precisely to past data that it fails on new, unseen data Why: An overfitted strategy has essentially memorised history rather than found a genuinely repeatable edge.\n\n3. What is 'survivorship bias' in backtesting? A) Testing only on companies that still exist today, ignoring those that failed B) Only testing strategies that have already failed C) A bias toward large-cap stocks only D) A type of technical indicator Correct: A) Testing only on companies that still exist today, ignoring those that failed Why: This quietly flatters backtest results by excluding companies that went bankrupt or were delisted.\n\n4. What is the app's Paper Trading simulator specifically useful for, according to this lesson? A) Guaranteeing future profits B) Testing an idea's discipline and behaviour across historical conditions, risk-free C) Replacing the need for a demat account permanently D) Avoiding all forms of research Correct: B) Testing an idea's discipline and behaviour across historical conditions, risk-free Why: It uses real historical data, letting you test strategies without any real financial risk.\n\n5. What is the correct way to treat a great backtest result, per the lesson? A) As a guarantee of future profits B) As one serious input worth further investigation, not a guarantee C) As proof the strategy can never fail D) As irrelevant information Correct: B) As one serious input worth further investigation, not a guarantee Why: Given overfitting and survivorship bias risks, a strong backtest deserves scrutiny, not blind confidence.\n\n50. Capstone: Your Own Analysis Framework",
      "hi": "किसी नए idea पर असली पैसा risk करने से पहले — मान लो, जब भी RSI 30 से नीचे गिरे तब खरीदना — मीरा को एहसास हुआ कि वो इसे पहले test कर सकती है। “इसे कभी असली पैसे के साथ run करने से पहले सालों के past data के against run करो,” पाटी ने कहा। “app का Paper Trading simulator exactly इसीलिए बनाया गया था।”\n\nBacktesting असल में क्या है Backtesting का मतलब है एक trading rule या strategy को historical price data पर apply करना ये देखने के लिए कि ये पास्ट में कै सा perform करता — आगे बढ़ ते हुए इसमें कोई real capital commit करने से पहले।\n\nBacktesting की Real Limitations • Past performance कभी future results की guarantee नहीं देता — market conditions बदलती हैं, कभी-कभी पूरी तरह।\n\n• Overfitting: एक strategy को इतनी precisely past data के लिए tune किया जा सकता है कि ये नए, unseen data पर fail हो जाए — इसने history को 'memorise' कर लिया, ना कि एक genuine, repeatable edge ढूँढा।\n\n• Survivorship bias: सिर्फ उन companies पर test करना जो आज भी exist करती हैं, चुपचाप उन सारी companies को ignore कर देता है जो रास्ते में fail हो गईं, results को flatter करते हुए।\n\nApp के Simulator को इस तरह इस्तेमाल करना Paper Trading simulator (Lesson 14 से mentioned) specifically real historical data इस्तेमाल करता है ताकि आप एक idea की discipline और behaviour को genuinely अलग-अलग market conditions में test कर सकें, पूरी तरह risk-free, ये decide करने से पहले कि ये real पैसे के लायक है या नहीं।\n\nमुख्य सीख: Backtesting एक genuinely valuable discipline है, लेकिन इसकी limitations (overfitting, survivorship bias, और ये simple fact कि markets evolve होते हैं) का मतलब है कि एक great backtest आगे investigate करने की एक वजह है, कोई guarantee नहीं — इसे एक serious input मानें, कोई crystal ball नहीं।\n\nक्विक क्विज़ · खुद को टेस्ट करें (5 सवाल)\n\n1. 'Backtesting' का मतलब क्या है? A) Certainty के साथ future predict करना B) एक trading rule को historical data पर apply करना ये देखने के लिए कि ये कै सा perform करता C) एक तरह का stop-loss order D) कं पनी की balance sheet पढ़ ना सही जवाब: B) एक trading rule को historical data पर apply करना ये देखने के लिए कि ये कै सा perform करता क्यों: Backtesting real capital risk करने से पहले किसी strategy की historical performance को evaluate करता है।\n\n2. Backtesting के context में 'overfitting' क्या है? A) बहुत कम historical data इस्तेमाल करना B) एक strategy को इतनी precisely past data के लिए tune करना कि ये नए, unseen data पर fail हो जाए C) एक strategy को बहुत सारे stocks पर test करना D) एक तरह का stock split सही जवाब: B) एक strategy को इतनी precisely past data के लिए tune करना कि ये नए, unseen data पर fail हो जाए क्यों: एक overfitted strategy ने essentially history memorise कर ली है, ना कि एक genuinely repeatable edge ढूँढा।\n\n3. Backtesting में 'survivorship bias' क्या है? A) सिर्फ उन companies पर test करना जो आज भी exist करती हैं, जो fail हो गईं उन्हें ignore करते हुए B) सिर्फ उन strategies को test करना जो पहले ही fail हो चुकी हैं C) सिर्फ large-cap stocks की तरफ एक bias D) एक तरह का technical indicator सही जवाब: A) सिर्फ उन companies पर test करना जो आज भी exist करती हैं, जो fail हो गईं उन्हें ignore करते हुए क्यों: ये उन companies को exclude करके backtest results को चुपचाप flatter करता है जो bankrupt हो गईं या delist हो गईं।\n\n4. इस lesson के अनुसार, app का Paper Trading simulator specifically किसके लिए useful है? A) Future profits guarantee करने के लिए B) Historical conditions में, risk-free, एक idea की discipline और behaviour को test करने के लिए C) Demat account की ज़ रूरत को permanently replace करने के लिए D) हर तरह की research से बचने के लिए सही जवाब: B) Historical conditions में, risk-free, एक idea की discipline और behaviour को test करने के लिए क्यों: ये real historical data इस्तेमाल करता है, जिससे आप बिना किसी real financial risk के strategies test कर सकते हैं।\n\n5. Lesson के अनुसार, एक great backtest result को treat करने का सही तरीका क्या है? A) Future profits की एक guaranteed predictor के तौर पर B) आगे investigation के लायक एक serious input के तौर पर, कोई guarantee नहीं C) इस बात के proof के तौर पर कि strategy कभी नुकसान नहीं कर सकती D) एक irrelevant information के तौर पर सही जवाब: B) आगे investigation के लायक एक serious input के तौर पर, कोई guarantee नहीं क्यों: Overfitting और survivorship bias के risks को देखते हुए, एक strong backtest scrutiny deserve करता है, blind confidence नहीं।",
      "ta": "ஒரு புது idea-ல real பணத்தை risk பண்றதுக்கு முன் — RSI 30-க்கு கீழ் விழும் ஒவ்வொரு தடவையும் வாங்குறது, சொல்லப்போனா — அதை முதலில் test பண்ண முடியும்னு மீரா realize பண்ணினாள். “Real பணத்துடன் அதை ஒருபோதும் run பண்றதுக்கு முன், நிறைய வருடங்களின் past data-க்கு எதிரா run பண்ணு,” பாட்டி சொன்னார். “App-ன் Paper Trading simulator exact-ஆ அதுக்குத் தான் கட்டப்பட்டது.”\n\nBacktesting உண்மையில் என்ன ஒரு trading rule அல்லது strategy-ஐ historical price data-க்கு apply பண்ணி, முன்னாடி அது எப்படி perform பண்ணியிருக்கும்னு பார்ப்பது தான் Backtesting — அதற்கு going forward எந்த real capital- ஐயும் commit பண்றதுக்கு முன்.\n\nBacktesting-ன் Real Limitations • Past performance ஒருபோதும் future results-ஐ guarantee பண்ணாது — market conditions மாறும், சில நேரம் completely. • Overfitting: புது, பார்க்காத data-ல fail ஆகும் அளவுக்கு ஒரு strategy-ஐ past data-க்கு precisely tune பண்ண முடியும் — அது history-ஐ ‘memorise’ பண்ணுச்சு, ஒரு genuine, repeatable edge-ஐ கண்டுபிடிக்கல.\n\n• Survivorship bias: இன்று இன்னும் இருக்கிற நிறுவனங்களில் மட்டும் test பண்றது, வழியில் fail ஆன எல்லா நிறுவனங்களையும் அமைதியா ignore பண்ணும், results-ஐ flatter பண்ணும்.\n\nApp-ன் Simulator-ஐ இப்படி பயன்படுத்துறது Paper Trading simulator (Lesson 14-லிருந்து mention பண்ணப்பட்டது), real capital பண்ண worth-ஆ இருக்கானு எப்போதும் decide பண்றதுக்கு முன், முழுசா risk-free-ஆ, genuinely வேற market conditions முழுக்க ஒரு idea-ன் discipline-ஐயும் behaviour-ஐயும் test பண்ண specific-ஆ real historical data பயன்படுத்தும்.\n\nமுக்கிய பாடம்: Backtesting ஒரு genuinely valuable discipline, ஆனா அதன் limitations (overfitting, survivorship bias, markets evolve ஆகும் simple fact) என்றால், ஒரு great backtest இன்னும் investigate பண்ண ஒரு காரணம், ஒரு guarantee இல்ல — அதை ஒரு serious input-ஆ treat பண்ணுங்க, ஒரு crystal ball இல்ல.\n\nவினாடி வினா · சுயபரிசோதனை (5 கேள்விகள்)\n\n1. ‘Backtesting’ என்றால் என்ன? A) Certainty-உடன் future-ஐ predict பண்றது B) Historical data-க்கு ஒரு trading rule-ஐ apply பண்ணி அது எப்படி perform பண்ணியிருக்கும்னு பார்ப்பது C) ஒரு வகை stop-loss order D) நிறுவனத்தின் balance sheet-ஐ படிக்குறது சரியான பதில்:B) Historical data-க்கு ஒரு trading rule-ஐ apply பண்ணி அது எப்படி perform பண்ணியிருக்கும்னு பார்ப்பது ஏன்:Real capital-ஐ risk பண்றதுக்கு முன், ஒரு strategy-ன் historical performance-ஐ backtesting evaluate பண்ணும்.\n\n2. Backtesting context-ல ‘overfitting’ என்றால் என்ன? A) ரொம்ப குறைவான historical data பயன்படுத்துறது B) புது, பார்க்காத data-ல fail ஆகும் அளவுக்கு ஒரு strategy-ஐ past data-க்கு precisely tune பண்றது C) ரொம்ப அதிக stocks-ல ஒரு strategy-ஐ test பண்றது D) ஒரு வகை stock split சரியான பதில்:B) புது, பார்க்காத data-ல fail ஆகும் அளவுக்கு ஒரு strategy-ஐ past data-க்கு precisely tune பண்றது ஏன்:ஒரு overfitted strategy, ஒரு genuinely repeatable edge-ஐ கண்டுபிடிக்கிறதை விட, history-ஐ essentially memorise பண்ணியிருக்கும்.\n\n3. Backtesting-ல ‘survivorship bias’ என்றால் என்ன? A) இன்று இன்னும் இருக்கிற நிறுவனங்களில் மட்டும் test பண்றது, fail ஆனவற்றை ignore பண்றது B) ஏற்கனவே fail ஆன strategies-ஐ மட்டும் test பண்றது C) Large-cap stocks-க்கு மட்டும் ஒரு bias D) ஒரு வகை technical indicator சரியான பதில்:A) இன்று இன்னும் இருக்கிற நிறுவனங்களில் மட்டும் test பண்றது, fail ஆனவற்றை ignore பண்றது ஏன்:Bankrupt ஆன அல்லது delist ஆன நிறுவனங்களை exclude பண்ணி, இது backtest results-ஐ அமைதியா flatter பண்ணும்.\n\n4. இந்த lesson-ன் படி, app-ன் Paper Trading simulator specific-ஆ எதற்கு useful? A) Future profits-ஐ guarantee பண்ண B) Historical conditions முழுக்க ஒரு idea-ன் discipline-ஐயும் behaviour-ஐயும் risk-free-ஆ test பண்ண C) ஒரு demat account-ன் தேவையை நிரந்தரமா replace பண்ண D) எல்லா வகை research-ஐயும் avoid பண்ண சரியான பதில்:B) Historical conditions முழுக்க ஒரு idea-ன் discipline-ஐயும் behaviour-ஐயும் risk-free- ஆ test பண்ண ஏன்:அது real historical data பயன்படுத்தும், எந்த real financial risk-உம் இல்லாம strategies-ஐ test பண்ண அனுமதிக்கும்.\n\n5. Lesson-ன் படி, ஒரு great backtest result-ஐ correct-ஆ treat பண்ற வழி என்ன? A) Future profits-ன் ஒரு guarantee-ஆ B) மேலும் investigation worth-ஆன ஒரு serious input-ஆ, ஒரு guarantee இல்ல C) Strategy ஒருபோதும் fail ஆகாதுனு proof-ஆ D) Irrelevant information-ஆ சரியான பதில்:B) மேலும் investigation worth-ஆன ஒரு serious input-ஆ, ஒரு guarantee இல்ல ஏன்:Overfitting-உம் survivorship bias risks-உம் கொடுத்து, ஒரு strong backtest scrutiny-ஐ deserve பண்ணும், blind confidence-ஐ இல்ல."
    },
    "body": {
      "en": "Before risking real money on a new idea — buying whenever RSI dropped below 30, say — Meera realised she could test it first. “Run it against years of past data before you ever run it with real money,” Paati said. “That's exactly what the app's Paper Trading simulator was built for.”\n\nWhat Backtesting Actually Is Backtesting means applying a trading rule or strategy to historical price data to see how it would have performed in the past — before committing any real capital to it going forward.\n\nBacktesting's Real Limitations • Past performance never guarantees future results — market conditions change, sometimes completely. • Overfitting: A strategy can be tuned so precisely to past data that it fails on new, unseen data — it 'memorised' history instead of finding a genuine, repeatable edge. • Survivorship bias: Testing only on companies that still exist today quietly ignores all the companies that failed along the way, flattering the results.\n\nUsing the App's Simulator This Way The Paper Trading simulator (mentioned since Lesson 14) uses real historical data specifically so you can test an idea's discipline and behaviour across genuinely different market conditions, entirely risk-free, before ever deciding whether it's worth real money.",
      "hi": "किसी नए idea पर असली पैसा risk करने से पहले — मान लो, जब भी RSI 30 से नीचे गिरे तब खरीदना — मीरा को एहसास हुआ कि वो इसे पहले test कर सकती है। “इसे कभी असली पैसे के साथ run करने से पहले सालों के past data के against run करो,” पाटी ने कहा। “app का Paper Trading simulator exactly इसीलिए बनाया गया था।”\n\nBacktesting असल में क्या है Backtesting का मतलब है एक trading rule या strategy को historical price data पर apply करना ये देखने के लिए कि ये पास्ट में कै सा perform करता — आगे बढ़ ते हुए इसमें कोई real capital commit करने से पहले।\n\nBacktesting की Real Limitations • Past performance कभी future results की guarantee नहीं देता — market conditions बदलती हैं, कभी-कभी पूरी तरह।\n\n• Overfitting: एक strategy को इतनी precisely past data के लिए tune किया जा सकता है कि ये नए, unseen data पर fail हो जाए — इसने history को 'memorise' कर लिया, ना कि एक genuine, repeatable edge ढूँढा।\n\n• Survivorship bias: सिर्फ उन companies पर test करना जो आज भी exist करती हैं, चुपचाप उन सारी companies को ignore कर देता है जो रास्ते में fail हो गईं, results को flatter करते हुए।\n\nApp के Simulator को इस तरह इस्तेमाल करना Paper Trading simulator (Lesson 14 से mentioned) specifically real historical data इस्तेमाल करता है ताकि आप एक idea की discipline और behaviour को genuinely अलग-अलग market conditions में test कर सकें, पूरी तरह risk-free, ये decide करने से पहले कि ये real पैसे के लायक है या नहीं।",
      "ta": "ஒரு புது idea-ல real பணத்தை risk பண்றதுக்கு முன் — RSI 30-க்கு கீழ் விழும் ஒவ்வொரு தடவையும் வாங்குறது, சொல்லப்போனா — அதை முதலில் test பண்ண முடியும்னு மீரா realize பண்ணினாள். “Real பணத்துடன் அதை ஒருபோதும் run பண்றதுக்கு முன், நிறைய வருடங்களின் past data-க்கு எதிரா run பண்ணு,” பாட்டி சொன்னார். “App-ன் Paper Trading simulator exact-ஆ அதுக்குத் தான் கட்டப்பட்டது.”\n\nBacktesting உண்மையில் என்ன ஒரு trading rule அல்லது strategy-ஐ historical price data-க்கு apply பண்ணி, முன்னாடி அது எப்படி perform பண்ணியிருக்கும்னு பார்ப்பது தான் Backtesting — அதற்கு going forward எந்த real capital- ஐயும் commit பண்றதுக்கு முன்.\n\nBacktesting-ன் Real Limitations • Past performance ஒருபோதும் future results-ஐ guarantee பண்ணாது — market conditions மாறும், சில நேரம் completely. • Overfitting: புது, பார்க்காத data-ல fail ஆகும் அளவுக்கு ஒரு strategy-ஐ past data-க்கு precisely tune பண்ண முடியும் — அது history-ஐ ‘memorise’ பண்ணுச்சு, ஒரு genuine, repeatable edge-ஐ கண்டுபிடிக்கல.\n\n• Survivorship bias: இன்று இன்னும் இருக்கிற நிறுவனங்களில் மட்டும் test பண்றது, வழியில் fail ஆன எல்லா நிறுவனங்களையும் அமைதியா ignore பண்ணும், results-ஐ flatter பண்ணும்.\n\nApp-ன் Simulator-ஐ இப்படி பயன்படுத்துறது Paper Trading simulator (Lesson 14-லிருந்து mention பண்ணப்பட்டது), real capital பண்ண worth-ஆ இருக்கானு எப்போதும் decide பண்றதுக்கு முன், முழுசா risk-free-ஆ, genuinely வேற market conditions முழுக்க ஒரு idea-ன் discipline-ஐயும் behaviour-ஐயும் test பண்ண specific-ஆ real historical data பயன்படுத்தும்."
    },
    "keyTakeaway": {
      "en": "Backtesting is a genuinely valuable discipline, but its limitations (overfitting, survivorship bias, and the simple fact that markets evolve) mean a great backtest is a reason to investigate further, never a guarantee — treat it as one serious input, not a crystal ball.",
      "hi": "Backtesting एक genuinely valuable discipline है, लेकिन इसकी limitations (overfitting, survivorship bias, और ये simple fact कि markets evolve होते हैं) का मतलब है कि एक great backtest आगे investigate करने की एक वजह है, कोई guarantee नहीं — इसे एक serious input मानें, कोई crystal ball नहीं।",
      "ta": "Backtesting ஒரு genuinely valuable discipline, ஆனா அதன் limitations (overfitting, survivorship bias, markets evolve ஆகும் simple fact) என்றால், ஒரு great backtest இன்னும் investigate பண்ண ஒரு காரணம், ஒரு guarantee இல்ல — அதை ஒரு serious input-ஆ treat பண்ணுங்க, ஒரு crystal ball இல்ல."
    },
    "quiz": [
      {
        "question": {
          "en": "What does 'backtesting' mean?",
          "hi": "'Backtesting' का मतलब क्या है?",
          "ta": "‘Backtesting’ என்றால் என்ன?"
        },
        "options": {
          "en": [
            "Predicting the future with certainty",
            "Applying a trading rule to historical data to see how it would have performed",
            "A type of stop-loss order",
            "Reading a company's balance sheet"
          ],
          "hi": [
            "Certainty के साथ future predict करना",
            "एक trading rule को historical data पर apply करना ये देखने के लिए कि ये कै सा perform करता",
            "एक तरह का stop-loss order",
            "कं पनी की balance sheet पढ़ ना"
          ],
          "ta": [
            "Certainty-உடன் future-ஐ predict பண்றது",
            "Historical data-க்கு ஒரு trading rule-ஐ apply பண்ணி அது எப்படி perform பண்ணியிருக்கும்னு பார்ப்பது",
            "ஒரு வகை stop-loss order",
            "நிறுவனத்தின் balance sheet-ஐ படிக்குறது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Backtesting evaluates a strategy's historical performance before risking real capital.",
          "hi": "Backtesting real capital risk करने से पहले किसी strategy की historical performance को evaluate करता है।",
          "ta": "Real capital-ஐ risk பண்றதுக்கு முன், ஒரு strategy-ன் historical performance-ஐ backtesting evaluate பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What is 'overfitting' in the context of backtesting?",
          "hi": "Backtesting के context में 'overfitting' क्या है?",
          "ta": "Backtesting context-ல ‘overfitting’ என்றால் என்ன?"
        },
        "options": {
          "en": [
            "Using too little historical data",
            "Tuning a strategy so precisely to past data that it fails on new, unseen data",
            "Testing a strategy on too many stocks",
            "A type of stock split"
          ],
          "hi": [
            "बहुत कम historical data इस्तेमाल करना",
            "एक strategy को इतनी precisely past data के लिए tune करना कि ये नए, unseen data पर fail हो जाए",
            "एक strategy को बहुत सारे stocks पर test करना",
            "एक तरह का stock split"
          ],
          "ta": [
            "ரொம்ப குறைவான historical data பயன்படுத்துறது",
            "புது, பார்க்காத data-ல fail ஆகும் அளவுக்கு ஒரு strategy-ஐ past data-க்கு precisely tune பண்றது",
            "ரொம்ப அதிக stocks-ல ஒரு strategy-ஐ test பண்றது",
            "ஒரு வகை stock split"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "An overfitted strategy has essentially memorised history rather than found a genuinely repeatable edge.",
          "hi": "एक overfitted strategy ने essentially history memorise कर ली है, ना कि एक genuinely repeatable edge ढूँढा।",
          "ta": "ஒரு overfitted strategy, ஒரு genuinely repeatable edge-ஐ கண்டுபிடிக்கிறதை விட, history-ஐ essentially memorise பண்ணியிருக்கும்."
        }
      },
      {
        "question": {
          "en": "What is 'survivorship bias' in backtesting?",
          "hi": "Backtesting में 'survivorship bias' क्या है?",
          "ta": "Backtesting-ல ‘survivorship bias’ என்றால் என்ன?"
        },
        "options": {
          "en": [
            "Testing only on companies that still exist today, ignoring those that failed",
            "Only testing strategies that have already failed",
            "A bias toward large-cap stocks only",
            "A type of technical indicator"
          ],
          "hi": [
            "सिर्फ उन companies पर test करना जो आज भी exist करती हैं, जो fail हो गईं उन्हें ignore करते हुए",
            "सिर्फ उन strategies को test करना जो पहले ही fail हो चुकी हैं",
            "सिर्फ large-cap stocks की तरफ एक bias",
            "एक तरह का technical indicator"
          ],
          "ta": [
            "இன்று இன்னும் இருக்கிற நிறுவனங்களில் மட்டும் test பண்றது, fail ஆனவற்றை ignore பண்றது",
            "ஏற்கனவே fail ஆன strategies-ஐ மட்டும் test பண்றது",
            "Large-cap stocks-க்கு மட்டும் ஒரு bias",
            "ஒரு வகை technical indicator"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "This quietly flatters backtest results by excluding companies that went bankrupt or were delisted.",
          "hi": "ये उन companies को exclude करके backtest results को चुपचाप flatter करता है जो bankrupt हो गईं या delist हो गईं।",
          "ta": "Bankrupt ஆன அல்லது delist ஆன நிறுவனங்களை exclude பண்ணி, இது backtest results-ஐ அமைதியா flatter பண்ணும்."
        }
      },
      {
        "question": {
          "en": "What is the app's Paper Trading simulator specifically useful for, according to this lesson?",
          "hi": "इस lesson के अनुसार, app का Paper Trading simulator specifically किसके लिए useful है?",
          "ta": "இந்த lesson-ன் படி, app-ன் Paper Trading simulator specific-ஆ எதற்கு useful?"
        },
        "options": {
          "en": [
            "Guaranteeing future profits",
            "Testing an idea's discipline and behaviour across historical conditions, risk-free",
            "Replacing the need for a demat account permanently",
            "Avoiding all forms of research"
          ],
          "hi": [
            "Future profits guarantee करने के लिए",
            "Historical conditions में, risk-free, एक idea की discipline और behaviour को test करने के लिए",
            "Demat account की ज़ रूरत को permanently replace करने के लिए",
            "हर तरह की research से बचने के लिए"
          ],
          "ta": [
            "Future profits-ஐ guarantee பண்ண",
            "Historical conditions முழுக்க ஒரு idea-ன் discipline-ஐயும் behaviour-ஐயும் risk-free-ஆ test பண்ண",
            "ஒரு demat account-ன் தேவையை நிரந்தரமா replace பண்ண",
            "எல்லா வகை research-ஐயும் avoid பண்ண"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "It uses real historical data, letting you test strategies without any real financial risk.",
          "hi": "ये real historical data इस्तेमाल करता है, जिससे आप बिना किसी real financial risk के strategies test कर सकते हैं।",
          "ta": "அது real historical data பயன்படுத்தும், எந்த real financial risk-உம் இல்லாம strategies-ஐ test பண்ண அனுமதிக்கும்."
        }
      },
      {
        "question": {
          "en": "What is the correct way to treat a great backtest result, per the lesson?",
          "hi": "Lesson के अनुसार, एक great backtest result को treat करने का सही तरीका क्या है?",
          "ta": "Lesson-ன் படி, ஒரு great backtest result-ஐ correct-ஆ treat பண்ற வழி என்ன?"
        },
        "options": {
          "en": [
            "As a guarantee of future profits",
            "As one serious input worth further investigation, not a guarantee",
            "As proof the strategy can never fail",
            "As irrelevant information"
          ],
          "hi": [
            "Future profits की एक guaranteed predictor के तौर पर",
            "आगे investigation के लायक एक serious input के तौर पर, कोई guarantee नहीं",
            "इस बात के proof के तौर पर कि strategy कभी नुकसान नहीं कर सकती",
            "एक irrelevant information के तौर पर"
          ],
          "ta": [
            "Future profits-ன் ஒரு guarantee-ஆ",
            "மேலும் investigation worth-ஆன ஒரு serious input-ஆ, ஒரு guarantee இல்ல",
            "Strategy ஒருபோதும் fail ஆகாதுனு proof-ஆ",
            "Irrelevant information-ஆ"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Given overfitting and survivorship bias risks, a strong backtest deserves scrutiny, not blind confidence. 50. Capstone: Your Own Analysis Framework",
          "hi": "Overfitting और survivorship bias के risks को देखते हुए, एक strong backtest scrutiny deserve करता है, blind confidence नहीं।",
          "ta": "Overfitting-உம் survivorship bias risks-உம் கொடுத்து, ஒரு strong backtest scrutiny-ஐ deserve பண்ணும், blind confidence-ஐ இல்ல."
        }
      }
    ]
  },
  {
    "id": 50,
    "tier": "Advanced",
    "title": {
      "en": "Capstone: Your Own Analysis Framework",
      "hi": "Capstone: आपका अपना Analysis Framework",
      "ta": "Capstone: உங்க சொந்த Analysis Framework"
    },
    "opener": {
      "en": "It had been months since Meera first found her grandfather's 1987 share certificate in that old steel trunk. She sat down one evening, opened the app, and realised she was about to do something she couldn't have done at the start: build her own complete framework for judging any stock, from scratch.\n\nPaati didn't offer a new story this time. “You don't need one more story, kanna,” she said. “You've collected forty-nine of your own already. Just put them together.”\n\nA Practical Framework — Combining Everything • 1. Business Quality (Lessons 16-22): Read the balance sheet, P&L, and cash flow. Is it a genuinely good business? • 2. Valuation (Lessons 19-21): Check P/E, P/B, ROE, D/E, and EPS — am I paying a fair price? • 3. Price Context (Lessons 23-27, 36-39): What is the chart, support/resistance, and momentum actually showing right now? • 4. Sector & Macro Context (Lessons 28-29, 46-48): How do rates, inflation, sector rotation, and global cues affect this specific business? • 5. Position Sizing & Risk (Lessons 13, 30-31, 42): How much am I risking, and how does this fit my overall portfolio and time horizon? • 6. Psychology Check (Lessons 43-45): Am I deciding this calmly, on my own written plan — or reacting to fear, greed, or a bias?\n\nThe Real Point of All Fifty Lessons No single lesson in this course was ever meant to be used alone. Meera's 1987 certificate, and the very first lesson it inspired, taught the most basic idea: a share is real ownership in a real business. Everything since has simply been learning to judge that ownership more carefully, and to manage the very human parts of investing — patience, discipline, and risk — that no ratio or indicator can do for you.\n\nKey takeaway: A genuinely good investor isn't someone who has memorised every ratio and indicator in this book — it's someone who has a repeatable framework combining all of them, and the discipline to actually use it every time, especially when it's least convenient to.\n\nCOURSE COMPLETION QUIZ · FINAL CHECK (10 QUESTIONS)\n\n1. A share represents: A) A loan to a company B) Real partial ownership in a company C) A government bond D) A type of stop-loss order Correct: B) Real partial ownership in a company Why: This foundational idea from Lesson 1 underlies everything else in the course.\n\n2. The P/E ratio helps answer: A) How many employees a company has B) How much you're paying for each rupee of a company's profit C) The company's trading volume D) The exchange's holiday calendar Correct: B) How much you're paying for each rupee of a company's profit Why: P/E (Lesson 19) is a core valuation starting point.\n\n3. A Golden Cross refers to: A) A shorter-term moving average crossing above a longer-term one B) A company's dividend announcement C) A type of options contract D) A stock exchange holiday Correct: A) A shorter-term moving average crossing above a longer-term one Why: This is a widely-watched bullish technical signal from Lesson 27.\n\n4. According to SEBI's own data cited in this course, most individual F&O traders: A) Made consistent profits B) Lost money overall C) Received government subsidies D) Were required to diversify by law Correct: B) Lost money overall Why: This real finding (Lessons 12 and 40) underscores the risk of frequent, undisciplined derivatives trading.\n\n5. The key difference between an Option and a Futures contract is: A) There is no difference B) Options give a right without obligation; Futures obligate both parties C) Futures are always safer than Options D) Options can only be bought by institutions Correct: B) Options give a right without obligation; Futures obligate both parties Why: This distinction (Lessons 40-41) is central to understanding derivative risk.\n\n6. Position sizing is best described as: A) Choosing which stock to buy B) Deciding how much capital to risk on a single trade C) Reading a cash flow statement D) A type of chart pattern Correct: B) Deciding how much capital to risk on a single trade Why: LTCM's 1998 near-collapse (Lesson 42) showed why this discipline matters as much as analysis itself.\n\n7. Loss aversion is the tendency to: A) Feel gains more intensely than losses B) Feel losses more intensely than equivalent gains C) Never experience any emotion while trading D) Only affect professional fund managers Correct: B) Feel losses more intensely than equivalent gains Why: This Nobel-Prize-backed bias (Lesson 44) explains why investors often hold losers too long.\n\n8. A trading journal's real value comes from: A) Individual entries in isolation B) Patterns visible only when reviewing many entries together over time C) Its cover design D) Avoiding all reflection on past trades Correct: B) Patterns visible only when reviewing many entries together over time Why: Meera's Friday-afternoon discovery (Lesson 45) only emerged from reviewing months of entries together.\n\n9. GIFT Nifty is primarily used to: A) Set India's official interest rate B) Signal how the Nifty is likely to open, based on overnight global cues C) Replace the BSE D) Trade only gold and silver Correct: B) Signal how the Nifty is likely to open, based on overnight global cues Why: It reflects overnight global market moves before Indian exchanges open (Lesson 48).\n\n10. A backtest showing excellent historical results should be treated as: A) A guaranteed predictor of future profits B) One serious input worth further scrutiny, given risks like overfitting and survivorship bias C) Proof a strategy can never lose money D) Irrelevant to real trading decisions Correct: B) One serious input worth further scrutiny, given risks like overfitting and survivorship bias Why: Backtesting (Lesson 49) is valuable but has real, well-documented limitations.\n\nCOACH’S NOTE Congratulations — you've completed all 50 TradeWise lessons, from your very first share certificate story to building your own analysis framework. This isn't the end of learning, just the end of the structured course: keep using the Paper Trading simulator, keep journaling, and keep coming back to this framework every time you're about to make a real decision.",
      "hi": "उस पुराने steel trunk में अपने grandfather का 1987 का share certificate ढूँढे मीरा को महीने हो चुके थे। एक शाम वो बैठी, app खोला, और उसे एहसास हुआ कि वो अब कुछ ऐसा करने वाली है जो वो शुरुआत में नहीं कर सकती थी: किसी भी stock को judge करने के लिए अपना खुद का complete framework, scratch से बनाना।\n\nपाटी ने इस बार कोई नई story offer नहीं की। “तुम्हें एक और story की ज़ रूरत नहीं है, कन्ना,” उसने कहा। “तुम पहले ही अपनी उनचास (49) story इकट्ठा कर चुकी हो। बस उन्हें साथ रखो।”\n\nएक Practical Framework — सब कुछ Combine करना • 1. Business Quality (Lessons 16-22): Balance sheet, P&L, और cash flow पढ़ो। क्या ये genuinely एक अच्छा business है?\n\n• 2. Valuation (Lessons 19-21): P/E, P/B, ROE, D/E, और EPS check करो — क्या मैं एक fair price चुका रहा हूँ?\n\n• 3. Price Context (Lessons 23-27, 36-39): Chart, support/resistance, और momentum अभी असल में क्या दिखा रहे हैं?\n\n• 4. Sector & Macro Context (Lessons 28-29, 46-48): Rates, inflation, sector rotation, और global cues इस specific business को कै से affect करते हैं? • 5. Position Sizing & Risk (Lessons 13, 30-31, 42): मैं कितना risk कर रहा हूँ, और ये मेरे overall portfolio और time horizon में कै से fit होता है?\n\n• 6. Psychology Check (Lessons 43-45): क्या मैं इसे calmly, अपने खुद के written plan पर decide कर रही हूँ — या fear, greed, या एक bias पर react कर रही हूँ?\n\nसारे पचास Lessons का असली Point इस course की कोई भी एक lesson कभी अके ले इस्तेमाल होने के लिए नहीं थी। मीरा का 1987 का certificate, और जिस बहुत पहले lesson को उसने inspire किया, ने सबसे basic idea सिखाया: एक share किसी असली business में असली ownership है। तब से हर चीज़ बस उस ownership को ज़्यादा सावधानी से judge करना सीखना रही है, और investing के बहुत human हिस्सों — patience, discipline, और risk — को manage करना, जो कोई भी ratio या indicator आपके लिए नहीं कर सकता।\n\nमुख्य सीख: एक genuinely अच्छा investor वो नहीं है जिसने इस book का हर ratio और indicator याद कर लिया है — ये वो है जिसके पास इन सबको combine करने वाला एक repeatable framework है, और इसे हर बार actually इस्तेमाल करने की discipline है, खासकर तब जब ये करना सबसे कम convenient हो।\n\nCOURSE COMPLETION QUIZ · अंतिम जाँच (10 सवाल)\n\n1. एक share represent करता है: A) किसी कं पनी को दिया गया एक loan B) किसी कं पनी में real partial ownership C) एक government bond D) एक तरह का stop-loss order सही जवाब: B) किसी कं पनी में real partial ownership क्यों: Lesson 1 का ये foundational idea बाकी पूरे course के नीचे है।\n\n2. P/E ratio इस सवाल का जवाब देने में मदद करता है: A) किसी कं पनी में कितने employees हैं B) आप किसी कं पनी के profit के हर rupee के लिए कितना pay कर रहे हैं C) कं पनी का trading volume D) Exchange का holiday calendar सही जवाब: B) आप किसी कं पनी के profit के हर rupee के लिए कितना pay कर रहे हैं क्यों: P/E (Lesson 19) एक core valuation starting point है।\n\n3. एक Golden Cross refer करता है: A) एक shorter-term moving average का longer-term वाले के ऊपर cross करना B) एक कं पनी की dividend announcement C) एक तरह का options contract D) एक stock exchange holiday सही जवाब: A) एक shorter-term moving average का longer-term वाले के ऊपर cross करना क्यों: ये Lesson 27 का एक widely-watched bullish technical signal है।\n\n4. इस course में cite किए गए SEBI के अपने data के अनुसार, ज़्यादातर individual F&O traders: A) consistently profits कमाए B) overall पैसा गंवाया C) government subsidies मिलीं D) कानूनन diversify करना ज़ रूरी था सही जवाब: B) overall पैसा गंवाया क्यों: ये real finding (Lessons 12 और 40) frequent, undisciplined derivatives trading के risk को underscore करती है।\n\n5. एक Option और एक Futures contract के बीच key difference है: A) कोई फर्क नहीं है B) Options obligation के बिना एक right देते हैं; Futures दोनों parties को obligate करते हैं C) Futures हमेशा Options से safer होते हैं D) Options सिर्फ institutions द्वारा खरीदे जा सकते हैं सही जवाब: B) Options obligation के बिना एक right देते हैं; Futures दोनों parties को obligate करते हैं क्यों: ये distinction (Lessons 40-41) derivative risk समझने के लिए central है।\n\n6. Position sizing को सबसे अच्छे तरीके से इस रूप में describe किया जाता है: A) कौन सा stock खरीदना है ये चुनना B) एक single trade पर कितनी capital risk करनी है ये decide करना C) एक cash flow statement पढ़ ना D) एक तरह का chart pattern सही जवाब: B) एक single trade पर कितनी capital risk करनी है ये decide करना क्यों: LTCM के 1998 के near-collapse (Lesson 42) ने दिखाया कि ये discipline खुद analysis जितनी ही matter करती है।\n\n7. Loss aversion इस प्रवृत्ति को कहते हैं: A) Losses से ज़्यादा gains को intensely महसूस करना B) Equivalent gains से ज़्यादा losses को intensely महसूस करना C) Trading करते समय कभी कोई emotion experience ना करना D) सिर्फ professional fund managers को affect करना सही जवाब: B) Equivalent gains से ज़्यादा losses को intensely महसूस करना क्यों: ये Nobel-Prize-backed bias (Lesson 44) explain करता है कि investors अक्सर losers को इतनी देर तक क्यों hold करते हैं।\n\n8. एक trading journal की real value इससे आती है: A) Isolation में individual entries B) Patterns जो सिर्फ समय के साथ कई entries को साथ में review करने पर visible होते हैं C) इसका cover design D) पास्ट trades पर सारी reflection से बचना सही जवाब: B) Patterns जो सिर्फ समय के साथ कई entries को साथ में review करने पर visible होते हैं क्यों: मीरा की Friday-afternoon discovery (Lesson 45) सिर्फ महीनों की entries को साथ में review करने से ही सामने आई।\n\n9. GIFT Nifty मुख्य रूप से इसके लिए इस्तेमाल होता है: A) India की official interest rate set करने के लिए B) overnight global cues के आधार पर ये signal देने के लिए कि Nifty कै से खुलने की संभावना है C) BSE को replace करने के लिए D) सिर्फ gold और silver trade करने के लिए सही जवाब: B) overnight global cues के आधार पर ये signal देने के लिए कि Nifty कै से खुलने की संभावना है क्यों: ये Indian exchanges खुलने से पहले overnight global market moves को reflect करता है (Lesson 48)।\n\n10. excellent historical results दिखाने वाले एक backtest को इस रूप में treat किया जाना चाहिए: A) Future profits का एक guaranteed predictor B) overfitting और survivorship bias जैसे risks को देखते हुए, आगे scrutiny के लायक एक serious input C) इस बात का proof कि एक strategy कभी पैसा नहीं गंवा सकती D) real trading decisions के लिए irrelevant सही जवाब: B) overfitting और survivorship bias जैसे risks को देखते हुए, आगे scrutiny के लायक एक serious input क्यों: Backtesting (Lesson 49) valuable है, लेकिन इसकी real, well-documented limitations हैं।\n\nकोच का नोट बधाई हो — आपने सारे 50 TradeWise lessons complete कर लिए हैं, अपने बिल्कुल पहले share certificate की story से लेकर अपना खुद का analysis framework बनाने तक। ये learning का अंत नहीं है, बस structured course का अंत है: Paper Trading simulator इस्तेमाल करते रहें, journal लिखते रहें, और जब भी आप एक real decision लेने वाले हों तो हर बार इस framework पर वापस आते रहें।",
      "ta": "பழைய steel trunk-ல தன் தாத்தாவின் 1987 share certificate-ஐ மீரா முதன்முறையா கண்டுபிடிச்சு மாசக்கணக்கா ஆயிடுச்சு. ஒரு மாலை உட்கார்ந்து, app-ஐ open பண்ணி, ஆரம்பத்தில் பண்ண முடியாத ஒண்ணை பண்ண போறாளுனு realize பண்ணினாள்: ஏதேனும் ஒரு stock-ஐ judge பண்ண, தன் சொந்த முழுமையான framework-ஐ scratch-லிருந்து கட்டுறது.\n\nபாட்டி இந்த தடவை ஒரு புது கதை offer பண்ணல. “உனக்கு இன்னும் ஒரு கதை தேவையில்ல கண்ணா,” என்றார். “நீ ஏற்கனவே உன் சொந்த நாற்பத்தொன்பது கதைகளை சேகரிச்சிருக்கே. அவற்றை ஒண்ணா சேர்த்து வை.”\n\nஒரு Practical Framework — எல்லாத்தையும் Combine பண்றது • 1. Business Quality (Lessons 16-22): Balance sheet, P&L, cash flow-ஐ படியுங்க. இது genuinely ஒரு நல்ல business-ஆ?\n\n• 2. Valuation (Lessons 19-21): P/E, P/B, ROE, D/E, EPS-ஐ check பண்ணுங்க — நான் ஒரு fair விலைக்கு pay பண்றேனா? • 3. Price Context (Lessons 23-27, 36-39): Chart, support/resistance, momentum இப்போ actual-ஆ என்ன காட்டுது?\n\n• 4. Sector & Macro Context (Lessons 28-29, 46-48): Rates, inflation, sector rotation, global cues இந்த specific business-ஐ எப்படி affect பண்ணும்?\n\n• 5. Position Sizing & Risk (Lessons 13, 30-31, 42): நான் எவ்வளவு risk பண்றேன், இது என் overall portfolio-க்கும் time horizon-க்கும் எப்படி fit ஆகும்?\n\n• 6. Psychology Check (Lessons 43-45): நான் இதை calm-ஆ, என் சொந்த written plan-ன் மேல decide பண்றேனா — இல்ல fear, greed, அல்லது ஒரு bias-க்கு react பண்றேனா?\n\nஎல்லா ஐம்பது Lessons-ன் Real Point இந்த course-ல எந்த ஒரு single lesson-உம் தனியா பயன்படுத்தப்பட ஒருபோதும் meant இல்ல. மீராவின் 1987 certificate-உம், அது inspire பண்ண மிக முதல் lesson-உம், மிக basic idea-ஐ கத்துக்கொடுத்துச்சு: ஒரு share என்பது ஒரு real business-ல real ownership. அதற்குப் பிறகு எல்லாமே, அந்த ownership-ஐ இன்னும் carefully judge பண்ண கத்துக்குறதும், investing-ன் very human parts-ஐ — patience, discipline, risk — எந்த ratio-வோ indicator-வோ உங்களுக்காக பண்ண முடியாத அவற்றை manage பண்றதும் தான்.\n\nமுக்கிய பாடம்: ஒரு genuinely நல்ல investor, இந்த புத்தகத்தில் இருக்கிற ஒவ்வொரு ratio-ஐயும் indicator-ஐயும் memorise பண்ணின ஒருவர் இல்ல — அவை எல்லாத்தையும் combine பண்ற ஒரு repeatable framework-உம், அதை convenient-ஆ இல்லாத நேரத்திலும் ஒவ்வொரு தடவையும் actual-ஆ பயன்படுத்த discipline-உம் இருக்கிற ஒருவர் தான்.\n\nCOURSE COMPLETION QUIZ · FINAL CHECK (10 கேள்விகள்)\n\n1. ஒரு share represent பண்ணுது: A) ஒரு நிறுவனத்திற்கு ஒரு loan B) ஒரு நிறுவனத்தில் Real partial ownership C) ஒரு government bond D) ஒரு வகை stop-loss order சரியான பதில்:B) ஒரு நிறுவனத்தில் Real partial ownership ஏன்:Lesson 1-லிருந்து இந்த foundational idea தான் course-ல மீதி எல்லாத்தையும் underlie பண்ணுது.\n\n2. P/E ratio எதை answer பண்ண உதவும்: A) ஒரு நிறுவனத்திற்கு எத்தனை employees இருக்காங்க B) நிறுவனத்தின் profit-ன் ஒவ்வொரு ரூபாய்க்கும் நீங்க எவ்வளவு pay பண்றீங்க C) நிறுவனத்தின் trading volume D) Exchange-ன் holiday calendar சரியான பதில்:B) நிறுவனத்தின் profit-ன் ஒவ்வொரு ரூபாய்க்கும் நீங்க எவ்வளவு pay பண்றீங்க ஏன்:P/E (Lesson 19) ஒரு core valuation starting point.\n\n3. ஒரு Golden Cross எதைக் குறிக்கும்: A) Longer-term MA-க்கு மேல cross ஆகுற ஒரு shorter-term moving average B) நிறுவனத்தின் dividend announcement C) ஒரு வகை options contract D) ஒரு stock exchange holiday சரியான பதில்:A) Longer-term MA-க்கு மேல cross ஆகுற ஒரு shorter-term moving average ஏன்:Lesson 27-லிருந்து இது ஒரு widely-watched bullish technical signal.\n\n4. இந்த course-ல cite பண்ணப்பட்ட SEBI-ன் சொந்த data படி, பெரும்பாலான individual F&O traders: A) Consistent profits பண்ணினாங்க B) Overall-ஆ பணத்தை இழந்தாங்க C) Government subsidies கிடைச்சுச்சு D) சட்டப்படி diversify பண்ண required ஆனாங்க சரியான பதில்:B) Overall-ஆ பணத்தை இழந்தாங்க ஏன்:Frequent, undisciplined derivatives trading-ன் risk-ஐ இந்த real finding (Lessons 12, 40) underscore பண்ணுது.\n\n5. ஒரு Option-க்கும் ஒரு Futures contract-க்கும் இடையேயான key difference: A) எந்த வித்தியாசமும் இல்ல B) Options obligation இல்லாம ஒரு right தரும்; Futures இரண்டு parties-ஐயும் obligate பண்ணும் C) Futures எப்போதும் Options-ஐ விட safer D) Institutions மட்டும் தான் Options வாங்க முடியும் சரியான பதில்:B) Options obligation இல்லாம ஒரு right தரும்; Futures இரண்டு parties-ஐயும் obligate பண்ணும் ஏன்:Derivative risk-ஐ புரிஞ்சுக்குறதுக்கு இந்த distinction (Lessons 40-41) central.\n\n6. Position sizing best describe ஆகுவது: A) எந்த stock வாங்கணும்னு தேர்ந்தெடுக்குறது B) ஒரே ஒரு trade-ல எவ்வளவு capital-ஐ risk பண்ணணும்னு decide பண்றது C) ஒரு cash flow statement-ஐ படிக்குறது D) ஒரு வகை chart pattern சரியான பதில்:B) ஒரே ஒரு trade-ல எவ்வளவு capital-ஐ risk பண்ணணும்னு decide பண்றது ஏன்:இந்த discipline analysis அளவுக்கே ஏன் matter பண்ணும்னு LTCM-ன் 1998 near-collapse (Lesson 42) காட்டுச்சு.\n\n7. Loss aversion என்பது இந்த tendency: A) Losses-ஐ விட Gains-ஐ intensely-ஆ feel பண்றது B) அதே அளவு gains-ஐ விட Losses-ஐ intensely-ஆ feel பண்றது C) Trading பண்ணும்போது எந்த emotion-ஐயும் ஒருபோதும் experience பண்ணாதது D) Professional fund managers-ஐ மட்டும் தான் affect பண்றது சரியான பதில்:B) அதே அளவு gains-ஐ விட Losses-ஐ intensely-ஆ feel பண்றது ஏன்:Investors பெரும்பாலும் losers-ஐ ஏன் ரொம்ப நேரம் hold பண்றாங்கனு இந்த Nobel-Prize-backed bias (Lesson 44) explain பண்ணும்.\n\n8. ஒரு trading journal-ன் real value வருது: A) Individual entries isolation-ல B) நேரம் ஆக நிறைய entries-ஐ சேர்த்து review பண்ணும்போது மட்டும் visible ஆகுற patterns-லிருந்து C) அதன் cover design-லிருந்து D) Past trades-ஐ பத்தின எந்த reflection-ஐயும் avoid பண்றதிலிருந்து சரியான பதில்:B) நேரம் ஆக நிறைய entries-ஐ சேர்த்து review பண்ணும்போது மட்டும் visible ஆகுற patterns-லிருந்து ஏன்:மாசக்கணக்கான entries-ஐ சேர்த்து review பண்ணும்போது மட்டும் மீராவின் Friday-afternoon discovery (Lesson 45) emerge ஆச்சு.\n\n9. GIFT Nifty primarily பயன்படுத்தப்படுவது: A) இந்தியாவின் official interest rate-ஐ set பண்ண B) Overnight global cues-ஐ அடிப்படையா வச்சு, Nifty likely எப்படி open ஆகும்னு signal பண்ண C) BSE-ஐ replace பண்ண D) Gold-ஐயும் silver-ஐயும் மட்டும் trade பண்ண சரியான பதில்:B) Overnight global cues-ஐ அடிப்படையா வச்சு, Nifty likely எப்படி open ஆகும்னு signal பண்ண ஏன்:Indian exchanges open ஆவதற்கு முன், அது overnight global market moves-ஐ (Lesson 48) reflect பண்ணும்.\n\n10. Excellent historical results காட்டுற ஒரு backtest treat பண்ணப்பட வேண்டியது: A) Future profits-ன் ஒரு guaranteed predictor-ஆ B) Overfitting, survivorship bias மாதிரி risks-ஐ கொடுத்து, மேலும் scrutiny worth-ஆன ஒரு serious input- ஆ C) ஒரு strategy ஒருபோதும் பணத்தை இழக்காதுனு proof-ஆ D) Real trading decisions-க்கு irrelevant-ஆ சரியான பதில்:B) Overfitting, survivorship bias மாதிரி risks-ஐ கொடுத்து, மேலும் scrutiny worth- ஆன ஒரு serious input-ஆ ஏன்:Backtesting (Lesson 49) valuable, ஆனா real, well-documented limitations இருக்கு.\n\nபயிற்சியாளர் குறிப்பு வாழ்த்துகள் — உங்க முதல் share certificate கதையிலிருந்து, உங்க சொந்த analysis framework கட்டுறது வரைக்கும், எல்லா 50 TradeWise lessons-ஐயும் நீங்க முடிச்சிட்டீங்க. இது learning-ன் end இல்ல, structured course-ன் end மட்டும் தான்: Paper Trading simulator-ஐ தொடர்ந்து பயன்படுத்துங்க, journal எழுதுவதைத் தொடருங்க, நீங்க ஒரு real decision எடுக்க போற ஒவ்வொரு தடவையும் இந்த framework-க்கு திரும்பி வாங்க."
    },
    "body": {
      "en": "It had been months since Meera first found her grandfather's 1987 share certificate in that old steel trunk. She sat down one evening, opened the app, and realised she was about to do something she couldn't have done at the start: build her own complete framework for judging any stock, from scratch.\n\nPaati didn't offer a new story this time. “You don't need one more story, kanna,” she said. “You've collected forty-nine of your own already. Just put them together.”\n\nA Practical Framework — Combining Everything • 1. Business Quality (Lessons 16-22): Read the balance sheet, P&L, and cash flow. Is it a genuinely good business? • 2. Valuation (Lessons 19-21): Check P/E, P/B, ROE, D/E, and EPS — am I paying a fair price? • 3. Price Context (Lessons 23-27, 36-39): What is the chart, support/resistance, and momentum actually showing right now? • 4. Sector & Macro Context (Lessons 28-29, 46-48): How do rates, inflation, sector rotation, and global cues affect this specific business? • 5. Position Sizing & Risk (Lessons 13, 30-31, 42): How much am I risking, and how does this fit my overall portfolio and time horizon? • 6. Psychology Check (Lessons 43-45): Am I deciding this calmly, on my own written plan — or reacting to fear, greed, or a bias?\n\nThe Real Point of All Fifty Lessons No single lesson in this course was ever meant to be used alone. Meera's 1987 certificate, and the very first lesson it inspired, taught the most basic idea: a share is real ownership in a real business. Everything since has simply been learning to judge that ownership more carefully, and to manage the very human parts of investing — patience, discipline, and risk — that no ratio or indicator can do for you.",
      "hi": "उस पुराने steel trunk में अपने grandfather का 1987 का share certificate ढूँढे मीरा को महीने हो चुके थे। एक शाम वो बैठी, app खोला, और उसे एहसास हुआ कि वो अब कुछ ऐसा करने वाली है जो वो शुरुआत में नहीं कर सकती थी: किसी भी stock को judge करने के लिए अपना खुद का complete framework, scratch से बनाना।\n\nपाटी ने इस बार कोई नई story offer नहीं की। “तुम्हें एक और story की ज़ रूरत नहीं है, कन्ना,” उसने कहा। “तुम पहले ही अपनी उनचास (49) story इकट्ठा कर चुकी हो। बस उन्हें साथ रखो।”\n\nएक Practical Framework — सब कुछ Combine करना • 1. Business Quality (Lessons 16-22): Balance sheet, P&L, और cash flow पढ़ो। क्या ये genuinely एक अच्छा business है?\n\n• 2. Valuation (Lessons 19-21): P/E, P/B, ROE, D/E, और EPS check करो — क्या मैं एक fair price चुका रहा हूँ?\n\n• 3. Price Context (Lessons 23-27, 36-39): Chart, support/resistance, और momentum अभी असल में क्या दिखा रहे हैं?\n\n• 4. Sector & Macro Context (Lessons 28-29, 46-48): Rates, inflation, sector rotation, और global cues इस specific business को कै से affect करते हैं? • 5. Position Sizing & Risk (Lessons 13, 30-31, 42): मैं कितना risk कर रहा हूँ, और ये मेरे overall portfolio और time horizon में कै से fit होता है?\n\n• 6. Psychology Check (Lessons 43-45): क्या मैं इसे calmly, अपने खुद के written plan पर decide कर रही हूँ — या fear, greed, या एक bias पर react कर रही हूँ?\n\nसारे पचास Lessons का असली Point इस course की कोई भी एक lesson कभी अके ले इस्तेमाल होने के लिए नहीं थी। मीरा का 1987 का certificate, और जिस बहुत पहले lesson को उसने inspire किया, ने सबसे basic idea सिखाया: एक share किसी असली business में असली ownership है। तब से हर चीज़ बस उस ownership को ज़्यादा सावधानी से judge करना सीखना रही है, और investing के बहुत human हिस्सों — patience, discipline, और risk — को manage करना, जो कोई भी ratio या indicator आपके लिए नहीं कर सकता।",
      "ta": "பழைய steel trunk-ல தன் தாத்தாவின் 1987 share certificate-ஐ மீரா முதன்முறையா கண்டுபிடிச்சு மாசக்கணக்கா ஆயிடுச்சு. ஒரு மாலை உட்கார்ந்து, app-ஐ open பண்ணி, ஆரம்பத்தில் பண்ண முடியாத ஒண்ணை பண்ண போறாளுனு realize பண்ணினாள்: ஏதேனும் ஒரு stock-ஐ judge பண்ண, தன் சொந்த முழுமையான framework-ஐ scratch-லிருந்து கட்டுறது.\n\nபாட்டி இந்த தடவை ஒரு புது கதை offer பண்ணல. “உனக்கு இன்னும் ஒரு கதை தேவையில்ல கண்ணா,” என்றார். “நீ ஏற்கனவே உன் சொந்த நாற்பத்தொன்பது கதைகளை சேகரிச்சிருக்கே. அவற்றை ஒண்ணா சேர்த்து வை.”\n\nஒரு Practical Framework — எல்லாத்தையும் Combine பண்றது • 1. Business Quality (Lessons 16-22): Balance sheet, P&L, cash flow-ஐ படியுங்க. இது genuinely ஒரு நல்ல business-ஆ?\n\n• 2. Valuation (Lessons 19-21): P/E, P/B, ROE, D/E, EPS-ஐ check பண்ணுங்க — நான் ஒரு fair விலைக்கு pay பண்றேனா? • 3. Price Context (Lessons 23-27, 36-39): Chart, support/resistance, momentum இப்போ actual-ஆ என்ன காட்டுது?\n\n• 4. Sector & Macro Context (Lessons 28-29, 46-48): Rates, inflation, sector rotation, global cues இந்த specific business-ஐ எப்படி affect பண்ணும்?\n\n• 5. Position Sizing & Risk (Lessons 13, 30-31, 42): நான் எவ்வளவு risk பண்றேன், இது என் overall portfolio-க்கும் time horizon-க்கும் எப்படி fit ஆகும்?\n\n• 6. Psychology Check (Lessons 43-45): நான் இதை calm-ஆ, என் சொந்த written plan-ன் மேல decide பண்றேனா — இல்ல fear, greed, அல்லது ஒரு bias-க்கு react பண்றேனா?\n\nஎல்லா ஐம்பது Lessons-ன் Real Point இந்த course-ல எந்த ஒரு single lesson-உம் தனியா பயன்படுத்தப்பட ஒருபோதும் meant இல்ல. மீராவின் 1987 certificate-உம், அது inspire பண்ண மிக முதல் lesson-உம், மிக basic idea-ஐ கத்துக்கொடுத்துச்சு: ஒரு share என்பது ஒரு real business-ல real ownership. அதற்குப் பிறகு எல்லாமே, அந்த ownership-ஐ இன்னும் carefully judge பண்ண கத்துக்குறதும், investing-ன் very human parts-ஐ — patience, discipline, risk — எந்த ratio-வோ indicator-வோ உங்களுக்காக பண்ண முடியாத அவற்றை manage பண்றதும் தான்."
    },
    "keyTakeaway": {
      "en": "A genuinely good investor isn't someone who has memorised every ratio and indicator in this book — it's someone who has a repeatable framework combining all of them, and the discipline to actually use it every time, especially when it's least convenient to.",
      "hi": "एक genuinely अच्छा investor वो नहीं है जिसने इस book का हर ratio और indicator याद कर लिया है — ये वो है जिसके पास इन सबको combine करने वाला एक repeatable framework है, और इसे हर बार actually इस्तेमाल करने की discipline है, खासकर तब जब ये करना सबसे कम convenient हो।",
      "ta": "ஒரு genuinely நல்ல investor, இந்த புத்தகத்தில் இருக்கிற ஒவ்வொரு ratio-ஐயும் indicator-ஐயும் memorise பண்ணின ஒருவர் இல்ல — அவை எல்லாத்தையும் combine பண்ற ஒரு repeatable framework-உம், அதை convenient-ஆ இல்லாத நேரத்திலும் ஒவ்வொரு தடவையும் actual-ஆ பயன்படுத்த discipline-உம் இருக்கிற ஒருவர் தான்."
    },
    "coachNote": {
      "en": "Congratulations — you've completed all 50 TradeWise lessons, from your very first share certificate story to building your own analysis framework. This isn't the end of learning, just the end of the structured course: keep using the Paper Trading simulator, keep journaling, and keep coming back to this framework every time you're about to make a real decision.",
      "hi": "बधाई हो — आपने सारे 50 TradeWise lessons complete कर लिए हैं, अपने बिल्कुल पहले share certificate की story से लेकर अपना खुद का analysis framework बनाने तक। ये learning का अंत नहीं है, बस structured course का अंत है: Paper Trading simulator इस्तेमाल करते रहें, journal लिखते रहें, और जब भी आप एक real decision लेने वाले हों तो हर बार इस framework पर वापस आते रहें।",
      "ta": "வாழ்த்துகள் — உங்க முதல் share certificate கதையிலிருந்து, உங்க சொந்த analysis framework கட்டுறது வரைக்கும், எல்லா 50 TradeWise lessons-ஐயும் நீங்க முடிச்சிட்டீங்க. இது learning-ன் end இல்ல, structured course-ன் end மட்டும் தான்: Paper Trading simulator-ஐ தொடர்ந்து பயன்படுத்துங்க, journal எழுதுவதைத் தொடருங்க, நீங்க ஒரு real decision எடுக்க போற ஒவ்வொரு தடவையும் இந்த framework-க்கு திரும்பி வாங்க."
    },
    "quiz": [
      {
        "question": {
          "en": "A share represents:",
          "hi": "एक share represent करता है:",
          "ta": "ஒரு share represent பண்ணுது:"
        },
        "options": {
          "en": [
            "A loan to a company",
            "Real partial ownership in a company",
            "A government bond",
            "A type of stop-loss order"
          ],
          "hi": [
            "किसी कं पनी को दिया गया एक loan",
            "किसी कं पनी में real partial ownership",
            "एक government bond",
            "एक तरह का stop-loss order"
          ],
          "ta": [
            "ஒரு நிறுவனத்திற்கு ஒரு loan",
            "ஒரு நிறுவனத்தில் Real partial ownership",
            "ஒரு government bond",
            "ஒரு வகை stop-loss order"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This foundational idea from Lesson 1 underlies everything else in the course.",
          "hi": "Lesson 1 का ये foundational idea बाकी पूरे course के नीचे है।",
          "ta": "Lesson 1-லிருந்து இந்த foundational idea தான் course-ல மீதி எல்லாத்தையும் underlie பண்ணுது."
        }
      },
      {
        "question": {
          "en": "The P/E ratio helps answer:",
          "hi": "P/E ratio इस सवाल का जवाब देने में मदद करता है:",
          "ta": "P/E ratio எதை answer பண்ண உதவும்:"
        },
        "options": {
          "en": [
            "How many employees a company has",
            "How much you're paying for each rupee of a company's profit",
            "The company's trading volume",
            "The exchange's holiday calendar"
          ],
          "hi": [
            "किसी कं पनी में कितने employees हैं",
            "आप किसी कं पनी के profit के हर rupee के लिए कितना pay कर रहे हैं",
            "कं पनी का trading volume",
            "Exchange का holiday calendar"
          ],
          "ta": [
            "ஒரு நிறுவனத்திற்கு எத்தனை employees இருக்காங்க",
            "நிறுவனத்தின் profit-ன் ஒவ்வொரு ரூபாய்க்கும் நீங்க எவ்வளவு pay பண்றீங்க",
            "நிறுவனத்தின் trading volume",
            "Exchange-ன் holiday calendar"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "P/E (Lesson 19) is a core valuation starting point.",
          "hi": "P/E (Lesson 19) एक core valuation starting point है।",
          "ta": "P/E (Lesson 19) ஒரு core valuation starting point."
        }
      },
      {
        "question": {
          "en": "A Golden Cross refers to:",
          "hi": "एक Golden Cross refer करता है:",
          "ta": "ஒரு Golden Cross எதைக் குறிக்கும்:"
        },
        "options": {
          "en": [
            "A shorter-term moving average crossing above a longer-term one",
            "A company's dividend announcement",
            "A type of options contract",
            "A stock exchange holiday"
          ],
          "hi": [
            "एक shorter-term moving average का longer-term वाले के ऊपर cross करना",
            "एक कं पनी की dividend announcement",
            "एक तरह का options contract",
            "एक stock exchange holiday"
          ],
          "ta": [
            "Longer-term MA-க்கு மேல cross ஆகுற ஒரு shorter-term moving average",
            "நிறுவனத்தின் dividend announcement",
            "ஒரு வகை options contract",
            "ஒரு stock exchange holiday"
          ]
        },
        "correctIndex": 0,
        "explanation": {
          "en": "This is a widely-watched bullish technical signal from Lesson 27.",
          "hi": "ये Lesson 27 का एक widely-watched bullish technical signal है।",
          "ta": "Lesson 27-லிருந்து இது ஒரு widely-watched bullish technical signal."
        }
      },
      {
        "question": {
          "en": "According to SEBI's own data cited in this course, most individual F&O traders:",
          "hi": "इस course में cite किए गए SEBI के अपने data के अनुसार, ज़्यादातर individual F&O traders:",
          "ta": "இந்த course-ல cite பண்ணப்பட்ட SEBI-ன் சொந்த data படி, பெரும்பாலான individual F&O traders:"
        },
        "options": {
          "en": [
            "Made consistent profits",
            "Lost money overall",
            "Received government subsidies",
            "Were required to diversify by law"
          ],
          "hi": [
            "consistently profits कमाए",
            "overall पैसा गंवाया",
            "government subsidies मिलीं",
            "कानूनन diversify करना ज़ रूरी था"
          ],
          "ta": [
            "Consistent profits பண்ணினாங்க",
            "Overall-ஆ பணத்தை இழந்தாங்க",
            "Government subsidies கிடைச்சுச்சு",
            "சட்டப்படி diversify பண்ண required ஆனாங்க"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This real finding (Lessons 12 and 40) underscores the risk of frequent, undisciplined derivatives trading.",
          "hi": "ये real finding (Lessons 12 और 40) frequent, undisciplined derivatives trading के risk को underscore करती है।",
          "ta": "Frequent, undisciplined derivatives trading-ன் risk-ஐ இந்த real finding (Lessons 12, 40) underscore பண்ணுது."
        }
      },
      {
        "question": {
          "en": "The key difference between an Option and a Futures contract is:",
          "hi": "एक Option और एक Futures contract के बीच key difference है:",
          "ta": "ஒரு Option-க்கும் ஒரு Futures contract-க்கும் இடையேயான key difference:"
        },
        "options": {
          "en": [
            "There is no difference",
            "Options give a right without obligation; Futures obligate both parties",
            "Futures are always safer than Options",
            "Options can only be bought by institutions"
          ],
          "hi": [
            "कोई फर्क नहीं है",
            "Options obligation के बिना एक right देते हैं; Futures दोनों parties को obligate करते हैं",
            "Futures हमेशा Options से safer होते हैं",
            "Options सिर्फ institutions द्वारा खरीदे जा सकते हैं"
          ],
          "ta": [
            "எந்த வித்தியாசமும் இல்ல",
            "Options obligation இல்லாம ஒரு right தரும்; Futures இரண்டு parties-ஐயும் obligate பண்ணும்",
            "Futures எப்போதும் Options-ஐ விட safer",
            "Institutions மட்டும் தான் Options வாங்க முடியும்"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This distinction (Lessons 40-41) is central to understanding derivative risk.",
          "hi": "ये distinction (Lessons 40-41) derivative risk समझने के लिए central है।",
          "ta": "Derivative risk-ஐ புரிஞ்சுக்குறதுக்கு இந்த distinction (Lessons 40-41) central."
        }
      },
      {
        "question": {
          "en": "Position sizing is best described as:",
          "hi": "Position sizing को सबसे अच्छे तरीके से इस रूप में describe किया जाता है:",
          "ta": "Position sizing best describe ஆகுவது:"
        },
        "options": {
          "en": [
            "Choosing which stock to buy",
            "Deciding how much capital to risk on a single trade",
            "Reading a cash flow statement",
            "A type of chart pattern"
          ],
          "hi": [
            "कौन सा stock खरीदना है ये चुनना",
            "एक single trade पर कितनी capital risk करनी है ये decide करना",
            "एक cash flow statement पढ़ ना",
            "एक तरह का chart pattern"
          ],
          "ta": [
            "எந்த stock வாங்கணும்னு தேர்ந்தெடுக்குறது",
            "ஒரே ஒரு trade-ல எவ்வளவு capital-ஐ risk பண்ணணும்னு decide பண்றது",
            "ஒரு cash flow statement-ஐ படிக்குறது",
            "ஒரு வகை chart pattern"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "LTCM's 1998 near-collapse (Lesson 42) showed why this discipline matters as much as analysis itself.",
          "hi": "LTCM के 1998 के near-collapse (Lesson 42) ने दिखाया कि ये discipline खुद analysis जितनी ही matter करती है।",
          "ta": "இந்த discipline analysis அளவுக்கே ஏன் matter பண்ணும்னு LTCM-ன் 1998 near-collapse (Lesson 42) காட்டுச்சு."
        }
      },
      {
        "question": {
          "en": "Loss aversion is the tendency to:",
          "hi": "Loss aversion इस प्रवृत्ति को कहते हैं:",
          "ta": "Loss aversion என்பது இந்த tendency:"
        },
        "options": {
          "en": [
            "Feel gains more intensely than losses",
            "Feel losses more intensely than equivalent gains",
            "Never experience any emotion while trading",
            "Only affect professional fund managers"
          ],
          "hi": [
            "Losses से ज़्यादा gains को intensely महसूस करना",
            "Equivalent gains से ज़्यादा losses को intensely महसूस करना",
            "Trading करते समय कभी कोई emotion experience ना करना",
            "सिर्फ professional fund managers को affect करना"
          ],
          "ta": [
            "Losses-ஐ விட Gains-ஐ intensely-ஆ feel பண்றது",
            "அதே அளவு gains-ஐ விட Losses-ஐ intensely-ஆ feel பண்றது",
            "Trading பண்ணும்போது எந்த emotion-ஐயும் ஒருபோதும் experience பண்ணாதது",
            "Professional fund managers-ஐ மட்டும் தான் affect பண்றது"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "This Nobel-Prize-backed bias (Lesson 44) explains why investors often hold losers too long.",
          "hi": "ये Nobel-Prize-backed bias (Lesson 44) explain करता है कि investors अक्सर losers को इतनी देर तक क्यों hold करते हैं।",
          "ta": "Investors பெரும்பாலும் losers-ஐ ஏன் ரொம்ப நேரம் hold பண்றாங்கனு இந்த Nobel-Prize-backed bias (Lesson 44) explain பண்ணும்."
        }
      },
      {
        "question": {
          "en": "A trading journal's real value comes from:",
          "hi": "एक trading journal की real value इससे आती है:",
          "ta": "ஒரு trading journal-ன் real value வருது:"
        },
        "options": {
          "en": [
            "Individual entries in isolation",
            "Patterns visible only when reviewing many entries together over time",
            "Its cover design",
            "Avoiding all reflection on past trades"
          ],
          "hi": [
            "Isolation में individual entries",
            "Patterns जो सिर्फ समय के साथ कई entries को साथ में review करने पर visible होते हैं",
            "इसका cover design",
            "पास्ट trades पर सारी reflection से बचना"
          ],
          "ta": [
            "Individual entries isolation-ல",
            "நேரம் ஆக நிறைய entries-ஐ சேர்த்து review பண்ணும்போது மட்டும் visible ஆகுற patterns-லிருந்து",
            "அதன் cover design-லிருந்து",
            "Past trades-ஐ பத்தின எந்த reflection-ஐயும் avoid பண்றதிலிருந்து"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Meera's Friday-afternoon discovery (Lesson 45) only emerged from reviewing months of entries together.",
          "hi": "मीरा की Friday-afternoon discovery (Lesson 45) सिर्फ महीनों की entries को साथ में review करने से ही सामने आई।",
          "ta": "மாசக்கணக்கான entries-ஐ சேர்த்து review பண்ணும்போது மட்டும் மீராவின் Friday-afternoon discovery (Lesson 45) emerge ஆச்சு."
        }
      },
      {
        "question": {
          "en": "GIFT Nifty is primarily used to:",
          "hi": "GIFT Nifty मुख्य रूप से इसके लिए इस्तेमाल होता है:",
          "ta": "GIFT Nifty primarily பயன்படுத்தப்படுவது:"
        },
        "options": {
          "en": [
            "Set India's official interest rate",
            "Signal how the Nifty is likely to open, based on overnight global cues",
            "Replace the BSE",
            "Trade only gold and silver"
          ],
          "hi": [
            "India की official interest rate set करने के लिए",
            "overnight global cues के आधार पर ये signal देने के लिए कि Nifty कै से खुलने की संभावना है",
            "BSE को replace करने के लिए",
            "सिर्फ gold और silver trade करने के लिए"
          ],
          "ta": [
            "இந்தியாவின் official interest rate-ஐ set பண்ண",
            "Overnight global cues-ஐ அடிப்படையா வச்சு, Nifty likely எப்படி open ஆகும்னு signal பண்ண",
            "BSE-ஐ replace பண்ண",
            "Gold-ஐயும் silver-ஐயும் மட்டும் trade பண்ண"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "It reflects overnight global market moves before Indian exchanges open (Lesson 48).",
          "hi": "ये Indian exchanges खुलने से पहले overnight global market moves को reflect करता है (Lesson 48)।",
          "ta": "Indian exchanges open ஆவதற்கு முன், அது overnight global market moves-ஐ (Lesson 48) reflect பண்ணும்."
        }
      },
      {
        "question": {
          "en": "A backtest showing excellent historical results should be treated as:",
          "hi": "excellent historical results दिखाने वाले एक backtest को इस रूप में treat किया जाना चाहिए:",
          "ta": "Excellent historical results காட்டுற ஒரு backtest treat பண்ணப்பட வேண்டியது:"
        },
        "options": {
          "en": [
            "A guaranteed predictor of future profits",
            "One serious input worth further scrutiny, given risks like overfitting and survivorship bias",
            "Proof a strategy can never lose money",
            "Irrelevant to real trading decisions"
          ],
          "hi": [
            "Future profits का एक guaranteed predictor",
            "overfitting और survivorship bias जैसे risks को देखते हुए, आगे scrutiny के लायक एक serious input",
            "इस बात का proof कि एक strategy कभी पैसा नहीं गंवा सकती",
            "real trading decisions के लिए irrelevant"
          ],
          "ta": [
            "Future profits-ன் ஒரு guaranteed predictor-ஆ",
            "Overfitting, survivorship bias மாதிரி risks-ஐ கொடுத்து, மேலும் scrutiny worth-ஆன ஒரு serious input- ஆ",
            "ஒரு strategy ஒருபோதும் பணத்தை இழக்காதுனு proof-ஆ",
            "Real trading decisions-க்கு irrelevant-ஆ"
          ]
        },
        "correctIndex": 1,
        "explanation": {
          "en": "Backtesting (Lesson 49) is valuable but has real, well-documented limitations.",
          "hi": "Backtesting (Lesson 49) valuable है, लेकिन इसकी real, well-documented limitations हैं।",
          "ta": "Backtesting (Lesson 49) valuable, ஆனா real, well-documented limitations இருக்கு."
        }
      }
    ]
  }
];

export const tiers: Tier[] = ['Beginner', 'Intermediate', 'Advanced'];
