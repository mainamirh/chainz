import { Sector, type PieSectorShapeProps } from "recharts";

interface PieShapeProps extends PieSectorShapeProps {
  colors: string[];
  activeIndex: number;
  hoverIndex: number;
}

const PieShape = ({
  colors,
  index,
  activeIndex,
  hoverIndex,
  ...props
}: PieShapeProps) => {
  return (
    <Sector
      {...props}
      fill={colors[index % colors.length]}
      className="cursor-pointer outline-hidden hover:brightness-110"
      stroke={
        activeIndex === index
          ? colors[index % colors.length]
          : "rgb(var(--color-content))"
      }
      strokeWidth={activeIndex === index ? 4 : hoverIndex === index ? 2 : 0}
    />
  );
};

export default PieShape;
