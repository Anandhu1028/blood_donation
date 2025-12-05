import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function FaqPage() {
    const [openIndex, setOpenIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            question: "Who can donate blood?",
            answer: "Most healthy adults aged 18-65 who weigh at least 50kg can donate. You should be in good general health, feeling well on the day of donation, and meet specific hemoglobin requirements."
        },
        {
            question: "Does donating blood hurt?",
            answer: "You may feel a slight pinch when the needle is inserted, but the actual donation process is painless. Most donors describe it as a minor discomfort that is well worth the result."
        },
        {
            question: "How long does the process take?",
            answer: "The entire process takes about 45-60 minutes. This includes registration, a mini-physical, the actual donation (which takes only 8-10 minutes), and a short recovery period with refreshments."
        },
        {
            question: "How often can I donate?",
            answer: "You can donate whole blood every 56 days (8 weeks). Platelet donation can be done more frequently, up to 24 times a year, while Power Red donation requires a 112-day wait."
        },
        {
            question: "What should I do before donating?",
            answer: "Drink plenty of water (an extra 16oz), eat a healthy meal avoiding fatty foods, and get a good night's sleep. Wear a shirt with sleeves that can be easily rolled up."
        },
        {
            question: "Are there side effects?",
            answer: "Most people feel fine after donating. Some may experience temporary lightheadedness or bruising at the needle site. Drinking fluids and eating a snack immediately after helps prevent this."
        },
        {
            question: "Can I donate if I have a tattoo?",
            answer: "In many regions, you can donate immediately if your tattoo was applied by a state-regulated entity using sterile needles. Otherwise, there may be a 3-12 month deferral period."
        },
        {
            question: "What happens to my blood after donation?",
            answer: "Your blood is tested, processed into components (red cells, plasma, platelets), labeled, and stored. It is then shipped to hospitals 24/7 to help patients in need."
        },
        {
            question: "Can I donate if I'm taking medication?",
            answer: "Most medications do not disqualify you from donating. However, some drugs (like certain blood thinners or acne medications) have deferral periods. Check with the donation center beforehand."
        },
        {
            question: "Is it safe to donate blood?",
            answer: "Yes, absolutely. New, sterile, disposable needles and supplies are used for every donor. You cannot contract any disease from donating blood."
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-page text-page">
            {/* Hero Section */}
            <div className="bg-hero-gradient py-20 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h1>
                    <p className="text-xl text-page-subtle max-w-2xl mx-auto mb-10">
                        Have questions about blood donation? We have answers.
                        Everything you need to know before you donate.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-page-subtle" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for a question..."
                            className="w-full pl-12 pr-4 py-4 bg-card border border-page-border rounded-2xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all shadow-lg shadow-black/5"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </motion.div>
            </div>

            <div className="container-custom px-4 py-16 max-w-3xl mx-auto">

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index
                                        ? 'bg-card border-accent/50 shadow-lg shadow-accent/5'
                                        : 'bg-card/50 border-page-border hover:border-page-border/80'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className={`text-lg font-bold ${openIndex === index ? 'text-accent' : 'text-page'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-accent/10 text-accent' : 'bg-page-border/30 text-page-subtle'}`}>
                                        {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-page-subtle leading-relaxed border-t border-page-border/50 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-page-subtle">No questions found matching your search.</p>
                            <Button variant="link" onClick={() => setSearchQuery('')} className="mt-2 text-accent">
                                Clear search
                            </Button>
                        </div>
                    )}
                </div>

                {/* Still have questions? */}
                <div className="mt-20 text-center bg-card border border-page-border rounded-3xl p-10">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                        <MessageCircle className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                    <p className="text-page-subtle mb-8 max-w-md mx-auto">
                        Can't find the answer you're looking for? Please chat to our friendly team.
                    </p>
                    <Button size="lg">Contact Support</Button>
                </div>

            </div>
        </div>
    );
}

export default FaqPage;
