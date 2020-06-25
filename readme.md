# Backend for TUF-2000M parser

Simple express api with calculations for data conversion.

Given data (raw.txt) is converted to hexadecimal, which is then converted to appropriate types (REAL4(single precision float), BCD, Long, Integer).

These types are paired with their respective variable names.

# Resources used:

## Figuring out REAL4 floats
 [https://www.h-schmidt.net/FloatConverter/IEEE754.html](https://www.h-schmidt.net/FloatConverter/IEEE754.html)
 
 [https://www.website.masmforum.com/tutorials/fptute/fpuchap2.htm](https://www.website.masmforum.com/tutorials/fptute/fpuchap2.htm)


