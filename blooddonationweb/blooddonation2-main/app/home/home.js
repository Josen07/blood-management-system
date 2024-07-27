import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // const bgImageUrl = "/bg.jpg";
  const bgImageUrl = "/homebg.png";
 
  return (
    <div>
      <section
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${bgImageUrl})`}}
      >
        <div className="container mx-auto px-4">
          <div className="container mx-auto px-4 text-white text-center malgun gothic">
            {/* home */}

            <div className="flex min-h-screen flex-col items-center justify-between p-24">
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center  p-20 rounded-lg reg-box">
                  <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-center md:text-left text-white">
                      Find blood requests near you
                    </h1>
                    <p className="text-white-700 text-center md:text-left mt-4">
                      Help save lives by donating blood. Find blood requests in
                      your area and connect with those in need.
                    </p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="flex justify-center md:justify-start mt-8">
                      <Link
                        href="/registration"
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md"
                      >
                        Register now
                      </Link>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 ml-8">
                    <img
                      className="w-full rounded-3xl shadow-xl"
                      // src="https://www.hindustantimes.com/ht-img/img/2023/07/03/550x309/nguy-n-hi-p-2rNHliX6XHk-unsplash_1688396744688_1688396760765.jpg"
                      // src="blood-donation-home.jpg"
                      // alt="Blood donation illustration"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
