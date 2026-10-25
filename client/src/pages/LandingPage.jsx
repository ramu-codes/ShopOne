import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Store,
  Phone,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Eye,
  EyeOff,
  TrendingUp,
  Users,
  Package,
  BarChart3,
  Calculator,
  Receipt,
  ShieldCheck,
  Zap,
  Award,
  ArrowRight,
  Menu,
  X,
  Check,
  LockKeyhole,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useShop } from '@/contexts/ShopContext';
import { toast } from 'sonner';
import heroImg from '@/assets/shop-hero.jpg';
import fashionImg from '@/assets/shop-fashion.jpg';
import accessoriesImg from '@/assets/shop-accessories.jpg';
import productsImg from '@/assets/shop-products.jpg';

const features = {
  en: [
    { icon: TrendingUp, title: 'Grow with confidence', desc: 'Understand your sales and profits with clear, easy-to-read business insights.' },
    { icon: Users, title: 'Know your customers', desc: 'Keep customer details, payment history, and outstanding dues together.' },
    { icon: Package, title: 'Stay in control of stock', desc: 'Track inventory, spot low-stock products, and keep your shelves ready.' },
    { icon: BarChart3, title: 'See the bigger picture', desc: 'Review sales, expenses, and profit trends to make better decisions.' },
    { icon: Calculator, title: 'Keep finances organised', desc: 'Record day-to-day expenses, salaries, and other business costs.' },
    { icon: Receipt, title: 'Bill in a few clicks', desc: 'Create professional invoices and share them with your customers.' },
  ],
  hi: [
    { icon: TrendingUp, title: 'आत्मविश्वास के साथ बढ़ें', desc: 'बिक्री और मुनाफे की जानकारी आसान रिपोर्ट में देखें।' },
    { icon: Users, title: 'ग्राहकों को बेहतर जानें', desc: 'ग्राहक विवरण, भुगतान इतिहास और बकाया एक जगह रखें।' },
    { icon: Package, title: 'स्टॉक पर नियंत्रण रखें', desc: 'इन्वेंटरी ट्रैक करें और कम स्टॉक वाले उत्पाद पहचानें।' },
    { icon: BarChart3, title: 'व्यवसाय की पूरी तस्वीर देखें', desc: 'बेहतर निर्णय लेने के लिए बिक्री, खर्च और मुनाफा देखें।' },
    { icon: Calculator, title: 'वित्तीय रिकॉर्ड व्यवस्थित रखें', desc: 'दैनिक खर्च, वेतन और दूसरे व्यावसायिक खर्च दर्ज करें।' },
    { icon: Receipt, title: 'कुछ क्लिक में बिल बनाएं', desc: 'प्रोफेशनल इनवॉइस बनाकर ग्राहकों के साथ साझा करें।' },
  ],
};

const aboutContent = {
  en: {
    title: 'Made for the way India does business.',
    subtitle: 'A simpler way to run your shop.',
    description: 'EasyShop brings the everyday essentials of shop management into one organised workspace—so you can spend less time juggling records and more time serving customers.',
    benefits: [
      'Manage products, customers, and suppliers in one place',
      'Track sales, purchases, and stock movement',
      'Record expenses and review business performance',
      'Keep customer dues and payment history organised',
      'Manage employee attendance and salary records',
      'Create and share digital invoices',
      'Review useful business reports and insights',
      'Access your workspace across supported devices',
    ],
  },
  hi: {
    title: 'भारत के दुकानदारों के लिए बनाया गया।',
    subtitle: 'दुकान चलाने का आसान तरीका।',
    description: 'EasyShop दुकान प्रबंधन के जरूरी कामों को एक व्यवस्थित जगह पर लाता है, ताकि आप रिकॉर्ड संभालने में कम समय लगाएं और ग्राहकों पर अधिक ध्यान दे सकें।',
    benefits: [
      'उत्पाद, ग्राहक और सप्लायर एक जगह प्रबंधित करें',
      'बिक्री, खरीद और स्टॉक की गतिविधि ट्रैक करें',
      'खर्च दर्ज करें और व्यवसाय का प्रदर्शन देखें',
      'ग्राहक बकाया और भुगतान इतिहास व्यवस्थित रखें',
      'कर्मचारी उपस्थिति और वेतन रिकॉर्ड प्रबंधित करें',
      'डिजिटल इनवॉइस बनाएं और साझा करें',
      'व्यवसाय की रिपोर्ट और जानकारी देखें',
      'समर्थित डिवाइस पर अपना वर्कस्पेस खोलें',
    ],
  },
};

const faqs = {
  en: [
    { q: 'What is EasyShop?', a: 'EasyShop is a shop management workspace that helps you organise products, sales, inventory, customer dues, expenses, and invoices.' },
    { q: 'Can I switch between English and Hindi?', a: 'Yes. Use the language switch in the header to change the landing page language.' },
    { q: 'Can I use EasyShop on my phone?', a: 'The interface is designed to adapt to desktop, tablet, and mobile screens.' },
    { q: 'How do I get started?', a: 'Choose Get Started, create an account with your shop name and email, then sign in to access your shop workspace.' },
    { q: 'How is my shop information handled?', a: 'Your account and data handling depend on your connected application backend and its security configuration. Use a strong, unique password.' },
  ],
  hi: [
    { q: 'EasyShop क्या है?', a: 'EasyShop दुकान प्रबंधन का वर्कस्पेस है, जिससे उत्पाद, बिक्री, इन्वेंटरी, ग्राहक बकाया, खर्च और इनवॉइस व्यवस्थित किए जा सकते हैं।' },
    { q: 'क्या भाषा बदल सकते हैं?', a: 'हां। लैंडिंग पेज की भाषा बदलने के लिए हेडर में भाषा स्विच का उपयोग करें।' },
    { q: 'क्या मोबाइल पर उपयोग कर सकते हैं?', a: 'इंटरफेस डेस्कटॉप, टैबलेट और मोबाइल स्क्रीन के अनुसार अनुकूलित होता है।' },
    { q: 'शुरू कैसे करें?', a: 'Get Started चुनें, दुकान के नाम और ईमेल से अकाउंट बनाएं, फिर अपने वर्कस्पेस में साइन इन करें।' },
    { q: 'मेरी दुकान की जानकारी कैसे सुरक्षित रहती है?', a: 'अकाउंट और डेटा की सुरक्षा आपके ऐप के बैकएंड और उसकी सुरक्षा सेटिंग्स पर निर्भर करती है। मजबूत और अलग पासवर्ड इस्तेमाल करें।' },
  ],
};

