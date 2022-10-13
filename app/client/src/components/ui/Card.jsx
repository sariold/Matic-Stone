function Card(props) {
  return (
    <div className={`card border-0 shadow-lg ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Card;
