import React, {useState} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {text} from '../text';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';
import type {RootStackParamList} from '../types';
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from '../store/slices/apiSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Menulist'>;

const Menulist: React.FC<Props> = ({route}): JSX.Element => {
  const {category} = route.params;

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedTab, setSelectedTab] = useState<'services' | 'products'>(
    'services'
  );

  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  const dishes = productsData instanceof Array ? productsData : [];
  const categories = categoriesData instanceof Array ? categoriesData : [];

  if (loading) {
    return <components.Loader />;
  }

  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return <components.Header goBack={true} title='Menu' basket={true} />;
  };

  const renderSearchBar = () => {
    return (
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          height: 50,
          marginBottom: 14,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.white,
            flex: 1,
            borderRadius: 10,
            marginRight: 5,
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.mainTurquoise,
              width: 40,
              height: '100%',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 14,
            }}
          >
            <svg.SearchSvg />
          </View>
          <TextInput
            placeholder='Search ...'
            style={{
              flex: 1,
              ...theme.fonts.DMSans_400Regular,
              fontSize: 16,
              color: theme.colors.mainColor,
            }}
            placeholderTextColor={theme.colors.textColor}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.white,
            borderRadius: 10,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <svg.FilterSvg />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTabs = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginHorizontal: 20,
          marginBottom: 14,
        }}
      >
        <TouchableOpacity
          onPress={() => setSelectedTab('products')}
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: selectedTab === 'products' ? 2 : 0,
            borderColor: theme.colors.mainTurquoise,
          }}
        >
          <Text
            style={{
              color:
                selectedTab === 'products'
                  ? theme.colors.mainTurquoise
                  : theme.colors.textColor,
              ...theme.fonts.DMSans_400Regular,
              fontSize: 16,
            }}
          >
            Products
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedTab('services')}
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: selectedTab === 'services' ? 2 : 0,
            borderColor: theme.colors.mainTurquoise,
          }}
        >
          <Text
            style={{
              color:
                selectedTab === 'services'
                  ? theme.colors.mainTurquoise
                  : theme.colors.textColor,
              ...theme.fonts.DMSans_400Regular,
              fontSize: 16,
            }}
          >
            Services
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    if (selectedTab === 'products') {
      const dishesByCategory = dishes?.filter((dish) => {
        return dish.category?.includes(selectedCategory);
      });
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {dishesByCategory?.map((item, index, array) => {
            const lastItem = index === array.length - 1;
            return (
              <components.MenuListItem
                item={item}
                lastItem={lastItem}
                key={item.id}
              />
            );
          })}
        </ScrollView>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: theme.colors.textColor,
              textAlign: 'center',
              ...theme.fonts.DMSans_400Regular,
            }}
          >
            No services are available at your location
          </Text>
        </View>
      );
    }
  };

  const renderHomeIndicator = () => {
    return <components.HomeIndicator />;
  };

  return (
    <components.SmartView>
      {renderStatusBar()}
      {renderHeader()}
      {renderSearchBar()}
      {renderTabs()}
      {renderContent()}
      {renderHomeIndicator()}
    </components.SmartView>
  );
};

export default Menulist;
