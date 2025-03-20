

export default function AlimentItem({ name, unit, calories }) {
    return(
        <>
            <div className="bg-[#444] rounded-lg py-3 px-6">
                <h4 className="font-bold text-[#C1C86D]">{name}</h4>
                <div>
                    <span>{unit}</span>
                    <span>, </span>
                    <span>{calories} calories</span>
                </div>
            </div>
        </>
    )
}