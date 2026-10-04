// Catalogue, copy and demo data for Panjabi Shop (imported from the "Panjabi Shop" design).

export type Lang = 'en' | 'bn';
export type Zone = 'in' | 'out';
export type PayMethod = 'cod' | 'bkash' | 'nagad';
export type Category = 'all' | 'everyday' | 'eid' | 'printed' | 'kids';
export type Fabric = 'cotton' | 'linen' | 'jacquard' | 'khadi' | 'viscose' | 'silk';
/** [English, Bangla] */
export type Pair = [string, string];

export interface Product {
  id: number;
  en: string;
  bn: string;
  price: number;
  color: string;
  cat: Exclude<Category, 'all'>;
  fab: Fabric;
  col: Pair;
}

export interface DemoOrder {
  id: string;
  date: Pair;
  total: number;
  /** 1 placed · 2 confirmed · 3 with courier · 4 delivered */
  status: 1 | 2 | 3 | 4;
  phone: string;
}

export const PRODUCTS: Product[] = [
  {id:1,en:'Ivory Cotton Panjabi',bn:'আইভরি কটন পাঞ্জাবি',price:1290,color:'#EDE4D3',cat:'everyday',fab:'cotton',col:['Ivory','আইভরি']},
  {id:2,en:'Maroon Embroidered Panjabi',bn:'মেরুন এমব্রয়ডারি পাঞ্জাবি',price:2290,color:'#6E1423',cat:'eid',fab:'viscose',col:['Maroon','মেরুন']},
  {id:3,en:'Sky Blue Linen Panjabi',bn:'স্কাই ব্লু লিনেন পাঞ্জাবি',price:1590,color:'#A9C3D6',cat:'everyday',fab:'linen',col:['Sky blue','আকাশি']},
  {id:4,en:'Bottle Green Jacquard Panjabi',bn:'বোতল সবুজ জ্যাকার্ড পাঞ্জাবি',price:2450,color:'#1F4A3A',cat:'eid',fab:'jacquard',col:['Bottle green','বোতল সবুজ']},
  {id:5,en:'Charcoal Slim Fit Panjabi',bn:'চারকোল স্লিম ফিট পাঞ্জাবি',price:1490,color:'#3B3B3B',cat:'everyday',fab:'cotton',col:['Charcoal','চারকোল']},
  {id:6,en:'Mustard Block Print Panjabi',bn:'মাস্টার্ড ব্লক প্রিন্ট পাঞ্জাবি',price:1190,color:'#C9962E',cat:'printed',fab:'cotton',col:['Mustard','সরিষা হলুদ']},
  {id:7,en:'Indigo Batik Panjabi',bn:'ইন্ডিগো বাটিক পাঞ্জাবি',price:1350,color:'#2E3A6B',cat:'printed',fab:'cotton',col:['Indigo','নীল']},
  {id:8,en:'Off-white Chikan Work Panjabi',bn:'অফ-হোয়াইট চিকন কাজ পাঞ্জাবি',price:1990,color:'#F1EBDD',cat:'eid',fab:'cotton',col:['Off-white','অফ-হোয়াইট']},
  {id:9,en:'Olive Khadi Panjabi',bn:'অলিভ খাদি পাঞ্জাবি',price:1690,color:'#6B6B3A',cat:'everyday',fab:'khadi',col:['Olive','জলপাই']},
  {id:10,en:'Rust Printed Panjabi',bn:'রাস্ট প্রিন্টেড পাঞ্জাবি',price:1250,color:'#A2502E',cat:'printed',fab:'viscose',col:['Rust','মরিচা']},
  {id:11,en:'Kids Cream Panjabi',bn:'শিশুদের ক্রিম পাঞ্জাবি',price:890,color:'#E8DCC2',cat:'kids',fab:'cotton',col:['Cream','ক্রিম']},
  {id:12,en:'Kids Maroon Panjabi',bn:'শিশুদের মেরুন পাঞ্জাবি',price:950,color:'#7A2030',cat:'kids',fab:'cotton',col:['Maroon','মেরুন']},
  {id:13,en:'Tea-dyed Check Handloom Panjabi',bn:'টি-ডাইড চেক হ্যান্ডলুম পাঞ্জাবি',price:1450,color:'#D9C7A6',cat:'everyday',fab:'cotton',col:['Tea brown','চা রং']},
  {id:14,en:'Golden Embroidered Eid Panjabi',bn:'সোনালি এমব্রয়ডারি ঈদ পাঞ্জাবি',price:2890,color:'#C9A35A',cat:'eid',fab:'jacquard',col:['Gold','সোনালি']},
  {id:15,en:'Peacock Print Panjabi',bn:'ময়ূর প্রিন্ট পাঞ্জাবি',price:1390,color:'#2B4A7A',cat:'printed',fab:'cotton',col:['Navy & green','নেভি ও সবুজ']},
  {id:16,en:'Amber Silk Embroidered Panjabi',bn:'অ্যাম্বার সিল্ক এমব্রয়ডারি পাঞ্জাবি',price:3290,color:'#C8902F',cat:'eid',fab:'silk',col:['Amber','অ্যাম্বার']},
  {id:17,en:'Navy Cotton Panjabi',bn:'নেভি কটন পাঞ্জাবি',price:1290,color:'#22314F',cat:'everyday',fab:'cotton',col:['Navy','নেভি']},
  {id:18,en:'White Linen Panjabi',bn:'সাদা লিনেন পাঞ্জাবি',price:1690,color:'#F3F0E8',cat:'everyday',fab:'linen',col:['White','সাদা']},
  {id:19,en:'Black Embroidered Panjabi',bn:'কালো এমব্রয়ডারি পাঞ্জাবি',price:2390,color:'#1E1B1A',cat:'eid',fab:'viscose',col:['Black','কালো']},
  {id:20,en:'Peach Printed Panjabi',bn:'পিচ প্রিন্টেড পাঞ্জাবি',price:1150,color:'#E8B9A0',cat:'printed',fab:'cotton',col:['Peach','পিচ']},
  {id:21,en:'Grey Khadi Panjabi',bn:'ধূসর খাদি পাঞ্জাবি',price:1590,color:'#8C8C86',cat:'everyday',fab:'khadi',col:['Grey','ধূসর']},
  {id:22,en:'Kids Sky Blue Panjabi',bn:'শিশুদের আকাশি পাঞ্জাবি',price:920,color:'#A9C3D6',cat:'kids',fab:'cotton',col:['Sky blue','আকাশি']},
  {id:23,en:'Kids Mustard Panjabi',bn:'শিশুদের মাস্টার্ড পাঞ্জাবি',price:990,color:'#C9962E',cat:'kids',fab:'cotton',col:['Mustard','সরিষা হলুদ']},
  {id:24,en:'Kids Off-white Embroidered Panjabi',bn:'শিশুদের অফ-হোয়াইট এমব্রয়ডারি পাঞ্জাবি',price:1190,color:'#F1EBDD',cat:'kids',fab:'cotton',col:['Off-white','অফ-হোয়াইট']}
];
export const BEST: number[] = [2,1,4,3,8,6,9,11];
export const FAB: Record<Fabric, Pair> = {cotton:['Cotton','সুতি'],linen:['Linen','লিনেন'],jacquard:['Jacquard','জ্যাকার্ড'],khadi:['Khadi','খাদি'],viscose:['Viscose','ভিসকস'],silk:['Silk','সিল্ক']};
export const CATS: Category[] = ['all','everyday','eid','printed','kids'];
export const CAT_COLORS: Record<Exclude<Category, 'all'>, string> = {everyday:'#EDE4D3',eid:'#6E1423',printed:'#C9962E',kids:'#A9C3D6'};
export const ADULT: number[] = [38, 40, 42, 44, 46];
export const KIDS: number[] = [22, 24, 26, 28];
/** Size guide rows: [size, chest (in), length (in)] */
export const SG: [number, number, number][] = [[38,40,40],[40,42,41],[42,44,42],[44,46,43],[46,48,44]];
export const FEE: Record<Zone, number> = {in:70,out:130};
export const DISTRICTS: Pair[] = [['Chattogram','চট্টগ্রাম'],['Sylhet','সিলেট'],['Rajshahi','রাজশাহী'],['Khulna','খুলনা'],['Barishal','বরিশাল'],['Rangpur','রংপুর'],['Mymensingh','ময়মনসিংহ'],['Cumilla','কুমিল্লা'],['Gazipur','গাজীপুর'],['Narayanganj','নারায়ণগঞ্জ'],['Bogura','বগুড়া'],["Cox's Bazar",'কক্সবাজার']];
const en = {brand:'Panjabi Shop',since:'Bangladesh',announce:'Cash on delivery in all 64 districts · Inside Dhaka ৳70 · Outside Dhaka ৳130',
    nav_home:'Home',nav_shop:'Shop all',nav_eid:'Eid & festive',nav_kids:'Kids',nav_track:'Track order',
    heroKicker:'Everyday panjabis',heroTitle:'Panjabis for every day, and every Eid',heroSub:'Cotton, linen and khadi panjabis cut for Bangladesh weather. From ৳890, delivered to your door with cash on delivery.',heroPhoto:'Hero photo · model in ivory panjabi',
    shopNow:'Shop all panjabis',viewEid:'Eid collection',catTitle:'Shop by category',
    cat_all:'All',cat_everyday:'Everyday',cat_eid:'Eid & festive',cat_printed:'Printed',cat_kids:'Kids',
    best:'Bestsellers',viewAll:'View all',
    tr1t:'Cash on delivery',tr1d:'Pay when your parcel arrives',tr2t:'bKash & Nagad',tr2d:'Pay from your mobile wallet',tr3t:'All 64 districts',tr3d:'1–2 days in Dhaka, 2–4 days outside',
    sgPromoT:'Not sure about your size?',sgPromoD:'Measure around your chest and match it to our chart. All measurements are in inches.',sgOpen:'Open size guide',
    photo:'photo',shopTitle:'All panjabis',items:'items',filterSize:'Size',anySize:'Any',sortLabel:'Sort',sort_pop:'Popular',sort_low:'Price: low to high',sort_high:'Price: high to low',searchPh:'Search panjabis',noResults:'No panjabis match these filters.',clear:'Clear filters',
    backShop:'Back to shop',fabric:'Fabric',colour:'Colour',size:'Size',sizeGuide:'Size guide',addCart:'Add to cart',buyNow:'Buy now',added:'Added to cart',viewCart:'View cart',selectSize:'Please select a size',
    delTitle:'Delivery',zoneIn:'Inside Dhaka',zoneOut:'Outside Dhaka',daysIn:'1–2 days',daysOut:'2–4 days',payAvail:'Cash on delivery, bKash and Nagad accepted',
    details:'Details',fitTxt:'Regular fit, knee length, two side pockets.',careTxt:'Machine wash cold, dry in shade, iron on medium heat.',related:'You may also like',
    imgFront:'Front',imgDetail:'Detail',imgBack:'Back',
    cartTitle:'Your cart',cartEmpty:'Your cart is empty.',continueShop:'Continue shopping',remove:'Remove',subtotal:'Subtotal',delivery:'Delivery',total:'Total',deliverTo:'Deliver to',checkout:'Proceed to checkout',
    coTitle:'Checkout',coContact:'Delivery details',name:'Full name',phone:'Mobile number',address:'Full address',addrPh:'House, road, area, thana',district:'District',note:'Order note (optional)',
    coPayment:'Payment',pay_cod:'Cash on delivery',pay_cod_d:'Pay the delivery person in cash',pay_bkash:'bKash',pay_nagad:'Nagad',pay_wallet_d:'Send money first, then enter the transaction ID',
    walletInstr:'Send {total} to {wallet} merchant number 01XXXXXXXXX using “Payment”, then enter the TrxID from the confirmation SMS.',
    trx:'Transaction ID (TrxID)',placeOrder:'Place order',summary:'Order summary',errReq:'Please enter your name, an 11-digit mobile number starting with 01, and your address.',errTrx:'Please enter the transaction ID.',
    okTitle:'Thank you, your order is placed',okSub:'An SMS confirmation will be sent to {phone}. Keep your order ID to track delivery.',orderId:'Order ID',trackThis:'Track this order',
    trackTitle:'Track your order',trackSub:'Enter the order ID from your SMS and the mobile number used at checkout.',trackBtn:'Track',trackHelp:'Questions about your delivery? Call our hotline, 10am–8pm, Saturday to Thursday.',
    st1:'Order placed',st2:'Confirmed',st3:'With courier',st4:'Delivered',st1d:'We received your order',st2d:'We checked your size and address',st3d:'Your parcel is on the way',st4d:'Delivered to your address',
    acctTitle:'My account',hi:'Assalamu alaikum,',userName:'Rahim Ahmed',signOut:'Sign out',tabOrders:'Orders',tabAddr:'Addresses',tabProfile:'Profile',
    loginTitle:'Sign in',loginSub:'Use your mobile number. We will send a 6-digit code by SMS.',otp:'6-digit code',sendCode:'Send code',verify:'Verify and sign in',
    date:'Date',status:'Status',track:'Track',defaultAddr:'Default',home:'Home',office:'Office',usualSize:'Usual size',
    sgChest:'Chest (in)',sgLength:'Length (in)',sgNote:'Measure around the fullest part of your chest. If you are between two sizes, pick the larger one. Kids sizes 22–28 fit roughly ages 2 to 9.',
    footAbout:'Panjabis for everyday and festive wear, delivered across Bangladesh.',footShop:'Shop',footHelp:'Help',footPay:'We accept',footBD:'Delivering across Bangladesh',
  trackNotFound:'We could not find an order with that ID and mobile number. Check your SMS and try again.',trackErrId:'Please enter your order ID.',
  errPhone:'Please enter an 11-digit mobile number starting with 01.',errOtp:'Please enter the 6-digit code.',otpHint:'Demo: any 6 digits will work.',
  nfTitle:'Page not found',nfSub:'The page you are looking for does not exist or has moved.',backHome:'Back to home',
  credits:'Photo credits',creditsSub:'Demo product photos are openly licensed images, resized and cropped for this shop. Products without a photo show a colour placeholder.',creditsLicense:'Licence',creditsSource:'Source',
  close:'Close',account:'Account',cart:'Cart',qtyDec:'Decrease quantity',qtyInc:'Increase quantity',today:'Today'
};

