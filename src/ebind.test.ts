import { create } from "react-test-renderer";
import { ebind, ebinds } from "./index";

const Ebind = () => {
	return null;
};

describe("init", () => {
	test("create app actor", () => {
		const mainEbind = create(ebinds(ebind(Ebind)));
		expect(mainEbind.toJSON()).toMatchSnapshot();
	});
});
