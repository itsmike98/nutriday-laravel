import React from "react";

export default function Header({ loginRoute, registerRoute }) {
    return (
        <>
            <header
                className="flex h-[100vh] items-center bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "linear-gradient(to top right, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0)), url('/assets/images/bg-landing-healthy-food.jpg')",
                }}
            >
                <div
                    id="sidebar"
                    className="hidden md:block flex-col px-10 justify-items-center "
                >
                    <div
                        id="line"
                        className="h-[50vh] w-[2px] bg-gray-300 mb-4"
                    />
                    <div id="social-icons" className="icons">
                        <div className="social-icon">
                            <svg
                                width={25}
                                height={26}
                                viewBox="0 0 25 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <rect
                                    width={25}
                                    height={26}
                                    fill="url(#pattern0_19_25)"
                                />
                                <defs>
                                    <pattern
                                        id="pattern0_19_25"
                                        patternContentUnits="objectBoundingBox"
                                        width={1}
                                        height={1}
                                    >
                                        <use
                                            xlinkHref="#image0_19_25"
                                            transform="matrix(0.0111111 0 0 0.0106838 0 0.0192308)"
                                        />
                                    </pattern>
                                    <image
                                        id="image0_19_25"
                                        width={90}
                                        height={90}
                                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEyklEQVR4nO2dy4tdRRCHC4zG4AsEMb5QiQ8MrqIh4INcRAUXvhBficFEEzcJjknQpbiKo6s44L/gRoivRUTBpS8iYxIXbnyBGs1kJhGRzOBMPqmZItzEe+f0nO5zTvc5/cFshumu6h93zumurqorkslkMplMJpPJZDIZN4BzgLXA88CbwPvAIeAHYAqYsZ8p+90h+5s3bMztOoejuW4BXA28BHwE/IU/J4APgRHgKukywApgE/ApMEd1zAKfAM8A50tXAC60T9pv1M9R4DXgEmkrwLnAy8AkzaM+7FafpE0AdwOHiY/vgXsldfSZCLwNnCJe1LcxYLmkCHAd8CXp8A1wg6SE/jsG2qbVjW4L75EUAB4FTpIuM8CTEjPACxXvietC17BNYgR4xA4HbWEOeEJiQp9rwDTtYwa4X2IAuDHRF99SXpCrmhZ5uW2L2s6BRvfZdhjpCmNNiby+5Invb2Av8CBwB/AY8E7kp0fMv7uaCBB9V8LZI8DNQ+Z8OgGx9ZJhWZ1CaxSuDJsK5n2X+NlZl8gXeYQ6Ly2YewvxM6Ex9TqEfsXDyRUFcz9FGuyu4/rpDw8HewXzv0Ua/F7ptZjd8fnw+bD9KHAr8A/psLFKofUi1Zcv7Mg+//YGVgIvAsdJi4+rTAkIGZmbS+wTfDYaQLuiCqE17yJzJjuqEFqTWzJnsi+0yMssiuWFuNkqNdZCAv27Ao3DPACsBi6z0+w1wAbgM8IwFTT9zHLhvBE3Wz5Cz1q+XuHWC3gO+DfAsm5z1dFl8Zo86I242fIRekfN21Vly1JsFjmknxJvxM1WqbFlj8X6nPVc1mgZu8Oc+cDTmXkcbQ0k2GL+b+8W/HgvpDMHPZ2Zx9HWQIItZrDNryjPeEhHfvJw5DSOtgayxHjMNmCPXiw4jtEM07L86OqbiyPHPBw5jaMtn7F6UfzLWafPEYdxD1GeCQmFXbt7I262fMYO2h9r1tTKgnE3eSxr2lXHVggNXL7IVdizBWP1QBOF0NE/OoB1i5h+tWDsebE8On4mAOJmq9RYvVRYxPSesnbrfhlGv72jOaHHO3VgoTmh93XtCN5rSOjXXXVsS1Cp15DQm111bEuYtNeQ0GtcdXStz/a+PBU3WykJfTx43bnVVnshbnZSEjrsVZY5omXFXoibnZSE3i6hAa70rVERNzupCD1bFEMpjXUJKI242UhF6P1SFb53bOJmIxWhN0jFtd2l2z+Im40UhD5SlBnbZBJ6m9hVqcgm9AWWjN1VjtWSiG5ia1ORrjJSi8h9KWLf0j0O1961RkvBEqiiComudX2tIveJrZ1busLeRkTuK1HW8t2287XeKzYmtIm9KkRKb8RohO56iQE7LKTcdWYYmmZxn8QE8HALG6M8LjFiOW9taPUzC2yVmLGWPyk/Rqaja/EzDKsjPJHoi68nKQFca8WbqXCg8ZY+nvvsschPkKesUUuz++SAx/WDxIf6dKe0CRYCUTsjCbFO2GVzfd1k6oaFeLYu8tcGBP7Tyigulq7AwrXYRu0SUPFBR+febxWz3Wk9PwjtEqDFmFpKZmW/vkzZXNsrSwlIHRbSz9ZYCfGoFVyO21eBTPZ9Pcik/W7c/mbUejLp2Pz1IJlMJpPJZDKZTCYjjvwH0otdcKMyphQAAAAASUVORK5CYII="
                                    />
                                </defs>
                            </svg>
                        </div>
                        <div className="social-icon">
                            <svg
                                width={25}
                                height={28}
                                viewBox="0 0 25 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <rect
                                    width={25}
                                    height={28}
                                    fill="url(#pattern0_19_24)"
                                />
                                <defs>
                                    <pattern
                                        id="pattern0_19_24"
                                        patternContentUnits="objectBoundingBox"
                                        width={1}
                                        height={1}
                                    >
                                        <use
                                            xlinkHref="#image0_19_24"
                                            transform="matrix(0.0111111 0 0 0.00992063 0 0.0535714)"
                                        />
                                    </pattern>
                                    <image
                                        id="image0_19_24"
                                        width={90}
                                        height={90}
                                        xlinkHref="data:image/png;base64,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"
                                    />
                                </defs>
                            </svg>
                        </div>
                        <div className="social-icon">
                            <svg
                                width={25}
                                height={28}
                                viewBox="0 0 25 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <rect
                                    width={25}
                                    height={28}
                                    fill="url(#pattern0_19_23)"
                                />
                                <defs>
                                    <pattern
                                        id="pattern0_19_23"
                                        patternContentUnits="objectBoundingBox"
                                        width={1}
                                        height={1}
                                    >
                                        <use
                                            xlinkHref="#image0_19_23"
                                            transform="matrix(0.0111111 0 0 0.00992063 0 0.0535714)"
                                        />
                                    </pattern>
                                    <image
                                        id="image0_19_23"
                                        width={90}
                                        height={90}
                                        xlinkHref="data:image/png;base64,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"
                                    />
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="w-5/6 max-w-3xl pl-16 md:pl-24 lg:pl-52">
                    <h1 className="">
                        Healthy
                        <br />
                        Living
                    </h1>
                    <p className="mt-5">
                        Unlock a healthier you with NutriDay. Lose weight, build
                        muscle, or maintain a healthy lifestyle, NutriDay
                        provides the tools and insights you need to stay on
                        track and reach your goals with ease
                    </p>
                    <a href={loginRoute} className="inline-block">
                        <button className="mt-7 font-bold border-4 border-[#c7c7c7] px-8 py-1 rounded-xl hover:bg-[#c7c7c7] hover:px-12 hover:text-stone-900 ease-in duration-300">
                            Join us!
                        </button>
                    </a>
                </div>
            </header>
        </>
    );
}
