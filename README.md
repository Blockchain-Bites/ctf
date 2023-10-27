# CTF - Capture the Flag

# Ejercicios de Hackeo de Contratos Inteligentes



## Token Vulnerable

### Objetivo:

* El `owner` al publicar el contrato `TokenVulnerable` se hace acreedor de `100 millones` de tokens.
* Luego del ataque, el atacante `attacker` debe poseer `100 millones` de tokens y el `owner` debe poseer cero
* Modifica el archivo `./test/TokenVulnerable.js` en la parte designada.
* Añade los contratos necesarios para ejecutar el ataque.
* Ejecuta el test `npx hardhat test test/TokenVulnerable.js` y debería pasar

### Pistas:

* delegatecall
* storage layout
