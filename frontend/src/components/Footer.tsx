const Footer = () => {
    return (
        <footer className="bg-white text-black flex flex-col px-20 ">
            <div className="flex gap-96 border-t border-black/25 py-20">
                <div className="flex flex-col gap-5">
                    <p className="text-2xl">About</p>
                    <ul>
                        <li>Our Mission and Why</li>
                        <li>News</li>
                        <li>Developers</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-5">
                    <p className="text-2xl">Features</p>
                    <ul>
                        <li>AI Assistant</li>
                        <li>Resource Prediction</li>
                        <li>Data Analysis</li>
                        <li>Vision based Detection</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-5">
                    <p className="text-2xl">More</p>
                    <ul>
                        <li>Ask for help</li>
                        <li>Become a Member</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </div>
            <div className="flex border-t border-black/25 text-sm py-8 text-black/70">
                © FutureCoders 2025. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
