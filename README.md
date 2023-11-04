# CTF - Capture the Flag

# Ejercicios de Hackeo de Contratos Inteligentes



## #1 Token Vulnerable

### Objetivo:

* El `owner` al publicar el contrato `TokenVulnerable` se hace acreedor de `100 millones` de tokens.
* Luego del ataque, el atacante `attacker` debe poseer `100 millones` de tokens y el `owner` debe poseer cero
* Modifica el archivo `./test/TokenVulnerable.js` en la parte designada.
* Añade los contratos necesarios para ejecutar el ataque.
* Ejecuta el test `npx hardhat test test/TokenVulnerable.js` y debería pasar

### Pistas:

* delegatecall
* storage layout

## #2 Camouflage

### Objetivo:

* El `attacker` es añadido a un `whitelist` y es la única cuenta en dicha  `whitelist`.
* Es posible hacer una transferencia del `whitelist` a otra cuenta que no tenga código.
* El `attacker` debe lograr tener un balance superior a 10 NFTs.

### Pistas:

* Crea Dos
* Reentrancy
* Precomputación