export type Dict = typeof en;

const bn: Dict = {brand:'পাঞ্জাবি শপ',since:'বাংলাদেশ',announce:'৬৪ জেলায় ক্যাশ অন ডেলিভারি · ঢাকার ভেতরে ৳৭০ · ঢাকার বাইরে ৳১৩০',
    nav_home:'হোম',nav_shop:'সব পাঞ্জাবি',nav_eid:'ঈদ ও উৎসব',nav_kids:'শিশু',nav_track:'অর্ডার ট্র্যাক',
    heroKicker:'প্রতিদিনের পাঞ্জাবি',heroTitle:'প্রতিদিনের জন্য, প্রতিটি ঈদের জন্য পাঞ্জাবি',heroSub:'বাংলাদেশের আবহাওয়ার কথা ভেবে বানানো সুতি, লিনেন ও খাদি পাঞ্জাবি। দাম ৳৮৯০ থেকে, ক্যাশ অন ডেলিভারিতে ঘরে পৌঁছে দিই।',heroPhoto:'হিরো ছবি · আইভরি পাঞ্জাবিতে মডেল',
    shopNow:'সব পাঞ্জাবি দেখুন',viewEid:'ঈদ কালেকশন',catTitle:'ক্যাটাগরি অনুযায়ী কিনুন',
    cat_all:'সব',cat_everyday:'প্রতিদিনের',cat_eid:'ঈদ ও উৎসব',cat_printed:'প্রিন্টেড',cat_kids:'শিশু',
    best:'সবচেয়ে বেশি বিক্রিত',viewAll:'সব দেখুন',
    tr1t:'ক্যাশ অন ডেলিভারি',tr1d:'পার্সেল হাতে পেয়ে টাকা দিন',tr2t:'বিকাশ ও নগদ',tr2d:'মোবাইল ওয়ালেট থেকে পেমেন্ট',tr3t:'৬৪ জেলায় ডেলিভারি',tr3d:'ঢাকায় ১–২ দিন, বাইরে ২–৪ দিন',
    sgPromoT:'সাইজ নিয়ে নিশ্চিত নন?',sgPromoD:'বুকের মাপ নিয়ে আমাদের চার্টের সাথে মিলিয়ে নিন। সব মাপ ইঞ্চিতে।',sgOpen:'সাইজ গাইড দেখুন',
    photo:'ছবি',shopTitle:'সব পাঞ্জাবি',items:'টি পণ্য',filterSize:'সাইজ',anySize:'সব',sortLabel:'সাজান',sort_pop:'জনপ্রিয়',sort_low:'দাম: কম থেকে বেশি',sort_high:'দাম: বেশি থেকে কম',searchPh:'পাঞ্জাবি খুঁজুন',noResults:'এই ফিল্টারে কোনো পাঞ্জাবি পাওয়া যায়নি।',clear:'ফিল্টার মুছুন',
    backShop:'শপে ফিরে যান',fabric:'কাপড়',colour:'রং',size:'সাইজ',sizeGuide:'সাইজ গাইড',addCart:'কার্টে যোগ করুন',buyNow:'এখনই কিনুন',added:'কার্টে যোগ হয়েছে',viewCart:'কার্ট দেখুন',selectSize:'অনুগ্রহ করে সাইজ বেছে নিন',
    delTitle:'ডেলিভারি',zoneIn:'ঢাকার ভেতরে',zoneOut:'ঢাকার বাইরে',daysIn:'১–২ দিন',daysOut:'২–৪ দিন',payAvail:'ক্যাশ অন ডেলিভারি, বিকাশ ও নগদ গ্রহণযোগ্য',
    details:'বিস্তারিত',fitTxt:'রেগুলার ফিট, হাঁটু পর্যন্ত লম্বা, দুই পাশে পকেট।',careTxt:'ঠান্ডা পানিতে মেশিন ওয়াশ, ছায়ায় শুকান, মাঝারি তাপে ইস্ত্রি করুন।',related:'আপনার পছন্দ হতে পারে',
    imgFront:'সামনে',imgDetail:'কাজ',imgBack:'পেছনে',
    cartTitle:'আপনার কার্ট',cartEmpty:'আপনার কার্ট খালি।',continueShop:'কেনাকাটা চালিয়ে যান',remove:'সরান',subtotal:'সাবটোটাল',delivery:'ডেলিভারি',total:'মোট',deliverTo:'কোথায় পাঠাব',checkout:'চেকআউট করুন',
    coTitle:'চেকআউট',coContact:'ডেলিভারির তথ্য',name:'পুরো নাম',phone:'মোবাইল নম্বর',address:'পুরো ঠিকানা',addrPh:'বাসা, রোড, এলাকা, থানা',district:'জেলা',note:'অর্ডার নোট (ঐচ্ছিক)',
    coPayment:'পেমেন্ট',pay_cod:'ক্যাশ অন ডেলিভারি',pay_cod_d:'ডেলিভারি ম্যানকে নগদ টাকা দিন',pay_bkash:'বিকাশ',pay_nagad:'নগদ',pay_wallet_d:'আগে টাকা পাঠান, তারপর ট্রানজেকশন আইডি দিন',
    walletInstr:'{wallet} মার্চেন্ট নম্বর 01XXXXXXXXX-এ “Payment” অপশনে {total} পাঠান, তারপর কনফার্মেশন SMS থেকে TrxID লিখুন।',
    trx:'ট্রানজেকশন আইডি (TrxID)',placeOrder:'অর্ডার করুন',summary:'অর্ডার সারাংশ',errReq:'নাম, ০১ দিয়ে শুরু ১১ সংখ্যার মোবাইল নম্বর ও ঠিকানা দিন।',errTrx:'অনুগ্রহ করে ট্রানজেকশন আইডি দিন।',
    okTitle:'ধন্যবাদ, আপনার অর্ডার হয়েছে',okSub:'{phone} নম্বরে SMS কনফার্মেশন যাবে। ডেলিভারি ট্র্যাক করতে অর্ডার আইডি রেখে দিন।',orderId:'অর্ডার আইডি',trackThis:'অর্ডার ট্র্যাক করুন',
    trackTitle:'অর্ডার ট্র্যাক করুন',trackSub:'SMS-এ পাওয়া অর্ডার আইডি ও চেকআউটে দেওয়া মোবাইল নম্বর লিখুন।',trackBtn:'ট্র্যাক',trackHelp:'ডেলিভারি নিয়ে প্রশ্ন? হটলাইনে কল করুন, সকাল ১০টা–রাত ৮টা, শনি থেকে বৃহস্পতিবার।',
    st1:'অর্ডার হয়েছে',st2:'কনফার্ম হয়েছে',st3:'কুরিয়ারে আছে',st4:'ডেলিভারি হয়েছে',st1d:'আমরা আপনার অর্ডার পেয়েছি',st2d:'সাইজ ও ঠিকানা যাচাই করা হয়েছে',st3d:'আপনার পার্সেল পথে আছে',st4d:'আপনার ঠিকানায় পৌঁছে গেছে',
    acctTitle:'আমার অ্যাকাউন্ট',hi:'আসসালামু আলাইকুম,',userName:'রহিম আহমেদ',signOut:'সাইন আউট',tabOrders:'অর্ডার',tabAddr:'ঠিকানা',tabProfile:'প্রোফাইল',
    loginTitle:'সাইন ইন',loginSub:'আপনার মোবাইল নম্বর দিন। আমরা SMS-এ ৬ সংখ্যার কোড পাঠাব।',otp:'৬ সংখ্যার কোড',sendCode:'কোড পাঠান',verify:'যাচাই করে সাইন ইন',
    date:'তারিখ',status:'অবস্থা',track:'ট্র্যাক',defaultAddr:'ডিফল্ট',home:'বাসা',office:'অফিস',usualSize:'সাধারণ সাইজ',
    sgChest:'বুক (ইঞ্চি)',sgLength:'লম্বা (ইঞ্চি)',sgNote:'বুকের সবচেয়ে চওড়া অংশে মাপ নিন। দুই সাইজের মাঝামাঝি হলে বড়টি নিন। শিশুদের ২২–২৮ সাইজ মোটামুটি ২ থেকে ৯ বছর বয়সের জন্য।',
    footAbout:'প্রতিদিন ও উৎসবের পাঞ্জাবি, সারা বাংলাদেশে ডেলিভারি।',footShop:'শপ',footHelp:'সহায়তা',footPay:'পেমেন্ট মাধ্যম',footBD:'সারা বাংলাদেশে ডেলিভারি',
  trackNotFound:'এই অর্ডার আইডি ও মোবাইল নম্বরে কোনো অর্ডার পাওয়া যায়নি। SMS দেখে আবার চেষ্টা করুন।',trackErrId:'অনুগ্রহ করে অর্ডার আইডি দিন।',
  errPhone:'০১ দিয়ে শুরু ১১ সংখ্যার মোবাইল নম্বর দিন।',errOtp:'অনুগ্রহ করে ৬ সংখ্যার কোড দিন।',otpHint:'ডেমো: যেকোনো ৬ সংখ্যা দিলেই হবে।',
  nfTitle:'পেজটি পাওয়া যায়নি',nfSub:'আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরানো হয়েছে।',backHome:'হোমে ফিরে যান',
  credits:'ছবির কৃতজ্ঞতা',creditsSub:'ডেমো পণ্যের ছবিগুলো উন্মুক্ত লাইসেন্সের, এই শপের জন্য আকার ও ক্রপ করা হয়েছে। যেসব পণ্যের ছবি নেই সেগুলোতে রঙের প্লেসহোল্ডার দেখানো হয়।',creditsLicense:'লাইসেন্স',creditsSource:'উৎস',
  close:'বন্ধ করুন',account:'অ্যাকাউন্ট',cart:'কার্ট',qtyDec:'পরিমাণ কমান',qtyInc:'পরিমাণ বাড়ান',today:'আজ'
};

export const T: Record<Lang, Dict> = { en, bn };
/** Demo order history for the signed-in demo customer. */
export const ORDERS: DemoOrder[] = [
  {id:'PS-50917',date:['28 Sep 2026','২৮ সেপ্টেম্বর ২০২৬'],total:1290+70,status:3,phone:'01711000000'},
  {id:'PS-48213',date:['12 Sep 2026','১২ সেপ্টেম্বর ২০২৬'],total:2290+1190+70,status:4,phone:'01711000000'}
];
