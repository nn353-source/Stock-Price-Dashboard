
import { ThemeProvider } from '@mui/material/styles';
import theme from "./colorthemes.jsx"

const Card = ({icon, title, value}) => {
    return (
        <ThemeProvider theme={theme}>
            <div className=' rounded-lg shadow p-4 flex items-center space-x-4' style={{ backgroundColor: theme.palette.greens.light }}>
                <div className=' text-3xl' style={{ color: theme.palette.greens.darker }}>{icon}</div>
                <div>
                    <h2 className='text-sm ' style={{ color: theme.palette.greens.darker }}>{title} </h2>
                    <p className='text-2xl font-bold ' style={{ color: theme.palette.greens.darker }}>{value}</p>
                </div>
            </div>

        </ThemeProvider>
            
    )
}

export default Card