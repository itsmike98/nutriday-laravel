

export default function AlimentItem({ name, brand, foodDescription }) {
    return (
        <>
            <div className="bg-[#444] rounded-lg py-3 px-6">
                <h4 className="font-bold text-[#C1C86D]">
                    {name} <span className="text-[#afafaf]">{brand ? ` - ${brand}` : ''}</span>
                </h4>

                <div>
                    <span>{foodDescription}</span>
                </div>
            </div>
        </>
    )
}