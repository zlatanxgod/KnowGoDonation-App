import React, {useState} from 'react';

import {SafeAreaView, ScrollView, View, Pressable, Text} from 'react-native';

import style from './Style';
import Input from '../../../components/input/Input';
import globalStyles from '../../../assets/globalStyles';
import Header from '../../../components/header/Header';
import Button from '../../../components/button/Button';
import {Routes} from '../../Routes';
import {loginUser} from '../../../api/user';
import {useDispatch} from 'react-redux';
import {resetToIntitialState, logIn} from '../../../redux/reducers/User';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  dispatch(resetToIntitialState());
  return (
    <SafeAreaView style={[globalStyles.backgroundWhite, globalStyles.flex]}>
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.marginBottom24}>
          <Header title={'Welcome Back'} type={1} />
        </View>
        <View style={style.marginBottom24}>
          <Input
            label="Email"
            placeholder={'Enter your e-mail...'}
            onChangeText={val => {
              setEmail(val);
            }}
          />
        </View>
        <View style={style.marginBottom24}>
          <Input
            secureTextEntry={true}
            label="Password"
            placeholder={'******'}
            onChangeText={val => {
              setPassword(val);
            }}
          />
        </View>
        <View>
          {error.length > 0 && <Text style={style.error}>{error}</Text>}
        </View>
        <View style={[style.loginButtonContainer]}>
          <Button
            onPress={async () => {
              let user = await loginUser(email, password);
              if (!user.status) {
                setError(user.error);
              } else {
                setError('');

                dispatch(logIn(user.data));
                navigation.navigate(Routes.Home);
              }
            }}
            title="Login"
            isDisabled={email.length <= 5 || password.length < 5}
          />
        </View>
        <Pressable
          style={style.registerationButton}
          onPress={() => {
            return navigation.navigate(Routes.Registration);
          }}>
          <Header color={'#156CF7'} title={"Don't have an account?"} type={3} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
