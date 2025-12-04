export default function Spinner() {
    return (
        <div className="d-flex justify-content-center py-4">
            <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
