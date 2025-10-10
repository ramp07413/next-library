import {
  FaBell,
  FaBuilding,
  FaUniversity,
  FaCog,
  FaUser,
  FaUsers,
  FaShieldAlt,
  FaStar,
  FaCheckCircle,
  FaCheck,
  FaClock,
  FaPalette,
  FaTh,
  FaList,
  FaPlusSquare,
  FaHeartbeat,
  FaUsersCog,
  FaUsers as FaUsersGroup,
  FaUserPlus,
  FaLock,
  FaCreditCard,
  FaHistory,
  FaHourglass,
  FaUndo,
  FaWallet,
  FaBriefcase,
  FaFileAlt,
  FaFileCode,
  FaLifeRing,
  FaComments,
  FaChair,
  FaReceipt,
  FaClipboardCheck
} from 'react-icons/fa';

export const COMPANY_NAV_LINKS = [
  {
    label: 'Dashboard',
    icon: FaTh,
    sub: [{ href: '/company', label: 'Company Dashboard', icon: FaTh }],
  },
  {
    label: 'Libraries',
    icon: FaBuilding,
    sub: [
      {
        href: '/company/libraries',
        label: 'FaUniversity List',
        icon: FaList,
      },
      {
        href: '/company/libraries/register',
        label: 'Register FaUniversity',
        icon: FaPlusSquare,
      },
      {
        href: '/company/libraries/status',
        label: 'Status',
        icon: FaHeartbeat,
      },
    ],
  },
  {
    label: 'FaUsers',
    icon: FaUsersCog,
    sub: [
      { href: '/company/users', label: 'FaUser List', icon: FaUsersGroup },
      {
        href: '/company/users/register',
        label: 'Register FaUser',
        icon: FaUserPlus,
      },
      { href: '/company/users/roles', label: 'Roles', icon: FaShieldAlt },
      {
        href: '/company/users/permissions',
        label: 'Permissions',
        icon: FaLock,
      },
    ],
  },
  {
    label: 'Payments',
    icon: FaCreditCard,
    sub: [
      { href: '/company/payments', label: 'History', icon: FaHistory },
      { href: '/company/payments/recent', label: 'Recent', icon: FaClock },
      {
        href: '/company/payments/pending',
        label: 'Pending',
        icon: FaHourglass,
      },
      { href: '/company/payments/refunded', label: 'Refunded', icon: FaUndo },
    ],
  },
  {
    label: 'Expenses',
    icon: FaWallet,
    sub: [
      { href: '/company/expenses', label: 'Company', icon: FaBriefcase },
      { href: '/company/expenses/staff', label: 'Staff', icon: FaUsers },
    ],
  },
  {
    label: 'Reports',
    icon: FaFileAlt,
    sub: [
      {
        href: '/company/reports/open',
        label: 'Open Reports',
        icon: FaClipboardCheck,
      },
      {
        href: '/company/reports/closed',
        label: 'Closed Reports',
        icon: FaFileCode,
      },
    ],
  },
  {
    label: 'Support',
    icon: FaLifeRing,
    sub: [
      { href: '/company/support', label: 'Support Tickets', icon: FaLifeRing },
    ],
  },
  {
    label: 'Alerts',
    icon: FaBell,
    sub: [
      { href: '/company/alerts', label: 'All Alerts', icon: FaBell },
      { href: '/company/alerts/unread', label: 'Unread', icon: FaBell },
      { href: '/company/alerts/read', label: 'Read', icon: FaCheckCircle },
      ,
      { href: '/company/alerts/starred', label: 'Starred', icon: FaStar },
    ],
  },
  {
    label: 'Messages',
    icon: FaComments,
    sub: [
      { href: '/company/settings?tab=profile', label: 'Profile', icon: FaUser },
      {
        href: '/company/settings?tab=security',
        label: 'Security',
        icon: FaShieldAlt,
      },
      {
        href: '/company/settings?tab=appearance',
        label: 'Appearance',
        icon: FaPalette,
      },
    ],
  },
];

export const LIBRARY_NAV_LINKS = [
  { href: '/library', label: 'Dashboard', icon: FaTh },
  { href: '/library/seats', label: 'Seats', icon: FaChair },
  { href: '/library/students', label: 'Manage Students', icon: FaUsers },
  { href: '/library/payments', label: 'Payments', icon: FaCreditCard },
  { href: '/library/expenses', label: 'Expenses', icon: FaWallet },
  { href: '/library/alerts', label: 'Alerts', icon: FaBell },
  { href: '/library/admins', label: 'Admin Management', icon: FaUsersCog },
];

export const STUDENT_NAV_LINKS = [
  { href: '/student', label: 'My Dashboard', icon: FaTh },
  { href: '/student/details', label: 'My Details', icon: FaUser },
  { href: '/student/seat', label: 'My Seat Detail', icon: FaChair },
  { href: '/student/payments', label: 'My Payments', icon: FaCreditCard },
  { href: '/student/dues', label: 'My Dues', icon: FaReceipt },
  { href: '/student/alerts', label: 'My Alerts', icon: FaBell },
];