import React, {useState} from 'react';

import {SafeAreaView, ScrollView, View, Pressable, Text} from 'react-native';

import style from './Style';
import Input from '../../../components/input/Input';
import globalStyles from '../../../assets/globalStyles';
import Header from '../../../components/header/Header';
import Button from '../../../components/button/Button';
import BackButton from '../../../components/backButton/BackButton';
import {create} from 'react-test-renderer';
import {createUser} from '../../../api/user';
const Registration = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  return (
    <SafeAreaView style={[globalStyles.backgroundWhite, globalStyles.flex]}>
      <View style={style.backButton}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.marginBottom24}>
          <Header title={'Hello and Welcome !'} type={1} />
        </View>
        <View style={style.marginBottom24}>
          <Input
            label="First Name"
            placeholder={'Enter your first name...'}
            onChangeText={val => {
              setfirstName(val);
            }}
          />
        </View>
        <View style={style.marginBottom24}>
          <Input
            label="Last Name"
            placeholder={'Enter your last name...'}
            onChangeText={val => {
              setlastName(val);
            }}
          />
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
          {success.length > 0 && <Text style={style.success}>{success}</Text>}
        </View>
        <View style={[style.loginButtonContainer]}>
          <Button
            isDisabled={
              firstName.length <= 2 ||
              lastName.length <= 2 ||
              email.length <= 2 ||
              password.length <= 2
            }
            title="Register"
            onPress={async () => {
              let user = await createUser(firstName, lastName, email, password);
              if (user.error) setError(user.error);
              else {
                setError('');
                setSuccess('You have successfully registered');
                setTimeout(() => navigation.goBack(), 3000);
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registration;
