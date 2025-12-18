const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence, useScroll, useSpring, useTransform } = window.Motion;

// --- ДАННЫЕ (Обновленные картинки и категории) ---
const translations = {
    ru: {
        nav: ["Главная", "Номера", "Услуги", "Галерея", "Контакты"],
        hero: {
            title: "Искусство Жить Красиво",
            subtitle: "Оазис роскоши и спокойствия, где каждая деталь создана для вашего комфорта.",
            btn: "Выбрать Даты"
        },
        stats: ["Довольных гостей", "Роскошных люксов", "Лет истории", "Награды"],
        rooms: {
            title: "Коллекция Номеров",
            filters: ["Все", "Стандарт", "Люкс"],
            list: [
                { id: 1, type: "Стандарт", category: "Стандарт", price: "7 000 ₽", desc: "Уютный номер с видом на тихий сад.", img: "http://gorod-novoross.ru/news_foto/full/3rkdup8zsbc601y9g-v2n4owlxt_7j.jpg?auto=format&fit=crop&w=800&q=80" },
                { id: 2, type: "Делюкс", category: "Стандарт", price: "12 000 ₽", desc: "Просторный номер с рабочей зоной и ванной.", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80" },
                { id: 3, type: "Люкс 'Панорама'", category: "Люкс", price: "25 000 ₽", desc: "Панорамные окна, джакузи и доступ в лаунж.", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
                { id: 4, type: "Королевский Люкс", category: "Люкс", price: "55 000 ₽", desc: "Двухуровневый пентхаус с личным дворецким.", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80" }
            ],
            bookBtn: "Забронировать"
        },
        booking: {
            title: "Забронируйте Ваш Отдых",
            name: "Ваше Имя",
            phone: "Телефон / WhatsApp",
            checkin: "Дата Заезда",
            checkout: "Дата Выезда",
            submit: "Проверить Наличие",
            success: "Заявка отправлена! Менеджер свяжется с вами через 5 минут."
        },
        services: "Сервис Мирового Уровня",
        gallery: "Атмосфера",
        reviews: "Гости о нас",
        contact: "Контакты",
        footer: "Создано для ценителей прекрасного."
    },
    en: {
        nav: ["Home", "Rooms", "Services", "Gallery", "Contacts"],
        hero: {
            title: "The Art of Living Well",
            subtitle: "An oasis of luxury and calm where every detail is crafted for your comfort.",
            btn: "Select Dates"
        },
        stats: ["Happy Guests", "Luxury Suites", "Years History", "Awards Won"],
        rooms: {
            title: "Room Collection",
            filters: ["All", "Standard", "Suite"],
            list: [
                { id: 1, type: "Standard", category: "Standard", price: "$120", desc: "Cozy room with a quiet garden view.", img: "https://images.unsplash.com/photo-1611892440504-42074fd87df1?auto=format&fit=crop&w=800&q=80" },
                { id: 2, type: "Deluxe", category: "Standard", price: "$200", desc: "Spacious room with work area and bathtub.", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80" },
                { id: 3, type: "Panorama Suite", category: "Suite", price: "$450", desc: "Panoramic windows, jacuzzi and lounge access.", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
                { id: 4, type: "Royal Penthouse", category: "Suite", price: "$900", desc: "Bi-level penthouse with private butler.", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80" }
            ],
            bookBtn: "Book Now"
        },
        booking: {
            title: "Book Your Stay",
            name: "Your Name",
            phone: "Phone / WhatsApp",
            checkin: "Check-in Date",
            checkout: "Check-out Date",
            submit: "Check Availability",
            success: "Request sent! Our manager will contact you in 5 minutes."
        },
        services: "World Class Service",
        gallery: "Atmosphere",
        reviews: "Guest Reviews",
        contact: "Contact Us",
        footer: "Created for connoisseurs of beauty."
    }
};

// --- АНИМАЦИИ ---
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

// --- КОМПОНЕНТЫ ---

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gold origin-left z-[60]" style={{ scaleX }} />;
};

const BackToTop = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const checkScroll = () => setShow(window.scrollY > 500);
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 bg-gold text-dark w-12 h-12 rounded-full shadow-lg z-40 flex items-center justify-center hover:bg-white transition-colors"
                >
                    <i className="fas fa-arrow-up"></i>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

const OrbitalBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-[500px] h-[500px] bg-blue-600/10 top-[-10%] left-[-10%]"></div>
        <div className="orb w-[400px] h-[400px] bg-gold/10 bottom-[-10%] right-[-10%]" style={{animationDelay: '2s'}}></div>
        <div className="orb w-[300px] h-[300px] bg-purple-500/10 top-[40%] left-[60%]" style={{animationDelay: '4s'}}></div>
    </div>
);

const Navbar = ({ lang, setLang, content }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3' : 'py-6 bg-transparent'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold font-serif text-white tracking-widest text-glow cursor-pointer">
                        LUXE<span className="text-gold">HORIZON</span>
                    </div>
                    {/* Weather Widget Mock */}
                    <div className="hidden lg:flex items-center text-xs text-gray-400 gap-2 border-l border-white/20 pl-4 ml-4">
                        <i className="fas fa-cloud-sun text-gold"></i>
                        <span>+24°C, Sunny</span>
                    </div>
                </div>
                
                <div className="hidden md:flex space-x-8 items-center">
                    {content.nav.map((item, i) => (
                        <a key={i} href={`#section-${i}`} className="text-xs uppercase font-bold tracking-widest hover:text-gold transition-colors text-white relative group">
                            {item}
                            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                    <button 
                        onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
                        className="border border-white/20 px-4 py-1 rounded-full text-xs font-bold hover:bg-gold hover:text-dark hover:border-gold transition-all"
                    >
                        {lang.toUpperCase()}
                    </button>
                </div>

                <div className="md:hidden z-50 text-white cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
                    <i className={`fas fa-${mobileOpen ? 'times' : 'bars'} text-2xl`}></i>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="fixed inset-0 bg-dark z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {content.nav.map((item, i) => (
                            <a key={i} href={`#section-${i}`} onClick={() => setMobileOpen(false)} className="text-2xl font-serif text-white hover:text-gold">{item}</a>
                        ))}
                        <button onClick={() => {setLang(lang === 'ru' ? 'en' : 'ru'); setMobileOpen(false)}} className="text-gold border border-gold px-6 py-2 rounded-full">
                            Change Language ({lang.toUpperCase()})
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Hero = ({ content }) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <section id="section-0" className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                {/* High Quality Hotel Facade */}
                <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover brightness-50" />
                <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-transparent to-dark"></div>
            </motion.div>

            <div className="relative z-10 max-w-5xl px-4">
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-5xl md:text-8xl font-bold mb-6 text-white leading-tight font-serif drop-shadow-2xl"
                >
                    {content.hero.title}
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-lg md:text-2xl text-gray-200 mb-12 font-light max-w-2xl mx-auto"
                >
                    {content.hero.subtitle}
                </motion.p>
                <motion.a 
                    href="#section-booking"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="inline-block bg-gold text-dark px-12 py-4 uppercase tracking-[0.2em] font-bold text-sm hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300"
                >
                    {content.hero.btn}
                </motion.a>
            </div>
            
            <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            >
                <i className="fas fa-chevron-down text-2xl"></i>
            </motion.div>
        </section>
    );
};

const Stats = ({ content }) => {
    const numbers = ["15k+", "45", "25", "5"];
    return (
        <div className="relative z-20 -mt-24 mx-4 md:mx-auto max-w-6xl">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-8 md:p-12 rounded-none md:rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-dark/60"
            >
                {content.stats.map((item, i) => (
                    <div key={i} className="border-r border-white/10 last:border-0">
                        <div className="text-3xl md:text-5xl font-serif text-gold mb-2">{numbers[i]}</div>
                        <div className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-bold">{item}</div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const About = ({ lang }) => (
    <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-20">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:w-1/2 relative"
            >
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/50"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold/50"></div>
                {/* High Quality Interior Shot */}
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" />
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:w-1/2"
            >
                <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-6 flex items-center">
                    <span className="w-10 h-[1px] bg-gold mr-4"></span>
                    {lang === 'ru' ? 'История' : 'History'}
                </h4>
                <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">{lang === 'ru' ? 'Элегантность вне времени' : 'Timeless Elegance'}</h2>
                <p className="text-gray-400 mb-6 leading-relaxed text-lg font-light">
                    {lang === 'ru' 
                        ? 'В самом сердце города возвышается LuxeHorizon — место, где классическая роскошь встречается с современным комфортом. Мы не просто отель, мы — ваш личный дворец, где предугадывают каждое желание.'
                        : 'In the heart of the city stands LuxeHorizon — a place where classic luxury meets modern comfort. We are not just a hotel, we are your personal palace where every wish is anticipated.'}
                </p>
                <button className="text-white border-b border-gold pb-1 hover:text-gold transition-colors uppercase text-xs tracking-widest">
                    {lang === 'ru' ? 'Читать Больше' : 'Read More'}
                </button>
            </motion.div>
        </div>
    </section>
);

const Rooms = ({ content }) => {
    const [filter, setFilter] = useState("Все"); // Default filter
    const [filteredRooms, setFilteredRooms] = useState(content.rooms.list);

    useEffect(() => {
        if (filter === "Все" || filter === "All") {
            setFilteredRooms(content.rooms.list);
        } else {
            setFilteredRooms(content.rooms.list.filter(room => 
                filter === "Люкс" || filter === "Suite" ? room.category === "Люкс" || room.category === "Suite" : room.category === "Стандарт" || room.category === "Standard"
            ));
        }
    }, [filter, content.rooms.list]);

    return (
        <section id="section-1" className="py-32 bg-dark/50 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
            
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif mb-4">{content.rooms.title}</h2>
                        <div className="w-20 h-1 bg-gold"></div>
                    </div>
                    
                    {/* Filter Buttons */}
                    <div className="flex space-x-4">
                        {content.rooms.filters.map((f, i) => (
                            <button 
                                key={i}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-full border border-white/10 text-sm transition-all ${filter === f ? 'bg-gold text-dark font-bold' : 'hover:bg-white/10'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                
                <motion.div 
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    <AnimatePresence>
                        {filteredRooms.map((room) => (
                            <motion.div 
                                layout
                                key={room.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group cursor-pointer"
                            >
                                <div className="h-[400px] relative overflow-hidden mb-6">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
                                    <img src={room.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute bottom-6 left-6 z-20">
                                        <div className="bg-white text-dark px-4 py-1 text-xs font-bold uppercase tracking-widest inline-block mb-2">{room.type}</div>
                                        <div className="text-gold font-serif text-xl">{room.price} <span className="text-white text-xs font-sans">/ night</span></div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">{room.type}</h3>
                                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{room.desc}</p>
                                <a href="#section-booking" className="text-xs uppercase tracking-widest border-b border-white/20 pb-1 hover:border-gold hover:text-gold transition-all">
                                    {content.rooms.bookBtn} <i className="fas fa-arrow-right ml-2 text-[10px]"></i>
                                </a>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

const SpecialOffer = ({ lang }) => (
    <div className="bg-gold py-4 overflow-hidden relative border-y-4 border-double border-dark/20">
        <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="whitespace-nowrap flex"
        >
            {[1, 2, 3, 4].map((item) => (
                <span key={item} className="text-dark font-bold uppercase tracking-widest text-sm mx-8 flex items-center">
                    <i className="fas fa-star text-xs mr-4"></i>
                    {lang === 'ru' 
                    ? 'Получите скидку 20% при прямом бронировании • Бесплатный завтрак и трансфер •'
                    : 'Get 20% off on direct booking • Free Breakfast & Transfer Included •'}
                </span>
            ))}
        </motion.div>
    </div>
);

const Services = ({ content }) => {
    const icons = ["utensils", "spa", "dumbbell", "swimming-pool", "car", "wifi"];
    const titles = ["Michelin Dining", "Luxury SPA", "Technogym", "Infinity Pool", "Rolls-Royce", "High-Speed Wi-Fi"];
    
    return (
        <section id="section-2" className="py-32 container mx-auto px-6">
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="text-center mb-20"
            >
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif mb-6">{content.services}</motion.h2>
                <motion.div variants={fadeInUp} className="w-24 h-1 bg-gold mx-auto"></motion.div>
            </motion.div>

            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10 border border-white/10"
            >
                {titles.map((title, i) => (
                    <motion.div 
                        key={i}
                        variants={fadeInUp}
                        className="glass bg-dark/40 p-12 text-center hover:bg-gold/10 transition-colors group border border-transparent hover:border-gold/30"
                    >
                        <div className="h-16 flex items-center justify-center mb-6">
                            <i className={`fas fa-${icons[i]} text-4xl text-gold/80 group-hover:text-gold group-hover:scale-110 transition-transform duration-300`}></i>
                        </div>
                        <h3 className="font-serif text-lg tracking-wide">{title}</h3>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

const Gallery = ({ content }) => {
    const [selectedImg, setSelectedImg] = useState(null);
    // Stable, beautiful Unsplash images
    const images = [
        "https://hotels.sletat.ru/i/f/16591_16.jpg?w=800", // Pool
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800", // Restaurant
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800", // Spa
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800", // Room detail
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", // Lobby
        "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800"  // Food
    ];

    return (
        <section id="section-3" className="py-32">
            <div className="container mx-auto px-6 mb-16 flex justify-between items-end">
                <h2 className="text-4xl md:text-5xl font-serif">{content.gallery}</h2>
                <div className="hidden md:block w-32 h-px bg-white/30"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 md:h-[600px]">
                {images.map((img, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedImg(img)}
                        className="relative group cursor-pointer overflow-hidden h-60 md:h-full border border-dark/50"
                    >
                        <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110" />
                        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <i className="fas fa-search-plus text-white text-3xl drop-shadow-md"></i>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImg && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    >
                        <motion.img 
                            initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                            src={selectedImg} 
                            className="max-w-full max-h-[90vh] shadow-2xl border-4 border-dark" 
                        />
                        <button className="absolute top-8 right-8 text-white text-4xl hover:text-gold transition">
                            <i className="fas fa-times"></i>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const Reviews = ({ content }) => (
    <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
             <img src="https://www.transparenttextures.com/patterns/cubes.png" />
        </div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <i className="fas fa-quote-right text-6xl text-gold/30 mb-8 block"></i>
                <p className="text-2xl md:text-4xl font-serif italic text-white mb-10 leading-normal">
                    "Absolutely breathtaking. The attention to detail is unmatched, and the staff treats you like royalty. The best hotel experience I've ever had."
                </p>
                <div className="flex flex-col items-center">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-16 h-16 rounded-full border-2 border-gold mb-4" />
                    <div className="font-bold text-gold text-lg tracking-widest uppercase">Jonathan Sterling</div>
                    <div className="text-xs text-gray-500 uppercase mt-1">CEO, TechGlobal</div>
                    <div className="flex mt-4 text-gold space-x-1 text-sm">
                        {[1,2,3,4,5].map(s => <i key={s} className="fas fa-star"></i>)}
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
);

const BookingForm = ({ content }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section id="section-booking" className="py-32 relative">
             <div className="absolute inset-0">
                 <img src="https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&w=1920" className="w-full h-full object-cover opacity-20" />
                 <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark"></div>
             </div>
             
             <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-center gap-16">
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-5xl font-serif mb-6 text-white">{content.booking.title}</h2>
                    <p className="text-gray-400 text-lg mb-8">Забронируйте напрямую и получите комплимент от шеф-повара и ранний заезд.</p>
                    <div className="flex flex-col gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-4"><i className="fas fa-check text-gold"></i> Лучшая цена гарантирована</div>
                        <div className="flex items-center gap-4"><i className="fas fa-check text-gold"></i> Без скрытых комиссий</div>
                    </div>
                </div>

                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="glass p-10 rounded-2xl w-full max-w-md shadow-2xl border-t border-white/10"
                >
                    {submitted ? (
                        <motion.div initial={{scale: 0.8}} animate={{scale: 1}} className="text-center text-gold py-16">
                            <div className="w-20 h-20 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-check text-4xl"></i>
                            </div>
                            <h3 className="text-2xl font-serif mb-2">Confirmed</h3>
                            <p className="text-white text-sm">{content.booking.success}</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2 block">{content.booking.name}</label>
                                <input type="text" required className="w-full bg-dark/80 border border-gray-700 p-4 rounded text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition placeholder-gray-600" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2 block">{content.booking.phone}</label>
                                <input type="tel" required className="w-full bg-dark/80 border border-gray-700 p-4 rounded text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition placeholder-gray-600" placeholder="+1 ..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2 block">{content.booking.checkin}</label>
                                    <input type="date" className="w-full bg-dark/80 border border-gray-700 p-4 rounded text-white focus:border-gold outline-none transition text-sm" />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2 block">{content.booking.checkout}</label>
                                    <input type="date" className="w-full bg-dark/80 border border-gray-700 p-4 rounded text-white focus:border-gold outline-none transition text-sm" />
                                </div>
                            </div>
                            <button className="w-full bg-gold text-dark font-bold py-5 rounded hover:bg-white transition-all uppercase tracking-[0.2em] text-xs shadow-[0_0_20px_rgba(212,175,55,0.3)] mt-4">
                                {content.booking.submit}
                            </button>
                        </form>
                    )}
                </motion.div>
             </div>
        </section>
    );
};

const Contacts = ({ content }) => (
    <section id="section-4" className="py-32 container mx-auto px-6 border-t border-white/5">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl md:text-5xl font-serif mb-12">{content.contact}</h2>
                <ul className="space-y-8">
                    <li className="flex items-start group">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mr-6 group-hover:border-gold transition-colors">
                            <i className="fas fa-map-marker-alt text-gold"></i>
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Address</div>
                            <span className="text-xl">123 Luxury Avenue, Metropolis City</span>
                        </div>
                    </li>
                    <li className="flex items-start group">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mr-6 group-hover:border-gold transition-colors">
                            <i className="fas fa-phone-alt text-gold"></i>
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Phone</div>
                            <span className="text-xl">+1 (800) 123-45-67</span>
                        </div>
                    </li>
                    <li className="flex items-start group">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mr-6 group-hover:border-gold transition-colors">
                            <i className="fas fa-envelope text-gold"></i>
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Email</div>
                            <span className="text-xl">concierge@luxehorizon.com</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="glass p-2 rounded-xl relative group h-[400px]">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.2922926156743895!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1647526725203!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{border:0, filter: 'grayscale(100%) invert(92%) contrast(83%)'}} 
                    allowFullScreen="" 
                    loading="lazy"
                    className="rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                ></iframe>
            </div>
         </div>
    </section>
);

const Footer = ({ content }) => (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10 text-center relative z-10">
        <div className="text-3xl font-bold font-serif text-white tracking-widest mb-8 cursor-pointer hover:text-gold transition-colors">
            LUXE<span className="text-gold">HORIZON</span>
        </div>
        <div className="flex justify-center space-x-10 mb-10">
            <i className="fab fa-instagram text-2xl text-gray-400 hover:text-gold cursor-pointer transition transform hover:scale-110"></i>
            <i className="fab fa-facebook-f text-2xl text-gray-400 hover:text-gold cursor-pointer transition transform hover:scale-110"></i>
            <i className="fab fa-twitter text-2xl text-gray-400 hover:text-gold cursor-pointer transition transform hover:scale-110"></i>
            <i className="fab fa-tripadvisor text-2xl text-gray-400 hover:text-gold cursor-pointer transition transform hover:scale-110"></i>
        </div>
        <div className="w-full h-px bg-white/10 max-w-xs mx-auto mb-8"></div>
        <p className="text-gray-600 text-xs tracking-widest uppercase">© 2025 LuxeHorizon. {content.footer}</p>
    </footer>
);

// --- APP ---
const App = () => {
    const [lang, setLang] = useState('ru');
    const content = translations[lang];

    return (
        <div className="text-white selection:bg-gold selection:text-black">
            <ScrollProgress />
            <OrbitalBackground />
            <Navbar lang={lang} setLang={setLang} content={content} />
            
            <Hero content={content} />
            <Stats content={content} />
            <About lang={lang} />
            <SpecialOffer lang={lang} />
            <Rooms content={content} />
            <Services content={content} />
            <Gallery content={content} />
            <Reviews content={content} />
            <BookingForm content={content} />
            <Contacts content={content} />
            <Footer content={content} />
            <BackToTop />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
