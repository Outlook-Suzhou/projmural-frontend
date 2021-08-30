## Add a new kind of shape
> In order to design a new kind of shape, you need to add changes to the following files:
> - src/types/global.d.ts: add your new type of shape
> - src/components/shapes/
>    - add your newShape.tsx
>    - change baseShape.tsx
> - src/components/painting_content
>    - cursor_shape.tsx
>    - handle_layer_click.tsx
>- src/components/tool_bar/tools/add_shape.tsx
> - src/utils/calc_floatbar_position.ts
