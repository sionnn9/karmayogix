#define sensor1_Trig A0
#define sensor1_Echo A1

#define sensor2_Trig A2
#define sensor2_Echo A3
#define greenLight 2

#define motorPin1 10
#define motorPin2 11

#define beeper 8

float height=20.00;
float maxDiffrence=50;

long getSensor1Value(){
   // Send pulse
  digitalWrite(sensor1_Trig, LOW);
  delayMicroseconds(2);
  digitalWrite(sensor1_Trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(sensor1_Trig, LOW);

  long duration = pulseIn(sensor1_Echo, HIGH);

  float distance_cm = duration * 0.034 / 2;

  return distance_cm;

}

long getSensor2Value(){
   // Send pulse
  digitalWrite(sensor2_Trig, LOW);
  delayMicroseconds(2);
  digitalWrite(sensor2_Trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(sensor2_Trig, LOW);

  long duration = pulseIn(sensor2_Echo, HIGH);

  float distance_cm = duration * 0.034 / 2;

  return distance_cm;

}





void Beep(int mili){

 digitalWrite(greenLight,HIGH);
  digitalWrite(beeper,HIGH);
 delay(mili);
 digitalWrite(greenLight,LOW);
 digitalWrite(beeper,LOW);



}

/*void OpenGate(){
  analogWrite(motorPin2,0);
  analogWrite(motorPin1,255);
  delay(200);
  analogWrite(motorPin1,0);


  
   */


void closeGate(){


}

void setup() {

  pinMode(sensor1_Trig, OUTPUT);
  pinMode(sensor1_Echo, INPUT);


  pinMode(sensor2_Trig, OUTPUT);
  pinMode(sensor2_Echo, INPUT);


  pinMode(greenLight, OUTPUT);

  pinMode(beeper,OUTPUT);

  pinMode(motorPin1,OUTPUT);
  pinMode(motorPin2,OUTPUT);


//OpenGate();
//closeGate();
  
  Serial.begin(9600);
}




void loop() {
  // Send pulse
  

  // Distance calculations
  float distance_Sensor1 = getSensor1Value();
  float distance_Sensor2 = getSensor2Value();


  int percentage_1=(distance_Sensor1/height)*100;
  
  int percentage_2=(distance_Sensor2/height)*100;



  


  

  // Print both
  //Serial.print("Distance1 : ");
  Serial.print(distance_Sensor1);
  //Serial.print(" cm   |  ");
  Serial.print(",");
  Serial.print(percentage_1);
  Serial.print(",");
 // Serial.print(" %");

 // Serial.print("     Distance2 : ");
  Serial.print(distance_Sensor2);
 // Serial.print(" cm  |  ");
  Serial.print(",");
  Serial.print(percentage_2);
 // Serial.print(" %");
  Serial.println();



  if((percentage_2-percentage_1)>maxDiffrence ||(percentage_1-percentage_2)>maxDiffrence){
     //  Beep(200);

  }

 

  delay(2000);
}
