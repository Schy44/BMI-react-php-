import React, { useState, useEffect } from 'react';
import '../style/index.css';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Dashboard() {
    const navigate = useNavigate(); // Initialize navigate

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState(67); // default to 5'7"
    const [activityLevel, setActivityLevel] = useState(1.2);
    const [bmi, setBmi] = useState(null);
    const [message, setMessage] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [calorieIntake, setCalorieIntake] = useState(0);
    const [macronutrients, setMacronutrients] = useState({
        carbs: 0,
        protein: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
    });

    const [greeting, setGreeting] = useState('');
    const [healthTip, setHealthTip] = useState('');

    const healthTips = [
        "Stay hydrated and eat balanced meals!",
        "Regular exercise helps maintain a healthy BMI.",
        "Consistency is key—track your progress!",
        "Sleep well for better overall health.",
        "Small steps today lead to big changes tomorrow.",
    ];

    useEffect(() => {
        const hour = new Date().getHours();
        const username = localStorage.getItem('username') || 'User'; // Fetch username from localStorage

        let greetMessage = '';
        if (hour < 12) greetMessage = `Good Morning, ${username}!`;
        else if (hour < 18) greetMessage = `Good Afternoon, ${username}!`;
        else greetMessage = `Good Evening, ${username}!`;

        setGreeting(greetMessage);

        // Select a random health tip
        const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
        setHealthTip(randomTip);
    }, []); // Only run once on component mount

    const calculateBMI = (e) => {
        e.preventDefault();
        if (weight <= 0 || height <= 0) {
            setMessage("Please enter a valid weight and height");
            setBmi(null); // Reset BMI if invalid input
            setImgSrc('');
            setCalorieIntake(0);
            setMacronutrients({
                carbs: 0,
                protein: 0,
                fat: 0,
                fiber: 0,
                sugar: 0,
            });
            return;
        }

        const heightInMeters = height * 0.0254;
        const calculatedBmi = (weight / (heightInMeters ** 2)).toFixed(1);
        setBmi(calculatedBmi);

        let statusMessage = '';
        let img = '';
        if (calculatedBmi < 18.5) {
            statusMessage = 'You are underweight';
            img = 'images/underweight.png';
        } else if (calculatedBmi < 25) {
            statusMessage = 'You are healthy';
            img = 'images/healthy.png';
        } else if (calculatedBmi < 30) {
            statusMessage = 'You are overweight';
            img = 'images/overweight.png';
        } else {
            statusMessage = 'You are obese';
            img = 'images/overweight.png';
        }
        setMessage(statusMessage);
        setImgSrc(img);

        const age = 25; // Assuming age, consider making it dynamic
        const bmr = (10 * weight) + (6.25 * (height * 2.54)) - (5 * age);
        const intake = bmr * activityLevel;
        setCalorieIntake(intake);

        setMacronutrients({
            carbs: intake * 0.50 / 4,
            protein: intake * 0.20 / 4,
            fat: intake * 0.25 / 9,
            fiber: intake * 0.05 / 4,
            sugar: intake * 0.10 / 4,
        });
    };

    const data = [
        { name: 'Carbohydrates', kcal: macronutrients.carbs * 4 },
        { name: 'Protein', kcal: macronutrients.protein * 4 },
        { name: 'Fat', kcal: macronutrients.fat * 9 },
        { name: 'Fiber', kcal: macronutrients.fiber * 4 },
        { name: 'Sugar', kcal: macronutrients.sugar * 4 },
    ];

    const handleViewBMIUsers = () => {
        navigate('/view-bmi-users'); // Redirect to the desired path
    };

    return (
        <div className="container my-5">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-left">
                    <h1 className="navbar-title">BMI Dashboard</h1>
                    <div className="navbar-health-tip">
                        <span role="img" aria-label="health-tip">💡</span> {healthTip}
                    </div>
                </div>
                <div className="navbar-buttons">
                    <button className="btn-view-bmi-users" onClick={handleViewBMIUsers}>
                        View BMI Users
                    </button>
                </div>
            </nav>

            <h2 className="text-center display-4" style={{ fontSize: '2.5rem', color: '#333' }}>{greeting}</h2>

            <div className="row main-container">
                {/* BMI Calculator Section */}
                <div className="col-lg-6 mb-4">
                    <div className="bmi-calculator card p-3 shadow">
                        <h3 className="text-center mb-3" style={{ fontSize: '1.75rem', color: '#333' }}>BMI Calculator</h3>
                        <form onSubmit={calculateBMI} className="form-group">
                            <div className="form-group mb-2">
                                <label htmlFor="weight" style={{ fontSize: '1rem' }}>Weight (kg)</label>
                                <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    className="form-control"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="height" style={{ fontSize: '1rem' }}>Height</label>
                                <div className="slider-container">
                                    <h5 id="height-display" style={{ fontSize: '1.25rem' }}>{Math.floor(height / 12)}' {height % 12}"</h5>
                                    <input
                                        type="range"
                                        min="48"
                                        max="84"
                                        value={height}
                                        className="slider"
                                        id="height-slider"
                                        name="height"
                                        step="1"
                                        onChange={(e) => setHeight(Number(e.target.value))}
                                    />
                                    <small className="form-text text-muted">Use the slider to adjust your height (in feet and inches).</small>
                                </div>
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="activity_level" style={{ fontSize: '1rem' }}>Activity Level</label>
                                <select
                                    id="activity_level"
                                    name="activity_level"
                                    className="form-control"
                                    value={activityLevel}
                                    onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
                                >
                                    <option value="1.2">Sedentary (little or no exercise)</option>
                                    <option value="1.375">Lightly active (light exercise/sports)</option>
                                    <option value="1.55">Moderately active (moderate exercise/sports)</option>
                                    <option value="1.725">Very active (hard exercise/sports)</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Calculate BMI</button>
                        </form>
                    </div>
                </div>

                {/* BMI Results Section */}
                <div className="col-lg-6">
                    <div className="bmi-results card p-3 shadow">
                        {bmi ? (
                            <>
                                <h3 className="text-center" style={{ fontSize: '1.75rem', color: '#333' }}>Your BMI is {bmi}</h3>
                                <p className="text-center" style={{ fontSize: '1.25rem' }}>{message}</p>
                                {imgSrc && <img src={imgSrc} alt="BMI Status" className="img-fluid mx-auto d-block" style={{ width: '100px' }} />}
                                <div className="bmi-details mt-4">
                                    <h5>Daily Calorie Intake: {calorieIntake.toFixed(2)} kcal</h5>
                                    {/* Horizontal Bar Chart */}
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart
                                            layout="vertical"
                                            data={data}
                                            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" />
                                            <YAxis dataKey="name" type="category" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="kcal" fill="#82ca9d" name="Calories (kcal)" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </>
                        ) : (
                            <div className="text-center placeholder-message" style={{ fontSize: '1.5rem', color: '#333' }}>
                                Calculate to see BMI result
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
