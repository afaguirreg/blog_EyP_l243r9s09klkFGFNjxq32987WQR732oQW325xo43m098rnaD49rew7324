void setup() {
  // put your setup code here, to run once:
  DDRC = 0x00;      //Configura todos los pines del puerto C como entradas
  DDRB = 0xFF;      //Configura todos los pines del puerto B como salidas
}

void loop() {
  // put your main code here, to run repeatedly:
  PORTB = PINC;     //Lee las entradas en el puerto C y refleja el mismo estado en las salidas por el puerto B
}
