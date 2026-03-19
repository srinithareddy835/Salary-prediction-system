import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
import joblib

# ---------- LOAD DATA ----------
def load_data(filepath):
    df = pd.read_csv(filepath)
    return df

# ---------- PREPROCESSOR ----------
def get_preprocessor():
    numeric_features = ['Age', 'Years of Experience', 'Performance Rating', 'Past Companies']
    categorical_features = ['Gender', 'Education Level', 'Job Role', 'Department', 'Location', 'Skills', 'Company Tier', 'Certifications']

    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])

    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
        ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ])
    
    return preprocessor

# ---------- SPLIT DATA ----------
def prepare_data(df):
    X = df.drop('Salary', axis=1)
    y = df['Salary']

    return train_test_split(X, y, test_size=0.2, random_state=42)

# ---------- TRAIN MODEL ----------
def train_and_save_model():
    df = load_data("dataset.csv")

    X_train, X_test, y_train, y_test = prepare_data(df)

    preprocessor = get_preprocessor()

    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
    ])

    model.fit(X_train, y_train)

    print("✅ Model trained successfully")

    joblib.dump(model, "model.joblib")
    print("✅ Model saved as model.joblib")

# ---------- MAIN ----------
if __name__ == "__main__":
    train_and_save_model()