const galleryImages = [
  { src: heroImg, label: 'A better view of your business', className: 'md:col-span-2 md:row-span-2' },
  { src: fashionImg, label: 'Products & collections', className: '' },
  { src: accessoriesImg, label: 'Everyday essentials', className: '' },
  { src: productsImg, label: 'Stock, made simple', className: 'md:col-span-2' },
];

const stats = [
  { value: '01', label: 'Place for your records' },
  { value: '360°', label: 'View of your business' },
  { value: '01', label: 'Connected workspace' },
  { value: '2', label: 'Languages supported' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };
const floatLoop = {
  y: [0, -12, 0],
  transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
};
const softPulse = {
  scale: [1, 1.035, 1],
  transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
};

/**
 * Landing page for EasyShop.
 * Keeps the existing ShopContext authentication methods and project UI components.
 */
export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shopNameInput, setShopNameInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { login, register } = useShop();

  const isHindi = language === 'hi';

  const openAuth = (registerMode = false) => {
    setIsRegisterMode(registerMode);
    setShowLogin(true);
    setMobileMenuOpen(false);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error(isHindi ? 'ईमेल दर्ज करें' : 'Please enter your email.');
      return;
    }
    if (!password.trim()) {
      toast.error(isHindi ? 'पासवर्ड दर्ज करें' : 'Please enter your password.');
      return;
    }
    if (isRegisterMode && !shopNameInput.trim()) {
      toast.error(isHindi ? 'दुकान का नाम दर्ज करें' : 'Please enter your shop name.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = isRegisterMode
        ? await register(shopNameInput.trim(), email.trim(), password)
        : await login(email.trim(), password);

      if (result?.success) {
        toast.success(
          isRegisterMode
            ? (isHindi ? 'अकाउंट बन गया! EasyShop में स्वागत है।' : 'Account created! Welcome to EasyShop.')
            : (isHindi ? 'वापसी पर स्वागत है!' : 'Welcome back!')
        );
        setShowLogin(false);
      } else {
        toast.error(result?.message || (isHindi ? 'कृपया दोबारा कोशिश करें।' : 'Please try again.'));
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (isHindi ? 'कुछ गलत हुआ। दोबारा कोशिश करें।' : 'Something went wrong. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#222222]">
      {/* Utility strip */}
      <div className="hidden border-b border-[#e8e8e8] bg-[#f8f9fa] sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-[11px] font-medium tracking-wide text-[#555555]">
          <span>{isHindi ? 'भारतीय दुकानों के लिए स्मार्ट मैनेजमेंट' : 'SMART MANAGEMENT FOR INDIAN RETAIL'}</span>
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => scrollTo('about')} className="transition hover:text-[#002f6c]">
              {isHindi ? 'हमारे बारे में' : 'ABOUT EASYSHOP'}
            </button>
            <button type="button" onClick={() => scrollTo('faq')} className="transition hover:text-[#002f6c]">
              {isHindi ? 'सहायता' : 'HELP & FAQ'}
            </button>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {isHindi ? 'आपके व्यवसाय के लिए' : 'BUILT FOR YOUR BUSINESS'}</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header className="sticky top-0 z-40 border-b border-[#e7e7e7] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5">
          <button type="button" onClick={() => scrollTo('top')} className="flex shrink-0 items-center gap-3 text-left" aria-label="EasyShop home">
            <span className="flex h-11 w-11 items-center justify-center bg-[#002f6c] text-white">
              <Store className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span>
              <span className="block text-[21px] font-extrabold leading-none tracking-[-0.06em]">EASY<span className="text-[#e32619]">SHOP</span></span>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.19em] text-[#777777]">Smart shop management</span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            <button type="button" onClick={() => scrollTo('features')} className="text-[12px] font-bold uppercase tracking-[0.08em] transition hover:text-[#e32619]">{isHindi ? 'फीचर्स' : 'Features'}</button>
            <button type="button" onClick={() => scrollTo('how-it-works')} className="text-[12px] font-bold uppercase tracking-[0.08em] transition hover:text-[#e32619]">{isHindi ? 'कैसे काम करता है' : 'How it works'}</button>
            <button type="button" onClick={() => scrollTo('showcase')} className="text-[12px] font-bold uppercase tracking-[0.08em] transition hover:text-[#e32619]">{isHindi ? 'एक झलक' : 'Showcase'}</button>
            <button type="button" onClick={() => scrollTo('about')} className="text-[12px] font-bold uppercase tracking-[0.08em] transition hover:text-[#e32619]">{isHindi ? 'हमारे बारे में' : 'About'}</button>
            <button type="button" onClick={() => scrollTo('faq')} className="text-[12px] font-bold uppercase tracking-[0.08em] transition hover:text-[#e32619]">FAQ</button>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <button type="button" onClick={() => setLanguage(isHindi ? 'en' : 'hi')} className="px-2 py-2 text-xs font-bold text-[#555555] hover:text-[#002f6c]">
              {isHindi ? 'ENGLISH' : 'हिंदी'}
            </button>
            <Button onClick={() => openAuth(false)} variant="outline" className="h-10 rounded-none border-[#002f6c] px-5 text-xs font-bold uppercase tracking-wider text-[#002f6c] hover:bg-[#002f6c] hover:text-white">
              {isHindi ? 'लॉगिन' : 'Log in'}
            </Button>
            <Button onClick={() => openAuth(true)} className="h-10 rounded-none bg-[#e32619] px-5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#bd1f15]">
              {isHindi ? 'शुरू करें' : 'Get started'}
            </Button>
          </div>

          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-10 w-10 items-center justify-center border border-[#e7e7e7] lg:hidden" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-[#eeeeee] bg-white lg:hidden">
              <div className="flex flex-col px-5 py-3">
                {[
                  ['Features', 'features'],
                  ['How it works', 'how-it-works'],
                  ['Showcase', 'showcase'],
                  ['About', 'about'],
                  ['FAQ', 'faq'],
                ].map(([label, id]) => (
                  <button key={id} type="button" onClick={() => scrollTo(id)} className="border-b border-[#f0f0f0] py-3 text-left text-sm font-semibold">{isHindi ? ({ Features: 'फीचर्स', 'How it works': 'कैसे काम करता है', Showcase: 'एक झलक', About: 'हमारे बारे में', FAQ: 'सामान्य प्रश्न' }[label]) : label}</button>
                ))}
                <div className="flex gap-2 py-4">
                  <Button variant="outline" onClick={() => setLanguage(isHindi ? 'en' : 'hi')} className="flex-1 rounded-none">{isHindi ? 'English' : 'हिंदी'}</Button>
                  <Button onClick={() => openAuth(false)} className="flex-1 rounded-none bg-[#002f6c]">{isHindi ? 'लॉगिन' : 'Log in'}</Button>
                  <Button onClick={() => openAuth(true)} className="flex-1 rounded-none bg-[#e32619]">{isHindi ? 'शुरू करें' : 'Start'}</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-[#f7f8fa]">
          <motion.div aria-hidden="true" animate={{ x: [0, 22, 0], y: [0, -15, 0] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#dce7f4] blur-3xl" />
          <motion.div aria-hidden="true" animate={{ x: [0, -18, 0], y: [0, 16, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute right-0 top-16 h-64 w-64 rounded-full bg-[#f8dfdc] blur-3xl" />
          <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-14 md:grid-cols-[0.9fr_1.1fr] md:py-20 lg:min-h-[720px] lg:gap-8">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 py-3">
              <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dbe3ed] bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#002f6c] shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e32619] opacity-50" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#e32619]" /></span>
                {isHindi ? 'आपकी दुकान, अब और स्मार्ट' : 'A smarter way to run your shop'}
              </motion.div>
              <motion.h1 variants={fadeUp} className="max-w-[650px] text-[42px] font-black leading-[1.04] tracking-[-0.06em] text-[#161a20] sm:text-5xl lg:text-[66px]">
                {isHindi ? <>कम मेहनत में <span className="text-[#002f6c]">बेहतर कारोबार।</span></> : <>Less time on records.<br /><span className="text-[#002f6c]">More room to grow.</span></>}
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 max-w-xl text-[15px] leading-7 text-[#5b6470] sm:text-base">
                {isHindi
                  ? 'बिक्री, स्टॉक, ग्राहक भुगतान और खर्च—दुकान के जरूरी काम एक आसान वर्कस्पेस में व्यवस्थित रखें।'
                  : 'Bring sales, inventory, customer payments, and expenses into one clear workspace—built to make everyday shop management feel simpler.'}
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.button type="button" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => openAuth(true)} className="inline-flex h-12 items-center justify-center rounded-full bg-[#e32619] px-7 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_12px_28px_-12px_rgba(227,38,25,0.75)] transition-colors hover:bg-[#bd1f15]">
                  {isHindi ? 'मुफ्त में शुरू करें' : 'Get started'} <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
                <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => scrollTo('product-preview')} className="inline-flex h-12 items-center justify-center rounded-full border border-[#d1d8e2] bg-white px-7 text-xs font-bold uppercase tracking-[0.1em] text-[#002f6c] transition-colors hover:border-[#002f6c] hover:bg-[#f0f4f8]">
                  {isHindi ? 'डैशबोर्ड देखें' : 'See the dashboard'} <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-[#5b6470]">
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-[#002f6c]" /> {isHindi ? 'आसान वर्कफ़्लो' : 'Simple workflows'}</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-[#002f6c]" /> {isHindi ? 'मोबाइल के अनुकूल' : 'Works across screen sizes'}</span>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a929d]">
                {isHindi ? 'बिक्री · स्टॉक · ग्राहक · खर्च' : 'SALES  ·  INVENTORY  ·  CUSTOMERS  ·  EXPENSES'}
              </motion.p>
            </motion.div>

            {/* Animated product preview: laptop dashboard + phone UI */}
            <motion.div id="product-preview" initial={{ opacity: 0, y: 28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }} className="relative mx-auto w-full max-w-[700px] scroll-mt-28 pb-8 pt-3 sm:pb-12">
              <motion.div aria-hidden="true" animate={{ rotate: [0, 3, 0], y: [0, -7, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-2 top-0 h-20 w-20 rounded-[24px] border border-[#dce4ed] bg-white/70 sm:-right-1 sm:h-24 sm:w-24" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative z-10">
                {/* Laptop screen */}
                <div className="relative rounded-t-[18px] border-[7px] border-[#20252d] bg-[#20252d] p-1 shadow-[0_35px_80px_-30px_rgba(0,24,60,0.5)] sm:rounded-t-[22px] sm:border-[9px]">
                  <div className="overflow-hidden rounded-t-[8px] bg-[#f7f8fa]">
                    <div className="flex h-8 items-center justify-between border-b border-[#e7eaf0] bg-white px-3 sm:h-10 sm:px-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#002f6c] text-white"><Store className="h-3 w-3" /></span>
                        <span className="text-[9px] font-extrabold tracking-tight text-[#20252d] sm:text-[11px]">EASY<span className="text-[#e32619]">SHOP</span></span>
                      </div>
                      <div className="hidden h-5 w-[36%] items-center rounded-full border border-[#edf0f4] bg-[#f7f8fa] px-2 text-[7px] text-[#a0a7b2] sm:flex">Search products, customers...</div>
                      <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#d8e0ea]" /><span className="h-2 w-2 rounded-full bg-[#d8e0ea]" /><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e8edf5] text-[7px] font-bold text-[#002f6c]">ES</span></div>
                    </div>
                    <div className="grid grid-cols-[68px_1fr] sm:grid-cols-[108px_1fr]">
                      <aside className="min-h-[250px] space-y-3 border-r border-[#e8ebf0] bg-white px-2 py-3 sm:min-h-[330px] sm:space-y-4 sm:px-3 sm:py-4">
                        <div className="mb-4 h-2 w-10 rounded bg-[#e6eaf0] sm:w-16" />
                        {[['Overview', BarChart3], ['Products', Package], ['Customers', Users], ['Billing', Receipt]].map(([label, Icon], index) => (
                          <div key={label} className={`flex items-center gap-1.5 rounded-md px-1.5 py-1.5 sm:gap-2 sm:px-2 ${index === 0 ? 'bg-[#edf2f8] text-[#002f6c]' : 'text-[#8b93a0]'}`}>
                            <Icon className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                            <span className="hidden text-[8px] font-semibold sm:inline">{label}</span>
                          </div>
                        ))}
                        <div className="mt-6 rounded-md bg-[#f7f8fa] p-2">
                          <div className="mb-2 h-1.5 w-8 rounded bg-[#dce2ea]" />
                          <div className="h-1 w-full rounded bg-[#e9edf2]" />
                          <div className="mt-1 h-1 w-2/3 rounded bg-[#e9edf2]" />
                        </div>
                      </aside>
                      <div className="min-w-0 p-3 sm:p-5">
                        <div className="flex items-start justify-between gap-2">
                          <div><p className="text-[7px] font-semibold uppercase tracking-[0.13em] text-[#929aa6] sm:text-[9px]">MONDAY, OVERVIEW</p><h3 className="mt-1 text-[12px] font-extrabold tracking-tight text-[#222833] sm:text-lg">Business overview</h3><p className="mt-1 text-[7px] text-[#8c94a1] sm:text-[9px]">Here's how your shop is doing.</p></div>
                          <span className="rounded-md border border-[#e4e8ee] bg-white px-2 py-1 text-[7px] font-semibold text-[#657080] sm:text-[9px]">This week⌄</span>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-1.5 sm:mt-5 sm:gap-2">
                          {[
                            { label: 'Sales', value: '₹48,500', delta: '+12.8%', icon: TrendingUp },
                            { label: 'Expenses', value: '₹12,400', delta: 'This week', icon: Calculator },
                            { label: 'Customers', value: '128', delta: '+8 new', icon: Users },
                          ].map((metric, index) => (
                            <motion.div key={metric.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + index * 0.12 }} className="rounded-lg border border-[#e8ebf0] bg-white p-2 sm:p-3">
                              <div className="flex items-center justify-between"><span className="text-[6px] text-[#818a98] sm:text-[8px]">{metric.label}</span><metric.icon className="h-2.5 w-2.5 text-[#002f6c] sm:h-3.5 sm:w-3.5" /></div>
                              <p className="mt-1 text-[10px] font-extrabold tracking-tight text-[#252b35] sm:mt-2 sm:text-base">{metric.value}</p>
                              <p className={`mt-1 text-[6px] font-bold sm:text-[8px] ${index === 0 ? 'text-[#16845b]' : 'text-[#929aa6]'}`}>{metric.delta}</p>
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-2 grid grid-cols-[1.5fr_1fr] gap-2 sm:mt-3 sm:gap-3">
                          <div className="rounded-lg border border-[#e8ebf0] bg-white p-2 sm:p-3">
                            <div className="flex items-center justify-between"><span className="text-[7px] font-bold text-[#343b47] sm:text-[9px]">Sales performance</span><span className="text-[6px] text-[#a0a7b2] sm:text-[8px]">7 days</span></div>
                            <div className="mt-2 flex h-[78px] items-end gap-1 border-b border-l border-[#eef0f4] px-1 sm:h-[112px] sm:gap-2 sm:px-2">
                              {[38, 55, 43, 72, 59, 88, 68, 96].map((height, index) => (
                                <motion.div key={index} initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ duration: 0.7, delay: 0.65 + index * 0.07, ease: 'easeOut' }} className={`flex-1 rounded-t-[3px] ${index === 7 ? 'bg-[#e32619]' : 'bg-[#b9c9de]'}`} />
                              ))}
                            </div>
                            <div className="mt-1.5 flex justify-between text-[5px] text-[#a0a7b2] sm:text-[7px]"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
                          </div>
                          <div className="rounded-lg border border-[#e8ebf0] bg-white p-2 sm:p-3">
                            <span className="text-[7px] font-bold text-[#343b47] sm:text-[9px]">Stock status</span>
                            <div className="mx-auto mt-3 flex h-[56px] w-[56px] items-center justify-center rounded-full sm:mt-4 sm:h-[78px] sm:w-[78px]" style={{ background: 'conic-gradient(#002f6c 0% 62%, #e32619 62% 76%, #e9edf2 76% 100%)' }}>
                              <div className="flex h-[39px] w-[39px] flex-col items-center justify-center rounded-full bg-white sm:h-[56px] sm:w-[56px]"><span className="text-[10px] font-extrabold text-[#252b35] sm:text-sm">84%</span><span className="text-[5px] text-[#8b93a0] sm:text-[7px]">in stock</span></div>
                            </div>
                            <div className="mt-2 space-y-1 text-[6px] text-[#737c89] sm:text-[8px]"><div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#002f6c]" /> Available</div><div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#e32619]" /> Low stock</div></div>
                          </div>
                        </div>
                        <div className="mt-2 rounded-lg border border-[#e8ebf0] bg-white p-2 sm:mt-3 sm:p-3">
                          <div className="mb-2 flex items-center justify-between"><span className="text-[7px] font-bold text-[#343b47] sm:text-[9px]">Recent transactions</span><span className="text-[6px] font-semibold text-[#002f6c] sm:text-[8px]">View all</span></div>
                          {[['Order #1048', 'Paid', '₹2,450'], ['Order #1047', 'Pending', '₹1,200']].map((row, index) => (
                            <div key={row[0]} className="flex items-center justify-between border-t border-[#f0f2f5] py-1.5 text-[6px] sm:text-[8px]"><span className="font-semibold text-[#4b5360]">{row[0]}</span><span className={index === 0 ? 'text-[#16845b]' : 'text-[#c27a16]'}>{row[1]}</span><span className="font-bold text-[#343b47]">{row[2]}</span></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Laptop base */}
                <div className="relative mx-auto h-3 w-[108%] -translate-x-[3.7%] rounded-b-[12px] bg-gradient-to-b from-[#cfd3da] to-[#858c97] shadow-md sm:h-4">
                  <div className="mx-auto h-1 w-[22%] rounded-b-md bg-[#a1a7b0]" />
                </div>
              </motion.div>

              {/* Phone preview floats over the laptop edge */}
              <motion.div animate={{ y: [0, -9, 0], rotate: [2, 1, 2] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-1 right-0 z-20 w-[108px] rounded-[22px] border-[4px] border-[#20252d] bg-[#20252d] p-1 shadow-[0_24px_50px_-18px_rgba(0,20,50,0.55)] sm:-bottom-3 sm:right-1 sm:w-[142px] sm:rounded-[28px] sm:border-[5px]">
                <div className="overflow-hidden rounded-[16px] bg-[#f7f8fa] sm:rounded-[21px]">
                  <div className="flex h-5 items-center justify-center bg-white sm:h-6"><span className="h-1 w-8 rounded-full bg-[#d6dbe2] sm:w-10" /></div>
                  <div className="px-2 pb-3 sm:px-3 sm:pb-4">
                    <div className="flex items-center justify-between"><span className="text-[6px] font-extrabold text-[#002f6c] sm:text-[8px]">EASYSHOP</span><span className="h-3 w-3 rounded-full bg-[#e7edf5]" /></div>
                    <p className="mt-3 text-[7px] text-[#8b93a0] sm:mt-4 sm:text-[8px]">Today's sales</p>
                    <motion.p initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 3 }} className="mt-0.5 text-[15px] font-black tracking-tight text-[#20252d] sm:text-xl">₹8,450</motion.p>
                    <span className="mt-1 inline-flex rounded-full bg-[#e7f5ee] px-1.5 py-0.5 text-[6px] font-bold text-[#16845b] sm:text-[7px]">↑ 8.2%</span>
                    <div className="mt-3 flex h-12 items-end gap-1 sm:mt-4 sm:h-16">{[28, 45, 36, 66, 49, 80, 60].map((height, index) => <motion.span key={index} animate={{ height: [`${height}%`, `${Math.min(height + 10, 96)}%`, `${height}%`] }} transition={{ duration: 3.5, delay: index * 0.12, repeat: Infinity, ease: 'easeInOut' }} className="flex-1 rounded-t-sm bg-[#b9c9de]" />)}</div>
                    <div className="mt-3 space-y-2 sm:mt-4"><div className="h-1.5 w-full rounded bg-[#e5e9ef]" /><div className="h-1.5 w-3/4 rounded bg-[#e5e9ef]" /><div className="flex items-center gap-1.5 rounded-md border border-[#e4e9f0] bg-white p-1.5"><span className="flex h-4 w-4 items-center justify-center rounded bg-[#edf2f8] text-[#002f6c]"><Package className="h-2.5 w-2.5" /></span><span className="text-[6px] font-semibold text-[#606a78] sm:text-[7px]">Stock updated</span></div></div>
                  </div>
                </div>
              </motion.div>

              <motion.div animate={floatLoop} className="absolute -left-2 bottom-12 z-20 hidden items-center gap-2 rounded-2xl border border-[#e5e9ef] bg-white/95 p-3 shadow-[0_16px_40px_-20px_rgba(0,30,70,0.4)] backdrop-blur sm:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf5ef] text-[#16845b]"><TrendingUp className="h-4 w-4" /></span>
                <span><span className="block text-[10px] font-bold text-[#20252d]">A clearer picture</span><span className="mt-0.5 block text-[9px] text-[#7b8491]">Your shop, at a glance</span></span>
              </motion.div>
              <p className="mt-5 text-center text-[9px] font-medium tracking-wide text-[#8a929d]">{isHindi ? 'डैशबोर्ड का उदाहरण · डेमो डेटा' : 'ILLUSTRATIVE DASHBOARD PREVIEW · SAMPLE DATA'}</p>
            </motion.div>
          </div>
        </section>

        {/* Trust / value strip */}
        <section className="border-y border-[#e8e8e8] bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[#e8e8e8] px-5 sm:grid-cols-4 sm:divide-y-0">
            {stats.map((item, index) => (
              <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.06 }} className="px-3 py-6 text-center sm:py-7">
                <p className="text-2xl font-black tracking-tight text-[#002f6c] sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.09em] text-[#666666] sm:text-[11px]">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Public feature preview: visitors can explore the page without signing in */}
        <section className="px-5 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="relative mx-auto max-w-7xl overflow-hidden border border-[#dfe5ed] bg-white p-6 shadow-[0_18px_60px_-38px_rgba(0,35,80,0.45)] sm:p-9 lg:p-11"
          >
            <motion.div aria-hidden="true" animate={softPulse} className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full border-[24px] border-[#edf2f7]" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e32619]">
                  <span className="h-2 w-2 rounded-full bg-[#e32619] shadow-[0_0_0_4px_rgba(227,38,25,0.12)]" />
                  {isHindi ? 'लॉगिन की जरूरत नहीं' : 'NO SIGN-IN REQUIRED'}
                </p>
                <h2 className="text-2xl font-black leading-tight tracking-[-0.04em] sm:text-3xl">
                  {isHindi ? 'पहले फीचर्स देखें। फिर फैसला करें।' : 'Take a look around before you sign in.'}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#666666] sm:text-base">
                  {isHindi
                    ? 'EasyShop के फीचर्स और काम करने का तरीका बिना अकाउंट बनाए जानें।'
                    : 'Explore what EasyShop can help you manage. Browse the feature overview below without creating an account or opening the login window.'}
                </p>
              </div>
              <Button
                type="button"
                onClick={() => scrollTo('features')}
                className="group h-12 shrink-0 rounded-none bg-[#002f6c] px-6 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#001f49]"
              >
                {isHindi ? 'बिना लॉगिन फीचर्स देखें' : 'Explore features without login'}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 flex flex-col justify-between gap-4 border-b border-[#e5e5e5] pb-7 sm:flex-row sm:items-end sm:pb-8">
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e32619]">{isHindi ? 'आपको जो चाहिए' : 'THE ESSENTIALS'}</p>
                <h2 className="max-w-2xl text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-[44px]">{isHindi ? 'दुकान के हर काम के लिए एक जगह।' : 'Everything your shop needs. In one place.'}</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#666666]">{isHindi ? 'रोज़मर्रा के काम व्यवस्थित रखें और कारोबार पर ध्यान दें।' : 'Less time switching between records. More time focused on your customers and your business.'}</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-px border border-[#e5e5e5] bg-[#e5e5e5] sm:grid-cols-2 lg:grid-cols-3">
              {features[language].map((feature, index) => (
                <motion.article key={feature.title} variants={fadeUp} whileHover={{ y: -7, transition: { duration: 0.2 } }} className="group bg-white p-6 transition-colors duration-300 hover:bg-[#f8f9fa] sm:p-8">
                  <div className="mb-7 flex items-start justify-between">
                    <motion.span whileHover={{ rotate: -5, scale: 1.08 }} className="flex h-12 w-12 items-center justify-center border border-[#dfe5ed] bg-[#f4f6f8] text-[#002f6c] transition group-hover:border-[#002f6c] group-hover:bg-[#002f6c] group-hover:text-white">
                      <feature.icon className="h-5 w-5" strokeWidth={1.8} />
                    </motion.span>
                    <span className="text-xs font-bold tracking-[0.12em] text-[#b5b5b5]">0{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-[#222222]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#666666]">{feature.desc}</p>
                  <div className="mt-6 h-[2px] w-8 bg-[#e32619] transition-all duration-300 group-hover:w-14" />
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-24 overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e32619]">{isHindi ? 'शुरू करना आसान है' : 'A SIMPLE WAY TO GET STARTED'}</p>
              <h2 className="text-3xl font-black tracking-[-0.05em] text-[#171b22] sm:text-4xl lg:text-5xl">{isHindi ? 'तीन कदम। ज्यादा स्पष्टता।' : 'Three steps to a clearer day.'}</h2>
              <p className="mt-4 text-sm leading-7 text-[#68717e] sm:text-base">{isHindi ? 'अपने रोज़मर्रा के काम व्यवस्थित करें और कारोबार पर ध्यान दें।' : 'Start with the essentials, bring your records together, and get a clearer view of your shop.'}</p>
            </motion.div>
            <div className="relative grid gap-4 md:grid-cols-3">
              <motion.div aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.25 }} className="absolute left-[16%] right-[16%] top-10 hidden h-px origin-left bg-gradient-to-r from-[#d9e2ee] via-[#002f6c] to-[#d9e2ee] md:block" />
              {[
                { number: '01', icon: Store, title: isHindi ? 'अपनी दुकान सेट करें' : 'Set up your shop', desc: isHindi ? 'अपनी दुकान का विवरण जोड़ें और अपना वर्कस्पेस तैयार करें।' : 'Create your account and set up the workspace around your shop.' },
                { number: '02', icon: Package, title: isHindi ? 'रिकॉर्ड व्यवस्थित करें' : 'Bring your records together', desc: isHindi ? 'उत्पाद, स्टॉक और ग्राहक जानकारी को एक जगह व्यवस्थित रखें।' : 'Organise products, inventory, and customer details in one place.' },
                { number: '03', icon: BarChart3, title: isHindi ? 'बेहतर जानकारी पाएं' : 'See the bigger picture', desc: isHindi ? 'बिक्री और खर्च देखें ताकि आप सोच-समझकर निर्णय ले सकें।' : 'Review sales and expenses to make more informed day-to-day decisions.' },
              ].map((step, index) => (
                <motion.article key={step.number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: index * 0.14 }} whileHover={{ y: -5 }} className="relative border border-[#e7ebf0] bg-white p-6 shadow-[0_16px_45px_-35px_rgba(0,30,70,0.35)] sm:p-8">
                  <div className="relative z-10 mb-7 flex items-center justify-between">
                    <motion.span whileHover={{ rotate: -7, scale: 1.06 }} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf2f8] text-[#002f6c]"><step.icon className="h-5 w-5" /></motion.span>
                    <span className="text-xs font-bold tracking-[0.18em] text-[#a3acb8]">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-extrabold tracking-tight text-[#20252d]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#68717e]">{step.desc}</p>
                  <div className="mt-7 h-[2px] w-10 bg-[#e32619]" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase gallery */}
        <section id="showcase" className="scroll-mt-24 bg-[#f5f6f7] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e32619]">{isHindi ? 'एक झलक' : 'A CLOSER LOOK'}</p>
                <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">{isHindi ? 'आपकी दुकान। बेहतर तरीके से।' : 'A better view of your shop.'}</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#666666]">{isHindi ? 'एक साफ़, व्यवस्थित और आसान अनुभव।' : 'A clean, considered experience designed to make everyday shop management feel simpler.'}</p>
            </motion.div>
            <div className="grid auto-rows-[190px] gap-3 sm:auto-rows-[220px] md:grid-cols-4 md:grid-rows-2">
              {galleryImages.map((item, index) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.07 }} whileHover={{ y: -4 }} className={`group relative overflow-hidden bg-[#dddddd] ${item.className}`}>
                  <img src={item.src} alt={item.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a3b]/75 via-[#001a3b]/0 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 sm:p-5">
                    <p className="text-sm font-bold text-white sm:text-base">{item.label}</p>
                    <ArrowRight className="h-4 w-4 shrink-0 text-white opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e32619]">{isHindi ? 'EasyShop के बारे में' : 'THE EASYSHOP APPROACH'}</p>
              <h2 className="text-3xl font-black leading-tight tracking-[-0.045em] sm:text-4xl lg:text-[46px]">{aboutContent[language].title}</h2>
              <p className="mt-5 text-base font-bold text-[#002f6c]">{aboutContent[language].subtitle}</p>
              <p className="mt-4 text-sm leading-7 text-[#666666]">{aboutContent[language].description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 border border-[#e5e5e5] px-3 py-2 text-xs font-semibold text-[#555555]"><ShieldCheck className="h-4 w-4 text-[#002f6c]" /> {isHindi ? 'सुरक्षा को ध्यान में रखकर' : 'Security-conscious setup'}</span>
                <span className="inline-flex items-center gap-2 border border-[#e5e5e5] px-3 py-2 text-xs font-semibold text-[#555555]"><Zap className="h-4 w-4 text-[#002f6c]" /> {isHindi ? 'आसान वर्कफ़्लो' : 'Simple workflows'}</span>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="border border-[#e5e5e5] bg-white p-5 sm:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-[#e5e5e5] pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#777777]">{isHindi ? 'शुरू से व्यवस्थित' : 'BUILT AROUND YOUR DAY'}</p>
                  <h3 className="mt-2 text-xl font-extrabold tracking-tight">{isHindi ? 'आपके काम के लिए बनाया गया' : 'The essentials, covered.'}</h3>
                </div>
                <span className="flex h-12 w-12 items-center justify-center bg-[#002f6c] text-white"><Award className="h-6 w-6" /></span>
              </div>
              <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {aboutContent[language].benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm leading-6 text-[#555555]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[#edf2f7] text-[#002f6c]"><Check className="h-3.5 w-3.5" /></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 border-y border-[#e8e8e8] bg-[#f8f9fa] py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e32619]">{isHindi ? 'सवाल और जवाब' : 'NEED TO KNOW'}</p>
              <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">{isHindi ? 'आपके सवाल, हमारे जवाब।' : 'A few things you might be wondering.'}</h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-[#666666]">{isHindi ? 'EasyShop शुरू करने से पहले जरूरी जानकारी यहां देखें।' : 'Find quick answers about the EasyShop workspace and getting started.'}</p>
              <Button onClick={() => openAuth(true)} className="mt-6 h-11 rounded-none bg-[#002f6c] px-5 text-xs font-bold uppercase tracking-wider hover:bg-[#001f49]">
                {isHindi ? 'शुरू करें' : 'Get started'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            <div className="space-y-2">
              {faqs[language].map((faq, index) => (
                <div key={faq.q} className="border border-[#e4e4e4] bg-white">
                  <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5">
                    <span className="text-sm font-bold text-[#222222]">{faq.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#e5e5e5] text-[#002f6c]">{openFaq === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                        <p className="px-4 pb-5 text-sm leading-6 text-[#666666] sm:px-5">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-5 py-16 sm:py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative mx-auto max-w-7xl overflow-hidden bg-[#002f6c] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
            <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border border-white/15" />
            <div className="absolute -right-1 -top-5 h-48 w-48 rounded-full border border-white/10" />
            <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/65">{isHindi ? 'आज ही शुरुआत करें' : 'MAKE YOUR NEXT DAY EASIER'}</p>
                <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">{isHindi ? 'अपने कारोबार को व्यवस्थित करने के लिए तैयार हैं?' : 'Ready to run your shop with more clarity?'}</h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">{isHindi ? 'EasyShop के साथ अपने रोज़मर्रा के कामों को एक आसान वर्कस्पेस में लाएं।' : 'Bring the moving parts of your business into one simple workspace with EasyShop.'}</p>
              </div>
              <Button onClick={() => openAuth(true)} className="h-12 shrink-0 rounded-none bg-[#e32619] px-7 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-[#bd1f15]">
                {isHindi ? 'अकाउंट बनाएं' : 'Create your account'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#15191f] text-white">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr] lg:py-12">
          <div>
            <button type="button" onClick={() => scrollTo('top')} className="flex items-center gap-3 text-left">
              <span className="flex h-10 w-10 items-center justify-center bg-[#e32619]"><Store className="h-5 w-5" /></span>
              <span><span className="block text-lg font-extrabold tracking-[-0.05em]">EASY<span className="text-[#ef554b]">SHOP</span></span><span className="block text-[9px] uppercase tracking-[0.18em] text-white/50">Smart shop management</span></span>
            </button>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">{isHindi ? 'छोटे और बढ़ते व्यवसायों के रोज़मर्रा के कामों को आसान बनाने के लिए।' : 'Helping small and growing businesses keep everyday shop operations organised.'}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em]">{isHindi ? 'नेविगेशन' : 'Explore'}</h3>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/60">
              <button type="button" onClick={() => scrollTo('features')} className="hover:text-white">{isHindi ? 'फीचर्स' : 'Features'}</button>
              <button type="button" onClick={() => scrollTo('how-it-works')} className="hover:text-white">{isHindi ? 'कैसे काम करता है' : 'How it works'}</button>
              <button type="button" onClick={() => scrollTo('showcase')} className="hover:text-white">{isHindi ? 'एक झलक' : 'Showcase'}</button>
              <button type="button" onClick={() => scrollTo('about')} className="hover:text-white">{isHindi ? 'हमारे बारे में' : 'About'}</button>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em]">{isHindi ? 'सहायता' : 'Support'}</h3>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/60">
              <button type="button" onClick={() => scrollTo('faq')} className="hover:text-white">FAQ</button>
              <button type="button" onClick={() => openAuth(false)} className="hover:text-white">{isHindi ? 'लॉगिन' : 'Log in'}</button>
              <button type="button" onClick={() => openAuth(true)} className="hover:text-white">{isHindi ? 'अकाउंट बनाएं' : 'Create account'}</button>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em]">{isHindi ? 'आपकी दुकान, आपका नियंत्रण' : 'YOUR SHOP, YOUR CONTROL'}</h3>
            <p className="mt-4 text-sm leading-6 text-white/55">{isHindi ? 'दुकान के रिकॉर्ड को व्यवस्थित रखने के लिए तैयार।' : 'A more organised place for your day-to-day shop records.'}</p>
            <button type="button" onClick={() => openAuth(true)} className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#ff766c]">{isHindi ? 'शुरू करें' : 'Get started'} <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} EasyShop. {isHindi ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</span>
            <span>{isHindi ? 'सुविधाएं आपके ऐप कॉन्फ़िगरेशन पर निर्भर करती हैं।' : 'Features depend on your application configuration.'}</span>
          </div>
        </div>
      </footer>

      {/* Login / register modal: uses the existing ShopContext API */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#101820]/70 p-4 backdrop-blur-sm"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
              className="my-auto w-full max-w-md"
            >
              <Card className="overflow-hidden rounded-none border-0 shadow-2xl">
                <div className="flex items-center justify-between bg-[#002f6c] px-6 py-5 text-white">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center bg-white/10"><Store className="h-5 w-5" /></span>
                    <div>
                      <p className="text-sm font-extrabold tracking-tight">EASYSHOP</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/65">{isHindi ? 'आपका बिज़नेस वर्कस्पेस' : 'Your business workspace'}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setShowLogin(false)} aria-label="Close authentication dialog" className="flex h-8 w-8 items-center justify-center text-white/75 hover:bg-white/10 hover:text-white"><X className="h-4 w-4" /></button>
                </div>
                <CardContent className="px-6 pb-7 pt-7 sm:px-8">
                  <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e32619]"><LockKeyhole className="h-3.5 w-3.5" /> {isHindi ? 'सुरक्षित साइन इन' : 'ACCOUNT ACCESS'}</div>
                    <h2 className="text-2xl font-black tracking-[-0.04em] text-[#222222]">{isRegisterMode ? (isHindi ? 'अपना अकाउंट बनाएं' : 'Create your account') : (isHindi ? 'वापसी पर स्वागत है' : 'Welcome back')}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#666666]">{isRegisterMode ? (isHindi ? 'अपनी दुकान के रिकॉर्ड व्यवस्थित करना शुरू करें।' : 'Set up your shop workspace in a few steps.') : (isHindi ? 'अपने शॉप वर्कस्पेस में साइन इन करें।' : 'Sign in to continue to your shop workspace.')}</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegisterMode && (
                      <div>
                        <Label htmlFor="shopName" className="text-xs font-bold text-[#333333]">{isHindi ? 'दुकान का नाम' : 'Shop name'}</Label>
                        <Input id="shopName" name="shopName" autoComplete="organization" value={shopNameInput} onChange={(event) => setShopNameInput(event.target.value)} placeholder={isHindi ? 'अपनी दुकान का नाम लिखें' : 'Enter your shop name'} className="mt-1.5 h-11 rounded-none border-[#dddddd] focus-visible:ring-[#002f6c]" />
                      </div>
                    )}
                    <div>
                      <Label htmlFor="email" className="text-xs font-bold text-[#333333]">{isHindi ? 'ईमेल' : 'Email address'}</Label>
                      <Input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-1.5 h-11 rounded-none border-[#dddddd] focus-visible:ring-[#002f6c]" />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-xs font-bold text-[#333333]">{isHindi ? 'पासवर्ड' : 'Password'}</Label>
                      <div className="relative mt-1.5">
                        <Input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete={isRegisterMode ? 'new-password' : 'current-password'} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder={isHindi ? 'अपना पासवर्ड लिखें' : 'Enter your password'} className="h-11 rounded-none border-[#dddddd] pr-11 focus-visible:ring-[#002f6c]" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#002f6c]">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-none bg-[#e32619] text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-[#bd1f15] disabled:opacity-60">
                      {isSubmitting ? (isHindi ? 'कृपया प्रतीक्षा करें…' : 'Please wait…') : isRegisterMode ? (isHindi ? 'अकाउंट बनाएं' : 'Create account') : (isHindi ? 'साइन इन करें' : 'Sign in')}
                      {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                    <p className="text-center text-xs text-[#666666]">
                      {isRegisterMode ? (isHindi ? 'पहले से अकाउंट है? ' : 'Already have an account? ') : (isHindi ? 'अकाउंट नहीं है? ' : "Don't have an account? ")}
                      <button type="button" onClick={() => setIsRegisterMode(!isRegisterMode)} className="font-bold text-[#002f6c] underline underline-offset-4 hover:text-[#e32619]">
                        {isRegisterMode ? (isHindi ? 'लॉगिन करें' : 'Sign in') : (isHindi ? 'रजिस्टर करें' : 'Create one')}
                      </button>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
