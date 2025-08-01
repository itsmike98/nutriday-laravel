export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-white shadow-sm focus:ring-indigo-500 ' +
                className
            }
        />
    );
}
