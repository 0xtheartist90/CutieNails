'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import {
    Clock,
    Facebook,
    Globe,
    Hand,
    Instagram,
    MessageCircle,
    MapPin,
    Phone,
    Scissors,
    Waves
} from 'lucide-react';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent } from '@/registry/new-york-v4/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/registry/new-york-v4/ui/select';

type Locale = 'en' | 'th';
type ServiceCategory = 'nails' | 'foot-spa' | 'hair';

const translations = {
    en: {
        services: 'Services',
        booking: 'Booking',
        contact: 'Contact',
        bookNow: 'Book Now',
        promotion: 'Special Offer: 20% off all nail services this month. Book now and save.',
        heroEyebrow: 'Chiang Mai beauty studio',
        heroTagline: 'Nails, lashes, foot spa, and hair in one soft, polished space.',
        heroCta: 'Reserve your appointment',
        ourServices: 'Our Services',
        nails: 'Nails',
        footSpa: 'Foot Spa',
        hair: 'Hair',
        gelHand: 'Gel Hand',
        gelFoot: 'Gel Foot',
        pastelColors: 'Pastel / Opal / Glass Colors',
        addOns: 'Add-ons',
        addOnsDesc: 'Glitter, stones, PVC, nail art',
        footSpaService: 'Foot Spa',
        footSpaDesc: 'Soak, trim, scrub, and foot massage',
        washBlowDry: 'Wash & Blow-dry',
        straightening: 'Straightening',
        curling: 'Curling',
        startingFrom: 'Starting from',
        bookAppointment: 'Message Us Now',
        bookingLead: 'For bookings and quick questions, message the shop directly on LINE or Facebook.',
        bookingLineCta: 'Message on LINE',
        bookingFacebookCta: 'Message on Facebook',
        contactUs: 'Contact Us',
        phoneLabel: 'Phone',
        address: 'Address',
        addressText: 'Pimanthip Golf Course, Wing 41, Chiang Mai',
        openingHours: 'Opening Hours',
        openingHoursText: '10:00 - 20:00 daily',
        socialMedia: 'Social Media',
        allRightsReserved: 'All rights reserved.',
        language: 'Language',
        photoStripLabel: 'Selected category'
    },
    th: {
        services: 'บริการ',
        booking: 'จองคิว',
        contact: 'ติดต่อ',
        bookNow: 'จองเลย',
        promotion: 'โปรโมชั่นพิเศษ: ลด 20% สำหรับบริการเล็บทุกรายการในเดือนนี้ จองเลยและประหยัด',
        heroEyebrow: 'บิวตี้สตูดิโอในเชียงใหม่',
        heroTagline: 'เล็บ ขนตา สปาเท้า และผม ในบรรยากาศอบอุ่นและเรียบร้อย',
        heroCta: 'จองเวลานัดหมาย',
        ourServices: 'บริการของเรา',
        nails: 'เล็บ',
        footSpa: 'สปาเท้า',
        hair: 'ผม',
        gelHand: 'เจลมือ',
        gelFoot: 'เจลเท้า',
        pastelColors: 'สีพาสเทล / โอปอล / แก้ว',
        addOns: 'ส่วนเสริม',
        addOnsDesc: 'กลิตเตอร์ เพชร PVC และเนลอาร์ต',
        footSpaService: 'สปาเท้า',
        footSpaDesc: 'แช่เท้า ตัดแต่ง ขัดผิว และนวดเท้า',
        washBlowDry: 'สระและไดร์',
        straightening: 'ยืดผม',
        curling: 'ดัดผม',
        startingFrom: 'เริ่มต้นที่',
        bookAppointment: 'ทักหาเราได้เลย',
        bookingLead: 'หากต้องการจองคิวหรือสอบถามเพิ่มเติม ทักร้านได้โดยตรงทาง LINE หรือ Facebook',
        bookingLineCta: 'ทักผ่าน LINE',
        bookingFacebookCta: 'ทักผ่าน Facebook',
        contactUs: 'ติดต่อเรา',
        phoneLabel: 'โทรศัพท์',
        address: 'ที่อยู่',
        addressText: 'สนามกอล์ฟพิมานทิพย์ ปีก 41 เชียงใหม่',
        openingHours: 'เวลาเปิด-ปิด',
        openingHoursText: '10:00 - 20:00 ทุกวัน',
        socialMedia: 'โซเชียลมีเดีย',
        allRightsReserved: 'สงวนลิขสิทธิ์ทั้งหมด',
        language: 'ภาษา',
        photoStripLabel: 'หมวดที่เลือก'
    }
} as const;

