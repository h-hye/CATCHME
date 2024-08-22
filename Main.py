import torch
from model.MyNeuralNetwork import MyNeuralNetwork
from saved.Save import save_data


def main():

    # 모델 인스턴스 생성
    model = MyNeuralNetwork()
    example_data = torch.randn(1, 28, 28)
    output = model(example_data)
    print("결과 출력: ", output)

    # 데이터 저장
    filename = 'example.h5'
    dataset_name = 'dataset_name'
    shape = (100, 100)
    save_data(filename, dataset_name, shape)
    print(f"{filename}에 데이터 저장 완료! ")


if __name__ == '__main__':
    main()
