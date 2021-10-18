import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../public/css/styles.css';
import TopNav from '../components/topNav';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from '../context';
import Footer from '../components/footer';
import Head from "next/head"



function MyApp ({Component, pageProps}){
    

    
    
    

    return (

        <Provider>  
             
        

           
                
                
                <Head>
                <title>BUILDORYX</title>
                <link rel='shortcut icon' type='image/x-icon' href="/images/favicon.ico" />
                
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous"/>

                </Head>
                
                
                <ToastContainer position="top-center"/>
                <TopNav />
                
                <Component {...pageProps} />       
                <Footer />
            
                
        </Provider>
        )

}

export default MyApp;