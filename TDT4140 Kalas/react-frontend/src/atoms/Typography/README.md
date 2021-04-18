# Typography

There are three types of typography to be used; LogoText, HeaderText and BodyText.
Color options are red, indigo, white, darkblue, lightblue and grey. Default color is darkblue.
Sizes are chosen freely. Default sizes are 50, 30, 20 for logo, header, body respectively.

```javascript
import {
  HeaderText,
  BodyText,
  LogoText
} from "./atoms/Typography/Typography.js";

<LogoText color="darkblue" size={50}>
    Kalas!
</LogoText>
<HeaderText color="red" size={30}>
    Fest, hurra!
</HeaderText>
<BodyText color="grey" size={20}>
    Dette er ein bra fest.
</BodyText>
```
