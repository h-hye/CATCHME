import h5py
import numpy as np


# 데이터 저장
def save_data(filename, dataset_name, shape=(100, 100)):
    with h5py.File(filename, 'w') as f:
        data = np.random.rand(*shape)
        f.create_dataset(dataset_name, data=data)
