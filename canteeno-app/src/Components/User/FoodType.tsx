type FoodTypeProps = {
  foodType: string;
};
export const FoodType = ({ foodType }: FoodTypeProps) => {
  return (
    <div className="food-type-container">
      {foodType === "veg" ? (
        <div className="food-type-veg"></div>
      ) : (
        <div className="food-type-non-veg"></div>
      )}
    </div>
  );
};
