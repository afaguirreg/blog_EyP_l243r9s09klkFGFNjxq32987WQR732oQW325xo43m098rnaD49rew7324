void setup() {
  // put your setup code here, to run once:
  pinMode(A0, INPUT);
  pinMode(8, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (digitalRead(A0)==1)
    digitalWrite(8, HIGH);
  else
    digitalWrite(8, LOW);
}
