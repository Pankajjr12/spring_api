import HomeIcon from '../../assets/navlogo/home.png'
import SearchIcon from '../../assets/navlogo/search.png'
import ExploreIcon from '../../assets/navlogo/explore.png'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ChatIcon from '../../assets/navlogo/message.png'
import Notifications from '../../assets/navlogo/like.png'
import MoreIcon from '../../assets/navlogo/more.png'
import PeopleIcon from '@mui/icons-material/People';

export const navigation = [
    {
        title: "Home",
        icon: HomeIcon,
        link:"/"
    },
    {
        title: "Search",
        icon: SearchIcon,
        link: "/search"
    },
    {
        title: "Explore",
        icon: ExploreIcon,
        link: "/explore"
    },
    {
        title: "Lists",
        icon: MoreIcon,
        link: "/list"
    },
    {
        title: "Messages",
        icon: ChatIcon,
        link: "/chat"
    },
    {
        title: "Communities",
        icon: <PeopleIcon sx={{ color: 'white' }} />,
        link: "/community"
    },
    {
        title: "Notifications",
        icon: Notifications,
        link: "/notifications"
    },
    {
        title: "More",
        icon: <ExpandCircleDownIcon sx={{ color: 'white' }} />,
        link: "/more"
    },
]