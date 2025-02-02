function ContactPage() {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
            <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-24">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message
                        and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Contact Information */}
                    <div className="md:col-span-1 space-y-8">
                        {/* Email Contact */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                            <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
                            <a href="mailto:support@ingilizcem.net" className="text-blue-600 hover:text-blue-700">
                                support@ingilizcem.net
                            </a>
                        </div>

                        {/* Office Location */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Office</h3>
                            <p className="text-gray-600">
                                123 Learning Street<br />
                                Education District<br />
                                Istanbul, Turkey
                            </p>
                        </div>

                        {/* Phone Contact */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                            <p className="text-gray-600 mb-4">Mon-Fri from 8am to 5pm</p>
                            <a href="tel:+901234567890" className="text-purple-600 hover:text-purple-700">
                                +90 (123) 456-7890
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-8">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Your message..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                question: "How do I get started?",
                                answer: "Simply sign up for a free account and you can start learning immediately with our basic features."
                            },
                            {
                                question: "What payment methods do you accept?",
                                answer: "We accept all major credit cards, PayPal, and bank transfers for premium subscriptions."
                            },
                            {
                                question: "Can I cancel my subscription?",
                                answer: "Yes, you can cancel your subscription at any time from your account settings."
                            },
                            {
                                question: "Is there a mobile app?",
                                answer: "Yes, our mobile app is available for both iOS and Android devices."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;