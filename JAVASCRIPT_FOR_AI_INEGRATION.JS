function update(){

pressure+=parseFloat(pressureRate.value)
temp+=parseFloat(tempRate.value)
fuel+=parseFloat(fuelRate.value)
speed+=parseFloat(speedRate.value)
altitude+=parseFloat(altRate.value)
aoa+=parseFloat(aoaRate.value)
vs=parseFloat(vsRate.value)
rpm+=parseFloat(rpmRate.value)

pressureVal.innerHTML=pressure.toFixed(3)
tempVal.innerHTML=temp.toFixed(1)
fuelVal.innerHTML=fuel.toFixed(1)
speedVal.innerHTML=speed.toFixed(1)
altVal.innerHTML=altitude.toFixed(0)
aoaVal.innerHTML=aoa.toFixed(1)
vsVal.innerHTML=vs
rpmVal.innerHTML=rpm
oilVal.innerHTML=oil

push(pressureChart,pressure,1.0)
push(tempChart,temp,200)
push(fuelChart,fuel,70)
push(speedChart,speed,230)
push(altChart,altitude,10000)
push(aoaChart,aoa,5)

let risk=0
let message="System Stable"
let recommendation="Maintain current flight parameters"

/* PRESSURE ANALYSIS */

if(pressure < 0.995){
risk+=20
message="Cabin pressure slowly decreasing"
recommendation="Check pressurization system"
}

/* ENGINE ANALYSIS */

if(temp > 220){
risk+=25
message="Engine overheating detected"
recommendation="Reduce engine power"
}

/* FUEL ANALYSIS */

if(fuel < 40){
risk+=15
message="Fuel level dropping"
recommendation="Check fuel consumption rate"
}

/* STALL DETECTION */

if(aoa > 12 && speed < 200){
risk+=35
message="STALL RISK DETECTED"
recommendation="Lower aircraft nose and increase throttle"
speak("Warning stall risk detected")
}

/* DESCENT CRASH RISK */

if(vs < -400){
risk+=25
message="Rapid descent detected"
recommendation="Increase lift and reduce descent rate"
}

/* RPM INSTABILITY */

if(rpm < 1500){
risk+=20
message="Engine RPM too low"
recommendation="Increase throttle"
}

/* UPDATE AI PANEL */

alertBox.innerHTML=message
recommend.innerHTML=recommendation

/* CRASH RISK BAR */

if(risk > 100){risk=100}
riskFill.style.width=risk+"%"

/* FLIGHT PHASE DETECTION */

if(altitude < 2000){
phase.innerHTML="Landing"
}
else if(vs > 200){
phase.innerHTML="Climb"
}
else if(vs < -200){
phase.innerHTML="Descent"
}
else{
phase.innerHTML="Cruise"
}

}