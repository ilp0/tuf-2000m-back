# Backend for TUF-2000M parser

Simple express api with calculations for data conversion.

Given data (raw.txt) is converted to hexadecimal, which is then converted to appropriate types (REAL4(single precision float), BCD, Long, Integer).

I figured out the REAL4 CDAB-format by pasting the hexadecimal of registers 33 and 34 (Temperature #1/inlet) to [this converter](https://www.scadacore.com/tools/programming-calculators/online-hex-converter/) and comparing the values to the hinted value (7.101). After knowing this I could convert the rest programmatically.

See calculate.js comments for explanations of code.

# Resources used:
 
 Express.js documentation

 StackOverflow

 [https://www.scadacore.com/tools/programming-calculators/online-hex-converter/](https://www.scadacore.com/tools/programming-calculators/online-hex-converter/)

 [https://www.h-schmidt.net/FloatConverter/IEEE754.html](https://www.h-schmidt.net/FloatConverter/IEEE754.html)

 [https://www.website.masmforum.com/tutorials/fptute/fpuchap2.htm](https://www.website.masmforum.com/tutorials/fptute/fpuchap2.htm)

 