const serviceDefinitions = [
    { key: 'gelHand', descriptionKey: 'startingFrom', price: '฿200', category: 'nails' },
    { key: 'gelFoot', descriptionKey: 'startingFrom', price: '฿250', category: 'nails' },
    { key: 'pastelColors', descriptionKey: '', price: '฿300', category: 'nails' },
    { key: 'addOns', descriptionKey: 'addOnsDesc', price: '', category: 'nails' },
    { key: 'footSpaService', descriptionKey: 'footSpaDesc', price: '฿499', category: 'foot-spa' },
    { key: 'washBlowDry', descriptionKey: '', price: '฿100', category: 'hair' },
    { key: 'straightening', descriptionKey: '', price: '฿150', category: 'hair' },
    { key: 'curling', descriptionKey: '', price: '฿200', category: 'hair' }
] as const satisfies ReadonlyArray<{
    key: keyof (typeof translations)['en'];
    descriptionKey: '' | keyof (typeof translations)['en'];
    price: string;
    category: ServiceCategory;
}>;

const carouselImages = [
    '/images/CutieNails1.png',
    '/images/CutieNails2.png',
    '/images/CutieNails3.png',
    '/images/CutieNails4.png',
    '/images/CutieNails5.png',
    '/images/CutieNails6.png'
];

const categoryImages: Record<ServiceCategory, string> = {
    nails: '/images/nails.png',
    'foot-spa': '/images/footspa.png',
    hair: '/images/hair washing.png'
};

const localeFlags: Record<Locale, string> = {
    en: '🇬🇧',
    th: '🇹🇭'
};

