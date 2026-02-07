# 💘 Do You Want To Be My Valentine? (The "Yes" Extortion Service)

Are you afraid of rejection? Do you have a crush but lack the self-esteem to handle a "No"?

**Welcome to the future of romance.**

This is a scientifically engineered, highly advanced, commitment-forcing web application. It guarantees a **100% success rate** for your Valentine proposals. How? By simply removing free will from the equation.

![Do You Want To Be My Valentine?](img/DoYouWantToBeMyValentine.png)

## 🚀 How It Works

1.  **The Illusion of Choice:** We present the target with two buttons: "Yes" and "No".
2.  **The "No" Button has Anxiety:** If they try to click "No", the button will literally run away. It detects the mouse cursor (or touch) and teleports to safety. It's faster than Usain Bolt fleeing a commitment ceremony.
3.  **The Persistent "Yes":** As the "No" button runs away, the "Yes" button grows larger, making it increasingly difficult to ignore the correct choice.
4.  **Celebration:** Confetti! GIFs! Happiness! You are now dating (or engaged!). (Legally binding status: *Questionable*).

## 🎥 Demo

Watch the "No" button in action as it desperately tries to avoid its inevitable fate.

![Site Demo](img/siteGIF.gif)

## 💌 Personalize The Trap

You can customize the message and theme to suit the occasion.

### 1. Custom Name
Add a `?name=` parameter to the URL to address your target.

**Example:** `?name=Sarah`

### 2. Proposal Type
Add a `&type=marry` parameter to upgrade your request from a Valentine's date to a marriage proposal. This changes the question to "Will You Marry Me?" and swaps the theme to **Golden Yellow**.

**Example:** `?name=Sarah&type=marry`

### Full Usage Example:
```
https://alvarocleite.github.io/DoYouWantToBeMyValentine/?name=Sarah&type=marry
```

## 🏗️ Technical Architecture

This project is built following **Clean Architecture** principles, ensuring a robust and maintainable codebase. For a detailed breakdown of the layers and logic flow, see our **[Architectural Documentation](docs/architecture.md)**.

*   **Domain Layer**: Pure business logic (game rules, scale calculations) and entities.
*   **Interface Adapters**: Gateways (URL handling) and Presenters (mapping data to view text).
*   **View Layer**: Decoupled DOM management and CSS Variables for dynamic theming.
*   **Persistent Context**: The app uses a custom routing bridge to ensure the name and theme are preserved across all pages (Celebration, Instructions, and Creator Info).

## 🔗 Live Demo

Deploy your trap here: **[https://alvarocleite.github.io/DoYouWantToBeMyValentine/](https://alvarocleite.github.io/DoYouWantToBeMyValentine/)**

## ⚖️ License

Distributed under the **MIT License**.

*Disclaimer: The developer is not responsible for any slaps, blocked numbers, or restraining orders resulting from the use of this software. Use at your own risk.*
