type FormErrorProps = {
    error?: string[];
};

export function FormError({ error }: FormErrorProps) {
    if (!error) return null;

    return error.map((err, index) => (
        <div key={index} className="mt-0!">
            <small className="text-xs text-red-400 italic opacity-70">{err}</small>
        </div>
    ));
}
