function Card(props) {
  return (
    <div className={`card border-0 shadow-lg ${props.className}`} style={{backgroundColor: "#A5C9CA"}}>
      {props.children}
    </div>
  );
}

export default Card;
