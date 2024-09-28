import React, { useState, useEffect } from 'react';
import './../style/view_bmi_users.css';

const BMIMangement = ({ message }) => {
    const [users, setUsers] = useState([]);
    const [modalData, setModalData] = useState({ show: false, userId: null });
    const [formData, setFormData] = useState({ heightFt: '', heightIn: '', weight: '' });
    const [alertMessage, setAlertMessage] = useState(message);

    // Updated fetchUsers function with additional error handling
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost/BMI_USING_PHP/BMI-PHP-/php/view_bmi_users.php', {
                    credentials: 'include', // Include cookies
                });
                const data = await response.json();
                if (data.status === "success") {
                    setUsers(data.users);
                } else {
                    setAlertMessage(data.message || 'Unauthorized access.');
                }
            } catch (error) {
                setAlertMessage('Error: ' + error.message);
            }
        };

        fetchUsers();
    }, []);


    const handleAddRecord = async (e) => {
        e.preventDefault();
        const { heightFt, heightIn, weight } = formData;

        // Validate inputs
        if (heightFt <= 0 || heightIn < 0 || weight <= 0) {
            setAlertMessage("Please enter valid positive values.");
            return;
        }

        const totalHeightInInches = (heightFt * 12) + Number(heightIn);
        const heightInMeters = totalHeightInInches * 0.0254;
        const bmi = weight / (heightInMeters ** 2);

        try {
            const response = await fetch('http://localhost/BMI_USING_PHP/BMI-PHP-/php/view_bmi_users.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    add_record: true,
                    bmi_user_id: modalData.userId,
                    height_ft: heightFt,
                    height_in: heightIn,
                    weight: weight,
                }),
            });
            const data = await response.json();
            setAlertMessage(data.message);
            closeModal();
            if (data.status === "success") {
                setUsers(prevUsers => prevUsers.map(user => user.BMIUserID === modalData.userId ? { ...user, bmiAdded: true } : user)); // Update user state as needed
            }
        } catch (error) {
            setAlertMessage('Error: ' + error.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch('http://localhost/BMI_USING_PHP/BMI-PHP-/php/view_bmi_users.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        delete_user: true,
                        bmi_user_id: userId,
                    }),
                });
                const data = await response.json();
                setAlertMessage(data.message);
                if (data.status === "success") {
                    setUsers(prevUsers => prevUsers.filter(user => user.BMIUserID !== userId)); // Update the user list
                }
            } catch (error) {
                setAlertMessage('Error: ' + error.message);
            }
        }
    };

    const closeModal = () => {
        setModalData({ show: false, userId: null });
        setFormData({ heightFt: '', heightIn: '', weight: '' });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">BMI Management</h2>
            {alertMessage && <div className="alert alert-info">{alertMessage}</div>}

            <h4>BMI Users</h4>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>BMI User ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.BMIUserID}>
                                <td>{user.BMIUserID}</td>
                                <td>{user.Name}</td>
                                <td>{user.Age}</td>
                                <td>{user.Gender}</td>
                                <td>
                                    <button className="btn">Add Record</button>
                                    <button className="btn btn-danger-custom">Delete User</button>

                                    <a href={`/view_bmi_records.php?bmi_user_id=${user.BMIUserID}`} className="btn btn-info">
                                        View Records
                                    </a>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button className="btn btn-light" onClick={() => window.location.href = '/Dashboard'}>Back to Dashboard</button>

            {/* Modal for Adding BMI Record */}
            {modalData.show && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add BMI Record</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleAddRecord}>
                                    <div className="form-group">
                                        <label>Height (feet)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.heightFt}
                                            onChange={e => setFormData({ ...formData, heightFt: e.target.value })}
                                            required
                                            min="0"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Height (inches)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.heightIn}
                                            onChange={e => setFormData({ ...formData, heightIn: e.target.value })}
                                            required
                                            min="0"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Weight (kg)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.weight}
                                            onChange={e => setFormData({ ...formData, weight: e.target.value })}
                                            required
                                            min="1"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Add Record</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BMIMangement;
