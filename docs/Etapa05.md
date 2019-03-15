## Prior stages
1. [Etapa01](docs/Etapa01.md) Setup and list item component.
1. [Etapa02](docs/Etapa02.md) Implement container component.
1. [Etapa03](docs/Etapa03.md) Incorporate an ordering specification.
1. [Etapa04](docs/Etapa04.md) Add interaction to select items in order.

## Support full partial order

It's time to add some capability for full partial orders.
What we mean by that is this:

Given
- Zanahoria
- Remolacha
- Calabaza
- Tomate
- Lechuga
- Morrón
- Pimiento verde
- Acetuna

We want to express a preference for Tomate, and then Lechuga, and then
Morrón and Pimiento verde about the same, and then Acetuna, and then the rest.
We can represent that preference as follows:
1. Tomate
1. Lechuga
1.  - Morrón
    - Pimiento verde
1. Acetuna
1.  - Calabaza
    - Remolacha
    - Zanahoria

In which Morrón and Pimiento verde are preferred the same, but only after
Tomate and Lechuga, and always before everything else.

Recalling from [Etapa03](Etapa03.md), we represented an ordering as
an array of keys that provided the ordered items ended by an array of
everything else. We'll now use embedded arrays to represent multiple items
prefered in any given place of the order. For example, using the initial
letters as keys, we represent the above preference as:
```
['T','L',['M','P'],'A',['C','R','Z']]
```

Add a little olive oil and a dash of salt. We have a nice salad.

