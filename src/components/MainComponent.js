import { Component } from 'react';
import { Route, Routes,Navigate, useParams } from 'react-router-dom';
import { withRouter } from '../Routerv6';
import Home from './HomeComponent';
import Menu from './MenuComponent.js';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import {  fetchDishes, fetchComments, fetchPromos, postComment, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const mapStatetoprops=state=>{
  return{
  dishes:state.dishes,
  comments:state.comments,
  promotions:state.promotions,
  leaders:state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  postFeedback:(values)=>dispatch(postFeedback(values)),
  addComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetfeedbackform: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders:()=>dispatch(fetchLeaders())
});
class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  
    render() { 
      const HomePage = () => {
        return(
  
            <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              disherrmsg={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoerrmsg={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leadererrmsg={this.props.leaders.errMess}
            />
          
        );
      }
     
  
      const DishWithId = () => {
        var params=useParams()
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            addComment={this.props.addComment}
            />
        );
      };
        return ( 
            <div>
            <Header/>
            
            <div className="container" > 
              <TransitionGroup>
              <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
               <Routes location={this.props.location}>
             {/* <Route index element={HomePage()} /> */}
              <Route path='/home' element={HomePage()} />
              <Route exact path='/menu' element={<Menu dishes={this.props.dishes} onDishSelect={this.onDishSelect}/>} />
              <Route path='/menu/:dishId' element={<DishWithId />} />
              <Route exact path='/contactus' element={<Contact  resetfeedbackform={this.props.resetfeedbackform} postFeedback={this.props.postFeedback}/>} />
              <Route exact path='/aboutus' element={<About leaders={this.props.leaders.leaders} leaderLoading={this.props.leaders.isLoading} leadererrmsg={this.props.leaders.errMess}/>} />
              <Route path="/" element={<h1>Page not found</h1>} />
              <Route path="*" element={<h1>Page not found</h1>} />
              </Routes> 
              </CSSTransition>
              </TransitionGroup>
                {/* <Menu dishes={this.state.dishes} onDishSelect={this.onDishSelect}/> */}


                  {/* <DishDetail key={this.state.selectedDish+101} selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/> */}
            </div>
            
            <Footer/>
            </div>
         );
    }
    
}
 
export default withRouter(connect(mapStatetoprops,mapDispatchToProps)(Main));