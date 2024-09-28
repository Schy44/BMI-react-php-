const BmiRecords = ({ username, bmiRecords, healthTips }) => {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">BMI Records for {username}</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Record ID</th>
                        <th>Height (ft & in)</th>
                        <th>Weight (kg)</th>
                        <th>BMI</th>
                        <th>Recorded At</th>
                    </tr>
                </thead>
                <tbody>
                    {bmiRecords.length ? (
                        bmiRecords.map((record) => (
                            <tr key={record.RecordID}>
                                <td>{record.RecordID}</td>
                                <td>
                                    {Math.floor(record.Height / 12)} ft {record.Height % 12} in
                                </td>
                                <td>{record.Weight}</td>
                                <td>{record.BMI.toFixed(2)}</td>
                                <td>{record.RecordedAt}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No BMI records found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h5>Health Tips:</h5>
            <p>{healthTips}</p>
            <p>
                <a href="view_bmi_users.php" className="btn btn-info">
                    <i className="fas fa-arrow-left"></i> Back to BMI Users
                </a>
            </p>
        </div>
    );
};

// Add the default export here
export default BmiRecords;
