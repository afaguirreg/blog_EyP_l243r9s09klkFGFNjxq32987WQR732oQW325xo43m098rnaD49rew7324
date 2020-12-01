void setup() {
  // put your setup code here, to run once:
  DDRD = 0xFF;      //Configura todos los pines del puerto D como salidas
}

void loop() {
  // put your main code here, to run repeatedly:
  PORTD = 255;      //PORTD = 0xFF; PORTD = 0b11111111;
  delay(1000);
  PORTD = 0;        //PORTD = 0x00; PORTD = 0b00000000;
  delay(1000);
  PORTD = 170;      //PORTD = 0xAA; PORTD = 0b10101010;
  delay(1000);
  PORTD = 85;       //PORTD = 0x55; PORTD = 0b01010101;
  delay(1000);
  PORTD = 0;        //PORTD = 0x00; PORTD = 0b00000000;
  delay(1000);
}