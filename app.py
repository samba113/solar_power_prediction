import streamlit as st
import pandas as pd
import joblib
import os

# Define model path
MODEL_PATH = "solar_power_model.joblib"

# Load the model
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
    st.success("✅ Model loaded successfully!")
else:
    st.error("❌ Model file not found!")

# Streamlit UI
st.title("🔆 Solar Power Output Predictor")

st.markdown("Provide the input weather parameters to predict solar power output (Radiation).")

temp = st.number_input("🌡️ Temperature (°C)", min_value=0.0, max_value=50.0, value=25.0)
humidity = st.number_input("💧 Humidity (%)", min_value=0.0, max_value=100.0, value=50.0)
pressure = st.number_input("🌬️ Pressure (millibar)", min_value=900.0, max_value=1100.0, value=1013.0)
wind_speed = st.number_input("🍃 Wind Speed (m/s)", min_value=0.0, max_value=15.0, value=3.0)

if st.button("🔍 Predict"):
    input_df = pd.DataFrame([[temp, humidity, pressure, wind_speed]],
                            columns=["Temperature", "Humidity", "Pressure", "Wind Speed"])
    try:
        prediction = model.predict(input_df)[0]
        st.subheader("☀️ Predicted Solar Power Output (Radiation):")
        st.success(f"{prediction:.2f} W/m²")
    except Exception as e:
        st.error(f"Prediction failed: {e}")

