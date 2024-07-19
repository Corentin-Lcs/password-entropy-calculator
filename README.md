<h1 align="center">Password Entropy Calculator</h1>

The "Password Entropy Calculator" GitHub project is a tool to evaluate the strength of passwords by calculating their entropy. This tool helps users understand the security of their passwords by quantifying the difficulty of guessing or cracking them.

<p align="center">
  <img src="https://github.com/Corentin-Lcs/password-entropy-calculator/blob/main/DesEntropy.png" alt="DesEntropy.png"/>
</p>

## Password Robustness

### Overview

Password robustness is a measure of its resistance against guessing attacks or brute-force attacks. It is often quantified by entropy, a value expressed in bits, which represents the average number of attempts an attacker would need to guess the password. The higher the entropy, the stronger the password is considered.

The entropy of a password depends on several factors:

- The length of the password.
- The diversity of characters used (lowercase, uppercase, digits, symbols).
- The predictability or structure of the password (e.g., common passwords or repetitive patterns reduce entropy).

## Implementation

During the development of this project, particular attention was given to the precise and efficient implementation of password entropy calculation. Here's a detailed overview of the steps and considerations involved.

### General Formula For Entropy

The entropy of a password, denoted as $`H`$, is calculated using the following formula:

<p align="center">
  <img src="https://github.com/Corentin-Lcs/password-entropy-calculator/blob/main/Formula.png" alt="Formula.png"/>
</p>

where:
- $`N`$ is the total number of possible characters in the used alphabet.
- $`L`$ is the length of the password.

This formula assumes that each character in the password is chosen independently and uniformly from the $`N`$ possible characters.

### Formula Details

For a deeper understanding, consider cases where characters are chosen from different sets:

- **Lowercase only (26 characters)**: if an 8-character password consists only of lowercase letters, then $`N = 26`$ and $`L = 8`$.
- **Lowercase and uppercase (52 characters)**: if the password includes both lowercase and uppercase letters, $`N = 52`$.
- **Lowercase, uppercase, digits, and symbols (95 characters)**: for a password using a full set of printable ASCII characters, $`N = 95`$.

For example, for a 10-character password using the full set of printable ASCII characters, the entropy would be:

```math
H = \log_2(95^{10}) = 10 \cdot \log_2(95) \approx 10 \cdot 6.57 = 65.7 \text{ bits}
```

### Applying The Formula Details

To calculate entropy, we need to consider the following:

- **Calculation of the number of possible characters $`N`$**: depending on the password policy (which character sets are allowed).
- **Calculation of the password length $`L`$**: effective length of the password entered by the user.

Then, entropy is calculated by applying these values to the general formula. Here's how it's done:

```math
H = L \cdot \log_2(N)
```

By substituting the values of $`N`$ and $`L`$ into the expression, we obtain the entropy in bits, providing a quantitative measure of password robustness.

### Evaluation

This table evaluates the theoretical robustness of passwords based on their entropy. Higher entropy corresponds to better protection against brute-force or guessing attacks. Users can assess the strength of their password choices using this standard evaluation scale.

| Entropy (bits)      | Theoretical Robustness      |
|---------------------|-----------------------------|
| < 64                | Easily guessable            |
| < 80                | Low protection              |
| < 100               | Moderate protection         |
| < 128               | Good protection             |
| < 256               | Very strong protection      |
| > 256               | Extremely strong protection |

## Project's Structure

```
password-entropy-calculator/
├─ README.md
├─ LICENSE
├─ Formula.png
├─ DesEntropy.png
└─ src/
   ├─ assets/
   │  ├─ Inter.ttf
   │  ├─ bootstrap.css
   │  └─ favicon/
   │     ├─ apple-touch-icon.png
   │     ├─ favicon-16x16.png
   │     ├─ favicon-32x32.png
   │     └─ favicon.ico
   ├─ index.html
   ├─ style.css
   └─ script.js
```

## Meta

Created by [@Corentin-Lcs](https://github.com/Corentin-Lcs). Feel free to contact me !

Distributed under the GNU GPLv3 license. See [LICENSE](https://github.com/Corentin-Lcs/password-entropy-calculator/blob/main/LICENSE) for more information.