export function CutieLandingPage() {
    const [selectedFilter, setSelectedFilter] = useState<ServiceCategory>('nails');
    const [language, setLanguage] = useState<Locale>('en');
    const videoRef = useRef<HTMLVideoElement>(null);

    const t = translations[language];

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, []);

    const filters = useMemo(
        () => [
            { id: 'nails' as const, name: t.nails, icon: Hand },
            { id: 'foot-spa' as const, name: t.footSpa, icon: Waves },
            { id: 'hair' as const, name: t.hair, icon: Scissors }
        ],
        [t]
    );

    const services = useMemo(
        () =>
            serviceDefinitions.map((service) => ({
                name: t[service.key],
                description: service.descriptionKey ? t[service.descriptionKey] : '',
                price: service.price,
                category: service.category
            })),
        [t]
    );

    const filteredServices = services.filter((service) => service.category === selectedFilter);

    return (
        <main className='bg-[linear-gradient(180deg,#fff7f3_0%,#ffe9ee_45%,#fffdf9_100%)] text-[#4a3a33]'>
            <header className='sticky top-0 z-50 border-b border-white/40 bg-[#d9bea8]/90 backdrop-blur'>
                <div className='mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8'>
                    <div className='flex items-center justify-start md:hidden'>
                        <Select value={language} onValueChange={(value) => setLanguage(value as Locale)}>
                            <SelectTrigger className='h-10 w-[60px] rounded-lg border-white/30 bg-transparent text-white shadow-none'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-base leading-none'>{localeFlags[language]}</span>
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='en'>
                                    <span className='flex items-center gap-2'>
                                        <span>{localeFlags.en}</span>
                                        <span>English</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value='th'>
                                    <span className='flex items-center gap-2'>
                                        <span>{localeFlags.th}</span>
                                        <span>ไทย</span>
                                    </span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <a href='#top' className='flex items-center justify-center md:justify-start'>
                        <img src='/images/cutielogotopnav.png' alt='Cutie Nails & Spa' className='h-9 w-auto sm:h-10' />
                    </a>

                    <nav className='hidden items-center justify-center gap-10 text-base font-medium text-white md:flex'>
                        <a href='#services' className='transition-colors hover:text-[#f17492]'>
                            {t.services}
                        </a>
                        <a href='#booking' className='transition-colors hover:text-[#f17492]'>
                            {t.booking}
                        </a>
                        <a href='#contact' className='transition-colors hover:text-[#f17492]'>
                            {t.contact}
                        </a>
                    </nav>

                    <div className='hidden items-center justify-end gap-3 md:flex'>
                        <Select value={language} onValueChange={(value) => setLanguage(value as Locale)}>
                            <SelectTrigger className='h-10 w-[76px] rounded-lg border-white/30 bg-transparent text-white shadow-none'>
                                <div className='flex items-center gap-2'>
                                    <Globe className='size-4' />
                                    <span className='text-base leading-none'>{localeFlags[language]}</span>
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='en'>
                                    <span className='flex items-center gap-2'>
                                        <span>{localeFlags.en}</span>
                                        <span>English</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value='th'>
                                    <span className='flex items-center gap-2'>
                                        <span>{localeFlags.th}</span>
                                        <span>ไทย</span>
                                    </span>
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            asChild
                            className='rounded-lg bg-[#f17492] px-5 text-white shadow-none hover:bg-[#df6383]'>
                            <a href='#booking'>{t.bookNow}</a>
                        </Button>
                    </div>

                    <div className='flex items-center justify-end md:hidden'>
                        <Button
                            asChild
                            className='rounded-lg bg-[#f17492] px-4 text-white shadow-none hover:bg-[#df6383] sm:px-5'>
                            <a href='#booking'>{t.bookNow}</a>
                        </Button>
                    </div>
                </div>
            </header>

            <section
                id='top'
                className='relative flex min-h-[31vh] items-center justify-center overflow-hidden border-b border-[#e7d3c2] bg-[#d9bea8] py-16 sm:min-h-[36vh]'>
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='absolute inset-0 h-full w-full object-cover opacity-[0.18]'>
                    <source
                        src='https://horze8elcmmyjoto.public.blob.vercel-storage.com/cutiehero-qGN4GwJVpP7jkDiedfjnx2DQPORNHt.webm'
                        type='video/webm'
                    />
                </video>
                <div className='relative mx-auto flex w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8'>
                    <img src='/images/Cutielogo.png' alt='Cutie Nails & Spa' className='h-44 w-auto sm:h-56 md:h-64' />
                </div>
            </section>

            <section className='overflow-hidden bg-white'>
                <div className='cutie-marquee flex gap-0'>
                    {[...carouselImages, ...carouselImages].map((image, index) => (
                        <div key={`${image}-${index}`} className='flex-none'>
                            <img
                                src={image}
                                alt={`Cutie Nails gallery ${index + 1}`}
                                className='block h-[280px] w-auto max-w-none md:h-[245px]'
                            />
                        </div>
                    ))}
                </div>
            </section>

            <section id='services' className='bg-[#fee8eb] py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mx-auto mb-12 max-w-2xl text-center'>
                        <p className='text-xs tracking-[0.36em] text-[#c4607b] uppercase'>{t.services}</p>
                        <h2 className='mt-4 text-4xl font-semibold text-[#f17492] sm:text-5xl'>{t.ourServices}</h2>
                    </div>

                    <div className='mb-10 flex flex-wrap justify-center gap-3'>
                        {filters.map((filter) => {
                            const IconComponent = filter.icon;

                            return (
                                <Button
                                    key={filter.id}
                                    variant={selectedFilter === filter.id ? 'default' : 'outline'}
                                    onClick={() => setSelectedFilter(filter.id)}
                                    className={
                                        selectedFilter === filter.id
                                            ? 'rounded-full bg-[#f17492] px-6 text-white hover:bg-[#df6383]'
                                            : 'rounded-full border-[#f17492]/40 bg-white text-[#f17492] hover:bg-[#fff0f4]'
                                    }>
                                    <IconComponent className='size-4' />
                                    {filter.name}
                                </Button>
                            );
                        })}
                    </div>

                    <div className='grid gap-8 lg:grid-cols-[1.05fr_0.95fr]'>
                        <div className='grid gap-4'>
                            {filteredServices.map((service) => (
                                <Card
                                    key={`${service.category}-${service.name}`}
                                    className='border-[#f5d7dc] bg-white/90 py-0 shadow-[0_18px_45px_rgba(241,116,146,0.08)]'>
                                    <CardContent className='p-6'>
                                        <div className='flex items-start justify-between gap-4'>
                                            <div>
                                                <h3 className='text-lg font-medium text-[#58413b]'>{service.name}</h3>
                                                {service.description ? (
                                                    <p className='mt-2 text-sm leading-6 text-[#856b62]'>{service.description}</p>
                                                ) : null}
                                            </div>
                                            {service.price ? (
                                                <span className='rounded-full bg-[#fff1f5] px-4 py-2 text-sm font-medium text-[#f17492]'>
                                                    {service.price}
                                                </span>
                                            ) : null}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card className='overflow-hidden border-[#edcfbf] bg-[#fff8f4] py-0 shadow-[0_24px_64px_rgba(149,101,83,0.14)]'>
                            <CardContent className='p-0'>
                                <div className='relative'>
                                    <img
                                        src={categoryImages[selectedFilter]}
                                        alt={`${selectedFilter} service`}
                                        className='h-[460px] w-full object-cover'
                                    />
                                    <div className='absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(57,31,37,0.74))] p-6 text-white'>
                                        <p className='text-xs tracking-[0.32em] uppercase'>{t.photoStripLabel}</p>
                                        <p className='mt-2 text-2xl font-medium'>
                                            {filters.find((filter) => filter.id === selectedFilter)?.name}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section id='booking' className='bg-white'>
                <div className='grid min-h-[720px] lg:grid-cols-2'>
                    <div className='relative min-h-[360px] lg:min-h-full'>
                        <img
                            src='/images/booking nails.png'
                            alt='Booking preview'
                            className='absolute inset-0 h-full w-full object-cover'
                        />
                        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(53,32,36,0.1),rgba(53,32,36,0.46))]' />
                    </div>

                    <div className='bg-[#f17492] px-6 py-16 sm:px-10 lg:px-14'>
                        <div className='mx-auto max-w-xl'>
                            <p className='text-xs tracking-[0.34em] text-white/75 uppercase'>{t.booking}</p>
                            <h2 className='mt-4 text-4xl font-semibold text-white sm:text-5xl'>{t.bookAppointment}</h2>
                            <p className='mt-4 max-w-lg text-base leading-7 text-white/85'>{t.bookingLead}</p>
                            <div className='mt-10 grid gap-5'>
                                <a
                                    href='https://lin.ee/J8t7egb'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='group rounded-[2rem] bg-white px-6 py-6 text-[#5d4a43] transition-transform hover:-translate-y-1'>
                                    <div className='flex items-center justify-between gap-4'>
                                        <div>
                                            <p className='text-xs tracking-[0.28em] text-[#f17492] uppercase'>LINE</p>
                                            <p className='mt-2 text-2xl font-semibold'>{t.bookingLineCta}</p>
                                        </div>
                                        <div className='rounded-full bg-[#f17492] p-4 text-white'>
                                            <MessageCircle className='size-6' />
                                        </div>
                                    </div>
                                </a>

                                <a
                                    href='https://www.facebook.com/profile.php?id=100092538978586'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='group rounded-[2rem] bg-white/92 px-6 py-6 text-[#5d4a43] transition-transform hover:-translate-y-1'>
                                    <div className='flex items-center justify-between gap-4'>
                                        <div>
                                            <p className='text-xs tracking-[0.28em] text-[#f17492] uppercase'>Facebook</p>
                                            <p className='mt-2 text-2xl font-semibold'>{t.bookingFacebookCta}</p>
                                        </div>
                                        <div className='rounded-full bg-[#f17492] p-4 text-white'>
                                            <Facebook className='size-6' />
                                        </div>
                                    </div>
                                </a>

                                <div className='rounded-[2rem] border border-white/30 bg-white/10 px-6 py-5 text-white/88'>
                                    <div className='flex items-center gap-3'>
                                        <Clock className='size-5' />
                                        <p>{t.openingHoursText}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id='contact' className='bg-[linear-gradient(180deg,#fff7f3_0%,#ffeef1_100%)] py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mx-auto mb-12 max-w-2xl text-center'>
                        <p className='text-xs tracking-[0.36em] text-[#c4607b] uppercase'>{t.contact}</p>
                        <h2 className='mt-4 text-4xl font-semibold text-[#f17492] sm:text-5xl'>{t.contactUs}</h2>
                    </div>

                    <div className='grid gap-8 lg:grid-cols-[0.95fr_1.05fr]'>
                        <Card className='border-[#f3d4d9] bg-white/85 py-0 shadow-[0_24px_64px_rgba(170,117,130,0.1)] backdrop-blur-sm'>
                            <CardContent className='grid gap-8 p-8'>
                                <div className='flex items-start gap-4'>
                                    <div className='rounded-full bg-[#f17492] p-3 text-white'>
                                        <Phone className='size-5' />
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-medium text-[#58413b]'>{t.phoneLabel}</h3>
                                        <p className='mt-2 text-[#7a635a]'>095-148-3227</p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-4'>
                                    <div className='rounded-full bg-[#f17492] p-3 text-white'>
                                        <MapPin className='size-5' />
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-medium text-[#58413b]'>{t.address}</h3>
                                        <p className='mt-2 text-[#7a635a]'>{t.addressText}</p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-4'>
                                    <div className='rounded-full bg-[#f17492] p-3 text-white'>
                                        <Clock className='size-5' />
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-medium text-[#58413b]'>{t.openingHours}</h3>
                                        <p className='mt-2 text-[#7a635a]'>{t.openingHoursText}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className='text-lg font-medium text-[#58413b]'>{t.socialMedia}</h3>
                                    <div className='mt-4 flex gap-3'>
                                        <a
                                            href='https://www.instagram.com/cutie_nail09/'
                                            target='_blank'
                                            rel='noreferrer'
                                            className='rounded-full bg-[#f17492] p-3 text-white transition-transform hover:-translate-y-0.5'>
                                            <Instagram className='size-5' />
                                        </a>
                                        <a
                                            href='https://lin.ee/J8t7egb'
                                            target='_blank'
                                            rel='noreferrer'
                                            className='rounded-full bg-[#f17492] p-3 text-white transition-transform hover:-translate-y-0.5'>
                                            <MessageCircle className='size-5' />
                                        </a>
                                        <a
                                            href='https://www.facebook.com/profile.php?id=100092538978586'
                                            target='_blank'
                                            rel='noreferrer'
                                            className='rounded-full bg-[#f17492] p-3 text-white transition-transform hover:-translate-y-0.5'>
                                            <Facebook className='size-5' />
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className='overflow-hidden rounded-[2rem] border border-[#efd9d0] bg-white shadow-[0_24px_64px_rgba(122,90,80,0.12)]'>
                            <iframe
                                src='https://maps.google.com/maps?q=18.782598,98.975130&z=17&output=embed'
                                width='100%'
                                height='100%'
                                style={{ border: 0, minHeight: 480 }}
                                allowFullScreen
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                                title='Cutie Nails & Spa location'
                                className='w-full'
                            />
                        </div>
                    </div>
                </div>
            </section>

            <footer className='border-t border-white/30 bg-[#d9bea8] py-6 text-white'>
                <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
                    <img src='/images/Cutielogo.png' alt='Cutie Nails & Spa' className='mx-auto mb-3 h-24 w-auto' />
                    <p className='text-sm text-white/85'>
                        &copy; 2026 Cutie Nails & Spa. {t.allRightsReserved}
                    </p>
                    <p className='mt-1 text-sm text-white/80'>
                        {t.addressText} | 095-148-3227
                    </p>
                </div>
            </footer>
        </main>
    );
}
