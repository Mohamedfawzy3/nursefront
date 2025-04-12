
import styled from "styled-components";
import female from "../assets/Female 14.png"
import male from "../assets/Male 21.png"

const ReviewsSection = styled.section`
  padding: 50px 20px;
  text-align: center;
  color : var(--primary-color);
  background: #f9f9f9;
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: auto;
`;

const ReviewCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 5px;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

const reviews = [
  {
    name: "أحمد علي",
    review: "الخدمة ممتازة، والممرض كان محترف جدًا في التعامل مع الجرح.",
    img: male,
  },
  {
    name: "نجلاء محمود",
    review: "التجربة كانت رائعة، وتم تقديم الرعاية الصحية بكفاءة.",
    img: female,
  },
  {
    name: "خالد إبراهيم",
    review: "خدمة ممتازة وسريعة جدًا، أوصي بها بشدة!",
    img: male,
  },
  {
    name: "سارة حسن",
    review: "أفضل تجربة رعاية صحية منزلية، فريق رائع!",
    img: female,
  },
  {
    name: "أحمد علي",
    review: "الخدمة ممتازة، والممرض كان محترف جدًا في التعامل مع الجرح.",
    img: male,
  },
  {
    name: "نجلاء محمود",
    review: "التجربة كانت رائعة، وتم تقديم الرعاية الصحية بكفاءة.",
    img: female,
  },
  {
    name: "خالد إبراهيم",
    review: "خدمة ممتازة وسريعة جدًا، أوصي بها بشدة!",
    img: male,
  },
  {
    name: "سارة حسن",
    review: "أفضل تجربة رعاية صحية منزلية، فريق رائع!",
    img: female,
  },
];

const Reviews = () => {
  return (
    <ReviewsSection>
      <h2>آراء المرضى</h2>
      <br/>
      <ReviewsGrid>
        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <img src={review.img} alt={review.name} />
            <h3>{review.name}</h3>
            <p>{review.review}</p>
          </ReviewCard>
        ))}
      </ReviewsGrid>
    </ReviewsSection>
  );
};

export default Reviews;
