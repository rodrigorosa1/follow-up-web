import * as React from 'react';
import './App.css';
import Login from "./features/auth/Login";
import { Box, ThemeProvider } from '@mui/material';
import { Layout } from './components/layout/Layout';
import { appTheme } from './config/Theme';
import { Routes, Route } from 'react-router-dom';
import { Home } from './features/home/Home';
import { Registers } from './components/pages/Registers';
import { Professional } from './features/professional/Professional';
import { FormProfessional } from './features/professional/FormProfessional';
import { Student } from './features/student/Student';
import { FormStudent } from './features/student/FormStudent';
import { ComponetScheduler } from './features/scheduler/Scheduler';
import { SkillsDetails } from './features/skills/SkillsDetails';
import { Skills } from './features/skills/Skills';
import { Configurations } from './components/pages/Configurations';
import { User } from './features/configurations/User';
import { Profile } from './features/auth/Profile';
import { FollowUp } from './features/follow-up/FollowUp';
import { FollowUpDetais } from './features/follow-up/FollowUpDetails';
import { Password } from './features/auth/Password';
import { Router } from './Router';
import { Recovery } from './features/auth/Recovery';
import { PageSuccess } from './components/pages/PageSuccess';
import { PrivacyPolity } from './components/pages/PrivacyPolity';
import { ScheduleDetails } from './features/scheduler/ScheduleDetails';
import { Finances } from './components/pages/Finances';
import { Specialty } from './features/specialty/Specialty';
import { Payments } from './features/finance/payments/Payments';
import { PaymentListProfessional } from './features/finance/payments/PaymentListProfessional';
import { Billings } from './features/finance/billings/Billings';
import { BillingsCustomer } from './features/finance/billings/BillingsCustomer';
import { Company } from './features/comercial/Company';


const App: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Follow-UP | App';
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <Box
        component="main"
        sx={{
          height: "100vh",
          backgroundColor: (theme) => theme.palette.secondary.light
        }}
      >
        <Layout>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/recovery-password' element={<Recovery />} />
            <Route path='/register-password/:token' element={<Password />} />
            <Route path='/success-password/:token' element={<PageSuccess />} />
            <Route path='/privacy-polity' element={<PrivacyPolity />} />

            <Route element={<Router />}>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />

              <Route path='/registers' element={<Registers />} />
              <Route path='/professionals' element={<Professional />} />
              <Route path='/professionals/register' element={<FormProfessional />} />
              <Route path='/professionals/:id' element={<FormProfessional />} />

              <Route path='/skills' element={<Skills />} />
              <Route path='/skills/register' element={<SkillsDetails />} />
              <Route path='/skills/:id' element={<SkillsDetails />} />

              <Route path='/students' element={<Student />} />
              <Route path='/students/register' element={<FormStudent />} />
              <Route path='/students/:id' element={<FormStudent />} />

              <Route path='/scheduler' element={<ComponetScheduler />} />
              <Route path='/scheduler/register' element={<ScheduleDetails />} />
              <Route path='/scheduler/:id' element={<ScheduleDetails />} />

              <Route path='/follow-up' element={<FollowUp />} />
              <Route path='/follow-up/:id' element={<FollowUpDetais />} />

              <Route path='/configurations' element={<Configurations />} />
              <Route path='/configurations/users' element={<User />} />

              <Route path='/profile' element={<Profile />} />
              <Route path='/finance' element={<Finances />} />
              <Route path='/finance/payments' element={<Payments />} />
              <Route path='/finance/payments/:instructor_id' element={<PaymentListProfessional />} />
              <Route path='/finance/specialties' element={<Specialty />} />
              <Route path='/finance/billings' element={<Billings />} />
              <Route path='/finance/billings/:student_id' element={<BillingsCustomer />} />

              <Route path='/comercial/companies' element={<Company />} />
              <Route path='/dashboard' element={<Company />} />
            </Route>
          </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
  );

};

export default App;
