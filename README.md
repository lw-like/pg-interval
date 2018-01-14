# pg-interval
JavaScript postgres interval tools

## Instalation

```
npm install pg-interval
```

## Usage

### Create new pg-interval `pgi` object

```
pgi('00:01:00');
```

### Format interval

```
pgi('00:01:00').format('hh hours mm minutes 00 seconds');
```

Returns `"00 hours 01 minutes 00 seconds"`

```
pgi('00:01:00').format();
```

Returns `"00:01:00"`

### Add interval to interval

```
var p1 = pgi('00:01:00')
var p2 = pgi('00:01:00')

p1.add(p2)
p1.format();
```

Returns `"00:02:00"`

### Subtract interval from interval

```
var p1 = pgi('00:01:00')
var p2 = pgi('00:01:00')
  
p1.subtract(p2);
p1.format();
```

Returns `"00:00:00"`

### Difference between intervals

Calculates difference between two pgi objects;

```
var interval1 = pgi('10:10:00');
var interval2 = pgi('10:20:00');

var pDiff = interval2.diff(interval1);
```
`pDiff' will be new pgi instance. 


```
pDiff.format('hh:mm');
```

Returns `00:10`
