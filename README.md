# useRipple 

Hook that generates positions and sizes of "ripples", allows you to easily recreate material UI ripple effect.

Returns array of objects containing width, height, left and top style properties for each ripple, and onClick function that generates ripples.

Also includes ripple animation and default styles for ripple parent and ripple. You can use these styles (don't forget to specify ripple background-color yourself) or make your own, just be sure to adjust the duration parameter of useRipple hook if your custom animation has different duration.


## Usage

### Usage with default styles

```javascript
import "use-ripple/index.css" // import this for ripple styles

const App = () => {
  const { styles, onClick } = useRipple();

  return (
    <button className="ripple-parent" onClick={onClick}>
      Ripple
      {styles?.map((style, index) => (
        <span key={index} className="ripple ripple-color" style={style} />
      ))}
    </button>
  );
};
```

Create css class for background color of ripple, or use something else to apply your preffered color.
```css 
.ripple-color {
  background-color: blue;
}
```

### Usage with custom styles
Provide your animation duration in ms as parameter to useRipple if you use animation with duration different than the default duration (600ms). Also for ripples
to render properly, parent node position must be relative and overflow has to be hidden and position of the ripple node must be absolute.

```javascript
const { styles, onClick } = useRipple({ duration: CUSTOM_ANIMATION_DURATION })
```

### Usage with onClick handler
```javascript
const { styles, onClick } = useRipple();
const handleClick = (e) => {
  doSomething();
  onClick(e)
}
```

or pass click handler to useRipple and use returned value

```javascript
const handleClick = (e) => {
  doSomething();
}
const { styles, onClick } = useRipple({ handleClick });

return <button onClick={onClick} ...
```

## Props
|name  |type |default  |description  |
|------|-----|---------|-------------|
|duration|number|600|duration of ripple animation in miliseconds
|limit|number|100|maximum number of ripples to render (each click renders new ripple), use negative value for unlimited number of ripples
|handleClick|MouseEventHandler|undefined|onClick handler of component that renders ripple, it will be wrapped in onClick function returned from useRipple

## Return value
|name|type|description|
|----|----|---------|
|styles|Pick<CSSProperties, "width" \| "height" \| "left" \| "top">[]| size and position for each ripple
|onClick|MouseEventHandler|onClick handler that generates ripples


